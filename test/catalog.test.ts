import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ENTITY_DEFINITIONS } from "../src/catalog";

interface IntegrationEntityKey {
  domain: string;
  key: string;
}

const integrationKeys = JSON.parse(
  readFileSync(join(process.cwd(), "test/fixtures/integration-entity-keys.json"), "utf8"),
) as IntegrationEntityKey[];

describe("entity catalog", () => {
  it("matches the integration entity translation keys", () => {
    const expected = integrationKeys.map(toKey).sort();
    const actual = ENTITY_DEFINITIONS.map(toKey).sort();
    expect(actual).toEqual(expected);
  });

  it("does not define duplicate entity keys", () => {
    const keys = ENTITY_DEFINITIONS.map(toKey);
    const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
    expect(duplicates).toEqual([]);
  });

  it("uses a renderable icon for the last energy usage entity", () => {
    expect(ENTITY_DEFINITIONS.find((definition) => definition.key === "last_usage_energy")?.icon).toBe(
      "mdi:lightning-bolt",
    );
  });

  it("does not use the non-rendering flash-check icon alias", () => {
    expect(ENTITY_DEFINITIONS.filter((definition) => definition.icon === "mdi:flash-check")).toEqual(
      [],
    );
  });
});

function toKey(entry: IntegrationEntityKey): string;
function toKey(entry: { domain: string; key: string }): string {
  return `${entry.domain}:${entry.key}`;
}
