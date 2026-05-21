import type { EntityDefinition, EntityKey, SectionId } from "./types";

export const DEFAULT_SECTIONS: SectionId[] = [
  "overview",
  "controls",
  "bath",
  "timers",
  "memory",
  "consumption",
  "saving",
  "weather",
  "radio",
  "diagnostics",
  "support",
  "actions",
];

export const FALLBACK_ENTITY_DEFINITION: EntityDefinition = {
  key: "unknown",
  domain: "sensor",
  section: "overview",
  label: "Unknown",
  icon: "mdi:help-circle-outline",
  order: 0,
};

const sensorDefinitions: EntityDefinition[] = [
  sensor("water_flow", "overview", "Current water flow", "mdi:waves-arrow-right", 10, false, [
    "wasserfluss",
    "wasserdurchfluss",
    "aktueller_wasserdurchfluss",
  ]),
  sensor("power", "overview", "Current power consumption", "mdi:flash", 11, false, [
    "stromverbrauch",
    "aktueller_stromverbrauch",
    "leistungsaufnahme",
    "aktuelle_leistungsaufnahme",
  ]),
  sensor("nominal_power", "diagnostics", "Nominal power", "mdi:flash-outline", 12, true),
  sensor("inlet_temperature", "overview", "Inlet temperature", "mdi:thermometer-low", 13, true, [
    "zulauftemperatur",
  ]),
  sensor("outlet_temperature", "overview", "Outlet temperature", "mdi:thermometer-high", 14, true, [
    "auslauftemperatur",
  ]),
  sensor("scald_protection_temperature_limit", "diagnostics", "Scald protection temperature limit", "mdi:thermometer-alert", 15, true),
  sensor("device_status", "overview", "Device status", "mdi:state-machine", 16, true),
  sensor("protocol_version", "diagnostics", "Protocol version", "mdi:protocol", 17, true),
  sensor("water_consumption_week", "consumption", "Water consumption week", "mdi:water", 30),
  sensor("water_consumption_year", "consumption", "Water consumption year", "mdi:water", 31),
  sensor("water_consumption_total", "consumption", "Total water consumption", "mdi:water-sync", 32),
  sensor("odb_hot_water_volume", "consumption", "Total hot water volume", "mdi:water-thermometer", 33, true),
  sensor("energy_consumption_week", "consumption", "Energy consumption week", "mdi:lightning-bolt", 34),
  sensor("energy_consumption_year", "consumption", "Energy consumption year", "mdi:lightning-bolt", 35),
  sensor("energy_consumption_total", "consumption", "Total energy consumption", "mdi:lightning-bolt-circle", 36),
  sensor("odb_heating_energy", "consumption", "Total heating energy", "mdi:radiator", 37, true),
  sensor("last_usage_water", "consumption", "Last usage water", "mdi:water-check", 38),
  sensor("last_usage_energy", "consumption", "Last usage energy", "mdi:lightning-bolt", 39),
  sensor("last_usage_time", "consumption", "Last usage duration", "mdi:timer-outline", 40),
  sensor("last_usage_cost", "consumption", "Last usage cost", "mdi:cash", 41),
  sensor("odb_possible_energy_saving", "saving", "Possible energy saving", "mdi:leaf-circle", 50, true),
  sensor("odb_actual_water_saving", "saving", "Actual water saving", "mdi:water-percent", 51, true),
  sensor("saving_monitor_consumption_water", "saving", "Saving monitor consumption water", "mdi:water", 52),
  sensor("saving_monitor_consumption_energy", "saving", "Saving monitor consumption energy", "mdi:flash", 53),
  sensor("saving_monitor_consumption_co2", "saving", "Saving monitor consumption CO2", "mdi:molecule-co2", 54),
  sensor("saving_monitor_activation_rate", "saving", "Saving monitor activation rate", "mdi:percent", 55),
  sensor("saving_monitor_possible_water", "saving", "Saving monitor possible water saving", "mdi:water-plus", 56),
  sensor("saving_monitor_possible_energy", "saving", "Saving monitor possible energy saving", "mdi:lightning-bolt-outline", 57),
  sensor("saving_monitor_possible_co2", "saving", "Saving monitor possible CO2 saving", "mdi:molecule-co2", 58),
  sensor("saving_monitor_possible_cost", "saving", "Saving monitor possible cost saving", "mdi:cash-plus", 59),
  sensor("saving_monitor_real_water", "saving", "Saving monitor real water saving", "mdi:water-check", 60),
  sensor("saving_monitor_real_energy", "saving", "Saving monitor real energy saving", "mdi:lightning-bolt", 61),
  sensor("saving_monitor_real_co2", "saving", "Saving monitor real CO2 saving", "mdi:molecule-co2", 62),
  sensor("saving_monitor_real_cost", "saving", "Saving monitor real cost saving", "mdi:cash-check", 63),
  sensor("bath_fill_remaining_volume", "bath", "Bath fill remaining", "mdi:bathtub", 70),
  sensor("bath_fill_current_volume", "bath", "Current bath fill volume", "mdi:bathtub-outline", 71, true),
  sensor("brush_timer_remaining", "timers", "Brush timer remaining", "mdi:toothbrush", 80),
  sensor("shower_timer_remaining", "timers", "Shower timer remaining", "mdi:shower-head", 81),
  sensor("wellness_runtime_normalized", "diagnostics", "Wellness runtime", "mdi:chart-timeline-variant", 90, true),
  sensor("error_status", "overview", "Error status", "mdi:alert-circle-outline", 18),
  sensor("reconnect_count", "diagnostics", "Reconnects", "mdi:restart", 91),
  sensor("connection_state", "diagnostics", "Connection state", "mdi:lan-connect", 92, false, ["verbindungsstatus"]),
  sensor("last_reconnect_reason", "diagnostics", "Last reconnect reason", "mdi:alert-outline", 93),
  sensor("next_reconnect_delay", "diagnostics", "Next reconnect delay", "mdi:timer-sand", 94),
  sensor("device_info", "diagnostics", "Device info", "mdi:information-outline", 95, true),
  sensor("product_id", "diagnostics", "Product ID", "mdi:identifier", 96, true),
  sensor("wlan_mac", "diagnostics", "WLAN MAC", "mdi:wifi", 97, true),
  sensor("bluetooth_mac", "diagnostics", "Bluetooth MAC", "mdi:bluetooth", 98, true),
  sensor("operating_duration", "diagnostics", "Operating duration", "mdi:clock-outline", 99, true),
];

