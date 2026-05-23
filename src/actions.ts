import {
  clamp,
  numericAttribute,
  numericState,
  parseFiniteNumber,
  roundToStep,
} from "./format";
import type { HassEntity, HomeAssistant } from "./types";

const WEATHER_SERVICE_FIELDS: Record<string, Set<string>> = {
  search_weather_location: new Set(["entry_id", "name", "country_id"]),
  add_weather_favorite: new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id",
  ]),
  remove_weather_favorite: new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id",
  ]),
  toggle_weather_favorite: new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id",
  ]),
  select_weather_location: new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id",
  ]),
};

export function serviceForToggle(state: HassEntity | undefined): "turn_on" | "turn_off" {
  return state?.state === "on" ? "turn_off" : "turn_on";
}

export async function callEntityService(
  hass: HomeAssistant,
  entityId: string,
  service: string,
  data: Record<string, unknown> = {},
): Promise<unknown> {
  const normalizedEntityId = entityId.trim();
  const [domain, objectId] = normalizedEntityId.split(".", 2);
  if (!domain || !objectId) {
    return undefined;
  }
  return hass.callService(domain, service, {
    entity_id: normalizedEntityId,
    ...data,
  });
}

export async function setClimateTemperature(
  hass: HomeAssistant,
  entityId: string,
  state: HassEntity | undefined,
  target: number,
): Promise<unknown> {
  if (!Number.isFinite(target)) {
    return undefined;
  }
  const min = numericAttribute(state, "min_temp") ?? 20;
  const max = numericAttribute(state, "max_temp") ?? 60;
  const step = numericAttribute(state, "target_temp_step") ?? 0.5;
  const temperature = roundToStep(clamp(target, min, max), step);
  return callEntityService(hass, entityId, "set_temperature", { temperature });
}

export async function adjustClimateTemperature(
  hass: HomeAssistant,
  entityId: string,
  state: HassEntity | undefined,
  delta: number,
): Promise<unknown> {
  const current = numericAttribute(state, "temperature") ?? numericState(state) ?? 38;
  return setClimateTemperature(hass, entityId, state, current + delta);
}

export async function setNumberValue(
  hass: HomeAssistant,
  entityId: string,
  state: HassEntity | undefined,
  rawValue: string | number,
): Promise<unknown> {
  const parsed = parseFiniteNumber(rawValue);
  if (parsed === undefined) {
    return undefined;
  }
  const min = numericAttribute(state, "min");
  const max = numericAttribute(state, "max");
  const step = numericAttribute(state, "step") ?? 1;
  const value = roundToStep(
    clamp(parsed, min ?? Number.NEGATIVE_INFINITY, max ?? Number.POSITIVE_INFINITY),
    step,
  );
  return callEntityService(hass, entityId, "set_value", { value });
}

export async function setTextValue(
  hass: HomeAssistant,
  entityId: string,
  value: string,
): Promise<unknown> {
  return callEntityService(hass, entityId, "set_value", { value });
}

export async function selectOption(
  hass: HomeAssistant,
  entityId: string,
  option: string,
): Promise<unknown> {
  if (option.length === 0) {
    return undefined;
  }
  return callEntityService(hass, entityId, "select_option", { option });
}

export async function setMediaVolume(
  hass: HomeAssistant,
  entityId: string,
  rawValue: string | number,
): Promise<unknown> {
  const parsed = parseFiniteNumber(rawValue);
  if (parsed === undefined) {
    return undefined;
  }
  const volumeLevel = clamp(parsed, 0, 1);
  return callEntityService(hass, entityId, "volume_set", { volume_level: volumeLevel });
}

export async function callWeatherService(
  hass: HomeAssistant,
  service: string,
  data: Record<string, string>,
  entryId?: string,
): Promise<unknown> {
  const payload: Record<string, unknown> = {};
  const entries = entryId ? { entry_id: entryId, ...data } : data;
  const allowedFields = WEATHER_SERVICE_FIELDS[service];
  if (!allowedFields) {
    return undefined;
  }
  for (const [key, value] of Object.entries(entries)) {
    if (!allowedFields.has(key)) {
      continue;
    }
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }
    if (key === "country_id" || key === "result_number") {
      const numericValue = Number(trimmed);
      if (!Number.isFinite(numericValue)) {
        continue;
      }
      payload[key] = numericValue;
    } else {
      payload[key] = trimmed;
    }
  }
  return hass.callService("stiebel_dhe_connect", service, payload);
}
