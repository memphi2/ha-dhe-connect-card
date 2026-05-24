#!/usr/bin/env node
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const REQUIRED_LEGAL_PHRASES = [
  "not legal advice",
  "unofficial community",
  "not affiliated with, sponsored by or endorsed",
  "vendor JavaScript, CSS, HTML, firmware, screenshots, product artwork, logos or copied web-interface templates",
  "Product and project names are used only to describe compatibility",
];

const ALLOWED_MEDIA_ASSETS = new Set([
  "assets/screenshot-card.png",
  "assets/screenshot2-card.png",
  "assets/screenshot3-card.png",
  "assets/screenshot4-card.png",
]);
const HA_JWT_HEADER = "eyJhbGciOiJIUzI1Ni" + "IsInR5cCI6IkpXVCJ9";

const SECRET_PATH_MARKERS = [
  "/.storage/",
  ".storage/",
  ".env",
  ".tmp_pairing_token",
  "stiebel_dhe_connect_token",
];
const ALLOWED_SECRET_PATH_PREFIXES = [
  "test/fixtures/ha-config/.storage/",
];

const VENDOR_WEB_ASSET_PATH_PATTERNS = [
  /(^|\/)dhe-js-check(?:\/|$)/i,
  /(^|\/)ste-dhe-[^/]*\.(?:js|css|map|html)$/i,
  /(^|\/)assets\/ste-dhe-[^/]*\.(?:js|css|map|html)$/i,
];

const MEDIA_PATH_PATTERN = /\.(?:png|jpe?g|webp|gif|svg)$/i;
const PRIVATE_IPV4_SOURCE = String.raw`(?:10(?:\.\d{1,3}){3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})`;
const PRIVATE_NETWORK_ADDRESS_PATTERN = new RegExp(
  String.raw`\b(?:https?|wss?):\/\/(?:[^@\s/]+@)?${PRIVATE_IPV4_SOURCE}(?::\d{1,5})?\b|\bHA_TEST_URL\s*=\s*['"]?(?:https?:\/\/)?${PRIVATE_IPV4_SOURCE}(?::\d{1,5})?\b`,
  "i",
);

const SECRET_PATTERNS = [
  ["private key", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
  ["GitHub token", /\bgh[opsu]_[A-Za-z0-9_]{36,}\b/],
  [
    "Home Assistant long-lived token",
    new RegExp(`\\b${HA_JWT_HEADER}\\.[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}\\b`),
  ],
  [
    "literal HA test credential",
    /\bHA_TEST_(?:PASSWORD|TOKEN)\s*=\s*['"](?!<)[^'"\r\n]{8,}['"]/,
  ],
  [
    "JSON access token",
    /"(?:access_token|refresh_token)"\s*:\s*"[A-Za-z0-9._~+/=-]{20,}"/,
  ],
  ["Authorization bearer token", /\bAuthorization:\s*Bearer\s+[A-Za-z0-9._~+/=-]{20,}/i],
  ["private network address", PRIVATE_NETWORK_ADDRESS_PATTERN],
];

const PROPRIETARY_VENDOR_CONTENT_PATTERNS = [
  [
    "proprietary DHE license header",
    new RegExp(
      "ste-" + "dhe\\s*-\\s*v[0-9].{0,80}" + "Licensed " + "proprietary",
      "is",
    ),
  ],
  ["proprietary license marker", new RegExp("Licensed " + "proprietary", "i")],
  ["vendor copyright ownership text", new RegExp("This software " + "is copyrighted", "i")],
  [
    "vendor legal entity copyright block",
    new RegExp("STIEBEL\\s+ELTRON\\s+GmbH\\s*&\\s*Co\\.?\\s*KG", "i"),
  ],
  [
    "vendor redistribution prohibition",
    new RegExp(
      "unauthorized use,\\s*" + "duplication,\\s*transmission,\\s*distribution",
      "i",
    ),
  ],
  [
    "copied DHE web-template marker",
    new RegExp("temperature/tpl/" + "display\\.tpl\\.html|" + "display" + "Wrench", "i"),
  ],
];

const TRADEMARK_TARGET_PATTERN =
  /\b(home assistant|hacs|mushroom|stiebel(?:\s+eltron)?|dhe connect|open home foundation|openai)\b/i;
const TRADEMARK_CLAIM_PATTERNS = [
  [
    "trademark affiliation claim",
    /\b(?:this|the)\s+(?:project|repository|integration|card)\s+(?:is|was|acts?)\s+(?:an?\s+)?official\b/i,
  ],
  [
    "trademark endorsement claim",
    /\b(?:this|the)\s+(?:project|repository|integration|card)\s+(?:is|was)\s+(?:affiliated with|sponsored by|endorsed by)\b/i,
  ],
];
const TRADEMARK_SAFE_DISCLAIMER_PATTERNS = [
  /\bunofficial\b/i,
  /\bnot affiliated with\b/i,
  /\bnot sponsored by\b/i,
  /\bnot endorsed by\b/i,
];
const ENV_BLOCKLIST_TERMS = "LEGAL_BLOCKLIST_TERMS";
const ENV_BLOCKLIST_REGEX = "LEGAL_BLOCKLIST_REGEX";
const SIMPLE_BLOCKLIST_TERM_PATTERN = /^[a-z0-9_-]+$/i;
const BLOCKLIST_TOKEN_BOUNDARY = "a-z0-9_-";

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

function escapeRegexLiteral(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsBlocklistedTerm(value, lowerValue, term) {
  if (!SIMPLE_BLOCKLIST_TERM_PATTERN.test(term)) {
    return lowerValue.includes(term);
  }
  const pattern = new RegExp(
    `(^|[^${BLOCKLIST_TOKEN_BOUNDARY}])${escapeRegexLiteral(term)}($|[^${BLOCKLIST_TOKEN_BOUNDARY}])`,
    "i",
  );
  return pattern.test(value);
}

function isBinary(data) {
  return data.subarray(0, 4096).includes(0);
}

function pathFailures(relativePath) {
  const normalized = normalizePath(relativePath);
  const failures = [];
  if (
    !ALLOWED_SECRET_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix)) &&
    SECRET_PATH_MARKERS.some((marker) => normalized.includes(marker))
  ) {
    failures.push(`tracked secret-like path: ${relativePath}`);
  }
  if (VENDOR_WEB_ASSET_PATH_PATTERNS.some((pattern) => pattern.test(normalized))) {
    failures.push(`tracked vendor web asset path: ${relativePath}`);
  }
  if (MEDIA_PATH_PATTERN.test(normalized) && !ALLOWED_MEDIA_ASSETS.has(normalized)) {
    failures.push(`tracked media asset needs legal review: ${relativePath}`);
  }
  failures.push(...externalBlocklistFailures(relativePath, normalized, "path"));
  return failures;
}

