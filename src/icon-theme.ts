import type { IconColorOverrides, IconTheme, IconTone } from "./types";

export const ICON_THEMES = [
  "state",
  "ha",
  "muted",
  "vivid",
  "custom",
] as const satisfies readonly IconTheme[];

export const ICON_TONES = [
  "water",
  "hot",
  "energy",
  "eco",
  "wellness",
  "timer",
  "weather",
  "radio",
  "safety",
  "status",
  "ok",
  "alert",
  "memory",
  "action",
] as const satisfies readonly IconTone[];

const ICON_TONE_SET = new Set<IconTone>(ICON_TONES);
const HEX_COLOR = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const FUNCTION_COLOR = /^(?:rgb|rgba|hsl|hsla)\([-+0-9.%\s,/]+\)$/i;
const CSS_VAR_COLOR = /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/;
const NAMED_COLOR = /^[a-zA-Z]+$/;

export function normalizeIconColors(value: unknown): IconColorOverrides {
  if (!isRecord(value)) {
    return {};
  }
  const normalized: IconColorOverrides = {};
  for (const [tone, color] of Object.entries(value)) {
    if (!isIconTone(tone)) {
      continue;
    }
    const safeColor = sanitizeIconColor(color);
    if (safeColor) {
      normalized[tone] = safeColor;
    }
  }
  return normalized;
}

export function iconColorStyle(colors: IconColorOverrides): string {
  return ICON_TONES.flatMap((tone) => {
    const color = colors[tone];
    return color ? [`--dhe-user-icon-${tone}-color: ${color};`] : [];
  }).join(" ");
}

function sanitizeIconColor(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const color = value.trim();
  if (!color || color.includes(";") || color.includes("{") || color.includes("}")) {
    return undefined;
  }
  if (
    HEX_COLOR.test(color) ||
    FUNCTION_COLOR.test(color) ||
    CSS_VAR_COLOR.test(color) ||
    NAMED_COLOR.test(color)
  ) {
    return color;
  }
  return undefined;
}

function isIconTone(value: string): value is IconTone {
  return ICON_TONE_SET.has(value as IconTone);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
