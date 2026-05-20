import { describe, expect, it } from "vitest";
import {
  auditDheStates,
  domainCounts,
  integrationKeySet,
  isAuditableFallbackDheState,
} from "../scripts/ha_live_entity_audit.mjs";

describe("HA live entity audit helpers", () => {
  it("ignores fallback update entities that only describe the integration package", () => {
    const states = [
      state("climate.dhe_water_heating", "heat", "DHE Connect Durchlauferhitzer"),
      state("sensor.dhe_water_flow", "2.4", "DHE Connect Wasserdurchfluss"),
      state("update.stiebel_dhe_connect_update", "off", "Stiebel DHE Connect Update"),
    ];

    expect(isAuditableFallbackDheState(states[2])).toBe(false);
    expect(auditDheStates(states, [])).toEqual([states[0], states[1]]);
    expect([...domainCounts(auditDheStates(states, [])).keys()]).toEqual([
      "climate",
      "sensor",
    ]);
  });

  it("uses the registry as the authoritative live integration surface when present", () => {
    const states = [
      state("climate.dhe_water_heating", "heat", "DHE Connect Durchlauferhitzer"),
      state("sensor.dhe_water_flow", "2.4", "DHE Connect Wasserdurchfluss"),
      state("update.stiebel_dhe_connect_update", "off", "Stiebel DHE Connect Update"),
    ];
    const registry = [
      registryEntity("climate.dhe_water_heating", "water_heating"),
      registryEntity("update.stiebel_dhe_connect_update", "firmware", {
        disabled_by: "config_entry",
      }),
    ];

    expect(auditDheStates(states, registry)).toEqual([states[0], states[2]]);
    expect([...domainCounts(auditDheStates(states, registry)).keys()]).toEqual([
      "climate",
      "update",
    ]);
    expect(integrationKeySet(registry)).toEqual(
      new Set(["climate.water_heating", "update.firmware"]),
    );
  });

  it("maps dynamic wellness switches from their unique id suffix when translation keys are absent", () => {
    const registry = [
      registryEntity("switch.dhe_connect_cold_prevention", null, {
        unique_id: "stiebel_dhe_connect_entry_wellness_cold_prevention",
      }),
      registryEntity("switch.dhe_connect_winter_refresh", null, {
        unique_id: "stiebel_dhe_connect_entry_wellness_winter_refresh",
      }),
    ];

    expect(integrationKeySet(registry)).toEqual(
      new Set([
        "switch.wellness_cold_prevention",
        "switch.wellness_winter_refresh",
      ]),
    );
  });
});

function state(entityId, value, friendlyName) {
  return {
    entity_id: entityId,
    state: value,
    attributes: {
      friendly_name: friendlyName,
    },
  };
}

function registryEntity(entityId, translationKey, options = {}) {
  return {
    entity_id: entityId,
    translation_key: translationKey,
    platform: "stiebel_dhe_connect",
    ...options,
  };
}
