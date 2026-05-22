#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const depPattern = /npm\s+WARN\s+deprecated|deprecated package/i;
const args = ["ci", "--no-audit"];

const result = spawnSync("npm", args, {
  stdio: ["ignore", "pipe", "pipe"],
  encoding: "utf8",
});

const stdout = result.stdout ?? "";
const stderr = result.stderr ?? "";
const combined = `${stdout}\n${stderr}`;

process.stdout.write(stdout);
process.stderr.write(stderr);

if (depPattern.test(combined)) {
  console.error("FAIL: npm ci emitted deprecation messages");
  process.exitCode = 1;
}

if (result.status !== 0) {
  console.error(`FAIL: npm ci exited with code ${result.status}`);
  process.exitCode = result.status ?? 1;
}