const numberDefinitions: EntityDefinition[] = [
  number("bath_fill_target_volume", "bath", "Bath fill target volume", "mdi:bathtub", 100),
  number("child_safety_temperature_limit", "controls", "Child safety temperature limit", "mdi:thermometer-high", 101),
  number("eco_flow_limit", "controls", "Eco flow limit", "mdi:water-pump", 102),
  number("brush_timer_duration", "timers", "Brush timer seconds", "mdi:toothbrush", 103),
  number("shower_timer_duration", "timers", "Shower timer seconds", "mdi:timer-edit", 104),
  ...memoryRange().map((slot) =>
    number(
      `temperature_memory_${slot}_temperature`,
      "memory",
      `Memory ${slot} temperature`,
      memoryIcon(slot),
      120 + slot,
      slot > 2,
    ),
  ),
];

const switchDefinitions: EntityDefinition[] = [
  sw("eco_mode", "controls", "Eco mode", "mdi:leaf", 150),
  sw("child_safety_active", "controls", "Child safety", "mdi:thermometer-check", 151),
  sw("bath_fill_active", "bath", "Bath fill", "mdi:bathtub", 152),
  sw("brush_timer_active", "timers", "Brush timer", "mdi:toothbrush", 153),
  sw("shower_timer_active", "timers", "Shower timer", "mdi:shower-head", 154),
  sw("wellness_cold_prevention", "controls", "Cold prevention", "mdi:shower", 160),
  sw("wellness_winter_refresh", "controls", "Winter refresh", "mdi:snowflake-thermometer", 161),
  sw("wellness_summer_fitness", "controls", "Summer fitness", "mdi:weather-sunny", 162),
  sw("wellness_circulation_support", "controls", "Circulation support", "mdi:heart-pulse", 163),
];

