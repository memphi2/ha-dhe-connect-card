#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const args = new Set(process.argv.slice(2));
const writeMode = args.has("--write");
const checkMode = args.has("--check") || !writeMode;
const TRANSLATIONS_DIR = "translations";
const SOURCE_LANGUAGE = "en";
const SRC_DIR = "src";

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

async function main() {
  const files = await translationFiles();
  const translations = Object.fromEntries(
    await Promise.all(files.map(async (file) => [languageFromFile(file), await readJson(file)])),
  );
  const source = translations[SOURCE_LANGUAGE];
  if (!source) {
    throw new Error(`missing ${TRANSLATIONS_DIR}/${SOURCE_LANGUAGE}.json`);
  }

  const extractedSourceLabels = extractCatalogEntityLabels();
  if (writeMode) {
    source.entity_labels = extractedSourceLabels;
  } else {
    validateSourceEntityLabels(source.entity_labels, extractedSourceLabels);
  }

  validateLanguages(translations);
  validateSourceUsage(flattenTree(source.ui ?? {}));

  if (writeMode) {
    for (const file of files) {
      const language = languageFromFile(file);
      await writeJson(file, normalizeForWrite(translations[language]));
    }
    pass(`wrote ${files.length} structured translation files`);
  } else if (checkMode) {
    await validateFormatted(files, translations);
    pass(`validated ${files.length} structured translation files`);
  }
}

async function translationFiles() {
  const entries = await readdir(TRANSLATIONS_DIR);
  return entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => path.join(TRANSLATIONS_DIR, entry))
    .sort();
}

function languageFromFile(file) {
  return path.basename(file, ".json").toLowerCase();
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeJson(file, value) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function validateLanguages(translations) {
  const source = translations[SOURCE_LANGUAGE];
  const sourceUi = flattenTree(source.ui ?? {});
  const sourceLabels = source.entity_labels ?? {};
  for (const [language, translation] of Object.entries(translations)) {
    validateTranslationFile(language, translation, sourceUi, sourceLabels);
  }
  pass(
    `translation parity ui=${Object.keys(sourceUi).length} entity_labels=${Object.keys(sourceLabels).length}`,
  );
}

function validateTranslationFile(language, translation, sourceUi, sourceLabels) {
  assertRecord(translation, `${language} root`);
  assertRecord(translation.ui, `${language}.ui`);
  assertRecord(translation.entity_labels, `${language}.entity_labels`);
  const ui = flattenTree(translation.ui);
  const labels = translation.entity_labels;
  assertSameKeys(language, "ui", Object.keys(sourceUi), Object.keys(ui));
  assertSameKeys(
    language,
    "entity_labels",
    Object.keys(sourceLabels),
    Object.keys(labels),
  );
  for (const [key, value] of Object.entries(ui)) {
    if (!value.trim()) {
      throw new Error(`${language}.ui.${key} must not be empty`);
    }
    assertSamePlaceholders(
      `${language}.ui.${key}`,
      placeholders(sourceUi[key]),
      placeholders(value),
    );
  }
  for (const [key, value] of Object.entries(labels)) {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`${language}.entity_labels.${key} must be a non-empty string`);
    }
  }
}

function validateSourceUsage(sourceUi) {
  const usedKeys = extractLocalizeKeys();
  const missing = usedKeys.filter((key) => !(key in sourceUi));
  if (missing.length) {
    throw new Error(`source uses missing translation keys: ${missing.join(", ")}`);
  }
  pass(`extracted ${usedKeys.length} literal localize keys from source`);
}

function validateSourceEntityLabels(sourceLabels, extractedLabels) {
  assertRecord(sourceLabels, `${SOURCE_LANGUAGE}.entity_labels`);
  assertSameKeys(
    SOURCE_LANGUAGE,
    "entity_labels",
    Object.keys(extractedLabels),
    Object.keys(sourceLabels),
  );
  const changed = Object.entries(extractedLabels)
    .filter(([key, value]) => sourceLabels[key] !== value)
    .map(([key]) => key);
  if (changed.length) {
    throw new Error(
      `${SOURCE_LANGUAGE}.entity_labels stale for [${changed.join(", ")}]; run npm run i18n:extract`,
    );
  }
  pass("source entity labels match catalog");
}

