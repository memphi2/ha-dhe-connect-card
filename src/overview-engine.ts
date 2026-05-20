import { displayState, friendlyName, numericState } from "./format";
import { localize, overviewShortLabel } from "./i18n";
import type { SectionRenderContext } from "./render-sections";
import type {
  DiscoveredEntities,
  EntityDefinition,
  HassEntity,
  HomeAssistant,
} from "./types";

export type OverviewGroup =
  | "bath"
  | "control"
  | "energy"
  | "saving"
  | "status"
  | "temperature"
  | "timer"
  | "water";
export type OverviewCondition = "active" | "alert" | "idle" | "neutral" | "ok" | "warning";
export type OverviewTrendDirection = "down" | "flat" | "up";

export interface OverviewSparkline {
  points: string;
  values: number[];
}

export interface OverviewTrend {
  direction: OverviewTrendDirection;
  label: string;
  icon: string;
}

export interface OverviewTile {
  key: string;
  definition: EntityDefinition;
  entityId?: string;
  state?: HassEntity;
  label: string;
  shortLabel: string;
  value: string;
  group: OverviewGroup;
  condition: OverviewCondition;
  iconClass: string;
  trend?: OverviewTrend;
  delta?: string;
  sparkline?: OverviewSparkline;
}

const OK_STATE_TOKENS = new Set([
  "0",
  "available",
  "bereit",
  "connected",
  "fehlerfrei",
  "idle",
  "kein fehler",
  "keine stoerung",
  "keine störung",
  "none",
  "no error",
  "no fault",
  "normal",
  "ok",
  "online",
  "ready",
  "verbunden",
]);
const ALERT_STATE_PARTS = [
  "alarm",
  "alert",
  "disconnected",
  "error",
  "failed",
  "fault",
  "fehler",
  "getrennt",
  "nicht verbunden",
  "offline",
  "problem",
  "stoerung",
  "störung",
  "target below inlet",
];
const DEGRADED_STATE_TOKENS = new Set(["unavailable", "unknown", "unbekannt"]);
const DELTA_ATTRIBUTE_KEYS = [
  "delta",
  "change",
  "change_since_last",
  "difference",
  "last_delta",
];
const DELTA_PERCENT_ATTRIBUTE_KEYS = ["change_percent", "delta_percent", "percentage_delta"];
const SPARKLINE_ATTRIBUTE_KEYS = [
  "sparkline",
  "history",
  "samples",
  "trend_values",
  "values",
];

export function buildOverviewTiles(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): OverviewTile[] {
  return context.config.overview_entities
    .map((key) => context.entity(discovered, key))
    .filter(({ definition, state }) => context.canRender(definition, state))
    .map(({ definition, entityId, state }) =>
      overviewTile(context, definition, entityId, state),
    );
}

export function overviewTile(
  context: SectionRenderContext,
  definition: EntityDefinition,
  entityId: string | undefined,
  state: HassEntity | undefined,
): OverviewTile {
  const label = friendlyName(definition, state, context.hass);
  const value = displayState(context.hass, state);
  const group = overviewGroup(definition);
  const condition = overviewCondition(definition, state);
  const delta = deltaLabel(context.hass, state);
  const trend = trendModel(context.hass, state, delta);
  return {
    key: definition.key,
    definition,
    entityId,
    state,
    label,
    shortLabel: overviewShortLabel(definition, context.hass, label),
    value,
    group,
    condition,
    iconClass: context.iconBubbleClass(definition, state),
    trend,
    delta,
    sparkline: sparklineModel(state),
  };
}

export function overviewGroup(definition: EntityDefinition): OverviewGroup {
  const key = definition.key;
  if (key.includes("status") || key.includes("connection") || key.includes("reconnect")) {
    return "status";
  }
  if (key.includes("energy") || key.includes("power") || key.includes("cost") || key.includes("co2")) {
    return "energy";
  }
  if (key.includes("temperature") || key === "water_heating") {
    return "temperature";
  }
  if (key.includes("bath")) {
    return "bath";
  }
  if (key.includes("timer") || key.includes("duration") || key.includes("time")) {
    return "timer";
  }
  if (key.includes("eco") || key.includes("saving")) {
    return "saving";
  }
  if (definition.domain === "switch" || definition.domain === "button") {
    return "control";
  }
  return "water";
}

export function overviewCondition(
  definition: EntityDefinition,
  state?: HassEntity,
): OverviewCondition {
  if (!state) {
    return "neutral";
  }
  if (definition.key === "error_status" || definition.key.includes("alarm")) {
    return isAlertState(state.state) ? "alert" : "ok";
  }
  if (definition.key === "device_status" || definition.key === "connection_state") {
    if (isAlertState(state.state)) {
      return "alert";
    }
    return isOkState(state.state) ? "ok" : "warning";
  }
  if (definition.domain === "switch" || definition.domain === "binary_sensor") {
    return state.state === "on" ? "active" : "idle";
  }
  const numeric = numericState(state);
  if (numeric !== undefined && ["water_flow", "power"].includes(definition.key)) {
    return numeric > 0 ? "active" : "idle";
  }
  return "neutral";
}

