import {
  booleanState,
  isHeatingEntityState,
  isUnavailable,
  numericState,
} from "./format";
import { normalizeStateToken } from "./state-token";
import type { EntityDefinition, HassEntity, IconTone } from "./types";

type IconMotion =
  | "alert"
  | "eco"
  | "energy"
  | "heat"
  | "memory"
  | "radio"
  | "safety"
  | "status"
  | "timer"
  | "water-fill"
  | "water-flow"
  | "weather"
  | "wellness";

interface IconVisualState {
  tone: IconTone;
  motion: IconMotion;
  active: boolean;
  animated: boolean;
}

const ALERT_ENTITY_KEYS = new Set(["error_status", "reconnect_count", "last_reconnect_reason"]);
const STATUS_ENTITY_KEYS = new Set([
  "device_status",
  "device_info",
  "protocol_version",
  "product_id",
  "wlan_mac",
  "bluetooth_mac",
  "connection_state",
  "controlunit_name",
]);
const LIVE_STATUS_ENTITY_KEYS = new Set(["device_status", "connection_state"]);
const MEDIA_INACTIVE_STATES = new Set(["off", "idle", "standby"]);
const TIMER_IDLE_STATES = new Set(["0", "00:00", "00:00:00"]);
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
const ALERT_FALSE_STATE_TOKENS = new Set(["false", "off", "unknown", "unbekannt"]);
const ALARM_STATE_TOKENS = new Set([
  "alarm",
  "alert",
  "error",
  "fault",
  "failed",
  "disconnected",
  "fehler",
  "getrennt",
  "nicht verbunden",
  "offline",
  "unavailable",
  "problem",
  "stoerung",
  "störung",
  "target below inlet",
]);
const ALARM_STATE_PARTS = [
  "error",
  "alarm",
  "fault",
  "fehler",
  "stoerung",
  "störung",
];

