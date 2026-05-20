#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const DOMAIN = "stiebel_dhe_connect";
const configDir = process.env.HA_CARD_CONFIG_DIR || process.argv[2] || "";

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

async function readStorageJson(name) {
  const file = path.join(configDir, ".storage", name);
  return JSON.parse(await readFile(file, "utf8"));
}

async function checkEntityRegistry() {
  const registry = await readStorageJson("core.entity_registry");
  const entities = registry?.data?.entities;
  if (!Array.isArray(entities)) {
    throw new Error("core.entity_registry data.entities is not an array");
  }
  const dheEntities = entities.filter((entry) => entry?.platform === DOMAIN);
  const enabled = dheEntities.filter(
    (entry) => !entry.disabled_by && !entry.hidden_by && entry.hidden !== true,
  );
  if (!dheEntities.length) {
    throw new Error("no stiebel_dhe_connect entities found");
  }
  if (!enabled.some((entry) => String(entry.entity_id || "").startsWith("climate."))) {
    throw new Error("no enabled DHE climate entity found");
  }
  if (
    !enabled.some((entry) =>
      /^(switch|number|button|select|media_player)\./.test(String(entry.entity_id || "")),
    )
  ) {
    throw new Error("no enabled DHE control entity found");
  }
  pass(`entity registry exposes ${enabled.length} enabled DHE entities`);
}

async function checkAuthTokens() {
  const auth = await readStorageJson("auth");
  const tokens = auth?.data?.refresh_tokens;
  const values = Array.isArray(tokens)
    ? tokens
    : tokens && typeof tokens === "object"
      ? Object.values(tokens)
      : [];
  const localhostTokens = values.filter((token) => token?.client_id === "http://localhost/");
  if (localhostTokens.length) {
    throw new Error(`localhost HA refresh tokens remain: ${localhostTokens.length}`);
  }
  pass("no localhost HA refresh tokens remain");
}

try {
  if (!configDir) {
    throw new Error("HA_CARD_CONFIG_DIR or config path argument is required");
  }
  await checkEntityRegistry();
  await checkAuthTokens();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
