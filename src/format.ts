import type { HassEntity, HomeAssistant } from "./types";
export {
  cardDisplayTitle,
  deviceNameSuffix,
  entityDisplayName as friendlyName,
  entityDisplayState as displayState,
  normalizeDisplayText,
  stripDeviceNamePrefix,
} from "./display-text";

const UNAVAILABLE_STATES = new Set(["unavailable"]);
const HEATING_STATES = new Set(["heat", "heating", "on"]);
const HEATING_ACTION_STATES = new Set(["heating", "preheating"]);

export function objectIdFromEntityId(entityId: string): string {
  return entityId.includes(".") ? entityId.split(".").slice(1).join(".") : entityId;
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function entityState(hass: HomeAssistant, entityId?: string): HassEntity | undefined {
  if (!entityId) {
    return undefined;
  }
  const states =
    hass.states && typeof hass.states === "object" && !Array.isArray(hass.states)
      ? hass.states
      : {};
  const state = states[entityId];
  if (!state || typeof state !== "object") {
    return undefined;
  }
  return {
    ...state,
    state: typeof state.state === "string" ? state.state : "unknown",
    attributes:
      state.attributes && typeof state.attributes === "object" && !Array.isArray(state.attributes)
        ? state.attributes
        : {},
    entity_id: entityId,
  };
}

export function isUnavailable(state?: HassEntity): boolean {
  return !state || UNAVAILABLE_STATES.has(state.state);
}

export function isHeatingEntityState(state?: HassEntity): boolean {
  if (!state || isUnavailable(state)) {
    return false;
  }
  const hvacAction = state.attributes.hvac_action;
  if (typeof hvacAction === "string") {
    return HEATING_ACTION_STATES.has(hvacAction.toLowerCase());
  }
  return HEATING_STATES.has(state.state.toLowerCase());
}

export function numericState(state?: HassEntity): number | undefined {
  if (!state || UNAVAILABLE_STATES.has(state.state)) {
    return undefined;
  }
  return parseFiniteNumber(state.state);
}

export function numericAttribute(
  state: HassEntity | undefined,
  key: string,
): number | undefined {
  return parseFiniteNumber(state?.attributes[key]);
}

export function parseFiniteNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function booleanState(state?: HassEntity): boolean {
  return state?.state === "on" || state?.state === "heat" || state?.state === "playing";
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToStep(value: number, step: number): number {
  if (!Number.isFinite(step) || step <= 0) {
    return value;
  }
  const decimals = Math.max(0, String(step).split(".")[1]?.length ?? 0);
  return Number((Math.round(value / step) * step).toFixed(decimals));
}
