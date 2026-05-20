#!/usr/bin/env node
import { execFile } from "node:child_process";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const HACS_FILE = "hacs.json";
const PACKAGE_FILE = "package.json";
const CI_WORKFLOW_FILE = ".github/workflows/ci.yml";
const RELEASE_WORKFLOW_FILE = ".github/workflows/release.yml";
const RELEASE_NOTES_DIR = "release-notes";
const DIST_DIR = "dist";
const EXPECTED_REPOSITORY = "ha-dhe-connect-card";
const EXPECTED_CARD_TYPE = "dhe-connect-card";
const EXPECTED_CUSTOM_ELEMENT = "dhe-connect-card";
const EXPECTED_EDITOR_ELEMENT = "dhe-connect-card-editor";
const execFileAsync = promisify(execFile);

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function checkHacs() {
  const hacs = await readJson(HACS_FILE);
  const filename = hacs.filename;
  if (typeof filename !== "string" || !filename.endsWith(".js")) {
    fail("hacs.json filename must be a JavaScript file name");
    return undefined;
  }
  if (filename.includes("/") || filename.includes("\\")) {
    fail("hacs.json filename must be a file name, not a path");
  } else {
    pass("hacs filename is path-free");
  }
  if (filename !== `${EXPECTED_REPOSITORY}.js`) {
    fail(`hacs filename should match repository asset ${EXPECTED_REPOSITORY}.js`);
  } else {
    pass("hacs filename matches repository asset name");
  }
  return filename;
}

async function checkPackage() {
  const pkg = await readJson(PACKAGE_FILE);
  if (pkg.name !== EXPECTED_REPOSITORY) {
    fail(`package name must be ${EXPECTED_REPOSITORY}`);
  } else {
    pass("package name matches repository");
  }
  if (pkg.type !== "module") {
    fail("package must be an ES module package");
  } else {
    pass("package is ESM");
  }
  return pkg;
}

async function checkBundle(filename) {
  if (!filename) {
    return;
  }
  const bundlePath = path.join(DIST_DIR, filename);
  const sourceMapPath = `${bundlePath}.map`;
  const bundle = await readFile(bundlePath, "utf8");
  const bundleStat = await stat(bundlePath);
  if (bundleStat.size <= 0) {
    fail("bundle is empty");
  } else {
    pass(`bundle exists (${Math.round(bundleStat.size / 1024)} KiB)`);
  }
  for (const expected of [
    EXPECTED_CUSTOM_ELEMENT,
    EXPECTED_EDITOR_ELEMENT,
    EXPECTED_CARD_TYPE,
    "window.customCards",
  ]) {
    if (!bundle.includes(expected)) {
      fail(`bundle does not contain ${expected}`);
    } else {
      pass(`bundle contains ${expected}`);
    }
  }
  if (!(await fileExists(sourceMapPath))) {
    fail("bundle sourcemap is missing");
  } else {
    pass("bundle sourcemap exists");
  }
}

async function checkCommittedBundleClean(filename) {
  if (!filename) {
    return;
  }
  const bundlePath = path.posix.join(DIST_DIR, filename);
  const sourceMapPath = `${bundlePath}.map`;
  const expectedPaths = [bundlePath, sourceMapPath];
  const trackedPaths = (
    await gitStdout(["ls-files", "--", ...expectedPaths])
  )
    .split(/\r?\n/)
    .filter(Boolean);
  const missingTracked = expectedPaths.filter((entry) => !trackedPaths.includes(entry));
  if (missingTracked.length > 0) {
    fail(`dist artifacts are not tracked: ${missingTracked.join(", ")}`);
  } else {
    pass("dist artifacts are tracked");
  }

  const statusEntries = gitPorcelainEntries(
    await gitStdout(["status", "--porcelain", "--", ...expectedPaths]),
  );
  if (statusEntries.length > 0) {
    fail(`dist artifacts are stale after build: ${statusEntries.join("; ")}`);
  } else {
    pass("committed dist matches current build");
  }
}

async function checkWorkflows() {
  const ci = await readFile(CI_WORKFLOW_FILE, "utf8");
  const release = await readFile(RELEASE_WORKFLOW_FILE, "utf8");
  const checks = [
    ["ci uses checkout v6", workflowUsesOnly(ci, "actions/checkout", "v6")],
    ["ci uses setup-node v6", workflowUsesOnly(ci, "actions/setup-node", "v6")],
    ["ci uses setup-chrome v2", workflowUsesOnly(ci, "browser-actions/setup-chrome", "v2")],
    ["ci pins Node 22", workflowPinsOnlyNodeVersion(ci, "22")],
    ["release uses checkout v6", workflowUsesOnly(release, "actions/checkout", "v6")],
    ["release uses setup-node v6", workflowUsesOnly(release, "actions/setup-node", "v6")],
    [
      "release uses setup-chrome v2",
      workflowUsesOnly(release, "browser-actions/setup-chrome", "v2"),
    ],
    ["release pins Node 22", workflowPinsOnlyNodeVersion(release, "22")],
    [
      "release runs HA storage smoke",
      workflowRunsCommand(release, "npm run ha:storage-smoke -- test/fixtures/ha-config"),
    ],
    ["release runs browser smoke", workflowRunsCommand(release, "npm run render-smoke")],
    [
      "release verifies matching release notes",
      workflowRunsCommand(release, 'test -s "release-notes/${GITHUB_REF_NAME}.md"'),
    ],
    [
      "release publishes matching release notes",
      workflowUsesReleaseNotes(release),
    ],
  ];
  for (const [message, ok] of checks) {
    if (ok) {
      pass(message);
    } else {
      fail(message);
    }
  }
}

