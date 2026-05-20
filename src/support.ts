import { ENTITY_DEFINITIONS } from "./catalog";
import { matchesDefinitionIdentity } from "./entity-matching";
import { entityState, isUnavailable } from "./format";
import type {
  DiscoveredEntities,
  EntityDefinition,
  EntityDomain,
  EntityKey,
  HassEntity,
  HassRegistryEntity,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
} from "./types";
import { INTEGRATION_DOMAIN } from "./types";

export type SupportCheckLevel = "pass" | "warn" | "fail";
export type SupportEntityStatus = "available" | "unavailable" | "unknown" | "missing";
export type SupportRegistryStatus = "enabled" | "disabled" | "hidden" | "unknown";

export interface SupportEntityAudit {
  key: EntityKey;
  domain: EntityDomain;
  optional: boolean;
  diagnostic: boolean;
  dangerous: boolean;
  status: SupportEntityStatus;
  registryStatus: SupportRegistryStatus;
  entityIdHash?: string;
  registryHash?: string;
}

export interface SupportCheck {
  key:
    | "device"
    | "base_entity"
    | "entity_registry"
    | "device_registry"
    | "active_entities"
    | "required_entities"
    | "unavailable_entities"
    | "disabled_entities"
    | "custom_element"
    | "support_export";
  level: SupportCheckLevel;
  value?: number | string;
}

export interface SupportModel {
  generatedAt: string;
  summary: {
    knownEntities: number;
    mappedEntities: number;
    availableEntities: number;
    unavailableEntities: number;
    missingRequiredEntities: number;
    missingOptionalEntities: number;
    disabledOrHiddenRegistryEntities: number;
    diagnosticEntities: number;
  };
  diagnostics: {
    cardType: string;
    deviceIdHash?: string;
    configEntryIdHash?: string;
    baseEntityHash?: string;
    selectedDevice: boolean;
    entityRegistryAvailable: boolean;
    deviceRegistryAvailable: boolean;
    domains: Record<string, number>;
  };
  entities: SupportEntityAudit[];
  checks: SupportCheck[];
}

export interface SupportPackage {
  schema: "dhe-connect-card-support/v1";
  generated_at: string;
  card: {
    type: string;
    sections: string[];
    options: Record<string, boolean | number | string>;
    entity_overrides: number;
    hidden_entities: number;
    overview_entities: number;
  };
  diagnostics: SupportModel["diagnostics"];
  summary: SupportModel["summary"];
  checks: SupportCheck[];
  entities: SupportEntityAudit[];
}

export function buildSupportModel(
  hass: HomeAssistant,
  config: NormalizedDheConnectCardConfig,
  discovered: DiscoveredEntities,
): SupportModel {
  const registryAuditDeviceId = config.device_id ?? discovered.deviceId;
  const visibleDefinitions = ENTITY_DEFINITIONS.filter(
    (definition) => !config.hide_entities.includes(definition.key),
  );
  const entities = visibleDefinitions.map((definition) =>
    auditEntity(hass, discovered, definition, registryAuditDeviceId),
  );
  const mappedEntities = entities.filter((entity) => entity.entityIdHash).length;
  const availableEntities = entities.filter((entity) => entity.status === "available").length;
  const unavailableEntities = entities.filter((entity) =>
    ["unavailable", "unknown"].includes(entity.status),
  ).length;
  const missingRequiredEntities = entities.filter(
    (entity) => !entity.optional && entity.status === "missing",
  ).length;
  const missingOptionalEntities = entities.filter(
    (entity) => entity.optional && entity.status === "missing",
  ).length;
  const disabledOrHiddenRegistryEntities = registryAuditDeviceId
    ? dheRegistryEntities(hass, registryAuditDeviceId).filter(([, registry]) =>
        Boolean(registry.disabled_by || registry.hidden_by || registry.hidden),
      ).length
    : 0;
  const diagnosticEntities = entities.filter(
    (entity) => entity.diagnostic && entity.status !== "missing",
  ).length;
  const model: SupportModel = {
    generatedAt: new Date().toISOString(),
    summary: {
      knownEntities: visibleDefinitions.length,
      mappedEntities,
      availableEntities,
      unavailableEntities,
      missingRequiredEntities,
      missingOptionalEntities,
      disabledOrHiddenRegistryEntities,
      diagnosticEntities,
    },
    diagnostics: {
      cardType: config.type,
      deviceIdHash: hashValue(discovered.deviceId),
      configEntryIdHash: hashValue(discovered.configEntryId),
      baseEntityHash: hashValue(discovered.baseEntity),
      selectedDevice: selectedDeviceResolved(hass, config, discovered),
      entityRegistryAvailable: Boolean(hass.entities),
      deviceRegistryAvailable: Boolean(hass.devices),
      domains: domainCounts(hass, discovered),
    },
    entities,
    checks: [],
  };
  model.checks = compatibilityChecks(model);
  return model;
}

export function buildSupportPackage(
  model: SupportModel,
  config: NormalizedDheConnectCardConfig,
): SupportPackage {
  return {
    schema: "dhe-connect-card-support/v1",
    generated_at: model.generatedAt,
    card: {
      type: config.type,
      sections: [...config.sections],
      options: {
        show_unavailable: config.show_unavailable,
        show_optional: config.show_optional,
        show_diagnostics: config.show_diagnostics,
        show_weather_services: config.show_weather_services,
        show_icon_animations: config.show_icon_animations,
        show_display_buttons: config.show_display_buttons,
        show_support_mode: config.show_support_mode,
        icon_theme: config.icon_theme,
        layout_mode: config.layout_mode,
        tile_size: config.tile_size,
        overview_columns: config.overview_columns,
      },
      entity_overrides: Object.keys(config.entities).length,
      hidden_entities: config.hide_entities.length,
      overview_entities: config.overview_entities.length,
    },
    diagnostics: model.diagnostics,
    summary: model.summary,
    checks: model.checks,
    entities: model.entities,
  };
}