function textFailures(relativePath, text) {
  const failures = [];
  for (const [label, pattern] of SECRET_PATTERNS) {
    if (pattern.test(text)) {
      failures.push(`${relativePath}: possible ${label}`);
      break;
    }
  }
  for (const [label, pattern] of PROPRIETARY_VENDOR_CONTENT_PATTERNS) {
    if (pattern.test(text)) {
      failures.push(`${relativePath}: possible ${label}`);
      break;
    }
  }
  failures.push(...externalBlocklistFailures(relativePath, text, "text"));
  failures.push(...trademarkFailures(relativePath, text));
  return failures;
}

function externalBlocklistFailures(relativePath, value, scope) {
  const failures = [];
  const lower = value.toLowerCase();
  const terms = (process.env[ENV_BLOCKLIST_TERMS] ?? "")
    .split(/[,\n]/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
  for (const term of terms) {
    if (containsBlocklistedTerm(value, lower, term)) {
      failures.push(
        `${relativePath}: possible external blocklisted ${scope} fragment`,
      );
      break;
    }
  }
  const regexSource = (process.env[ENV_BLOCKLIST_REGEX] ?? "").trim();
  if (regexSource) {
    try {
      const pattern = new RegExp(regexSource, "i");
      if (pattern.test(value)) {
        failures.push(
          `${relativePath}: possible external blocklisted ${scope} regex`,
        );
      }
    } catch {
      failures.push(`${relativePath}: invalid ${ENV_BLOCKLIST_REGEX} pattern`);
    }
  }
  return failures;
}

function trademarkFailures(relativePath, text) {
  if (!TRADEMARK_TARGET_PATTERN.test(text)) {
    return [];
  }
  if (TRADEMARK_SAFE_DISCLAIMER_PATTERNS.some((pattern) => pattern.test(text))) {
    return [];
  }
  for (const [label, pattern] of TRADEMARK_CLAIM_PATTERNS) {
    if (pattern.test(text)) {
      return [`${relativePath}: possible ${label}`];
    }
  }
  return [];
}

async function trackedFiles(root = process.cwd()) {
  const { stdout } = await execFileAsync("git", ["ls-files", "-z", "--cached"], {
    cwd: root,
    maxBuffer: 16 * 1024 * 1024,
  });
  return stdout.split("\0").filter(Boolean);
}

async function scanTrackedFiles(root = process.cwd(), files) {
  const tracked = files ?? (await trackedFiles(root));
  const failures = [];
  for (const relativePath of tracked) {
    failures.push(...pathFailures(relativePath));
    const absolutePath = path.join(root, relativePath);
    let data;
    try {
      data = await readFile(absolutePath);
    } catch (error) {
      failures.push(`could not read tracked file ${relativePath}: ${error.message}`);
      continue;
    }
    if (isBinary(data)) {
      continue;
    }
    failures.push(...textFailures(relativePath, data.toString("utf8")));
  }
  return failures;
}

async function checkLegalDocs(root = process.cwd()) {
  const failures = [];
  const readme = await readFile(path.join(root, "README.md"), "utf8");
  const legal = await readFile(path.join(root, "docs", "legal.md"), "utf8");
  const normalizedLegal = legal.replace(/\s+/g, " ");
  if (!readme.includes("[docs/legal.md](docs/legal.md)")) {
    failures.push("README must link to docs/legal.md");
  }
  for (const phrase of REQUIRED_LEGAL_PHRASES) {
    if (!normalizedLegal.includes(phrase)) {
      failures.push(`docs/legal.md missing required phrase: ${phrase}`);
    }
  }
  for (const asset of ALLOWED_MEDIA_ASSETS) {
    if (!legal.includes(`\`${asset}\``)) {
      failures.push(`docs/legal.md must document ${asset}`);
    }
  }
  return failures;
}

async function main() {
  const root = process.cwd();
  const failures = [
    ...(await checkLegalDocs(root)),
    ...(await scanTrackedFiles(root)),
  ];
  if (failures.length) {
    fail(`legal check failed:\n${failures.join("\n")}`);
    return;
  }
  pass("legal docs contain required disclaimers and asset policy");
  pass("tracked files passed secret, private-host and proprietary-asset scan");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}

export {
  checkLegalDocs,
  pathFailures,
  scanTrackedFiles,
  textFailures,
};
