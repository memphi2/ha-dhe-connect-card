import { ENTITY_DEFINITIONS } from "./catalog";
import { definitionAliases, definitionIdentityScore } from "./entity-matching";
import { objectIdFromEntityId, slugify } from "./format";
import type {
  DiscoveredEntities,
  EntityDefinition,
  EntityDomain,
  EntityKey,
  HassRegistryEntity,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
} from "./types";
import { INTEGRATION_DOMAIN } from "./types";

type DiscoveryCandidates = Partial<Record<EntityDomain, string[]>>;
const DISCOVERY_DOMAIN_SET = new Set<EntityDomain>(
  ENTITY_DEFINITIONS.map((definition) => definition.domain),
);

export function discoverEntities(
  hass: HomeAssistant,
  config: NormalizedDheConnectCardConfig,
): DiscoveredEntities {
  const states = stateMap(hass);
  const hiddenEntityKeys = new Set(config.hide_entities);
  const configuredDeviceId = resolveConfiguredDeviceId(hass, states, config.device_id);
  const discoveryCandidates = collectDiscoveryCandidates(hass, states, configuredDeviceId);
  const explicitBase = existingEntityForDevice(
    hass,
    states,
    explicitEntity(config, "water_heating", "climate"),
    "climate",
    configuredDeviceId,
  );
  const baseEntity =
    explicitBase ?? findBaseEntity(hass, configuredDeviceId, discoveryCandidates.climate ?? []);
  const baseRegistry = registryEntry(hass, baseEntity);
  const deviceId = configuredDeviceId ?? baseRegistry?.device_id ?? undefined;
  const basePrefixes = baseEntity ? prefixesForBaseEntity(baseEntity) : [];
  const entityIds: Record<EntityKey, string> = {};
  const registryFallbackByKey = registryFallbackMap(hass, deviceId ?? null);
  const domainCandidates =
    (deviceId ?? null) === configuredDeviceId
      ? discoveryCandidates
      : collectDiscoveryCandidates(hass, states, deviceId ?? null);

  for (const definition of ENTITY_DEFINITIONS) {
    if (hiddenEntityKeys.has(definition.key)) {
      continue;
    }
    const explicit = explicitEntity(config, definition.key, definition.domain);
    const explicitEntityId = existingEntity(states, explicit, definition.domain);
    if (explicitEntityId) {
      entityIds[definition.key] = explicitEntityId;
      continue;
    }
    if (definition.key === "water_heating" && baseEntity) {
      entityIds[definition.key] = baseEntity;
      continue;
    }
    const discovered = discoverEntityForDefinition(
      hass,
      states,
      definition,
      deviceId ?? null,
      basePrefixes,
      domainCandidates[definition.domain] ?? [],
    );
    if (discovered) {
      entityIds[definition.key] = discovered;
      continue;
    }
    if (definition.diagnostic) {
      const registryFallback = registryFallbackByKey.get(definition.key);
      if (registryFallback) {
        entityIds[definition.key] = registryFallback;
      }
    }
  }
  const configEntryId =
    baseRegistry?.config_entry_id ??
    Object.values(entityIds)
      .map((entityId) => registryEntry(hass, entityId)?.config_entry_id)
      .find((entryId): entryId is string => typeof entryId === "string" && entryId.length > 0);

  return {
    baseEntity,
    configEntryId,
    deviceId: deviceId ?? undefined,
    entityIds,
    definitions: ENTITY_DEFINITIONS,
  };
}

function explicitEntity(
  config: NormalizedDheConnectCardConfig,
  key: EntityKey,
  domain: EntityDomain,
): string | undefined {
  const direct = config.entities[key];
  if (typeof direct === "string") {
    return direct;
  }
  const domainValue = config.entities[domain];
  if (typeof domainValue === "string" && key === domain) {
    return domainValue;
  }
  if (domainValue && typeof domainValue === "object") {
    const nested = domainValue[key];
    if (typeof nested === "string") {
      return nested;
    }
  }
  return undefined;
}

function findBaseEntity(
  hass: HomeAssistant,
  configuredDevice: string | null,
  climateCandidates: string[],
): string | undefined {
  const candidates = climateCandidates;
  const exact = candidates.find((entityId) => {
    const registry = registryEntry(hass, entityId);
    return (
      registry?.platform === INTEGRATION_DOMAIN &&
      (!configuredDevice || registry.device_id === configuredDevice)
    );
  });
  if (exact) {
    return exact;
  }
  return candidates.find((entityId) => {
    const objectId = objectIdFromEntityId(entityId);
    return objectId.includes("dhe") || objectId.includes("stiebel");
  });
}

