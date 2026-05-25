#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_URL = "http://127.0.0.1:8123";
const baseUrl = (process.env.HA_TEST_URL || DEFAULT_URL).replace(/\/$/, "");
const longLivedToken = process.env.HA_TEST_TOKEN || "";
const username = process.env.HA_TEST_USERNAME || "";
const password = process.env.HA_TEST_PASSWORD || "";
const configDir = process.env.HA_CARD_CONFIG_DIR || process.argv[2] || "";
const expectedDomains = new Set([
  "binary_sensor",
  "button",
  "climate",
  "media_player",
  "number",
  "select",
  "sensor",
  "switch",
  "text",
  "weather",
]);
const fallbackIgnoredDomains = new Set(["update"]);
const expectedKeys = JSON.parse(
  await readFile("test/fixtures/integration-entity-keys.json", "utf8"),
);
const expectedKeySet = new Set(
  expectedKeys.map((item) => `${item.domain}.${item.key}`),
);
const expectedKeysByDomain = buildExpectedKeysByDomain(expectedKeys);

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`WARN: ${message}`);
}

function isUnsupportedGrantTypeError(error) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return message.includes("unsupported_grant_type");
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 160)}`);
  }
  return body;
}

async function login() {
  if (longLivedToken) {
    return {
      accessToken: longLivedToken,
      source: "long-lived-token",
    };
  }
  if (!username || !password) {
    throw new Error("HA_TEST_TOKEN or HA_TEST_USERNAME and HA_TEST_PASSWORD are required");
  }
  const clientId = "http://localhost/";
  const flow = await requestJson(`${baseUrl}/auth/login_flow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      handler: ["homeassistant", null],
      redirect_uri: clientId,
    }),
  });
  const loginFlow = await requestJson(`${baseUrl}/auth/login_flow/${flow.flow_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      username,
      password,
    }),
  });
  const token = await requestJson(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: loginFlow.result,
      client_id: clientId,
    }),
  });
  return {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    clientId,
    source: "login-flow",
  };
}

async function revokeRefreshToken(refreshToken, clientId) {
  if (!refreshToken) {
    return;
  }
  await requestJson(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "delete",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  });
}

async function cleanupLocalhostTokens() {
  if (!configDir) {
    return 0;
  }
  const authPath = path.join(configDir, ".storage", "auth");
  const auth = JSON.parse(await readFile(authPath, "utf8"));
  const tokens = auth?.data?.refresh_tokens;
  let removed = 0;
  if (Array.isArray(tokens)) {
    auth.data.refresh_tokens = tokens.filter((token) => {
      const remove = token?.client_id === "http://localhost/";
      if (remove) {
        removed += 1;
      }
      return !remove;
    });
  } else if (tokens && typeof tokens === "object") {
    for (const [key, token] of Object.entries(tokens)) {
      if (token?.client_id === "http://localhost/") {
        delete tokens[key];
        removed += 1;
      }
    }
  }
  if (removed > 0) {
    await writeFile(authPath, JSON.stringify(auth, null, 2), "utf8");
  }
  return removed;
}

async function countLocalhostTokens() {
  if (!configDir) {
    return 0;
  }
  const authPath = path.join(configDir, ".storage", "auth");
  const auth = JSON.parse(await readFile(authPath, "utf8"));
  const tokens = auth?.data?.refresh_tokens;
  const values = Array.isArray(tokens)
    ? tokens
    : tokens && typeof tokens === "object"
      ? Object.values(tokens)
      : [];
  return values.filter((token) => token?.client_id === "http://localhost/").length;
}

async function cleanupLocalhostTokensWithRetry() {
  let removedTotal = 0;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (attempt > 0) {
      await sleep(500);
    }
    removedTotal += await cleanupLocalhostTokens();
    const remaining = await countLocalhostTokens();
    if (remaining === 0) {
      await sleep(3000);
      removedTotal += await cleanupLocalhostTokens();
      const settledRemaining = await countLocalhostTokens();
      if (settledRemaining === 0) {
        return { removed: removedTotal, remaining: settledRemaining };
      }
    }
  }
  await sleep(1500);
  removedTotal += await cleanupLocalhostTokens();
  return { removed: removedTotal, remaining: await countLocalhostTokens() };
}

function isDheState(state) {
  const entityId = String(state.entity_id || "").toLowerCase();
  const friendlyName = String(state.attributes?.friendly_name || "").toLowerCase();
  return (
    entityId.includes("dhe") ||
    entityId.includes("stiebel") ||
    friendlyName.includes("dhe") ||
    friendlyName.includes("stiebel")
  );
}

function isAuditableFallbackDheState(state) {
  return isDheState(state) && !fallbackIgnoredDomains.has(entityDomain(state));
}

function entityDomain(state) {
  return String(state.entity_id || "").split(".", 1)[0];
}

function auditDheStates(states, registry) {
  const registryEntityIds = new Set(registry.map((entity) => entity.entity_id));
  return registryEntityIds.size
    ? states.filter((state) => registryEntityIds.has(state.entity_id))
    : states.filter(isAuditableFallbackDheState);
}

function domainCounts(states) {
  const domains = new Map();
  for (const state of states) {
    const domain = entityDomain(state);
    domains.set(domain, (domains.get(domain) ?? 0) + 1);
  }
  return domains;
}

function integrationKeySet(registry) {
  return new Set(registry.map(integrationEntityKey).filter(Boolean));
}

function integrationEntityKey(entity) {
  const domain = entityDomain(entity);
  if (typeof entity.translation_key === "string") {
    return `${domain}.${entity.translation_key}`;
  }
  const uniqueId = String(entity.unique_id ?? "");
  const domainKeys = expectedKeysByDomain.get(domain);
  if (!domainKeys?.length) {
    return undefined;
  }
  return domainKeys.find((expectedKey) => {
    const [, key] = expectedKey.split(".", 2);
    return uniqueId.endsWith(`_${key}`);
  });
}

function buildExpectedKeysByDomain(entries) {
  const byDomain = new Map();
  for (const entry of entries) {
    if (typeof entry?.domain !== "string" || typeof entry?.key !== "string") {
      continue;
    }
    const fullKey = `${entry.domain}.${entry.key}`;
    const bucket = byDomain.get(entry.domain);
    if (bucket) {
      bucket.push(fullKey);
    } else {
      byDomain.set(entry.domain, [fullKey]);
    }
  }
  return byDomain;
}

async function registryEntities() {
  if (!configDir) {
    return [];
  }
  const registryPath = path.join(configDir, ".storage", "core.entity_registry");
  const registry = JSON.parse(await readFile(registryPath, "utf8"));
  return (registry?.data?.entities ?? []).filter(
    (entity) => entity.platform === "stiebel_dhe_connect",
  );
}

async function main() {
  if (!configDir) {
    throw new Error("HA_CARD_CONFIG_DIR or config path argument is required for registry audit");
  }
  const token = await login();
  try {
    const states = await requestJson(`${baseUrl}/api/states`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    const registry = await registryEntities();
    const dheStates = auditDheStates(states, registry);
    const domains = domainCounts(dheStates);
    const unexpectedDomains = [...domains.keys()].filter((domain) => !expectedDomains.has(domain));
    if (!dheStates.length) {
      throw new Error("no live DHE-like entities found");
    }
    if (!domains.has("climate")) {
      throw new Error("no live DHE climate entity found");
    }
    if (unexpectedDomains.length) {
      throw new Error(`unsupported live DHE domains: ${unexpectedDomains.join(", ")}`);
    }
    if (registry.length) {
      const liveKeys = integrationKeySet(registry);
      const unknownKeys = [...liveKeys].filter((key) => !expectedKeySet.has(key));
      const missingKeys = [...expectedKeySet].filter((key) => !liveKeys.has(key));
      if (unknownKeys.length) {
        throw new Error(`live integration exposes unknown keys: ${unknownKeys.join(", ")}`);
      }
      if (missingKeys.length) {
        throw new Error(`live integration keys missing from HA: ${missingKeys.join(", ")}`);
      }
    }
    pass(
      `live HA DHE entities=${dheStates.length} domains=${[...domains.entries()]
        .map(([domain, count]) => `${domain}:${count}`)
        .join(",")}`,
    );
  } finally {
    if (token.source === "long-lived-token") {
      pass("HA long-lived token leaves no temporary refresh token to clean up");
    } else {
      try {
        await revokeRefreshToken(token.refreshToken, token.clientId);
        pass("HA refresh token revoked");
      } catch (error) {
        if (isUnsupportedGrantTypeError(error)) {
          pass("HA refresh token revoke not supported by this HA version; cleaning up localhost tokens");
        } else {
          warn(
            `HA refresh token revoke failed: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
        const cleanup = await cleanupLocalhostTokensWithRetry();
        if (cleanup.remaining > 0) {
          fail(
            `localhost token cleanup incomplete: removed=${cleanup.removed} remaining=${cleanup.remaining}`,
          );
        } else if (configDir) {
          pass(`localhost token cleanup removed=${cleanup.removed}`);
        }
      }
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}

export {
  auditDheStates,
  domainCounts,
  integrationKeySet,
  isAuditableFallbackDheState,
  isUnsupportedGrantTypeError,
  isDheState,
};
