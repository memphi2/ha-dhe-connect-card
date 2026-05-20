import { describe, expect, it } from "vitest";
import { ENTITY_DEFINITION_BY_KEY } from "../src/catalog";
import {
  definitionAliases,
  definitionIdentityScore,
  matchesDefinitionIdentity,
} from "../src/entity-matching";
import type { EntityDefinition, HassRegistryEntity } from "../src/types";

describe("entity definition matching", () => {
  it("normalizes keys, labels and aliases once for discovery and support", () => {
    expect(definitionAliases(definition("water_flow"))).toContain("water_flow");
    expect(definitionAliases(definition("last_usage_energy"))).toContain("last_usage_energy");
  });

  it("matches registry translation keys, unique-id suffixes and object-id suffixes", () => {
    const waterFlow = definition("water_flow");

    expect(
      matchesDefinitionIdentity(waterFlow, "sensor.dhe_connect_wasserfluss", {
        translation_key: "water_flow",
      }),
    ).toBe(true);
    expect(
      matchesDefinitionIdentity(waterFlow, "sensor.dhe_connect_wasserfluss", {
        unique_id: "stiebel_dhe_connect_entry_water_flow",
      }),
    ).toBe(true);
    expect(matchesDefinitionIdentity(waterFlow, "sensor.bathroom_water_flow")).toBe(true);
  });

  it("keeps unrelated same-domain entities from reverse-mapping to inactive keys", () => {
    const power = definition("power");
    const waterFlow = definition("water_flow");
    const registry: HassRegistryEntity = {
      translation_key: "power",
      unique_id: "stiebel_dhe_connect_entry_power",
    };

    expect(definitionIdentityScore(power, "sensor.dhe_connect_power", registry)).toBeGreaterThan(0);
    expect(matchesDefinitionIdentity(waterFlow, "sensor.dhe_connect_power", registry)).toBe(false);
  });
});

function definition(key: string): EntityDefinition {
  const entry = ENTITY_DEFINITION_BY_KEY[key];
  if (!entry) {
    throw new Error(`Missing entity definition for ${key}`);
  }
  return entry;
}