const buttonDefinitions: EntityDefinition[] = [
  button("reset_brush_timer", "timers", "Reset brush timer", "mdi:toothbrush", 180, true),
  button("reset_shower_timer", "timers", "Reset shower timer", "mdi:shower-head", 181, true),
  button("repair_pairing", "actions", "Repair pairing", "mdi:refresh", 182, true, true),
  button("disconnect_radio_pairing", "actions", "Disconnect radio pairing", "mdi:speaker-bluetooth", 183, true, true),
  ...memoryRange().map((slot) =>
    button(`temperature_memory_${slot}`, "memory", `Memory ${slot}`, memoryIcon(slot), 200 + slot, slot > 2),
  ),
  ...memoryRange(3).map((slot) =>
    button(
      `delete_temperature_memory_${slot}`,
      "memory",
      `Delete memory ${slot}`,
      "mdi:trash-can-outline",
      230 + slot,
      true,
      true,
    ),
  ),
];

const textDefinitions: EntityDefinition[] = [
  {
    key: "controlunit_name",
    domain: "text",
    section: "diagnostics",
    label: "Device name",
    icon: "mdi:form-textbox",
    diagnostic: true,
    order: 90,
  },
  ...memoryRange().map((slot): EntityDefinition => ({
    key: `temperature_memory_${slot}_name`,
    domain: "text",
    section: "memory",
    label: `Memory ${slot} name`,
    icon: memoryIcon(slot),
    optional: slot > 2,
    order: 260 + slot,
  })),
];

export const ENTITY_DEFINITIONS: EntityDefinition[] = [
  {
    key: "water_heating",
    domain: "climate",
    section: "controls",
    label: "Water heating",
    icon: "mdi:water-thermometer",
    aliases: ["setpoint", "durchlauferhitzer"],
    order: 1,
  } satisfies EntityDefinition,
  {
    key: "scald_protection_active",
    domain: "binary_sensor",
    section: "diagnostics",
    label: "Scald protection active",
    icon: "mdi:shield-check",
    optional: true,
    diagnostic: true,
    order: 8,
  } satisfies EntityDefinition,
  ...sensorDefinitions,
  ...numberDefinitions,
  ...switchDefinitions,
  ...buttonDefinitions,
  ...textDefinitions,
  {
    key: "weather_location",
    domain: "select",
    section: "weather",
    label: "Weather location",
    icon: "mdi:map-marker",
    order: 300,
  } satisfies EntityDefinition,
  {
    key: "weather",
    domain: "weather",
    section: "weather",
    label: "Weather",
    icon: "mdi:weather-partly-cloudy",
    order: 301,
  } satisfies EntityDefinition,
  {
    key: "radio",
    domain: "media_player",
    section: "radio",
    label: "Radio",
    icon: "mdi:radio",
    order: 320,
  } satisfies EntityDefinition,
].sort((left, right) => left.order - right.order);

export const ENTITY_DEFINITION_BY_KEY = Object.fromEntries(
  ENTITY_DEFINITIONS.map((definition) => [definition.key, definition]),
) as Record<EntityKey, EntityDefinition>;

export const ENTITY_DEFINITIONS_BY_SECTION = Object.fromEntries(
  DEFAULT_SECTIONS.map((section) => [section, [] as EntityDefinition[]]),
) as Record<SectionId, EntityDefinition[]>;

for (const definition of ENTITY_DEFINITIONS) {
  ENTITY_DEFINITIONS_BY_SECTION[definition.section].push(definition);
}

export function memoryRange(start = 1, end = 12): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function memoryIcon(slot: number): string {
  return slot < 10 ? `mdi:numeric-${slot}-box-outline` : "mdi:counter";
}

function sensor(
  key: EntityKey,
  section: SectionId,
  label: string,
  icon: string,
  order: number,
  optional = false,
  aliases: string[] = [],
): EntityDefinition {
  return {
    key,
    domain: "sensor",
    section,
    label,
    icon,
    optional,
    diagnostic: section === "diagnostics",
    aliases,
    order,
  };
}

function number(
  key: EntityKey,
  section: SectionId,
  label: string,
  icon: string,
  order: number,
  optional = false,
): EntityDefinition {
  return { key, domain: "number", section, label, icon, optional, order };
}

function sw(
  key: EntityKey,
  section: SectionId,
  label: string,
  icon: string,
  order: number,
): EntityDefinition {
  return { key, domain: "switch", section, label, icon, order };
}

function button(
  key: EntityKey,
  section: SectionId,
  label: string,
  icon: string,
  order: number,
  optional = false,
  dangerous = false,
): EntityDefinition {
  return {
    key,
    domain: "button",
    section,
    label,
    icon,
    optional,
    dangerous,
    order,
  };
}
