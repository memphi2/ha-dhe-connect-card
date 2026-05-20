import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DEFAULT_SECTIONS, ENTITY_DEFINITIONS } from "../src/catalog";
import { CONFIG_OPTION_KEYS } from "../src/config";
import { OVERVIEW_KEYS } from "../src/entity-groups";
import { ENTITY_LABELS_DE, UI_TRANSLATIONS } from "../src/i18n";
import { WEATHER_FORM_FIELDS, WEATHER_SERVICE_OPTIONS } from "../src/weather-services";

const configurationDocs = readFileSync("docs/configuration.md", "utf8");

describe("documentation, catalog and i18n consistency", () => {
  it("keeps German and English UI translation keys in sync", () => {
    expect(Object.keys(UI_TRANSLATIONS.de).sort()).toEqual(
      Object.keys(UI_TRANSLATIONS.en).sort(),
    );
  });

  it("keeps translation placeholders consistent across languages", () => {
    const mismatches = Object.keys(UI_TRANSLATIONS.en).filter((key) => {
      const enPlaceholders = placeholders(UI_TRANSLATIONS.en[key]);
      const dePlaceholders = placeholders(UI_TRANSLATIONS.de[key]);
      return enPlaceholders.join(",") !== dePlaceholders.join(",");
    });

    expect(mismatches).toEqual([]);
  });

  it("translates every section and generated weather-service label", () => {
    const requiredKeys = [
      ...DEFAULT_SECTIONS.map((section) => `section.${section}`),
      ...WEATHER_SERVICE_OPTIONS.map((service) => `service.${service}`),
      ...WEATHER_FORM_FIELDS.map((field) => field.labelKey),
    ];

    for (const language of ["de", "en"] as const) {
      const missing = requiredKeys.filter((key) => !UI_TRANSLATIONS[language][key]);
      expect(missing).toEqual([]);
    }
  });

  it("has German labels for every non-generated catalog entity", () => {
    const missing = ENTITY_DEFINITIONS.filter(
      (definition) => !isGeneratedMemoryKey(definition.key),
    )
      .map((definition) => definition.key)
      .filter((key) => !(key in ENTITY_LABELS_DE));

    expect(missing).toEqual([]);
  });

  it("documents every card config option in the configuration guide", () => {
    const missing = CONFIG_OPTION_KEYS.filter(
      (option) => !configurationDocs.includes(`| \`${option}\` |`),
    );

    expect(missing).toEqual([]);
  });

  it("documents every concrete catalog entity key and domain", () => {
    const missing = ENTITY_DEFINITIONS.filter(
      (definition) => !isGeneratedMemoryKey(definition.key),
    )
      .map((definition) => `| \`${definition.key}\` | ${definition.domain} |`)
      .filter((rowPrefix) => !configurationDocs.includes(rowPrefix));

    expect(missing).toEqual([]);
  });

  it("documents generated memory entity key patterns", () => {
    expect(configurationDocs).toContain("| `temperature_memory_<slot>_name` | text |");
    expect(configurationDocs).toContain("| `temperature_memory_<slot>_temperature` | number |");
    expect(configurationDocs).toContain("| `temperature_memory_<slot>` | button |");
    expect(configurationDocs).toContain("| `delete_temperature_memory_<slot>` | button |");
  });

  it("keeps default overview keys backed by catalog entries", () => {
    const catalogKeys = new Set(ENTITY_DEFINITIONS.map((definition) => definition.key));
    const missing = OVERVIEW_KEYS.filter((key) => !catalogKeys.has(key));

    expect(missing).toEqual([]);
  });
});

function placeholders(value: string | undefined): string[] {
  return [...(value ?? "").matchAll(/\{([a-z_]+)\}/g)]
    .map((match) => match[1] ?? "")
    .filter(Boolean)
    .sort();
}

function isGeneratedMemoryKey(key: string): boolean {
  return /^temperature_memory_\d+(_name|_temperature)?$/.test(key)
    || /^delete_temperature_memory_\d+$/.test(key);
}