export function iconVisualClass(
  definition: EntityDefinition,
  state?: HassEntity,
  animationsEnabled = true,
): string {
  const visual = iconVisualState(definition, state, animationsEnabled);
  return [
    "icon-bubble",
    visual.tone,
    `motion-${visual.motion}`,
    visual.animated ? "animated" : "",
    visual.active ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function iconVisualState(
  definition: EntityDefinition,
  state?: HassEntity,
  animationsEnabled = true,
): IconVisualState {
  const tone = iconTone(definition, state);
  const motion = iconMotion(definition);
  const available = Boolean(state && !isUnavailable(state));
  return {
    tone,
    motion,
    active: Boolean(state && isActiveIcon(definition, state)),
    animated: available && animationsEnabled && shouldAnimateIcon(definition, state),
  };
}

function iconTone(definition: EntityDefinition, state?: HassEntity): IconTone {
  const key = definition.key;
  if (key === "water_heating" && isHeatingEntityState(state)) {
    return "hot";
  }
  if (isAlertStateDefinition(definition)) {
    return state && isActiveAlertState(state.state) ? "alert" : "ok";
  }
  if (isLiveStatusDefinition(definition) && state) {
    if (isOkState(state.state)) {
      return "ok";
    }
    if (isAlarmState(state.state)) {
      return "alert";
    }
  }
  if (key === "outlet_temperature") {
    return "hot";
  }
  if (isStatusDefinition(definition)) {
    return "status";
  }
  if (key.includes("child_safety") || key.includes("scald") || definition.icon.includes("shield")) {
    return "safety";
  }
  if (key.includes("wellness")) {
    return "wellness";
  }
  if (key.includes("memory")) {
    return "memory";
  }
  if (key.startsWith("eco_")) {
    return "eco";
  }
  if (key.includes("timer") || key.includes("duration") || key.includes("time")) {
    return "timer";
  }
  if (
    key.includes("water") ||
    key.includes("bath") ||
    key.includes("flow") ||
    key.includes("temperature") ||
    key === "water_heating"
  ) {
    return "water";
  }
  if (
    key.includes("energy") ||
    key.includes("power") ||
    key.includes("cost") ||
    key.includes("co2")
  ) {
    return "energy";
  }
  if (key.includes("eco") || key.includes("saving")) {
    return "eco";
  }
  if (definition.domain === "weather" || key === "weather_location") {
    return "weather";
  }
  if (definition.domain === "media_player") {
    return "radio";
  }
  if (definition.domain === "button") {
    return "action";
  }
  return "water";
}

function isAlertStateDefinition(definition: EntityDefinition): boolean {
  return ALERT_ENTITY_KEYS.has(definition.key);
}

function isStatusDefinition(definition: EntityDefinition): boolean {
  return STATUS_ENTITY_KEYS.has(definition.key);
}

function isLiveStatusDefinition(definition: EntityDefinition): boolean {
  return LIVE_STATUS_ENTITY_KEYS.has(definition.key);
}

function iconMotion(definition: EntityDefinition): IconMotion {
  const key = definition.key;
  if (isAlertStateDefinition(definition)) {
    return "alert";
  }
  if (definition.domain === "media_player") {
    return "radio";
  }
  if (key === "outlet_temperature" || key === "water_heating") {
    return "heat";
  }
  if (key.includes("bath")) {
    return "water-fill";
  }
  if (key === "water_flow" || key.includes("flow")) {
    return "water-flow";
  }
  if (key.includes("energy") || key.includes("power") || key.includes("cost")) {
    return "energy";
  }
  if (key.includes("timer") || key.includes("duration") || key.includes("time")) {
    return "timer";
  }
  if (key.includes("wellness")) {
    return "wellness";
  }
  if (key.startsWith("eco_") || key.includes("saving")) {
    return "eco";
  }
  if (key.includes("memory")) {
    return "memory";
  }
  if (definition.domain === "weather" || key === "weather_location") {
    return "weather";
  }
  if (key.includes("child_safety") || key.includes("scald") || definition.icon.includes("shield")) {
    return "safety";
  }
  if (STATUS_ENTITY_KEYS.has(key)) {
    return "status";
  }
  return "water-flow";
}

function isActiveIcon(definition: EntityDefinition, state: HassEntity): boolean {
  if (definition.domain === "switch") {
    return booleanState(state);
  }
  if (definition.domain === "media_player") {
    return isActiveMediaPlayer(state);
  }
  if (definition.domain === "button") {
    return false;
  }
  if (definition.domain === "climate") {
    return isHeatingEntityState(state);
  }
  return true;
}

function isActiveMediaPlayer(state: HassEntity): boolean {
  return !MEDIA_INACTIVE_STATES.has(state.state.toLowerCase());
}

function shouldAnimateIcon(definition: EntityDefinition, state?: HassEntity): boolean {
  if (!state || isUnavailable(state) || definition.domain === "button") {
    return false;
  }
  if (definition.domain === "switch" || definition.domain === "binary_sensor") {
    return booleanState(state);
  }
  if (definition.domain === "media_player") {
    return isActiveMediaPlayer(state);
  }
  if (definition.domain === "climate") {
    return isHeatingEntityState(state);
  }
  if (definition.domain === "weather") {
    return true;
  }
  const key = definition.key;
  if (key === "water_flow" || key === "power") {
    return (numericState(state) ?? 0) > 0;
  }
  if (key === "outlet_temperature" || key === "inlet_temperature") {
    return numericState(state) !== undefined;
  }
  if (key.includes("timer") || key.includes("duration") || key.includes("time")) {
    return !TIMER_IDLE_STATES.has(state.state);
  }
  if (key === "device_status" || key === "connection_state") {
    return isOkState(state.state) || isAlarmState(state.state);
  }
  if (isAlertStateDefinition(definition)) {
    return isActiveAlertState(state.state);
  }
  return false;
}

function isOkState(value: string): boolean {
  const state = normalizeStateToken(value);
  return OK_STATE_TOKENS.has(state);
}

function isActiveAlertState(value: string): boolean {
  const state = normalizeStateToken(value);
  if (
    !state ||
    isOkState(state) ||
    isZeroState(state) ||
    ALERT_FALSE_STATE_TOKENS.has(state)
  ) {
    return false;
  }
  return true;
}

function isZeroState(value: string): boolean {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric === 0;
}

function isAlarmState(value: string): boolean {
  const state = normalizeStateToken(value);
  if (isOkState(state) || isZeroState(state)) {
    return false;
  }
  const numeric = Number(state);
  if (Number.isFinite(numeric)) {
    return numeric !== 0;
  }
  return (
    ALARM_STATE_TOKENS.has(state) || ALARM_STATE_PARTS.some((part) => state.includes(part))
  );
}