async function checkReleaseNotes(pkg) {
  const version = typeof pkg.version === "string" ? pkg.version : undefined;
  if (!version) {
    fail("package version must be set before release");
    return;
  }
  const tag = `v${version}`;
  const notesPath = path.join(RELEASE_NOTES_DIR, `${tag}.md`);
  if (!(await fileExists(notesPath))) {
    fail(`release notes are missing for ${tag}`);
    return;
  }
  const notes = await readFile(notesPath, "utf8");
  if (!notes.trim()) {
    fail(`release notes are empty for ${tag}`);
    return;
  }
  if (!notes.includes(`DHE Connect Card ${tag}`)) {
    fail(`release notes should identify ${tag}`);
  } else {
    pass(`release notes exist for ${tag}`);
  }
}

function workflowUsesReleaseNotes(content) {
  return workflowDataText(content).includes("body_path: release-notes/${{ github.ref_name }}.md");
}

function workflowUsesOnly(content, action, expectedVersion) {
  const escapedAction = action.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const workflow = workflowDataText(content);
  const matches = [...workflow.matchAll(new RegExp(`uses:\\s+${escapedAction}@([^\\s]+)`, "g"))];
  return matches.length > 0 && matches.every((match) => match[1] === expectedVersion);
}

function workflowPinsOnlyNodeVersion(content, expectedVersion) {
  const versions = workflowSetupNodeVersions(content);
  return versions.length > 0 && versions.every((version) => version === expectedVersion);
}

function workflowRunsCommand(content, command) {
  return workflowRunCommands(content).includes(command);
}

function workflowRunCommands(content) {
  const lines = workflowDataLines(content);
  const commands = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)run:\s*(.*)$/);
    if (!match) {
      continue;
    }
    const indent = match[1].length;
    const value = match[2].trim();
    if (/^[|>][+-]?$/.test(value)) {
      index += 1;
      for (; index < lines.length; index += 1) {
        const line = lines[index];
        if (line.trim() && leadingSpaces(line) <= indent) {
          index -= 1;
          break;
        }
        const parsedCommand = line.trim();
        if (parsedCommand && !parsedCommand.startsWith("#")) {
          commands.push(parsedCommand);
        }
      }
    } else if (value && !value.startsWith("#")) {
      commands.push(value);
    }
  }
  return commands;
}

function workflowSetupNodeVersions(content) {
  const lines = workflowDataLines(content);
  const versions = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!/^\s*(?:-\s+)?uses:\s+actions\/setup-node@/.test(lines[index])) {
      continue;
    }
    const indent = leadingSpaces(lines[index]);
    let version;
    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
      const line = lines[nextIndex];
      if (
        line.trim() &&
        (leadingSpaces(line) < indent || isStepBoundary(line, indent))
      ) {
        break;
      }
      const match = line.match(/^\s*node-version:\s*"?([^"\s#]+)"?/);
      if (match) {
        version = match[1];
      }
    }
    versions.push(version);
  }
  return versions;
}

function isStepBoundary(line, stepIndent) {
  return leadingSpaces(line) === stepIndent && line.trimStart().startsWith("- ");
}

function workflowDataText(content) {
  return workflowDataLines(content).join("\n");
}

function workflowDataLines(content) {
  return content.split(/\r?\n/).filter((line) => !line.trimStart().startsWith("#"));
}

function leadingSpaces(line) {
  return line.length - line.trimStart().length;
}

async function main() {
  const filename = await checkHacs();
  const pkg = await checkPackage();
  await checkBundle(filename);
  await checkCommittedBundleClean(filename);
  await checkWorkflows();
  await checkReleaseNotes(pkg);
}

async function gitStdout(args) {
  const { stdout } = await execFileAsync("git", args, { encoding: "utf8" });
  return stdout;
}

function gitPorcelainEntries(output) {
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}

export {
  gitPorcelainEntries,
  workflowPinsOnlyNodeVersion,
  workflowRunCommands,
  workflowRunsCommand,
  workflowSetupNodeVersions,
  workflowUsesOnly,
  workflowUsesReleaseNotes,
};
