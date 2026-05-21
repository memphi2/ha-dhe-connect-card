import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/config";
import { discoverEntities } from "../src/discovery";
import { DiscoveryCache } from "../src/discovery-cache";
import type { HomeAssistant } from "../src/types";
import { INTEGRATION_DOMAIN } from "../src/types";

describe("discoverEntities", () => {
  it("uses registry device and translation keys for translated entity ids", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_verbindungsstatus": state("connected"),
        "sensor.dhe_connect_wasserfluss": state("4.2"),
        "switch.dhe_connect_eco": state("on"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_verbindungsstatus": registry("dev-a", "connection_state"),
        "sensor.dhe_connect_wasserfluss": registry("dev-a", "water_flow"),
        "switch.dhe_connect_eco": registry("dev-a", "eco_mode"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_durchlauferhitzer");
    expect(discovered.entityIds.connection_state).toBe("sensor.dhe_connect_verbindungsstatus");
    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_wasserfluss");
    expect(discovered.entityIds.eco_mode).toBe("switch.dhe_connect_eco");
    expect(discovered.deviceId).toBe("dev-a");
    expect(discovered.configEntryId).toBe("entry-a");
  });

  it("does not discover entities explicitly hidden by config", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_wasserfluss": state("4.2"),
        "sensor.dhe_connect_innen": state("48.0"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_wasserfluss": registry("dev-a", "water_flow"),
        "sensor.dhe_connect_innen": registry("dev-a", "inlet_temperature"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(
      hass,
      normalizeConfig({
        hide_entities: ["water_flow"],
      }),
    );

    expect(discovered.entityIds.water_flow).toBeUndefined();
    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_durchlauferhitzer");
    expect(discovered.entityIds.inlet_temperature).toBe("sensor.dhe_connect_innen");
  });

  it("honors explicit overrides before discovery", () => {
    const hass: HomeAssistant = {
      states: {
        "sensor.custom_flow": state("3.3"),
        "sensor.dhe_connect_water_flow": state("1.1"),
      },
      entities: {
        "sensor.custom_flow": registry("dev-a", "water_flow", { disabled_by: "user" }),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(
      hass,
      normalizeConfig({ entities: { water_flow: "sensor.custom_flow" } }),
    );

    expect(discovered.entityIds.water_flow).toBe("sensor.custom_flow");
  });

  it("ignores explicit overrides with the wrong domain and falls back to discovery", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.not_a_switch": state("on"),
        "switch.dhe_connect_eco": state("on"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.not_a_switch": registry("dev-a", "eco_mode"),
        "switch.dhe_connect_eco": registry("dev-a", "eco_mode"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(
      hass,
      normalizeConfig({
        entities: { eco_mode: "sensor.not_a_switch" },
      }),
    );

    expect(discovered.entityIds.eco_mode).toBe("switch.dhe_connect_eco");
  });

  it("does not discover registered entities from another configured device", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_a": state("heat"),
        "sensor.dhe_connect_a_water_flow": state("4.2"),
        "sensor.dhe_connect_b_water_flow": state("9.9"),
      },
      entities: {
        "climate.dhe_connect_a": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_a_water_flow": registry("dev-a", "unrelated_water_flow"),
        "sensor.dhe_connect_b_water_flow": registry("dev-b", "water_flow"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_a_water_flow");
  });

  it("uses the configured device as the discovery scope", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_a": state("heat"),
        "climate.dhe_connect_b": state("heat"),
        "sensor.dhe_connect_a_water_flow": state("4.2"),
        "sensor.dhe_connect_b_water_flow": state("9.9"),
      },
      entities: {
        "climate.dhe_connect_a": registry("dev-a", "water_heating"),
        "climate.dhe_connect_b": registry("dev-b", "water_heating"),
        "sensor.dhe_connect_a_water_flow": registry("dev-a", "water_flow"),
        "sensor.dhe_connect_b_water_flow": registry("dev-b", "water_flow"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({ device_id: "dev-b" }));

    expect(discovered.deviceId).toBe("dev-b");
    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_b");
    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_b_water_flow");
  });

  it("skips disabled and hidden registry entities during automatic discovery", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_disabled_water_flow": state("9.9"),
        "sensor.dhe_connect_water_flow": state("4.2"),
        "switch.dhe_connect_hidden_eco": state("on"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_disabled_water_flow": registry("dev-a", "water_flow", {
          disabled_by: "user",
        }),
        "sensor.dhe_connect_water_flow": registry("dev-a", "water_flow"),
        "switch.dhe_connect_hidden_eco": registry("dev-a", "eco_mode", {
          hidden_by: "user",
        }),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_water_flow");
    expect(discovered.entityIds.eco_mode).toBeUndefined();
  });

  it("keeps diagnostic registry fallbacks even when entities are integration-disabled", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_connection_state": state("connected"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_connection_state": registry("dev-a", "connection_state"),
        "sensor.dhe_connect_nominal_power": registry("dev-a", "nominal_power", {
          disabled_by: "integration",
        }),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({ device_id: "dev-a" }));

    expect(discovered.entityIds.connection_state).toBe("sensor.dhe_connect_connection_state");
    expect(discovered.entityIds.nominal_power).toBe("sensor.dhe_connect_nominal_power");
  });

  it("does not reuse one enabled same-device sensor for unrelated inactive keys", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_aktueller_stromverbrauch": state("11"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_aktueller_stromverbrauch": registry("dev-a", "power"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.entityIds.power).toBe("sensor.dhe_connect_aktueller_stromverbrauch");
    expect(discovered.entityIds.water_flow).toBeUndefined();
    expect(discovered.entityIds.inlet_temperature).toBeUndefined();
    expect(discovered.entityIds.outlet_temperature).toBeUndefined();
    expect(discovered.entityIds.energy_consumption_total).toBeUndefined();
  });

  it("falls back cleanly when HA states are temporarily malformed", () => {
    const hass = {
      states: null,
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
      },
      callService: async () => undefined,
    } as unknown as HomeAssistant;

    const discovered = discoverEntities(hass, normalizeConfig({ device_id: "dev-a" }));

    expect(discovered.entityIds).toEqual({});
    expect(discovered.deviceId).toBe("dev-a");
  });

  it("discovers the base climate entity without a configured entity anchor", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
        "sensor.dhe_connect_wasserfluss": state("4.2"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
        "sensor.dhe_connect_wasserfluss": registry("dev-a", "water_flow"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.baseEntity).toBe("climate.dhe_connect_durchlauferhitzer");
    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_durchlauferhitzer");
    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_wasserfluss");
  });

  it("falls back to discovery when the explicit water heating override is stale", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
      },
      entities: {
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(
      hass,
      normalizeConfig({ entities: { water_heating: "climate.old_dhe" } }),
    );

    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_durchlauferhitzer");
  });

  it("falls back to discovery when the explicit water heating override has the wrong domain", () => {
    const hass: HomeAssistant = {
      states: {
        "sensor.not_a_climate": state("heat"),
        "climate.dhe_connect_durchlauferhitzer": state("heat"),
      },
      entities: {
        "sensor.not_a_climate": registry("dev-a", "water_heating"),
        "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(
      hass,
      normalizeConfig({ entities: { water_heating: "sensor.not_a_climate" } }),
    );

    expect(discovered.entityIds.water_heating).toBe("climate.dhe_connect_durchlauferhitzer");
  });

  it("falls back to key suffixes without registry metadata", () => {
    const hass: HomeAssistant = {
      states: {
        "climate.dhe_connect_setpoint": state("heat"),
        "sensor.dhe_connect_water_flow": state("4.7"),
        "number.dhe_connect_bath_fill_target_volume": state("120"),
      },
      callService: async () => undefined,
    };

    const discovered = discoverEntities(hass, normalizeConfig({}));

    expect(discovered.entityIds.water_flow).toBe("sensor.dhe_connect_water_flow");
    expect(discovered.entityIds.bath_fill_target_volume).toBe(
      "number.dhe_connect_bath_fill_target_volume",
    );
  });
});

