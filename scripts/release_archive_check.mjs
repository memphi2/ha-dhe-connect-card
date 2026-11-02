#!/usr/bin/env node
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { textFailures } from "./legal_check.mjs";

const execFileAsync = promisify(execFile);
const EXPECTED_MEMBERS = new Set([
  "ha-dhe-connect-card.js",
  "ha-dhe-connect-card.js.map",
]);

function archiveMemberFailures(members) {
  const failures = [];
  const normalized = members.map((member) => member.replaceAll("\\", "/"));
  for (const member of normalized) {
    if (!member || member.startsWith("/") || member.split("/").includes("..")) {
      failures.push(`unsafe release archive member: ${member || "<empty>"}`);
    }
  }
  const files = normalized.filter((member) => !member.endsWith("/"));
  if (new Set(normalized).size !== normalized.length) {
    failures.push("duplicate release archive members");
  }
  const unexpected = files.filter((member) => !EXPECTED_MEMBERS.has(member));
  const missing = [...EXPECTED_MEMBERS].filter((member) => !files.includes(member));
  if (unexpected.length) {
    failures.push(`unexpected release archive members: ${unexpected.join(", ")}`);
  }
  if (missing.length) {
    failures.push(`missing release archive members: ${missing.join(", ")}`);
  }
  return failures;
}

async function releaseArchiveFailures(archivePath, buildDirectory = "dist") {
  const { stdout } = await execFileAsync("unzip", ["-Z1", archivePath], { encoding: "utf8" });
  const members = stdout.split(/\r?\n/).filter(Boolean);
  const failures = archiveMemberFailures(members);
  if (failures.length) {
    return failures;
  }
  for (const member of members) {
    if (!EXPECTED_MEMBERS.has(member)) {
      continue;
    }
    const { stdout: bytes } = await execFileAsync("unzip", ["-p", archivePath, member], {
      encoding: "buffer",
      maxBuffer: 8 * 1024 * 1024,
    });
    const content = bytes.toString("utf8");
    if (!content.trim()) {
      failures.push(`empty release archive member: ${member}`);
    }
    const built = await readFile(path.join(buildDirectory, member));
    if (!bytes.equals(built)) {
      failures.push(`release archive differs from build: ${member}`);
    }
    if (member.endsWith(".map")) {
      try {
        const map = JSON.parse(content);
        if (map?.version !== 3 || map.file !== "ha-dhe-connect-card.js" ||
            !Array.isArray(map.sources) || !map.sources.length ||
            !Array.isArray(map.sourcesContent) || map.sourcesContent.length !== map.sources.length ||
            !map.sources.every((source) => typeof source === "string") ||
            !map.sourcesContent.every((source) => typeof source === "string") ||
            typeof map.mappings !== "string" || !map.mappings) {
          failures.push(`invalid release source map: ${member}`);
        }
      } catch {
        failures.push(`invalid release source map: ${member}`);
      }
    } else if (!content.includes("sourceMappingURL=ha-dhe-connect-card.js.map")) {
      failures.push(`missing release source map reference: ${member}`);
    }
    failures.push(...textFailures(`release archive ${member}`, content));
  }
  return failures;
}

async function main() {
  const archivePath = process.argv[2] ?? path.join("release", "ha-dhe-connect-card.zip");
  try {
    const failures = await releaseArchiveFailures(archivePath);
    if (failures.length) {
      throw new Error(failures.join("\n"));
    }
    console.log(`PASS: release archive validated (${archivePath})`);
  } catch (error) {
    console.error(
      `FAIL: release archive validation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}

export { archiveMemberFailures, releaseArchiveFailures };
