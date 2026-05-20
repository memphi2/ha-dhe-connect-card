import { describe, expect, it } from "vitest";
import { DEFAULT_SECTIONS } from "../src/catalog";
import { normalizeConfig } from "../src/config";
import { OVERVIEW_KEYS } from "../src/entity-groups";

describe("normalizeConfig", () => {
  it("provides stable defaults", () => {
    const config = normalizeConfig({});
    expect(config.sections).toEqual(DEFAULT_SECTIONS);
    expect(config.overview_entities).toEqual(OVERVIEW_KEYS);
    expect(config.show_diagnostics).toBe(true);
    expect(config.show_weather_services).toBe(false);
    expect(config.show_icon_animations).toBe(true);
    expect(config.show_display_buttons).toBe(false);
    expect(config.icon_theme).toBe("state");
    expect(config.icon_colors).toEqual({});
    expect(config.layout_mode).toBe("auto");
    expect(config.tile_size).toBe("auto");
    expect(config.tap_action).toEqual({ action: "more-info" });
    expect(config.hold_action).toBeUndefined();
    expect(config.overview_columns).toBe(3);
  });

  it("maps legacy compact configs to tile size when tile_size is not set", () => {
    expect(normalizeConfig({ compact: true }).tile_size).toBe("compact");
    expect(normalizeConfig({ compact: false }).tile_size).toBe("large");
    expect(normalizeConfig({ compact: false, tile_size: "large" }).tile_size).toBe("large");
  });

  it("defensively normalizes malformed runtime config values", () => {
    const config = normalizeConfig({
      device_id: 123,
      compact: "false",
      show_diagnostics: "yes",
      overview_columns: "4",
      icon_theme: "neon",
      icon_colors: {
        water: " #03a9f4 ",
        hot: "red; background: black",
        unknown: "#fff",
      },
      layout_mode: "desktop",
      tile_size: "huge",
      sections: "overview",
      overview_entities: ["water_flow", 123, "unknown"],
      hide_entities: ["error_status", false, "unknown_key"],
      entities: {
        water_flow: " sensor.flow ",
        unknown_key: "sensor.unknown",
        sensor: { power: " sensor.power ", bad: 12, unknown_key: "sensor.unknown" },
        switch: 9,
      },
      tap_action: "more-info",
    });

    expect(config.device_id).toBeUndefined();
    expect(config.show_diagnostics).toBe(true);
    expect(config.overview_columns).toBe(3);
    expect(config.icon_theme).toBe("state");
    expect(config.icon_colors).toEqual({ water: "#03a9f4" });
    expect(config.layout_mode).toBe("auto");
    expect(config.tile_size).toBe("auto");
    expect(config.sections).toEqual(DEFAULT_SECTIONS);
    expect(config.overview_entities).toEqual(["water_flow"]);
    expect(config.hide_entities).toEqual(["error_status"]);
    expect(config.entities).toEqual({
      water_flow: "sensor.flow",
      sensor: { power: "sensor.power" },
    });
    expect(config.tap_action).toEqual({ action: "more-info" });
  });

  it("preserves Mushroom-style action configs", () => {
    const config = normalizeConfig({
      tap_action: { action: "toggle" },
      hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
      double_tap_action: { action: "more-info", entity: "sensor.custom" },
    });

    expect(config.tap_action).toEqual({ action: "toggle" });
    expect(config.hold_action).toEqual({
      action: "navigate",
      navigation_path: "/lovelace/dhe",
    });
    expect(config.double_tap_action).toEqual({
      action: "more-info",
      entity: "sensor.custom",
    });
  });

  it("filters invalid sections", () => {
    const config = normalizeConfig({
      sections: ["overview", "invalid" as "overview"],
    });
    expect(config.sections).toEqual(["overview"]);
  });

  it("deduplicates sections while preserving their configured order", () => {
    const config = normalizeConfig({
      sections: ["weather", "overview", "weather", "controls", "overview"],
    });
    expect(config.sections).toEqual(["weather", "overview", "controls"]);
  });

  it("allows icon animations to be disabled", () => {
    const config = normalizeConfig({
      show_icon_animations: false,
    });

    expect(config.show_icon_animations).toBe(false);
  });

  it("normalizes visual theme and layout modes", () => {
    expect(normalizeConfig({ icon_theme: "ha" }).icon_theme).toBe("ha");
    expect(normalizeConfig({ icon_theme: "muted" }).icon_theme).toBe("muted");
    expect(normalizeConfig({ icon_theme: "custom" }).icon_theme).toBe("custom");
    expect(normalizeConfig({ layout_mode: "mini" }).layout_mode).toBe("mini");
    expect(normalizeConfig({ layout_mode: "tablet" }).layout_mode).toBe("tablet");
    expect(normalizeConfig({ layout_mode: "kiosk" }).layout_mode).toBe("kiosk");
    expect(normalizeConfig({ tile_size: "compact" }).tile_size).toBe("compact");
    expect(normalizeConfig({ tile_size: "normal" }).tile_size).toBe("normal");
    expect(normalizeConfig({ tile_size: "large" }).tile_size).toBe("large");
  });

  it("normalizes custom icon theme colors safely", () => {
    const config = normalizeConfig({
      icon_theme: "custom",
      icon_colors: {
        water: "var(--primary-color)",
        hot: "#e53935",
        energy: "hsl(38 92% 50%)",
        eco: "rgb(67, 160, 71)",
        alert: "red; color: black",
        status: "color-mix(in srgb, red 50%, blue)",
        weather: "skyblue",
      },
    });

    expect(config.icon_colors).toEqual({
      water: "var(--primary-color)",
      hot: "#e53935",
      energy: "hsl(38 92% 50%)",
      eco: "rgb(67, 160, 71)",
      weather: "skyblue",
    });
  });

  it("allows weather service controls to be enabled explicitly", () => {
    const config = normalizeConfig({
      show_weather_services: true,
    });

    expect(config.show_weather_services).toBe(true);
  });

  it("normalizes overview entities from known entity keys", () => {
    const config = normalizeConfig({
      overview_entities: ["eco_mode", "invalid", "water_flow", "eco_mode"],
    });

    expect(config.overview_entities).toEqual(["eco_mode", "water_flow"]);
  });

  it("bounds the configured overview column count", () => {
    expect(normalizeConfig({ overview_columns: 4 }).overview_columns).toBe(4);
    expect(normalizeConfig({ overview_columns: 0 }).overview_columns).toBe(1);
    expect(normalizeConfig({ overview_columns: 12 }).overview_columns).toBe(6);
    expect(normalizeConfig({ overview_columns: 2.5 }).overview_columns).toBe(3);
  });

  it("allows the overview to be intentionally empty", () => {
    const config = normalizeConfig({ overview_entities: [] });

    expect(config.overview_entities).toEqual([]);
  });

  it("preserves non-string card names in runtime config", () => {
    const structuredName = { entity_id: "climate.dhe" };
    const config = normalizeConfig({
      name: structuredName,
    });

    expect(config.name).toBe(structuredName);
  });
});
