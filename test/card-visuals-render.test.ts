import { describe, expect, it, vi } from "vitest";
import { entity, renderCard, text, visibleText } from "./helpers/card";

describe("DheConnectCard visual rendering", () => {
  it("cleans the default card title from the climate friendly name", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", {
            friendly_name: "DHE Connect: Bathroom heater",
            temperature: 42,
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(text(card)).toContain("Bathroom heater");
    expect(text(card)).not.toContain("DHE Connect: Bathroom heater");
  });

  it("uses colored animation classes for active water metrics", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", {
            friendly_name: "DHE Connect Water flow",
            unit_of_measurement: "l/min",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
      },
    );

    expect(
      card.shadowRoot?.querySelector(
        ".metric .icon-bubble.animated.water.motion-water-flow.active",
      ),
    ).toBeTruthy();
    expect(card.shadowRoot?.querySelector(".overview-chip")).toBeFalsy();
    expect(card.shadowRoot?.querySelector(".metric-meta")).toBeFalsy();
  });

  it("renders outlet temperature with the hot icon tone", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.outlet_temperature": entity("41", {
            friendly_name: "Outlet temperature",
            unit_of_measurement: "°C",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { outlet_temperature: "sensor.outlet_temperature" },
      },
    );

    expect(
      card.shadowRoot?.querySelector(".metric .icon-bubble.animated.hot.motion-heat.active"),
    ).toBeTruthy();
  });

  it("switches status and alarm icon colors from ok to alert states", async () => {
    const okCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.error_status": entity("0", { friendly_name: "Error status" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["error_status"],
        entities: { error_status: "sensor.error_status" },
      },
    );

    expect(okCard.shadowRoot?.querySelector(".metric .icon-bubble.ok")).toBeTruthy();
    expect(okCard.shadowRoot?.querySelector(".metric .icon-bubble.alert")).toBeFalsy();
    expect(okCard.shadowRoot?.querySelector(".metric .icon-bubble.animated")).toBeFalsy();

    const alarmCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.error_status": entity("target_below_inlet", { friendly_name: "Error status" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        overview_entities: ["error_status"],
        entities: { error_status: "sensor.error_status" },
      },
    );

    expect(
      alarmCard.shadowRoot?.querySelector(
        ".metric .icon-bubble.animated.alert.motion-alert.active",
      ),
    ).toBeTruthy();
  });

  it("uses a warm water-heating header tone while heating", async () => {
    const activeCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { hvac_action: "heating", temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(
      activeCard.shadowRoot?.querySelector(
        "header .icon-bubble.primary.animated.hot.motion-heat.active",
      ),
    ).toBeTruthy();

    const preheatingCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { hvac_action: "preheating", temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(
      preheatingCard.shadowRoot?.querySelector(
        "header .icon-bubble.primary.animated.hot.motion-heat.active",
      ),
    ).toBeTruthy();

    const fallbackCard = await renderCard(
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

    expect(
      fallbackCard.shadowRoot?.querySelector(
        "header .icon-bubble.primary.animated.hot.motion-heat.active",
      ),
    ).toBeTruthy();

    const idleCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { hvac_action: "idle", temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(
      idleCard.shadowRoot?.querySelector("header .icon-bubble.primary.water.motion-heat"),
    ).toBeTruthy();
    expect(idleCard.shadowRoot?.querySelector("header .icon-bubble.primary.hot")).toBeFalsy();
    expect(idleCard.shadowRoot?.querySelector("header .icon-bubble.primary.animated")).toBeFalsy();

    const offCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("off", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(
      offCard.shadowRoot?.querySelector("header .icon-bubble.primary.water.motion-heat"),
    ).toBeTruthy();

    const unavailableCard = await renderCard(
      {
        states: {
          "climate.dhe": entity("unavailable", { temperature: 42 }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
      },
    );

    expect(
      unavailableCard.shadowRoot?.querySelector("header .icon-bubble.primary.water.motion-heat"),
    ).toBeTruthy();
    expect(unavailableCard.shadowRoot?.querySelector("header .icon-bubble.primary.hot")).toBeFalsy();
  });

  it("uses German labels when Home Assistant locale is German", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { hvac_action: "heating", temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
          "switch.eco": entity("on"),
        },
        locale: { language: "de" },
        callService: async () => undefined,
      },
      {
        name: "Bad",
        sections: ["overview", "controls"],
        entities: {
          water_flow: "sensor.water_flow",
          eco_mode: "switch.eco",
        },
      },
    );

    expect(text(card)).toContain("Durchfluss");
    expect(visibleText(card)).toContain("Aktueller Wasserfluss");
    expect(text(card)).toContain("Warmwasser");
    expect(text(card)).toContain("Eco-Modus");
    expect(text(card)).toContain("Ein");
  });

  it("renders wellness programs as controllable Mushroom-style rows", async () => {
    const callService = vi.fn(async () => undefined);
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.wellness_circulation": entity("on"),
        },
        locale: { language: "de" },
        callService,
      },
      {
        sections: ["controls"],
        entities: {
          wellness_circulation_boost: "switch.wellness_circulation",
        },
      },
    );

    expect(text(card)).toContain("Wellnessprogramme");
    expect(text(card)).toContain("Kreislauf-Boost");
    expect(
      card.shadowRoot?.querySelector(
        ".wellness .icon-bubble.animated.wellness.motion-wellness.active",
      ),
    ).toBeTruthy();

    (card.shadowRoot?.querySelector(".wellness button.chip") as HTMLButtonElement).click();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(callService).toHaveBeenCalledWith("switch", "turn_off", {
      entity_id: "switch.wellness_circulation",
    });
  });

  it("renders optional display-style buttons for device display controls", async () => {
    const callService = vi.fn(async () => undefined);
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on"),
          "switch.bath_fill": entity("off"),
          "switch.brush_timer": entity("on"),
          "switch.wellness_circulation": entity("off"),
          "text.memory_name": entity("Kitchen"),
          "number.memory_temperature": entity("43", { unit_of_measurement: "°C" }),
          "button.memory": entity("unknown"),
        },
        locale: { language: "de" },
        callService,
      },
      {
        sections: ["controls", "bath", "timers", "memory"],
        show_display_buttons: true,
        entities: {
          eco_mode: "switch.eco",
          bath_fill_active: "switch.bath_fill",
          brush_timer_active: "switch.brush_timer",
          wellness_circulation_boost: "switch.wellness_circulation",
          temperature_memory_1_name: "text.memory_name",
          temperature_memory_1_temperature: "number.memory_temperature",
          temperature_memory_1: "button.memory",
        },
      },
    );

    expect(card.shadowRoot?.querySelector(".display-button-grid.controls")).toBeTruthy();
    expect(card.shadowRoot?.querySelector(".display-button-grid.bath")).toBeTruthy();
    expect(card.shadowRoot?.querySelector(".display-button-grid.timers")).toBeTruthy();
    expect(card.shadowRoot?.querySelector(".display-button-grid.memory-display")).toBeTruthy();
    expect(text(card)).toContain("Eco-Modus");
    expect(text(card)).toContain("Badewannenfüllung");
    expect(text(card)).toContain("Zahnbürsten-Timer");
    expect(text(card)).toContain("Kreislauf-Boost");
    expect(text(card)).toContain("Kitchen");
    expect(card.shadowRoot?.querySelector('[data-entity-key="eco_mode"].active')).toBeTruthy();

    (
      card.shadowRoot?.querySelector(
        '[data-entity-key="eco_mode"] .display-button-control button.chip',
      ) as HTMLButtonElement
    ).click();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(callService).toHaveBeenCalledWith("switch", "turn_off", {
      entity_id: "switch.eco",
    });
  });

  it("adds animated mushroom-style icon classes for active controls", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "Eco mode" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["controls"],
        entities: { eco_mode: "switch.eco" },
      },
    );

    expect(
      card.shadowRoot?.querySelector(".icon-bubble.animated.eco.motion-eco.active"),
    ).toBeTruthy();
  });

  it("removes animated icon classes when icon animations are disabled", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { hvac_action: "heating", temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "Eco mode" }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview", "controls"],
        show_icon_animations: false,
        entities: {
          water_flow: "sensor.water_flow",
          eco_mode: "switch.eco",
        },
      },
    );

    expect(card.shadowRoot?.querySelector(".icon-bubble.animated")).toBeFalsy();
    expect(card.shadowRoot?.querySelector(".icon-bubble.eco.active")).toBeTruthy();
    expect(card.shadowRoot?.querySelector("header .icon-bubble.primary.hot.active")).toBeTruthy();
  });

  it("keeps inactive switch icons colored without animating or marking them active", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("off", { friendly_name: "Eco mode" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["controls"],
        entities: { eco_mode: "switch.eco" },
      },
    );

    const icon = card.shadowRoot?.querySelector(".entity-row .icon-bubble.eco");
    expect(icon).toBeTruthy();
    expect(icon?.classList.contains("animated")).toBe(false);
    expect(icon?.classList.contains("active")).toBe(false);
  });
});
