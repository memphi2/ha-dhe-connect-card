#!/usr/bin/env node
import { execFile } from "node:child_process";
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

async function releaseArchiveFailures(archivePath) {
  const { stdout } = await execFileAsync("unzip", ["-Z1", archivePath], { encoding: "utf8" });
  const members = stdout.split(/\r?\n/).filter(Boolean);
  const failures = archiveMemberFailures(members);
  for (const member of members) {
    if (!EXPECTED_MEMBERS.has(member)) {
      continue;
    }
    const { stdout: content } = await execFileAsync("unzip", ["-p", archivePath, member], {
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024,
    });
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
