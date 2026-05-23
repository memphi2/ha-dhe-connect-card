#!/usr/bin/env node
import { spawn } from "node:child_process";

const depPattern = /npm\s+WARN\s+deprecated|deprecated package/i;
const args = ["ci", "--no-audit"];

let sawDeprecation = false;

function updateTail(currentTail, chunkText) {
  const merged = `${currentTail}${chunkText}`;
  return merged.length > 256 ? merged.slice(-256) : merged;
}

function createStreamHandler(outputStream) {
  let tail = "";
  return (chunk) => {
    const text = chunk.toString("utf8");
    outputStream.write(chunk);
    if (depPattern.test(`${tail}${text}`)) {
      sawDeprecation = true;
    }
    tail = updateTail(tail, text);
  };
}

const child = spawn("npm", args, {
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", createStreamHandler(process.stdout));

child.stderr.on("data", createStreamHandler(process.stderr));

const exitCode = await new Promise((resolve, reject) => {
  child.once("error", (error) => reject(error));
  child.once("close", (code) => resolve(code ?? 1));
});

if (sawDeprecation) {
  console.error("FAIL: npm ci emitted deprecation messages");
  process.exitCode = 1;
}

if (exitCode !== 0) {
  console.error(`FAIL: npm ci exited with code ${exitCode}`);
  process.exitCode = exitCode;
}
