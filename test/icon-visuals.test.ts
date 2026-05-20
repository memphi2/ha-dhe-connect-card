import { describe, expect, it } from "vitest";
import { ENTITY_DEFINITION_BY_KEY } from "../src/catalog";
import { iconVisualState } from "../src/icon-visuals";
import type { EntityDefinition } from "../src/types";

describe("icon visuals", () => {
  it.each([
    ["outlet_temperature", "hot"],
    ["inlet_temperature", "water"],
    ["last_usage_water", "water"],
    ["last_usage_energy", "energy"],
    ["last_usage_time", "timer"],
    ["last_usage_cost", "energy"],
    ["eco_mode", "eco"],
    ["eco_flow_limit", "eco"],
    ["child_safety_active", "safety"],
    ["scald_protection_active", "safety"],
    ["device_status", "status"],
    ["connection_state", "status"],
    ["error_status", "alert"],
    ["wellness_summer_fitness", "wellness"],
    ["temperature_memory_1", "memory"],
    ["weather", "weather"],
    ["radio", "radio"],
    ["repair_pairing", "action"],
  ])("maps %s to the %s tone", (key, tone) => {
    expect(iconVisualState(definition(key), state("on")).tone).toBe(tone);
  });

  it.each(["protocol_version", "product_id", "device_info", "controlunit_name", "wlan_mac", "bluetooth_mac"])(
    "keeps diagnostic metadata %s neutral even when it is numeric",
    (key) => {
      expect(iconVisualState(definition(key), state("1")).tone).toBe("status");
    },
  );

  it("colors only live status entities from their state", () => {
    expect(iconVisualState(definition("device_status"), state("ready")).tone).toBe("ok");
    expect(iconVisualState(definition("device_status"), state("kein_fehler")).tone).toBe("ok");
    expect(iconVisualState(definition("connection_state"), state("keine_stoerung")).tone).toBe(
      "ok",
    );
    expect(iconVisualState(definition("connection_state"), state("offline")).tone).toBe("alert");
  });

  it("keeps explicit alert sensors state-aware", () => {
    expect(iconVisualState(definition("error_status"), state("0")).tone).toBe("ok");
    expect(iconVisualState(definition("error_status"), state("00")).tone).toBe("ok");
    expect(iconVisualState(definition("error_status"), state("0.0")).tone).toBe("ok");
    expect(iconVisualState(definition("error_status"), state("none")).tone).toBe("ok");
    expect(iconVisualState(definition("error_status"), state("kein_fehler")).tone).toBe("ok");
    expect(iconVisualState(definition("error_status"), state("1")).tone).toBe("alert");
    expect(iconVisualState(definition("error_status"), state("target_below_inlet")).tone).toBe(
      "alert",
    );
    expect(iconVisualState(definition("error_status"), state("fehler")).tone).toBe("alert");
    expect(iconVisualState(definition("error_status"), state("stoerung")).tone).toBe("alert");
  });

  it("does not treat numeric safety or metadata values as alerts", () => {
    expect(iconVisualState(definition("scald_protection_temperature_limit"), state("43")).tone).toBe(
      "safety",
    );
    expect(iconVisualState(definition("protocol_version"), state("1")).tone).toBe("status");
  });

  it.each(["playing", "paused", "buffering"])(
    "keeps radio animated for active media state %s",
    (value) => {
      const visual = iconVisualState(definition("radio"), state(value));
      expect(visual.active).toBe(true);
      expect(visual.animated).toBe(true);
    },
  );

  it.each(["off", "idle", "standby"])("keeps inactive media state %s still", (value) => {
    const visual = iconVisualState(definition("radio"), state(value));
    expect(visual.active).toBe(false);
    expect(visual.animated).toBe(false);
  });

  it("applies wellness visuals consistently to every wellness program", () => {
    const wellnessDefinitions = Object.values(ENTITY_DEFINITION_BY_KEY).filter((entry) =>
      entry.key.includes("wellness"),
    );

    expect(wellnessDefinitions.map((entry) => entry.key).sort()).toEqual([
      "wellness_circulation_support",
      "wellness_cold_prevention",
      "wellness_summer_fitness",
      "wellness_winter_refresh",
    ]);
    for (const wellnessDefinition of wellnessDefinitions) {
      const active = iconVisualState(wellnessDefinition, state("on"));
      const idle = iconVisualState(wellnessDefinition, state("off"));
      const animationsDisabled = iconVisualState(wellnessDefinition, state("on"), false);

      expect(active.tone).toBe("wellness");
      expect(active.motion).toBe("wellness");
      expect(active.active).toBe(true);
      expect(active.animated).toBe(true);
      expect(idle.tone).toBe("wellness");
      expect(idle.motion).toBe("wellness");
      expect(idle.active).toBe(false);
      expect(idle.animated).toBe(false);
      expect(animationsDisabled.animated).toBe(false);
    }
  });

  it("uses climate hvac_action for active water-heating visuals", () => {
    const waterHeating = definition("water_heating");

    expect(iconVisualState(waterHeating, state("heat", { hvac_action: "heating" })).tone).toBe(
      "hot",
    );
    expect(iconVisualState(waterHeating, state("heat", { hvac_action: "preheating" })).tone).toBe(
      "hot",
    );
    expect(iconVisualState(waterHeating, state("heat")).tone).toBe("hot");
    expect(iconVisualState(waterHeating, state("heat", { hvac_action: "idle" })).tone).toBe(
      "water",
    );
    expect(
      iconVisualState(waterHeating, state("heat", { hvac_action: "idle" })).animated,
    ).toBe(false);
  });
});

function definition(key: string): EntityDefinition {
  const entry = ENTITY_DEFINITION_BY_KEY[key];
  if (!entry) {
    throw new Error(`Missing entity definition for ${key}`);
  }
  return entry;
}

function state(value: string, attributes: Record<string, unknown> = {}) {
  return {
    state: value,
    attributes,
  };
}
