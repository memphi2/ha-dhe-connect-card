#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const screenshots = [
  {
    path: "assets/screenshot-card.png",
    preset: "compact",
    width: 420,
    height: 400,
  },
  {
    path: "assets/screenshot2-card.png",
    preset: "wide",
    width: 860,
    height: 445,
  },
  {
    path: "assets/screenshot3-card.png",
    preset: "media",
    width: 420,
    height: 560,
  },
  {
    path: "assets/screenshot4-card.png",
    preset: "display",
    width: 420,
    height: 780,
  },
];

run("npm", ["run", "build"]);

for (const screenshot of screenshots) {
  run("node", [
    "scripts/render_smoke.mjs",
    "--screenshot",
    screenshot.path,
    "--screenshot-width",
    String(screenshot.width),
    "--screenshot-height",
    String(screenshot.height),
    "--screenshot-preset",
    screenshot.preset,
  ]);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
