import type { DheConnectCardConfig, HassRegistryEntity, HomeAssistant } from "./types";

export interface LegacyEntityMigration {
  legacyEntity: string;
  migratedDeviceId?: string;
  usedWaterHeatingOverride: boolean;
  resolved: boolean;
}

interface MigrationResult {
  config: DheConnectCardConfig;
  legacy?: LegacyEntityMigration;
}

const loggedLegacyAnchors = new Set<string>();

export function migrateLegacyEntityAnchor(
  hass: HomeAssistant | undefined,
  config: DheConnectCardConfig,
): MigrationResult {
  const legacyEntity = legacyEntityAnchor(config);
  if (!legacyEntity) {
    return { config };
  }

  const next = withoutLegacyEntity(config);
  const registry = registryEntry(hass, legacyEntity);
  const migratedDeviceId = stringValue(registry?.device_id);
  let usedWaterHeatingOverride = false;

  if (!next.device_id && migratedDeviceId) {
    next.device_id = migratedDeviceId;
  }

  if (!next.device_id && canUseWaterHeatingOverride(hass, legacyEntity, next)) {
    next.entities = {
      ...(next.entities ?? {}),
      water_heating: legacyEntity,
    };
    usedWaterHeatingOverride = true;
  }

  return {
    config: next,
    legacy: {
      legacyEntity,
      migratedDeviceId: next.device_id,
      usedWaterHeatingOverride,
      resolved: Boolean(next.device_id || usedWaterHeatingOverride || hasWaterHeatingOverride(next)),
    },
  };
}

export function logLegacyEntityMigration(source: string, migration: LegacyEntityMigration): void {
  const key = `${source}:${migration.legacyEntity}:${migration.migratedDeviceId ?? "unresolved"}`;
  if (loggedLegacyAnchors.has(key)) {
    return;
  }
  loggedLegacyAnchors.add(key);
  const target = migration.migratedDeviceId
    ? `device_id ${migration.migratedDeviceId}`
    : migration.usedWaterHeatingOverride
      ? "a temporary water_heating entity override"
      : "Home Assistant registry metadata";
  const action = migration.resolved
    ? `migrated to ${target}`
    : `waiting for ${target} before migration can complete`;
  console.warn(
    `DHE Connect Card: legacy card-level entity anchor "${migration.legacyEntity}" detected; ${action}. Update the card config to device_id.`,
  );
}

function legacyEntityAnchor(config: DheConnectCardConfig): string | undefined {
  return typeof config.entity === "string" && config.entity.trim()
    ? config.entity.trim()
    : undefined;
}

function withoutLegacyEntity(config: DheConnectCardConfig): DheConnectCardConfig {
  const next = { ...config };
  delete next.entity;
  return next;
}

function canUseWaterHeatingOverride(
  hass: HomeAssistant | undefined,
  entityId: string,
  config: DheConnectCardConfig,
): boolean {
  if (hasWaterHeatingOverride(config)) {
    return false;
  }
  return Boolean(hass?.states[entityId] && entityId.startsWith("climate."));
}

function hasWaterHeatingOverride(config: DheConnectCardConfig): boolean {
  const entities = config.entities;
  if (!entities) {
    return false;
  }
  if (typeof entities.water_heating === "string" && entities.water_heating.trim()) {
    return true;
  }
  const climateOverrides = entities.climate;
  return Boolean(
    climateOverrides &&
      typeof climateOverrides === "object" &&
      !Array.isArray(climateOverrides) &&
      typeof climateOverrides.water_heating === "string" &&
      climateOverrides.water_heating.trim(),
  );
}

function registryEntry(
  hass: HomeAssistant | undefined,
  entityId: string,
): HassRegistryEntity | undefined {
  return hass?.entities?.[entityId];
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