/**
 * Home Assistant 2026.8 can split a formerly merged device into one device per
 * config entry. A Lovelace config can therefore retain an ID which no longer
 * appears in the frontend registry. Resolve only the unambiguous one-device
 * case; a multi-device installation must remain explicitly configured.
 */
function resolveConfiguredDeviceId(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  configuredDeviceId: string | undefined,
): string | null {
  if (!configuredDeviceId || configuredDeviceOwnsActiveDheEntity(hass, states, configuredDeviceId)) {
    return configuredDeviceId ?? null;
  }
  const candidates = activeDheDeviceIds(hass, states);
  const [candidate] = candidates;
  return candidates.size === 1 && candidate ? candidate : configuredDeviceId;
}

function configuredDeviceOwnsActiveDheEntity(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  deviceId: string,
): boolean {
  return Object.entries(hass.entities ?? {}).some(
    ([entityId, registry]) =>
      registry?.platform === INTEGRATION_DOMAIN &&
      registry.device_id === deviceId &&
      Boolean(states[entityId]) &&
      isAutoDiscoverable(hass, entityId),
  );
}

function activeDheDeviceIds(
  hass: HomeAssistant,
  states: Record<string, unknown>,
): Set<string> {
  const deviceIds = new Set<string>();
  for (const [entityId, registry] of Object.entries(hass.entities ?? {})) {
    if (
      registry?.platform !== INTEGRATION_DOMAIN ||
      !entityId.startsWith("climate.") ||
      !registry.device_id ||
      !states[entityId] ||
      !isAutoDiscoverable(hass, entityId)
    ) {
      continue;
    }
    deviceIds.add(registry.device_id);
  }
  return deviceIds;
}

function discoverEntityForDefinition(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  definition: EntityDefinition,
  deviceId: string | null,
  basePrefixes: string[],
  candidates: readonly string[],
): string | undefined {
  let best: { entityId: string; score: number } | undefined;
  for (const entityId of candidates) {
    const score = entityScore(hass, states, entityId, definition, deviceId, basePrefixes);
    if (score <= 0) {
      continue;
    }
    if (!best || score > best.score || (score === best.score && entityId < best.entityId)) {
      best = { entityId, score };
    }
  }
  return best?.entityId;
}

function entityScore(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  entityId: string,
  definition: EntityDefinition,
  deviceId: string | null,
  basePrefixes: string[],
): number {
  const registry = registryEntry(hass, entityId);
  const objectId = objectIdFromEntityId(entityId);
  const aliases = definitionAliases(definition);
  let semanticScore = definitionIdentityScore(definition, entityId, registry);
  let score = 0;

  if (registry?.platform === INTEGRATION_DOMAIN) {
    score += 20;
  }
  if (deviceId && registry?.device_id === deviceId) {
    score += 50;
  }
  if (
    basePrefixes.some((prefix) =>
      aliases.some((alias) => objectId === `${prefix}_${alias}`),
    )
  ) {
    semanticScore += 25;
  }

  const friendly = friendlyNameForEntity(states, entityId);
  if (typeof friendly === "string" && aliases.some((alias) => slugify(friendly).includes(alias))) {
    semanticScore += 15;
  }
  return semanticScore > 0 ? score + semanticScore : 0;
}

function registryEntry(
  hass: HomeAssistant,
  entityId: string | undefined,
): HassRegistryEntity | undefined {
  if (!entityId) {
    return undefined;
  }
  return hass.entities?.[entityId];
}

function existingEntity(
  states: Record<string, unknown>,
  entityId: string | undefined,
  domain?: EntityDomain,
): string | undefined {
  if (!entityId || !states[entityId]) {
    return undefined;
  }
  if (domain && !entityId.startsWith(`${domain}.`)) {
    return undefined;
  }
  return entityId;
}

function existingEntityForDevice(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  entityId: string | undefined,
  domain: EntityDomain,
  deviceId: string | null | undefined,
): string | undefined {
  const existing = existingEntity(states, entityId, domain);
  if (!existing) {
    return undefined;
  }
  return matchesConfiguredDevice(hass, existing, deviceId) ? existing : undefined;
}

