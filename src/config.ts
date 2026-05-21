import { DEFAULT_SECTIONS, ENTITY_DEFINITION_BY_KEY } from "./catalog";
import { DEFAULT_TAP_ACTION, normalizeActionConfig } from "./card-actions";
import { OVERVIEW_KEYS } from "./entity-groups";
import { ICON_THEMES, normalizeIconColors } from "./icon-theme";
import type {
  DheConnectCardConfig,
  EntityDomain,
  EntityKey,
  IconTheme,
  LayoutMode,
  NormalizedDheConnectCardConfig,
  SectionId,
  TileSize,
} from "./types";

const SECTION_SET = new Set<string>(DEFAULT_SECTIONS);
const ENTITY_KEY_SET = new Set<string>(Object.keys(ENTITY_DEFINITION_BY_KEY));
const ENTITY_DOMAIN_SET = new Set<string>([
  "binary_sensor",
  "button",
  "climate",
  "media_player",
  "number",
  "select",
  "sensor",
  "switch",
  "text",
  "weather",
]);
const ICON_THEME_SET = new Set<IconTheme>(ICON_THEMES);
export const LAYOUT_MODES: readonly LayoutMode[] = ["auto", "mini", "tablet", "panel", "kiosk"];
export const TILE_SIZES: readonly TileSize[] = ["auto", "compact", "normal", "large"];
const LAYOUT_MODE_SET = new Set<LayoutMode>(LAYOUT_MODES);
const TILE_SIZE_SET = new Set<TileSize>(TILE_SIZES);

export const CONFIG_OPTION_KEYS = [
  "type",
  "device_id",
  "name",
  "show_unavailable",
  "show_optional",
  "show_diagnostics",
  "show_dangerous_actions",
  "show_weather_services",
  "show_icon_animations",
  "show_display_buttons",
  "show_support_mode",
  "icon_theme",
  "icon_colors",
  "layout_mode",
  "tile_size",
  "overview_columns",
  "overview_entities",
  "sections",
  "hide_entities",
  "entities",
  "tap_action",
  "hold_action",
  "double_tap_action",
] as const satisfies readonly (keyof DheConnectCardConfig)[];

export function normalizeConfig(
  config: DheConnectCardConfig | unknown,
): NormalizedDheConnectCardConfig {
  const source = isRecord(config) ? config : {};
  return {
    type: "custom:dhe-connect-card",
    device_id: stringValue(source.device_id),
    name: source.name,
    tap_action: normalizeActionConfig(source.tap_action) ?? { ...DEFAULT_TAP_ACTION },
    hold_action: normalizeActionConfig(source.hold_action),
    double_tap_action: normalizeActionConfig(source.double_tap_action),
    show_unavailable: booleanValue(source.show_unavailable, false),
    show_optional: booleanValue(source.show_optional, false),
    show_diagnostics: booleanValue(source.show_diagnostics, true),
    show_dangerous_actions: booleanValue(source.show_dangerous_actions, false),
    show_weather_services: booleanValue(source.show_weather_services, false),
    show_icon_animations: booleanValue(source.show_icon_animations, true),
    show_display_buttons: booleanValue(source.show_display_buttons, false),
    show_support_mode: booleanValue(source.show_support_mode, false),
    icon_theme: enumValue(source.icon_theme, ICON_THEME_SET, "state"),
    icon_colors: normalizeIconColors(source.icon_colors),
    layout_mode: enumValue(source.layout_mode, LAYOUT_MODE_SET, "auto"),
    tile_size: normalizeTileSize(source.tile_size, source.compact),
    overview_columns: boundedInteger(source.overview_columns, 3, 1, 6),
    sections: normalizeSections(source.sections),
    overview_entities: normalizeOverviewEntities(source.overview_entities),
    hide_entities: normalizeEntityKeys(source.hide_entities),
    entities: normalizeEntityOverrides(source.entities),
  };
}

function normalizeSections(sections: unknown): SectionId[] {
  if (!Array.isArray(sections) || !sections.length) {
    return [...DEFAULT_SECTIONS];
  }
  const normalized = [
    ...new Set(sections.filter((section): section is SectionId => SECTION_SET.has(section))),
  ];
  return normalized.length ? normalized : [...DEFAULT_SECTIONS];
}

function normalizeOverviewEntities(keys: unknown): EntityKey[] {
  if (!Array.isArray(keys)) {
    return [...OVERVIEW_KEYS];
  }
  return [...new Set(keys.filter((key) => ENTITY_KEY_SET.has(key)))];
}

function boundedInteger(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, value));
}

function normalizeEntityKeys(value: unknown): EntityKey[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return [...new Set(value.filter((entry): entry is EntityKey => isEntityKey(entry)))];
}

function normalizeEntityOverrides(
  value: unknown,
): NormalizedDheConnectCardConfig["entities"] {
  if (!isRecord(value)) {
    return {};
  }
  const normalized: NormalizedDheConnectCardConfig["entities"] = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string" && entry.trim() && isEntityKey(key)) {
      normalized[key] = entry.trim();
      continue;
    }
    if (!isRecord(entry) || !isEntityDomain(key)) {
      continue;
    }
    const nested: Record<string, string> = {};
    for (const [nestedKey, nestedValue] of Object.entries(entry)) {
      if (typeof nestedValue === "string" && nestedValue.trim() && isEntityKey(nestedKey)) {
        nested[nestedKey] = nestedValue.trim();
      }
    }
    if (Object.keys(nested).length) {
      normalized[key] = nested;
    }
  }
  return normalized;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isEntityKey(value: unknown): value is EntityKey {
  return typeof value === "string" && ENTITY_KEY_SET.has(value);
}

function isEntityDomain(value: unknown): value is EntityDomain {
  return typeof value === "string" && ENTITY_DOMAIN_SET.has(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function booleanValue(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function enumValue<T extends string>(value: unknown, allowed: Set<T>, fallback: T): T {
  return typeof value === "string" && allowed.has(value as T) ? (value as T) : fallback;
}

function normalizeTileSize(value: unknown, legacyCompact: unknown): TileSize {
  if (typeof value === "string" && TILE_SIZE_SET.has(value as TileSize)) {
    return value as TileSize;
  }
  if (legacyCompact === false) {
    return "large";
  }
  if (legacyCompact === true) {
    return "compact";
  }
  return "auto";
}
