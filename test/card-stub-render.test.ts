import { describe, expect, it } from "vitest";
import { DheConnectCard, entity, registry } from "./helpers/card";

describe("DheConnectCard stub config rendering", () => {
  it("does not use climate entities as stub config anchors", () => {
    const config = DheConnectCard.getStubConfig({
      states: {
        "climate.disabled_dhe": entity("heat"),
        "climate.hidden_dhe": entity("heat"),
        "climate.enabled_dhe": entity("heat"),
      },
      entities: {
        "climate.disabled_dhe": { disabled_by: "user" },
        "climate.hidden_dhe": { hidden_by: "user" },
        "climate.enabled_dhe": registry("dev-a", "water_heating"),
      },
      callService: async () => undefined,
    });

    expect(config.device_id).toBe("dev-a");
    expect("entity" in config).toBe(false);
  });

  it("prefers discovered DHE climate entities in the stub config", () => {
    const config = DheConnectCard.getStubConfig({
      states: {
        "climate.living_room": entity("heat"),
        "climate.dhe_connect_durchlauferhitzer": entity("heat"),
      },
      entities: {
        "climate.living_room": { platform: "generic_thermostat" },
        "climate.dhe_connect_durchlauferhitzer": {
          device_id: "dev-b",
          platform: "stiebel_dhe_connect",
          translation_key: "water_heating",
        },
      },
      callService: async () => undefined,
    });

    expect(config.device_id).toBe("dev-b");
    expect("entity" in config).toBe(false);
  });
});
