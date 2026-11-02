import { describe, expect, it, vi } from "vitest";
import {
  adjustClimateTemperature,
  callEntityService,
  callWeatherService,
  climateTemperatureSettings,
  selectOption,
  setMediaVolume,
  setNumberValue,
  setClimateTemperature,
} from "../src/actions";
import type { HomeAssistant } from "../src/types";

describe("actions", () => {
  it("shares climate defaults between rendering and relative actions", async () => {
    expect(climateTemperatureSettings(undefined)).toEqual({ target: 38, min: 20, max: 60, step: 0.5 });
    const hass = mockHass();
    await adjustClimateTemperature(hass, "climate.dhe", undefined, 0.5);
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: "climate.dhe", temperature: 38.5,
    });
  });

  it("normalizes invalid climate bounds and steps consistently", () => {
    expect(climateTemperatureSettings({ state: "heat", attributes: { min_temp: 60, max_temp: 20, target_temp_step: 0 } }))
      .toEqual({ target: 38, min: 20, max: 60, step: 0.5 });
  });

  it.each([[60, 59.8], [20, 20.2]])("does not round %s outside device bounds", async (target, expected) => {
    const hass = mockHass();
    await setClimateTemperature(hass, "climate.dhe", {
      state: "heat", attributes: { min_temp: 20.2, max_temp: 59.8, target_temp_step: 0.5 },
    }, target);
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: "climate.dhe", temperature: expected,
    });
  });

  it("rounds and clamps climate setpoints", async () => {
    const hass = mockHass();
    await adjustClimateTemperature(
      hass,
      "climate.dhe",
      {
        state: "heat",
        attributes: { temperature: 59.8, min_temp: 20, max_temp: 60, target_temp_step: 0.5 },
      },
      1,
    );
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: "climate.dhe",
      temperature: 60,
    });
  });

  it("ignores invalid climate setpoint input", async () => {
    const hass = mockHass();
    await setClimateTemperature(hass, "climate.dhe", undefined, Number.NaN);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("rounds number values to the entity step", async () => {
    const hass = mockHass();
    await setNumberValue(
      hass,
      "number.dhe",
      { state: "4", attributes: { min: 4, max: 15, step: 0.5 } },
      "4.74",
    );
    expect(hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: "number.dhe",
      value: 4.5,
    });
  });

  it("ignores blank number input instead of coercing it to zero", async () => {
    const hass = mockHass();
    await setNumberValue(hass, "number.dhe", { state: "4", attributes: {} }, "");
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("drops empty weather fields and casts numeric fields", async () => {
    const hass = mockHass();
    await callWeatherService(hass, "add_weather_favorite", {
      name: "Berlin",
      country_id: "34",
      result_number: "1",
      location_id: "",
    });
    expect(hass.callService).toHaveBeenCalledWith(
      "stiebel_dhe_connect",
      "add_weather_favorite",
      {
        name: "Berlin",
        country_id: 34,
        result_number: 1,
      },
    );
  });

  it("limits search weather payloads to the integration service schema", async () => {
    const hass = mockHass();
    await callWeatherService(
      hass,
      "search_weather_location",
      {
        name: "Berlin",
        country_id: "34",
        result_number: "7",
        location_id: "ignored",
      },
      "entry-a",
    );
    expect(hass.callService).toHaveBeenCalledWith(
      "stiebel_dhe_connect",
      "search_weather_location",
      {
        entry_id: "entry-a",
        name: "Berlin",
        country_id: 34,
      },
    );
  });

  it("drops invalid numeric weather fields", async () => {
    const hass = mockHass();
    await callWeatherService(hass, "select_weather_location", {
      name: "Berlin",
      country_id: "not-a-number",
      result_number: "also-bad",
      location_id: "location-id",
    });
    expect(hass.callService).toHaveBeenCalledWith(
      "stiebel_dhe_connect",
      "select_weather_location",
      {
        name: "Berlin",
        location_id: "location-id",
      },
    );
  });

  it("does not call unsupported weather services", async () => {
    const hass = mockHass();
    await callWeatherService(hass, "delete_everything", {
      name: "Berlin",
    });
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("ignores invalid media volume input", async () => {
    const hass = mockHass();
    await setMediaVolume(hass, "media_player.dhe", "not-a-number");
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("ignores malformed entity ids in generic service calls", async () => {
    const hass = mockHass();
    await callEntityService(hass, "invalid_entity_id", "turn_on");
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("trims entity ids before calling Home Assistant services", async () => {
    const hass = mockHass();
    await callEntityService(hass, "  switch.kettle  ", "toggle");
    expect(hass.callService).toHaveBeenCalledWith(
      "switch",
      "toggle",
      { entity_id: "switch.kettle" },
    );
  });

  it("ignores only truly empty select options", async () => {
    const hass = mockHass();
    await selectOption(hass, "select.dhe", "");
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("preserves select options exactly before calling Home Assistant", async () => {
    const hass = mockHass();
    await selectOption(hass, "select.dhe", " eco ");
    expect(hass.callService).toHaveBeenCalledWith("select", "select_option", {
      entity_id: "select.dhe",
      option: " eco ",
    });
  });
});

function mockHass(): HomeAssistant {
  return {
    states: {},
    callService: vi.fn(async () => undefined),
  };
}
