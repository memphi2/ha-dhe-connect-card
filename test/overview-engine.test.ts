import { describe, expect, it } from "vitest";
import { ENTITY_DEFINITION_BY_KEY } from "../src/catalog";
import {
  buildOverviewTiles,
  overviewCondition,
  overviewGroup,
} from "../src/overview-engine";
import { normalizeConfig } from "../src/config";
import { entity, registry } from "./helpers/card";
import type { SectionRenderContext } from "../src/render-sections";
import type { DiscoveredEntities, EntityDefinition, HassEntity } from "../src/types";
import { DEFAULT_WEATHER_FORM, DEFAULT_WEATHER_SERVICE } from "../src/weather-services";

describe("advanced overview engine", () => {
  it("builds grouped metric tiles with visual conditions, trend, delta and sparklines", () => {
    const context = overviewContext({
      overview_entities: ["power"],
    });
    const discovered = discoveredEntities({ power: "sensor.power" });
    const [tile] = buildOverviewTiles(context, discovered);

    expect(tile?.group).toBe("energy");
    expect(tile?.condition).toBe("active");
    expect(tile).not.toHaveProperty("chips");
    expect(tile?.delta).toBe("+1.5 kW");
    expect(tile?.trend?.direction).toBe("up");
    expect(tile?.sparkline?.values).toEqual([1, 2, 3, 4]);
    expect(tile?.sparkline?.points).toContain("100,4");
  });

  it("marks healthy and failing status tiles conditionally", () => {
    expect(
      overviewCondition(
        ENTITY_DEFINITION_BY_KEY.error_status as EntityDefinition,
        entity("kein fehler"),
      ),
    ).toBe("ok");
    expect(
      overviewCondition(
        ENTITY_DEFINITION_BY_KEY.error_status as EntityDefinition,
        entity("target_below_inlet"),
      ),
    ).toBe("alert");
    expect(
      overviewCondition(
        ENTITY_DEFINITION_BY_KEY.error_status as EntityDefinition,
        entity("unavailable"),
      ),
    ).toBe("alert");
    expect(
      overviewCondition(
        ENTITY_DEFINITION_BY_KEY.error_status as EntityDefinition,
        entity("unknown"),
      ),
    ).toBe("alert");
    expect(
      overviewCondition(
        ENTITY_DEFINITION_BY_KEY.device_status as EntityDefinition,
        entity("offline"),
      ),
    ).toBe("alert");
  });

  it("assigns overview groups by semantic entity purpose", () => {
    expect(overviewGroup(ENTITY_DEFINITION_BY_KEY.water_flow as EntityDefinition)).toBe("water");
    expect(overviewGroup(ENTITY_DEFINITION_BY_KEY.outlet_temperature as EntityDefinition)).toBe(
      "temperature",
    );
    expect(overviewGroup(ENTITY_DEFINITION_BY_KEY.bath_fill_remaining_volume as EntityDefinition)).toBe(
      "bath",
    );
    expect(overviewGroup(ENTITY_DEFINITION_BY_KEY.eco_mode as EntityDefinition)).toBe("saving");
  });
});

function overviewContext(
  config: Parameters<typeof normalizeConfig>[0],
): SectionRenderContext {
  const normalized = normalizeConfig(config);
  const states = {
    "sensor.power": entity("12", {
      change: 1.5,
      friendly_name: "Current power consumption",
      history: [1, 2, 3, 4],
      unit_of_measurement: "kW",
    }),
  };
  return {
    hass: {
      states,
      entities: {
        "sensor.power": registry("device-a", "power"),
      },
      callService: async () => undefined,
    },
    config: normalized,
    weatherService: DEFAULT_WEATHER_SERVICE,
    weatherForm: { ...DEFAULT_WEATHER_FORM },
    entity: (discovered, key) => {
      const definition = ENTITY_DEFINITION_BY_KEY[key] ?? ENTITY_DEFINITION_BY_KEY.power;
      const entityId = discovered.entityIds[key];
      return {
        definition: definition as EntityDefinition,
        entityId,
        state: entityId ? (states as Record<string, HassEntity>)[entityId] : undefined,
      };
    },
    canRender: (_definition, state) => Boolean(state),
    iconBubbleClass: () => "icon-bubble energy active",
    renderClimateControl: () => "",
    renderRowControl: () => "",
    isActionBusy: () => false,
    isServiceBusy: () => false,
    isEntityBusy: () => false,
    handleTap: () => undefined,
    handleDoubleTap: () => undefined,
    startHold: () => undefined,
    cancelHold: () => undefined,
    pressButton: () => undefined,
    setNumber: () => undefined,
    setText: () => undefined,
    callWeather: () => undefined,
    setWeatherService: () => undefined,
    setWeatherFormValue: () => undefined,
  };
}

function discoveredEntities(entityIds: Record<string, string>): DiscoveredEntities {
  return {
    baseEntity: "climate.dhe",
    deviceId: "device-a",
    entityIds,
    definitions: Object.values(ENTITY_DEFINITION_BY_KEY),
  };
}
