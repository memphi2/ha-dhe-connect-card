import { discoverEntities } from "./discovery";
import type {
  DiscoveredEntities,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
} from "./types";

export class DiscoveryCache {
  private _entry?: {
    signature: string;
    discovered: DiscoveredEntities;
  };

  public get(
    hass: HomeAssistant,
    config: NormalizedDheConnectCardConfig,
  ): DiscoveredEntities {
    const signature = discoverySignature(hass, config);
    if (this._entry?.signature === signature) {
      return this._entry.discovered;
    }
    const discovered = discoverEntities(hass, config);
    this._entry = { signature, discovered };
    return discovered;
  }

  public clear(): void {
    this._entry = undefined;
  }
}

function discoverySignature(
  hass: HomeAssistant,
  config: NormalizedDheConnectCardConfig,
): string {
  return JSON.stringify({
    device_id: config.device_id ?? "",
    hide_entities: config.hide_entities,
    entities: config.entities,
    registry: registrySignature(hass),
    states: stateSignature(hass),
  });
}

function registrySignature(hass: HomeAssistant): unknown[] {
  return Object.entries(hass.entities ?? {})
    .map(([entityId, registry]) => [
      entityId,
      registry?.config_entry_id ?? "",
      registry?.device_id ?? "",
      registry?.disabled_by ?? "",
      registry?.hidden === true ? "1" : "",
      registry?.hidden_by ?? "",
      registry?.platform ?? "",
      registry?.translation_key ?? "",
      registry?.unique_id ?? "",
    ])
    .sort(([left], [right]) => String(left).localeCompare(String(right)));
}

function stateSignature(hass: HomeAssistant): unknown[] {
  const states = hass.states && typeof hass.states === "object" ? hass.states : {};
  return Object.entries(states)
    .map(([entityId, state]) => [
      entityId,
      state?.attributes && typeof state.attributes === "object" && !Array.isArray(state.attributes)
        ? state.attributes.friendly_name ?? ""
        : "",
    ])
    .sort(([left], [right]) => String(left).localeCompare(String(right)));
}