describe("DiscoveryCache", () => {
  it("reuses discovery across HA state updates when registry shape is unchanged", () => {
    const config = normalizeConfig({ device_id: "dev-a" });
    const firstHass: HomeAssistant = {
      states: {
        "climate.dhe": state("heat"),
        "sensor.power": state("10"),
      },
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
        "sensor.power": registry("dev-a", "power"),
      },
      callService: async () => undefined,
    };
    const secondHass: HomeAssistant = {
      ...firstHass,
      states: {
        "climate.dhe": state("heat"),
        "sensor.power": state("12"),
      },
    };
    const cache = new DiscoveryCache();

    const first = cache.get(firstHass, config);
    const second = cache.get(secondHass, config);

    expect(second).toBe(first);
  });

  it("refreshes discovery when HA registry shape changes", () => {
    const config = normalizeConfig({ device_id: "dev-a" });
    const firstHass: HomeAssistant = {
      states: {
        "climate.dhe": state("heat"),
      },
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
      },
      callService: async () => undefined,
    };
    const secondHass: HomeAssistant = {
      ...firstHass,
      states: {
        ...firstHass.states,
        "sensor.power": state("12"),
      },
      entities: {
        ...firstHass.entities,
        "sensor.power": registry("dev-a", "power"),
      },
    };
    const cache = new DiscoveryCache();

    const first = cache.get(firstHass, config);
    const second = cache.get(secondHass, config);

    expect(second).not.toBe(first);
    expect(second.entityIds.power).toBe("sensor.power");
  });
});

function state(value: string) {
  return { state: value, attributes: {} };
}

function registry(
  deviceId: string,
  translationKey: string,
  overrides: Partial<NonNullable<HomeAssistant["entities"]>[string]> = {},
) {
  return {
    config_entry_id: "entry-a",
    device_id: deviceId,
    platform: INTEGRATION_DOMAIN,
    translation_key: translationKey,
    unique_id: `${INTEGRATION_DOMAIN}_entry_${translationKey}`,
    ...overrides,
  };
}