function deltaLabel(hass: HomeAssistant, state?: HassEntity): string | undefined {
  const delta = firstNumericAttribute(state, DELTA_ATTRIBUTE_KEYS);
  const percent = firstNumericAttribute(state, DELTA_PERCENT_ATTRIBUTE_KEYS);
  const value = delta ?? percent;
  if (value === undefined) {
    return undefined;
  }
  const sign = value > 0 ? "+" : "";
  const suffix =
    percent !== undefined && delta === undefined
      ? "%"
      : typeof state?.attributes.unit_of_measurement === "string"
        ? ` ${state.attributes.unit_of_measurement}`
        : "";
  return localize(hass, "overview.delta", { value: `${sign}${formatNumber(value)}${suffix}` });
}

function trendModel(
  hass: HomeAssistant,
  state: HassEntity | undefined,
  delta: string | undefined,
): OverviewTrend | undefined {
  const direction = explicitTrendDirection(state) ?? deltaTrendDirection(state);
  if (!direction) {
    return undefined;
  }
  return {
    direction,
    icon:
      direction === "up"
        ? "mdi:trending-up"
        : direction === "down"
          ? "mdi:trending-down"
          : "mdi:trending-neutral",
    label: delta ?? localize(hass, `overview.trend.${direction}`),
  };
}

function sparklineModel(state?: HassEntity): OverviewSparkline | undefined {
  const values = firstNumberArrayAttribute(state, SPARKLINE_ATTRIBUTE_KEYS);
  if (!values || values.length < 2) {
    return undefined;
  }
  return {
    values,
    points: sparklinePoints(values),
  };
}

function firstNumericAttribute(
  state: HassEntity | undefined,
  keys: readonly string[],
): number | undefined {
  if (!state) {
    return undefined;
  }
  for (const key of keys) {
    const value = finiteNumber(state.attributes[key]);
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

function firstNumberArrayAttribute(
  state: HassEntity | undefined,
  keys: readonly string[],
): number[] | undefined {
  if (!state) {
    return undefined;
  }
  for (const key of keys) {
    const values = numberArray(state.attributes[key]);
    if (values?.length) {
      return values;
    }
  }
  return undefined;
}

function explicitTrendDirection(state?: HassEntity): OverviewTrendDirection | undefined {
  const trend = normalizeToken(state?.attributes.trend);
  if (!trend) {
    return undefined;
  }
  if (["down", "decreasing", "falling", "sinkend"].includes(trend)) {
    return "down";
  }
  if (["flat", "neutral", "stable", "gleichbleibend"].includes(trend)) {
    return "flat";
  }
  if (["rising", "steigend", "up", "increasing"].includes(trend)) {
    return "up";
  }
  return undefined;
}

function deltaTrendDirection(state?: HassEntity): OverviewTrendDirection | undefined {
  const delta =
    firstNumericAttribute(state, DELTA_ATTRIBUTE_KEYS) ??
    firstNumericAttribute(state, DELTA_PERCENT_ATTRIBUTE_KEYS);
  if (delta === undefined) {
    return undefined;
  }
  if (delta > 0) {
    return "up";
  }
  if (delta < 0) {
    return "down";
  }
  return "flat";
}

function numberArray(value: unknown): number[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const values = value
    .map((entry) => finiteNumber(entry))
    .filter((entry): entry is number => entry !== undefined);
  return values.length >= 2 ? values.slice(-18) : undefined;
}

function sparklinePoints(values: number[]): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? 100 / (values.length - 1) : 100;
  return values
    .map((value, index) => {
      const x = Number((index * step).toFixed(2));
      const y = Number((22 - ((value - min) / range) * 18).toFixed(2));
      return `${x},${y}`;
    })
    .join(" ");
}

function isOkState(value: string): boolean {
  return OK_STATE_TOKENS.has(normalizeToken(value));
}

function isAlertState(value: string): boolean {
  const token = normalizeToken(value);
  if (!token) {
    return false;
  }
  if (DEGRADED_STATE_TOKENS.has(token)) {
    return true;
  }
  if (isOkState(token)) {
    return false;
  }
  const numeric = Number(token);
  if (Number.isFinite(numeric)) {
    return numeric !== 0;
  }
  return ALERT_STATE_PARTS.some((part) => token.includes(part));
}

function finiteNumber(value: unknown): number | undefined {
  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatNumber(value: number): string {
  return Number(value.toFixed(Math.abs(value) < 10 ? 1 : 0)).toString();
}

function normalizeToken(value: unknown): string {
  return typeof value === "string"
    ? value.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ")
    : "";
}
