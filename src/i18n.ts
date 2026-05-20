import builtinDe from "../translations/de.json";
import builtinEn from "../translations/en.json";
import type { EntityDefinition, HomeAssistant, SectionId } from "./types";

export const TRANSLATIONS_CHANGED_EVENT = "dhe-connect-card-translations-changed";

type Language = string;
interface TranslationTree {
  [key: string]: string | TranslationTree;
}

interface TranslationFile {
  ui?: TranslationTree;
  entity_labels?: Record<string, string>;
}

interface NormalizedTranslations {
  ui: Record<string, string>;
  entityLabels: Record<string, string>;
}

const BUILTIN_TRANSLATIONS = {
  de: normalizeTranslations(builtinDe),
  en: normalizeTranslations(builtinEn),
} as const;
const RUNTIME_TRANSLATIONS: Record<string, NormalizedTranslations> = {};

export const UI_TRANSLATIONS = {
  de: BUILTIN_TRANSLATIONS.de.ui,
  en: BUILTIN_TRANSLATIONS.en.ui,
} as const;

export const ENTITY_LABELS = {
  de: BUILTIN_TRANSLATIONS.de.entityLabels,
  en: BUILTIN_TRANSLATIONS.en.entityLabels,
} as const;

export const ENTITY_LABELS_DE = ENTITY_LABELS.de;

const MEMORY_PATTERNS = [
  [/^temperature_memory_(\d+)$/, "entity.memory"],
  [/^temperature_memory_(\d+)_name$/, "entity.memory_name"],
  [/^temperature_memory_(\d+)_temperature$/, "entity.memory_temperature"],
  [/^delete_temperature_memory_(\d+)$/, "entity.memory_delete"],
] as const;

export function registerDheConnectTranslation(
  language: string,
  translation: unknown,
): void {
  const normalizedLanguage = normalizeLanguageId(language);
  if (!normalizedLanguage) {
    return;
  }
  RUNTIME_TRANSLATIONS[normalizedLanguage] = normalizeTranslations(translation);
  dispatchTranslationsChanged(normalizedLanguage);
}

export function registerDheConnectTranslations(
  translations: Record<string, unknown>,
): void {
  for (const [language, translation] of Object.entries(translations)) {
    registerDheConnectTranslation(language, translation);
  }
}

export function languageCode(hass?: HomeAssistant): Language {
  return localeCode(hass).split("-", 1)[0] || "en";
}

function localeCode(hass?: HomeAssistant): Language {
  const language =
    hass?.locale?.language ??
    (typeof navigator !== "undefined" ? navigator.language : "") ??
    "";
  return normalizeLanguageId(language) || "en";
}

export function localize(
  hass: HomeAssistant | undefined,
  key: string,
  replacements: Record<string, string | number> = {},
): string {
  return interpolate(
    lookupUiTranslation(localeCode(hass), key) ?? key,
    replacements,
  );
}

export function sectionLabel(section: SectionId, hass?: HomeAssistant): string {
  return localize(hass, `section.${section}`);
}

export function entityLabel(definition: EntityDefinition, hass?: HomeAssistant): string {
  for (const [pattern, key] of MEMORY_PATTERNS) {
    const match = definition.key.match(pattern);
    if (match?.[1]) {
      return localize(hass, key, { slot: match[1] });
    }
  }
  return (
    lookupEntityLabel(localeCode(hass), definition.key) ??
    definition.label
  );
}

export function overviewShortLabel(
  definition: EntityDefinition,
  hass: HomeAssistant | undefined,
  fallback: string,
): string {
  const key = `overview_short.${definition.key}`;
  const translated = localize(hass, key);
  return translated === key ? fallback : translated;
}

function lookupUiTranslation(language: string, key: string): string | undefined {
  for (const translations of translationsForLanguage(language)) {
    const value = translations.ui[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function lookupEntityLabel(language: string, key: string): string | undefined {
  for (const translations of translationsForLanguage(language)) {
    const value = translations.entityLabels[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function translationsForLanguage(language: string): NormalizedTranslations[] {
  const translations: NormalizedTranslations[] = [];
  for (const candidate of languageCandidates(language)) {
    const runtime = RUNTIME_TRANSLATIONS[candidate];
    if (runtime) {
      translations.push(runtime);
    }
    const builtin = BUILTIN_TRANSLATIONS[candidate as keyof typeof BUILTIN_TRANSLATIONS];
    if (builtin && !translations.includes(builtin)) {
      translations.push(builtin);
    }
  }
  if (!translations.includes(BUILTIN_TRANSLATIONS.en)) {
    translations.push(BUILTIN_TRANSLATIONS.en);
  }
  return translations;
}

function languageCandidates(language: string): string[] {
  const normalized = normalizeLanguageId(language);
  const base = normalized.split("-", 1)[0] ?? "";
  return [...new Set([normalized, base, "en"].filter(Boolean))];
}

function normalizeLanguageId(language: string): string {
  return language.trim().toLowerCase().replace(/_/g, "-");
}

function normalizeTranslations(value: unknown): NormalizedTranslations {
  const file = isRecord(value) ? (value as TranslationFile) : {};
  return {
    ui: flattenTranslations(isRecord(file.ui) ? file.ui : {}),
    entityLabels: stringRecord(file.entity_labels),
  };
}

function flattenTranslations(
  value: TranslationTree,
  prefix = "",
): Record<string, string> {
  const flattened: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    const nextKey = key === "_" ? prefix : prefix ? `${prefix}.${key}` : key;
    if (typeof entry === "string") {
      if (nextKey) {
        flattened[nextKey] = entry;
      }
      continue;
    }
    if (isRecord(entry)) {
      Object.assign(flattened, flattenTranslations(entry, nextKey));
    }
  }
  return flattened;
}

function stringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) {
    return {};
  }
  const normalized: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string") {
      normalized[key] = entry;
    }
  }
  return normalized;
}

function dispatchTranslationsChanged(language: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent(TRANSLATIONS_CHANGED_EVENT, {
      detail: { language },
    }),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function interpolate(template: string, replacements: Record<string, string | number>): string {
  return template.replace(/\{([a-z_]+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(replacements, key)
      ? String(replacements[key])
      : match,
  );
}
