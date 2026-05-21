import { describe, expect, it } from "vitest";
import { registerDheConnectTranslation } from "../src/i18n";
import type { HomeAssistant } from "../src/types";
import { DheConnectCard, entity, registry, renderCard, text, visibleText } from "./helpers/card";

describe("DheConnectCard layout rendering", () => {
  it("uses tile size for density and card-size estimates", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(card.getCardSize()).toBe(5);
    expect(card.shadowRoot?.querySelector("ha-card")?.classList.contains("tile-size-auto")).toBe(
      true,
    );

    card.setConfig({
      type: "custom:dhe-connect-card",
      tile_size: "large",
      sections: ["overview"],
    });
    await card.updateComplete;

    expect(card.getCardSize()).toBe(9);
    expect(card.shadowRoot?.querySelector("ha-card")?.classList.contains("tile-size-large")).toBe(
      true,
    );
  });

  it("refreshes cached overview labels after runtime translation updates in the same locale", async () => {
    registerDheConnectTranslation("qa", {
      ui: {
        overview_short: {
          water_flow: "Flow Runtime A",
        },
      },
    });

    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        locale: { language: "qa-QA" },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["water_flow"],
        entities: { water_flow: "sensor.water_flow" },
      },
    );

    expect(text(card)).toContain("Flow Runtime A");

    registerDheConnectTranslation("qa", {
      ui: {
        overview_short: {
          water_flow: "Flow Runtime B",
        },
      },
    });
    await Promise.resolve();
    await card.updateComplete;

    expect(text(card)).toContain("Flow Runtime B");
    expect(text(card)).not.toContain("Flow Runtime A");
  });

  it("applies native layout, tile size and icon theme classes", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        icon_theme: "ha",
        layout_mode: "tablet",
        tile_size: "large",
      },
    );

    const shell = card.shadowRoot?.querySelector("ha-card");
    expect(shell?.classList.contains("icon-theme-ha")).toBe(true);
    expect(shell?.classList.contains("layout-tablet")).toBe(true);
    expect(shell?.classList.contains("tile-size-large")).toBe(true);
    expect(shell?.getAttribute("style")).toContain("--dhe-overview-tile-height: 72px;");
  });

  it("uses layout-mode-aware card size estimates", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        layout_mode: "mini",
        sections: ["overview"],
      },
    );

    expect(card.getCardSize()).toBe(4);

    card.setConfig({
      type: "custom:dhe-connect-card",
      layout_mode: "kiosk",
      sections: ["overview"],
    });
    await card.updateComplete;

    expect(card.getCardSize()).toBe(10);
  });

  it("applies custom icon color variables to the card shell", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        icon_theme: "custom",
        icon_colors: {
          hot: "#ff3300",
          water: "var(--primary-color)",
        },
      },
    );

    const shell = card.shadowRoot?.querySelector("ha-card") as HTMLElement;
    expect(shell.classList.contains("icon-theme-custom")).toBe(true);
    expect(shell.getAttribute("style")).toContain("--dhe-user-icon-hot-color: #ff3300;");
    expect(shell.getAttribute("style")).toContain(
      "--dhe-user-icon-water-color: var(--primary-color);",
    );
  });

  it("keeps saved custom icon colors inactive outside the custom theme", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        icon_theme: "state",
        icon_colors: { hot: "#ff3300" },
      },
    );

    const shell = card.shadowRoot?.querySelector("ha-card") as HTMLElement;
    expect(shell.classList.contains("icon-theme-state")).toBe(true);
    expect(shell.getAttribute("style") ?? "").not.toContain("--dhe-user-icon-hot-color");
  });

  it("wraps sections in responsive block containers", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
          "weather.dhe": entity("sunny"),
          "select.weather_location": entity("Berlin", { options: ["Berlin"] }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview", "weather"],
        entities: {
          water_flow: "sensor.water_flow",
          weather: "weather.dhe",
          weather_location: "select.weather_location",
        },
      },
    );

    expect(card.shadowRoot?.querySelector(".content-grid")).toBeTruthy();
    expect(
      [...(card.shadowRoot?.querySelectorAll(".content-grid > .card-section") ?? [])].map(
        (section) => section.getAttribute("data-section"),
      ),
    ).toEqual(["overview", "weather"]);
  });

  it("renders card sections in the configured order", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
          "weather.dhe": entity("sunny"),
        },
        callService: async () => undefined,
      },
      {
        sections: ["weather", "overview"],
        entities: {
          water_flow: "sensor.water_flow",
          weather: "weather.dhe",
        },
      },
    );

    expect(
      [...(card.shadowRoot?.querySelectorAll(".content-grid > .card-section") ?? [])].map(
        (section) => section.getAttribute("data-section"),
      ),
    ).toEqual(["weather", "overview"]);
  });

  it("recovers from missing hass data after a reconnect", async () => {
    const card = document.createElement("dhe-connect-card") as DheConnectCard;
    card.setConfig({
      type: "custom:dhe-connect-card",
      device_id: "dev-a",
      sections: ["overview"],
    });
    document.body.append(card);
    await card.updateComplete;

    expect(text(card)).toContain("Loading");

    card.hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 42 }),
        "sensor.power": entity("10", { unit_of_measurement: "kW" }),
      },
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
        "sensor.power": registry("dev-a", "power"),
      },
      callService: async () => undefined,
    };
    await card.updateComplete;

    expect(text(card)).toContain("Power");
    expect(text(card)).toContain("10 kW");

    card.hass = undefined;
    await card.updateComplete;
    expect(text(card)).toContain("Loading");

    card.hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 43 }),
        "sensor.power": entity("12", { unit_of_measurement: "kW" }),
      },
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
        "sensor.power": registry("dev-a", "power"),
      },
      callService: async () => undefined,
    };
    await card.updateComplete;

    expect(text(card)).toContain("12 kW");
  });

  it("updates state values while reusing stable discovery after HA refreshes", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.power": entity("10", { unit_of_measurement: "kW" }),
        },
        entities: {
          "climate.dhe": registry("dev-a", "water_heating"),
          "sensor.power": registry("dev-a", "power"),
        },
        callService: async () => undefined,
      },
      {
        device_id: "dev-a",
        sections: ["overview"],
        overview_entities: ["power"],
      },
    );

    expect(text(card)).toContain("10 kW");

    card.hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 42 }),
        "sensor.power": entity("12", { unit_of_measurement: "kW" }),
      },
      entities: {
        "climate.dhe": registry("dev-a", "water_heating"),
        "sensor.power": registry("dev-a", "power"),
      },
      callService: async () => undefined,
    };
    await card.updateComplete;

    expect(text(card)).toContain("12 kW");
  });

  it("falls back to semantic discovery when registry metadata is unavailable", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe_connect_durchlauferhitzer": entity("heat", { temperature: 42 }),
          "sensor.dhe_connect_current_water_flow": entity("4.2", {
            friendly_name: "DHE Connect Current water flow",
            unit_of_measurement: "l/min",
          }),
        },
        callService: async () => undefined,
      },
      {
        device_id: "device-without-registry",
        sections: ["overview"],
      },
    );

    expect(visibleText(card)).toContain("Current water flow");
    expect(text(card)).toContain("4.2 l/min");
  });

  it("renders a fallback instead of throwing for malformed HA state objects", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe_connect_durchlauferhitzer": { state: 12, attributes: null },
        },
        callService: async () => undefined,
      } as unknown as HomeAssistant,
      {
        sections: ["overview"],
      },
    );

    expect(text(card)).toContain("Water heating");
    expect(text(card)).toContain("Unknown");
  });

  it("passes the configured overview column count to the metric grid", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
          "sensor.power": entity("11", { unit_of_measurement: "kW" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_columns: 4,
        tile_size: "compact",
        entities: {
          water_flow: "sensor.water_flow",
          power: "sensor.power",
        },
      },
    );

    const grid = card.shadowRoot?.querySelector(".metric-grid") as HTMLElement;
    expect(grid.style.getPropertyValue("--dhe-overview-columns").trim()).toBe("4");
    expect(grid.style.getPropertyValue("--dhe-overview-tile-height").trim()).toBe("52px");
  });

  it("renders button controls even when Home Assistant reports unknown", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "button.reset_brush_timer": entity("unknown", {
            friendly_name: "Reset brush timer",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["timers"],
        entities: { reset_brush_timer: "button.reset_brush_timer" },
      },
    );

    expect(text(card)).toContain("Reset brush timer");
    expect(text(card)).toContain("Press");
  });

  it("does not render empty sections when all rows return Lit nothing", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["memory"],
      },
    );

    expect(text(card)).not.toContain("Temperature memories");
  });

  it("does not render an empty controls section", async () => {
    const card = await renderCard(
      {
        states: {},
        callService: async () => undefined,
      },
      {
        sections: ["controls"],
      },
    );

    expect(
      [...(card.shadowRoot?.querySelectorAll("section h3") ?? [])].map(
        (heading) => heading.textContent,
      ),
    ).not.toContain("Water heating");
  });

  it("renders all active sensor rows unless they are hidden", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_year": entity("12", {
            friendly_name: "Water consumption year",
            unit_of_measurement: "m3",
          }),
          "sensor.energy_year": entity("8", {
            friendly_name: "Energy consumption year",
            unit_of_measurement: "kWh",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["consumption"],
        entities: {
          water_consumption_year: "sensor.water_year",
          energy_consumption_year: "sensor.energy_year",
        },
      },
    );

    expect(text(card)).toContain("Consumption");
    expect(text(card)).toContain("Water consumption year");
    expect(text(card)).toContain("12 m3");
    expect(text(card)).toContain("Energy consumption year");
    expect(text(card)).toContain("8 kWh");
  });

  it("renders entity labels without the repeated DHE Connect prefix", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", {
            friendly_name: "DHE Connect - Current water flow",
            unit_of_measurement: "l/min",
          }),
        },
        callService: async () => undefined,
      },
      {
        name: "Bathroom",
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
      },
    );

    expect(text(card)).toContain("Flow");
    expect(visibleText(card)).toContain("Current water flow");
    expect(visibleText(card)).not.toContain("DHE Connect - Current water flow");
  });

  it("does not render inactive overview keys by reusing the only active power sensor", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe_connect_durchlauferhitzer": entity("heat", { temperature: 42 }),
          "sensor.dhe_connect_aktueller_stromverbrauch": entity("11", {
            friendly_name: "DHE Connect Aktueller Stromverbrauch",
            unit_of_measurement: "kW",
          }),
        },
        entities: {
          "climate.dhe_connect_durchlauferhitzer": registry("dev-a", "water_heating"),
          "sensor.dhe_connect_aktueller_stromverbrauch": registry("dev-a", "power"),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    const metrics = [...(card.shadowRoot?.querySelectorAll(".metric") ?? [])];
    expect(metrics).toHaveLength(1);
    expect(metrics[0]?.textContent).toContain("Power");
    expect(visibleText(card)).toContain("Aktueller Stromverbrauch");
    expect(metrics[0]?.textContent).toContain("11 kW");
  });

  it("shows device status in the header before error status", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.device_status": entity("ready"),
          "sensor.error_status": entity("error"),
        },
        locale: { language: "de" },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: {
          device_status: "sensor.device_status",
          error_status: "sensor.error_status",
        },
      },
    );

    const status = card.shadowRoot?.querySelector("header p")?.textContent ?? "";
    expect(status).toBe("Gerät ready");
    expect(status).not.toContain("error");
  });

  it("renders configured status tiles in the overview", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.device_status": entity("ready", { friendly_name: "Device status" }),
          "sensor.error_status": entity("target_below_inlet", { friendly_name: "Error status" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["device_status", "error_status"],
        entities: {
          device_status: "sensor.device_status",
          error_status: "sensor.error_status",
        },
      },
    );

    const metrics = [...(card.shadowRoot?.querySelectorAll(".metric") ?? [])]
      .map((metric) => metric.textContent?.replace(/\s+/g, " ").trim())
      .join(" ");
    expect(metrics).toContain("Device");
    expect(metrics).toContain("ready");
    expect(metrics).toContain("Error");
    expect(metrics).toContain("target_below_inlet");
    expect(visibleText(card)).toContain("Device status");
    expect(visibleText(card)).toContain("Error status");
    expect(
      card.shadowRoot?.querySelector(".metric .icon-bubble.animated.alert.motion-alert.active"),
    ).toBeTruthy();
  });

  it("renders configured overview tiles from any known entity key", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "Eco mode" }),
          "sensor.last_usage_energy": entity("1.2", {
            friendly_name: "Last usage energy",
            unit_of_measurement: "kWh",
          }),
          "sensor.power": entity("8", {
            friendly_name: "Current power consumption",
            unit_of_measurement: "kW",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["eco_mode", "last_usage_energy"],
        entities: {
          eco_mode: "switch.eco",
          last_usage_energy: "sensor.last_usage_energy",
          power: "sensor.power",
        },
      },
    );

    const metrics = [...(card.shadowRoot?.querySelectorAll(".metric") ?? [])]
      .map((metric) => metric.textContent?.replace(/\s+/g, " ").trim())
      .join(" ");
    expect(metrics).toContain("Eco mode");
    expect(metrics).toContain("On");
    expect(metrics).toContain("Last usage energy");
    expect(metrics).toContain("1.2 kWh");
    expect(metrics).not.toContain("Current power consumption");
  });

  it("renders advanced overview details without visible group or condition chips", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.power": entity("8", {
            change: -1.2,
            friendly_name: "Current power consumption",
            history: [9, 8.5, 8],
            unit_of_measurement: "kW",
          }),
          "sensor.error_status": entity("target_below_inlet", {
            friendly_name: "Error status",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["power", "error_status"],
        entities: {
          power: "sensor.power",
          error_status: "sensor.error_status",
        },
      },
    );

    const power = card.shadowRoot?.querySelector('[data-overview-key="power"]');
    const error = card.shadowRoot?.querySelector('[data-overview-key="error_status"]');

    expect(power?.classList.contains("overview-group-energy")).toBe(true);
    expect(power?.querySelector(".overview-chip")).toBeNull();
    expect(power?.querySelector(".metric-meta")).toBeNull();
    expect(power?.querySelector(".overview-delta")?.textContent).toContain("-1.2 kW");
    expect(power?.querySelector(".overview-sparkline polyline")?.getAttribute("points")).toContain(
      "100,22",
    );
    expect(error?.classList.contains("overview-condition-alert")).toBe(true);
    expect(error?.querySelector(".overview-chip")).toBeNull();
    expect(error?.querySelector(".metric-meta")).toBeNull();
    expect(error?.textContent).not.toContain("Alert");
  });

  it("renders live-style German HA text without any DHE Connect prefix", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", {
            friendly_name: "DHE Connect Durchlauferhitzer",
            temperature: 42,
          }),
          "sensor.device_info": entity("DHE Connect 18/21/24", {
            friendly_name: "DHE Connect Geräteinfo",
          }),
          "weather.dhe": entity("sunny", {
            friendly_name: "DHE Connect New York, USA",
          }),
          "select.weather_location": entity("New York, USA", {
            friendly_name: "DHE Connect Wetter-Standort",
          }),
        },
        locale: { language: "de" },
        callService: async () => undefined,
      },
      {
        name: "DHE Connect Badezimmer",
        sections: ["diagnostics", "weather"],
        entities: {
          device_info: "sensor.device_info",
          weather: "weather.dhe",
          weather_location: "select.weather_location",
        },
      },
    );
    const rendered = visibleText(card);

    expect(rendered).toContain("Badezimmer");
    expect(rendered).toContain("Geräteinfo");
    expect(rendered).toContain("18/21/24");
    expect(rendered).toContain("New York, USA");
    expect(rendered).toContain("Wetter-Standort");
    expect(rendered).not.toMatch(/\bDHE[\s_-]*Connect\b/i);
  });

  it("renders diagnostic rows for registry-backed entities even without live state", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.dhe_connect_connection_state": entity("connected", {
            friendly_name: "Connection state",
          }),
        },
        entities: {
          "climate.dhe": registry("dev-a", "water_heating"),
          "sensor.dhe_connect_connection_state": registry("dev-a", "connection_state"),
          "sensor.dhe_connect_nominal_power": {
            ...registry("dev-a", "nominal_power"),
            disabled_by: "integration",
          },
        },
        callService: async () => undefined,
      },
      {
        sections: ["diagnostics"],
        show_diagnostics: true,
      },
    );

    const rendered = visibleText(card);
    expect(rendered).toContain("Nominal power");
    expect(rendered).toContain("Not found");
  });

  it("hides weather service controls by default and shows them when enabled", async () => {
    const hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 42 }),
        "weather.dhe": entity("sunny", { friendly_name: "Weather" }),
        "select.weather_location": entity("Berlin", {
          friendly_name: "Weather location",
          options: ["Berlin"],
        }),
      },
      callService: async () => undefined,
    };
    const baseConfig: Parameters<DheConnectCard["setConfig"]>[0] = {
      sections: ["weather"],
      entities: {
        weather: "weather.dhe",
        weather_location: "select.weather_location",
      },
    };

    const defaultCard = await renderCard(hass, baseConfig);
    expect(defaultCard.shadowRoot?.querySelector(".service-box")).toBeFalsy();

    const enabledCard = await renderCard(hass, {
      ...baseConfig,
      show_weather_services: true,
    });
    expect(enabledCard.shadowRoot?.querySelector(".service-box")).toBeTruthy();
  });

  it("re-evaluates section visibility when Home Assistant availability changes", async () => {
    const config: Parameters<DheConnectCard["setConfig"]>[0] = {
      sections: ["weather"],
      entities: {
        weather: "weather.dhe",
        weather_location: "select.weather_location",
      },
    };
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "weather.dhe": entity("sunny", { friendly_name: "Weather" }),
          "select.weather_location": entity("Berlin", {
            friendly_name: "Weather location",
            options: ["Berlin"],
          }),
        },
        callService: async () => undefined,
      },
      config,
    );

    expect(card.shadowRoot?.querySelector('[data-section="weather"]')).toBeTruthy();

    card.hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 42 }),
        "weather.dhe": entity("unavailable", { friendly_name: "Weather" }),
        "select.weather_location": entity("unavailable", {
          friendly_name: "Weather location",
          options: ["Berlin"],
        }),
      },
      callService: async () => undefined,
    };
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector('[data-section="weather"]')).toBeFalsy();

    card.hass = {
      states: {
        "climate.dhe": entity("heat", { temperature: 42 }),
        "weather.dhe": entity("sunny", { friendly_name: "Weather" }),
        "select.weather_location": entity("Berlin", {
          friendly_name: "Weather location",
          options: ["Berlin"],
        }),
      },
      callService: async () => undefined,
    };
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector('[data-section="weather"]')).toBeTruthy();
  });

  it("localizes generated card titles when Home Assistant locale is German", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", {
            friendly_name: "DHE Connect - Water heating",
            temperature: 42,
          }),
        },
        locale: { language: "de" },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(text(card)).toContain("Warmwasser");
    expect(text(card)).not.toContain("Water heating");
  });

  it("falls back to the catalog title when the climate friendly name is only the device name", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", {
            friendly_name: "DHE Connect",
            temperature: 42,
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(card.shadowRoot?.querySelector("header h2")?.textContent).toBe("Water heating");
  });

  it("localizes the header temperature aria label without placeholders", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", {
            current_temperature: 41,
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    const button = card.shadowRoot?.querySelector("header button.temperature");
    expect(button?.getAttribute("aria-label")).toBe("Current 41°");
    expect(button?.getAttribute("aria-label")).not.toContain("{value}");
  });
});
