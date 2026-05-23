#!/usr/bin/env node
import { readFile } from "node:fs/promises";

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function addDeprecatedEntry(entries, packagePath, pkg) {
  if (typeof pkg.deprecated !== "string" || pkg.deprecated.trim().length === 0) {
    return;
  }
  const name = pkg.name ?? packagePath.split("/").at(-1) ?? "unknown";
  const version = pkg.version ?? "unknown";
  entries.push(`${name}@${version}: ${pkg.deprecated.trim()}`);
}

function collectFromPackagesField(packages, entries) {
  for (const [packagePath, pkg] of Object.entries(packages)) {
    if (packagePath === "") {
      continue;
    }
    addDeprecatedEntry(entries, packagePath, pkg);
  }
}

function collectFromDependenciesField(deps, entries, seen = new Set()) {
  if (!deps || typeof deps !== "object") {
    return;
  }
  for (const [name, pkg] of Object.entries(deps)) {
    if (seen.has(`${name}@${pkg.version ?? ""}`)) {
      continue;
    }
    seen.add(`${name}@${pkg.version ?? ""}`);
    if (!pkg || typeof pkg !== "object") {
      continue;
    }
    addDeprecatedEntry(entries, name, pkg);
    collectFromDependenciesField(pkg.dependencies, entries, seen);
  }
}

async function main() {
  const lockfile = JSON.parse(await readFile("package-lock.json", "utf8"));
  const deprecated = [];

  if (lockfile.packages && typeof lockfile.packages === "object") {
    collectFromPackagesField(lockfile.packages, deprecated);
  }
  if (lockfile.dependencies && typeof lockfile.dependencies === "object") {
    collectFromDependenciesField(lockfile.dependencies, deprecated, new Set());
  }

  if (deprecated.length === 0) {
    pass("no deprecated packages listed in package-lock");
    return;
  }

  fail(`found ${deprecated.length} deprecated package entries in package-lock`);
  for (const entry of deprecated.sort()) {
    console.error(`  - ${entry}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("deprecated-dependency-check.mjs")) {
  main().catch((error) => {
    fail(error instanceof Error ? error.message : String(error));
  });
}
