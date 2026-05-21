import { ENTITY_DEFINITIONS } from "./catalog";
import { discoverEntities } from "./discovery";
import type {
  DiscoveredEntities,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
} from "./types";

const DISCOVERY_DOMAINS = new Set(ENTITY_DEFINITIONS.map((definition) => definition.domain));

export class DiscoveryCache {
  private _entry?: {
    signature: string;
    discovered: DiscoveredEntities;
  };
  private _registrySource?: HomeAssistant["entities"];
  private _registrySnapshot: unknown[] = [];
  private _stateSource?: HomeAssistant["states"];
  private _stateSnapshot: unknown[] = [];

  public get(
    hass: HomeAssistant,
    config: NormalizedDheConnectCardConfig,
  ): DiscoveredEntities {
    const registry = this._registrySignature(hass);
    const states = this._stateSignature(hass);
    const signature = discoverySignature(config, registry, states);
    if (this._entry?.signature === signature) {
      return this._entry.discovered;
    }
    const discovered = discoverEntities(hass, config);
    this._entry = { signature, discovered };
    return discovered;
  }

  public clear(): void {
    this._entry = undefined;
    this._registrySource = undefined;
    this._registrySnapshot = [];
    this._stateSource = undefined;
    this._stateSnapshot = [];
  }

  private _registrySignature(hass: HomeAssistant): unknown[] {
    const source = hass.entities;
    if (this._registrySource === source) {
      return this._registrySnapshot;
    }
    this._registrySource = source;
    this._registrySnapshot = registrySignature(hass);
    return this._registrySnapshot;
  }

  private _stateSignature(hass: HomeAssistant): unknown[] {
    const source = hass.states;
    if (this._stateSource === source) {
      return this._stateSnapshot;
    }
    this._stateSource = source;
    this._stateSnapshot = stateSignature(hass);
    return this._stateSnapshot;
  }
}

function discoverySignature(
  config: NormalizedDheConnectCardConfig,
  registry: unknown[],
  states: unknown[],
): string {
  return JSON.stringify({
    device_id: config.device_id ?? "",
    hide_entities: config.hide_entities,
    entities: config.entities,
    registry,
    states,
  });
}

function registrySignature(hass: HomeAssistant): unknown[] {
  return Object.entries(hass.entities ?? {})
    .filter(([entityId]) => supportedDomain(entityId))
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
    .filter(([entityId]) => supportedDomain(entityId))
    .map(([entityId, state]) => [
      entityId,
      state?.attributes && typeof state.attributes === "object" && !Array.isArray(state.attributes)
        ? state.attributes.friendly_name ?? ""
        : "",
    ])
    .sort(([left], [right]) => String(left).localeCompare(String(right)));
}

function supportedDomain(entityId: string): boolean {
  const domain = entityId.split(".", 1)[0];
  return domain ? DISCOVERY_DOMAINS.has(domain as (typeof ENTITY_DEFINITIONS)[number]["domain"]) : false;
}
