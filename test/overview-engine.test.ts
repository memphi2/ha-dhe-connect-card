import { describe, expect, it } from "vitest";
import { ENTITY_DEFINITION_BY_KEY } from "../src/catalog";
import { buildOverviewTiles, OverviewTileCache } from "../src/overview-engine";
import { normalizeConfig } from "../src/config";
import { entity, registry } from "./helpers/card";
import type { SectionRenderContext } from "../src/render-sections";
import type { DiscoveredEntities, EntityDefinition, EntityKey, HassEntity } from "../src/types";
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

  it("uses explicit trend_direction attributes for overview trends", () => {
    const context = overviewContext({
      overview_entities: ["power"],
    });
    const discovered = discoveredEntities({ power: "sensor.power" });
    (context.hass.states as Record<string, HassEntity>)["sensor.power"] = entity("12", {
      change: 1.5,
      trend_direction: "down",
      friendly_name: "Current power consumption",
      unit_of_measurement: "kW",
    });

    const [tile] = buildOverviewTiles(context, discovered);

    expect(tile?.trend?.direction).toBe("down");
    expect(tile?.trend?.icon).toBe("mdi:trending-down");
  });

  it("marks healthy and failing status tiles conditionally", () => {
    expect(overviewTileFor("error_status", entity("kein fehler"))?.condition).toBe("ok");
    expect(overviewTileFor("error_status", entity("target_below_inlet"))?.condition).toBe("alert");
    expect(overviewTileFor("error_status", entity("unavailable"))?.condition).toBe("alert");
    expect(overviewTileFor("error_status", entity("unknown"))?.condition).toBe("alert");
    expect(overviewTileFor("device_status", entity("offline"))?.condition).toBe("alert");
  });

  it("assigns overview groups by semantic entity purpose", () => {
    expect(overviewTileFor("water_flow", entity("0"))?.group).toBe("water");
    expect(overviewTileFor("outlet_temperature", entity("40"))?.group).toBe("temperature");
    expect(overviewTileFor("bath_fill_remaining_volume", entity("12"))?.group).toBe("bath");
    expect(overviewTileFor("eco_mode", entity("on"))?.group).toBe("saving");
  });

  it("reuses cached overview tiles when sparkline content remains unchanged", () => {
    const context = overviewContext({
      overview_entities: ["power"],
    });
    const discovered = discoveredEntities({ power: "sensor.power" });
    const cache = new OverviewTileCache();
    const first = cache.get(context, discovered);
    (context.hass.states as Record<string, HassEntity>)["sensor.power"] = entity("12", {
      change: 1.5,
      friendly_name: "Current power consumption",
      history: [1, 2, 3, 4],
      unit_of_measurement: "kW",
    });

    const second = cache.get(context, discovered);
    expect(second).toBe(first);
  });

  it("invalidates cached overview tiles for small sparkline value changes", () => {
    const context = overviewContext({
      overview_entities: ["power"],
    });
    const discovered = discoveredEntities({ power: "sensor.power" });
    const cache = new OverviewTileCache();
    const first = cache.get(context, discovered);
    (context.hass.states as Record<string, HassEntity>)["sensor.power"] = entity("12", {
      change: 1.5,
      friendly_name: "Current power consumption",
      history: [1, 2, 3, 4.001],
      unit_of_measurement: "kW",
    });

    const second = cache.get(context, discovered);
    expect(second).not.toBe(first);
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

function overviewTileFor(key: EntityKey, state: HassEntity) {
  const entityId = `sensor.${key}`;
  const context = overviewContext({
    overview_entities: [key],
  });
  (context.hass.states as Record<string, HassEntity>)[entityId] = state;
  const discovered = discoveredEntities({ [key]: entityId });
  return buildOverviewTiles(context, discovered)[0];
}