export function supportPackageFileName(date = new Date()): string {
  const stamp = date.toISOString().replace(/[:.]/g, "-");
  return `dhe-connect-card-support-${stamp}.json`;
}

export function downloadJsonFile(fileName: string, json: string): void {
  if (
    typeof document === "undefined" ||
    typeof URL === "undefined" ||
    typeof URL.createObjectURL !== "function" ||
    typeof Blob === "undefined"
  ) {
    return;
  }
  const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function selectedDeviceResolved(
  hass: HomeAssistant,
  config: NormalizedDheConnectCardConfig,
  discovered: DiscoveredEntities,
): boolean {
  const deviceId = config.device_id ?? discovered.deviceId;
  if (!deviceId) {
    return false;
  }
  if (hass.devices?.[deviceId]) {
    return true;
  }
  return dheRegistryEntities(hass, deviceId).some(
    ([, registry]) => registry.device_id === deviceId,
  );
}

function auditEntity(
  hass: HomeAssistant,
  discovered: DiscoveredEntities,
  definition: EntityDefinition,
  registryAuditDeviceId: string | undefined,
): SupportEntityAudit {
  const entityId = discovered.entityIds[definition.key];
  const registryEntry =
    (entityId ? ([entityId, hass.entities?.[entityId]] as const) : undefined) ??
    registryEntityForDefinition(hass, registryAuditDeviceId, definition);
  const registryEntityId = registryEntry?.[0];
  const registry = registryEntry?.[1];
  const state = entityState(hass, entityId ?? registryEntityId);
  return {
    key: definition.key,
    domain: definition.domain,
    optional: Boolean(definition.optional),
    diagnostic: Boolean(definition.diagnostic),
    dangerous: Boolean(definition.dangerous),
    status: entityStatus(state),
    registryStatus: registryStatus(registry),
    entityIdHash: hashValue(entityId ?? registryEntityId),
    registryHash: hashValue(registry?.unique_id ?? registry?.translation_key),
  };
}

function compatibilityChecks(model: SupportModel): SupportCheck[] {
  return [
    {
      key: "device",
      level: model.diagnostics.selectedDevice ? "pass" : "warn",
    },
    {
      key: "base_entity",
      level: model.diagnostics.baseEntityHash ? "pass" : "fail",
    },
    {
      key: "entity_registry",
      level: model.diagnostics.entityRegistryAvailable ? "pass" : "warn",
    },
    {
      key: "device_registry",
      level: model.diagnostics.deviceRegistryAvailable ? "pass" : "warn",
    },
    {
      key: "active_entities",
      level: model.summary.availableEntities > 0 ? "pass" : "fail",
      value: model.summary.availableEntities,
    },
    {
      key: "required_entities",
      level: model.summary.missingRequiredEntities === 0 ? "pass" : "warn",
      value: model.summary.missingRequiredEntities,
    },
    {
      key: "unavailable_entities",
      level: model.summary.unavailableEntities === 0 ? "pass" : "warn",
      value: model.summary.unavailableEntities,
    },
    {
      key: "disabled_entities",
      level: model.summary.disabledOrHiddenRegistryEntities === 0 ? "pass" : "warn",
      value: model.summary.disabledOrHiddenRegistryEntities,
    },
    {
      key: "custom_element",
      level: customElementRegistered() ? "pass" : "warn",
    },
    {
      key: "support_export",
      level: "pass",
    },
  ];
}

function domainCounts(hass: HomeAssistant, discovered: DiscoveredEntities): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const entityId of Object.values(discovered.entityIds)) {
    if (!entityState(hass, entityId)) {
      continue;
    }
    const domain = entityId.split(".", 1)[0] ?? "unknown";
    counts[domain] = (counts[domain] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function dheRegistryEntities(
  hass: HomeAssistant,
  deviceId: string | undefined,
) {
  return Object.entries(hass.entities ?? {}).filter(([, registry]) => {
    if (registry.platform !== INTEGRATION_DOMAIN) {
      return false;
    }
    return !deviceId || registry.device_id === deviceId;
  });
}

function registryEntityForDefinition(
  hass: HomeAssistant,
  registryAuditDeviceId: string | undefined,
  definition: EntityDefinition,
): readonly [string, HassRegistryEntity] | undefined {
  if (!registryAuditDeviceId) {
    return undefined;
  }
  return dheRegistryEntities(hass, registryAuditDeviceId).find(([entityId, registry]) => {
    if (!entityId.startsWith(`${definition.domain}.`)) {
      return false;
    }
    return matchesDefinitionIdentity(definition, entityId, registry);
  });
}

function entityStatus(state: HassEntity | undefined): SupportEntityStatus {
  if (!state) {
    return "missing";
  }
  if (state.state === "unknown") {
    return "unknown";
  }
  return isUnavailable(state) ? "unavailable" : "available";
}

function registryStatus(registry: HassRegistryEntity | undefined): SupportRegistryStatus {
  if (!registry) {
    return "unknown";
  }
  if (registry.disabled_by) {
    return "disabled";
  }
  return registry.hidden || registry.hidden_by ? "hidden" : "enabled";
}

function customElementRegistered(): boolean {
  return typeof customElements === "undefined" || Boolean(customElements.get("dhe-connect-card"));
}

function hashValue(value: string | undefined | null): string | undefined {
  if (!value) {
    return undefined;
  }
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `h${(hash >>> 0).toString(16).padStart(8, "0")}`;
}