async function validateFormatted(files, translations) {
  const changed = [];
  for (const file of files) {
    const language = languageFromFile(file);
    const expected = `${JSON.stringify(normalizeForWrite(translations[language]), null, 2)}\n`;
    const actual = await readFile(file, "utf8");
    if (actual !== expected) {
      changed.push(file);
    }
  }
  if (changed.length) {
    throw new Error(
      `translation files need extraction/formatting: ${changed.join(", ")}; run npm run i18n:extract`,
    );
  }
}

function normalizeForWrite(translation) {
  return {
    ui: sortTree(translation.ui ?? {}),
    entity_labels: sortRecord(translation.entity_labels ?? {}),
  };
}

function flattenTree(value, prefix = "") {
  assertRecord(value, prefix || "translation tree");
  const flattened = {};
  for (const [key, entry] of Object.entries(value)) {
    const nextKey = key === "_" ? prefix : prefix ? `${prefix}.${key}` : key;
    if (typeof entry === "string") {
      if (nextKey) {
        flattened[nextKey] = entry;
      }
      continue;
    }
    if (!isRecord(entry)) {
      throw new Error(`${nextKey} must be a string or nested object`);
    }
    Object.assign(flattened, flattenTree(entry, nextKey));
  }
  return flattened;
}

function sortTree(value) {
  assertRecord(value, "translation tree");
  const sorted = {};
  for (const [key, entry] of Object.entries(value).sort(compareEntries)) {
    sorted[key] = isRecord(entry) ? sortTree(entry) : entry;
  }
  return sorted;
}

function sortRecord(value) {
  assertRecord(value, "translation record");
  return Object.fromEntries(Object.entries(value).sort(compareEntries));
}

function assertSameKeys(language, section, expectedKeys, actualKeys) {
  const expected = new Set(expectedKeys);
  const actual = new Set(actualKeys);
  const missing = [...expected].filter((key) => !actual.has(key));
  const extra = [...actual].filter((key) => !expected.has(key));
  if (missing.length || extra.length) {
    throw new Error(
      `${language}.${section} key mismatch missing=[${missing.join(", ")}] extra=[${extra.join(", ")}]`,
    );
  }
}

function assertSamePlaceholders(label, expected, actual) {
  if (expected.join(",") !== actual.join(",")) {
    throw new Error(
      `${label} placeholder mismatch expected=[${expected.join(", ")}] actual=[${actual.join(", ")}]`,
    );
  }
}

function placeholders(value) {
  return [...String(value ?? "").matchAll(/\{([a-z_]+)\}/g)]
    .map((match) => match[1] ?? "")
    .filter(Boolean)
    .sort();
}

function extractLocalizeKeys() {
  const keys = new Set();
  for (const file of sourceFiles(SRC_DIR)) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    visit(source, source);
  }
  return [...keys].sort();

  function visit(node, source) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "localize"
    ) {
      const keyArg = node.arguments[1];
      if (keyArg && ts.isStringLiteral(keyArg)) {
        keys.add(keyArg.text);
      }
    }
    ts.forEachChild(node, (child) => visit(child, source));
  }
}

function extractCatalogEntityLabels() {
  const file = path.join(SRC_DIR, "catalog.ts");
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const labels = {};
  visit(source);
  return sortRecord(labels);

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      ["sensor", "number", "sw", "button"].includes(node.expression.text)
    ) {
      const keyArg = node.arguments[0];
      const labelArg = node.arguments[2];
      if (keyArg && labelArg && ts.isStringLiteral(keyArg) && ts.isStringLiteral(labelArg)) {
        labels[keyArg.text] = labelArg.text;
      }
    }
    if (ts.isObjectLiteralExpression(node)) {
      const key = objectPropertyString(node, "key", source);
      const label = objectPropertyString(node, "label", source);
      if (key && label) {
        labels[key] = label;
      }
    }
    ts.forEachChild(node, visit);
  }
}

function objectPropertyString(node, propertyName, source) {
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }
    const name = property.name.getText(source).replace(/^['"]|['"]$/g, "");
    const value = property.initializer;
    if (name === propertyName && ts.isStringLiteral(value)) {
      return value.text;
    }
  }
  return undefined;
}

function sourceFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...sourceFiles(fullPath));
    } else if (stat.isFile() && fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function compareEntries([left], [right]) {
  return left.localeCompare(right);
}

function assertRecord(value, label) {
  if (!isRecord(value)) {
    throw new Error(`${label} must be an object`);
  }
}

function isRecord(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

try {
  await main();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