function matchesConfiguredDevice(
  hass: HomeAssistant,
  entityId: string,
  deviceId: string | null | undefined,
): boolean {
  if (!deviceId) {
    return true;
  }
  const registry = registryEntry(hass, entityId);
  return !registry?.device_id || registry.device_id === deviceId;
}

function isAutoDiscoverable(hass: HomeAssistant, entityId: string): boolean {
  const registry = registryEntry(hass, entityId);
  return !registry?.disabled_by && !registry?.hidden_by && registry?.hidden !== true;
}

function friendlyNameForEntity(states: Record<string, unknown>, entityId: string): unknown {
  const state = states[entityId];
  if (!state || typeof state !== "object" || Array.isArray(state)) {
    return undefined;
  }
  const attributes = (state as { attributes?: unknown }).attributes;
  if (!attributes || typeof attributes !== "object" || Array.isArray(attributes)) {
    return undefined;
  }
  return (attributes as { friendly_name?: unknown }).friendly_name;
}

function stateMap(hass: HomeAssistant): Record<string, unknown> {
  return hass.states && typeof hass.states === "object" && !Array.isArray(hass.states)
    ? hass.states
    : {};
}

function collectDiscoveryCandidates(
  hass: HomeAssistant,
  states: Record<string, unknown>,
  deviceId: string | null,
): DiscoveryCandidates {
  const candidates: DiscoveryCandidates = {};
  for (const entityId of Object.keys(states)) {
    const domain = entityDomainFromEntityId(entityId);
    if (!domain) {
      continue;
    }
    if (!isAutoDiscoverable(hass, entityId)) {
      continue;
    }
    if (!matchesConfiguredDevice(hass, entityId, deviceId)) {
      continue;
    }
    (candidates[domain] ??= []).push(entityId);
  }
  return candidates;
}

function entityDomainFromEntityId(entityId: string): EntityDomain | undefined {
  const [domain] = entityId.split(".", 1);
  return domain && DISCOVERY_DOMAIN_SET.has(domain as EntityDomain)
    ? (domain as EntityDomain)
    : undefined;
}

function registryFallbackMap(
  hass: HomeAssistant,
  deviceId: string | null,
): Map<EntityKey, string> {
  const fallbackByKey = new Map<EntityKey, string>();
  const registry = hass.entities ?? {};
  for (const [entityId, entry] of Object.entries(registry)) {
    const domain = entityDomainFromEntityId(entityId);
    if (!domain || !matchesConfiguredDevice(hass, entityId, deviceId)) {
      continue;
    }
    if (entry?.hidden === true || entry?.hidden_by || entry?.disabled_by === "user") {
      continue;
    }
    const key = registryEntityKey(entityId, domain, entry);
    if (!key) {
      continue;
    }
    const current = fallbackByKey.get(key);
    if (!current || entityId < current) {
      fallbackByKey.set(key, entityId);
    }
  }
  return fallbackByKey;
}

function registryEntityKey(
  entityId: string,
  domain: EntityDomain,
  entry: HassRegistryEntity | undefined,
): EntityKey | undefined {
  const translationKey =
    typeof entry?.translation_key === "string" && entry.translation_key.trim()
      ? entry.translation_key.trim()
      : undefined;
  if (
    translationKey &&
    ENTITY_DEFINITIONS.some(
      (definition) => definition.domain === domain && definition.key === translationKey,
    )
  ) {
    return translationKey;
  }
  const uniqueId = typeof entry?.unique_id === "string" ? entry.unique_id : "";
  if (!uniqueId) {
    return undefined;
  }
  for (const definition of ENTITY_DEFINITIONS) {
    if (definition.domain !== domain) {
      continue;
    }
    if (uniqueId.endsWith(`_${definition.key}`) || entityId.endsWith(`_${definition.key}`)) {
      return definition.key;
    }
  }
  return undefined;
}

function prefixesForBaseEntity(entityId: string): string[] {
  const objectId = objectIdFromEntityId(entityId);
  const parts = objectId.split("_").filter(Boolean);
  const prefixes = new Set<string>();
  if (parts.length > 1) {
    prefixes.add(parts.slice(0, -1).join("_"));
  }
  if (parts.length > 2) {
    prefixes.add(parts.slice(0, -2).join("_"));
  }
  prefixes.add(objectId.replace(/_(setpoint|water_heating|durchlauferhitzer)$/, ""));
  return [...prefixes].filter(Boolean);
}
