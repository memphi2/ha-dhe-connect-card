import { describe, expect, it } from "vitest";
import {
  cardDisplayTitle,
  deviceNameSuffix,
  displayState,
  entityState,
  friendlyName,
  isHeatingEntityState,
  isUnavailable,
  normalizeDisplayText,
  numericAttribute,
  parseFiniteNumber,
  stripDeviceNamePrefix,
} from "../src/format";
import type { EntityDefinition, HomeAssistant } from "../src/types";

describe("isUnavailable", () => {
  it("does not hide unknown Home Assistant states", () => {
    expect(isUnavailable({ state: "unknown", attributes: {} })).toBe(false);
  });

  it("still treats unavailable and missing states as unavailable", () => {
    expect(isUnavailable({ state: "unavailable", attributes: {} })).toBe(true);
    expect(isUnavailable()).toBe(true);
  });

  it("removes repeated device prefixes from displayed entity names", () => {
    expect(stripDeviceNamePrefix("DHE Connect - Eco mode")).toBe("Eco mode");
    expect(stripDeviceNamePrefix("Stiebel DHE Connect: Current water flow")).toBe(
      "Current water flow",
    );
    expect(stripDeviceNamePrefix("Stiebel Eltron DHE Connect / Eco mode")).toBe(
      "Eco mode",
    );
    expect(stripDeviceNamePrefix("DHE Connect Card Update")).toBe("Update");
    expect(stripDeviceNamePrefix("Stiebel DHE Connect Update")).toBe("Update");
    expect(stripDeviceNamePrefix("DHE Connect DHE Connect Energy consumption")).toBe(
      "Energy consumption",
    );
    expect(stripDeviceNamePrefix("DHE-Connect - Eco mode")).toBe("Eco mode");
    expect(stripDeviceNamePrefix("DHE_Connect Durchlauferhitzer: Power")).toBe("Power");
    expect(stripDeviceNamePrefix("DHE Connect Aktueller Wasserdurchfluss")).toBe(
      "Aktueller Wasserdurchfluss",
    );
    expect(stripDeviceNamePrefix("DHE Connect Wetter-Standort")).toBe("Wetter-Standort");
    expect(deviceNameSuffix("DHE Connect")).toBe("");
  });

  it("cleans all visible text values, including live German HA names", () => {
    expect(normalizeDisplayText("DHE Connect 18/21/24")).toBe("18/21/24");
    expect(normalizeDisplayText("DHE Connect New York, USA")).toBe("New York, USA");
    expect(normalizeDisplayText("-3.5")).toBe("-3.5");
    expect(normalizeDisplayText("DHE Connect Durchlauferhitzer", "Warmwasser")).toBe(
      "Warmwasser",
    );
    expect(normalizeDisplayText("Stiebel DHE Connect Update", "Update")).toBe("Update");
  });

  it("falls back to the catalog label when the prefixed name has no useful label", () => {
    expect(
      friendlyName(definition("Water heating"), {
        state: "heat",
        attributes: { friendly_name: "DHE Connect" },
      }),
    ).toBe("Water heating");
  });

  it("cleans configured card titles before rendering", () => {
    expect(
      cardDisplayTitle(
        "DHE Connect Badezimmer",
        definition("Water heating"),
        {
          state: "heat",
          attributes: { friendly_name: "DHE Connect Durchlauferhitzer" },
        },
        {
          states: {},
          locale: { language: "de" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Badezimmer");
  });

  it("ignores non-string configured card titles", () => {
    expect(
      cardDisplayTitle(
        { entity_id: "climate.dhe" },
        definition("Water heating"),
        {
          state: "heat",
          attributes: { friendly_name: "DHE Connect Durchlauferhitzer" },
        },
        {
          states: {},
          locale: { language: "de" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Warmwasser");
  });

  it("uses localized catalog labels when no friendly name is available", () => {
    expect(
      friendlyName(definition("Water heating"), undefined, {
        states: {},
        locale: { language: "de" },
        callService: async () => undefined,
      }),
    ).toBe("Warmwasser");
  });

  it("uses localized catalog labels for generated DHE friendly names", () => {
    expect(
      friendlyName(
        {
          ...definition("Current water flow"),
          key: "water_flow",
          domain: "sensor",
          section: "overview",
        },
        {
          state: "4.2",
          attributes: { friendly_name: "DHE Connect - Current water flow" },
        },
        {
          states: {},
          locale: { language: "de" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Aktueller Wasserfluss");
  });

  it("uses localized generated-name fallbacks for German regional locales", () => {
    expect(
      friendlyName(
        {
          ...definition("Current water flow"),
          key: "water_flow",
          domain: "sensor",
          section: "overview",
        },
        {
          state: "4.2",
          attributes: { friendly_name: "DHE Connect - Current water flow" },
        },
        {
          states: {},
          locale: { language: "de-AT" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Aktueller Wasserfluss");
  });

  it("keeps custom friendly names after removing the device prefix", () => {
    expect(
      friendlyName(
        {
          ...definition("Current water flow"),
          key: "water_flow",
          domain: "sensor",
          section: "overview",
        },
        {
          state: "4.2",
          attributes: { friendly_name: "DHE Connect - Dusche" },
        },
        {
          states: {},
          locale: { language: "de" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Dusche");
  });

  it("keeps custom generated-label suffixes after removing the device prefix", () => {
    expect(
      friendlyName(
        {
          ...definition("Current water flow"),
          key: "water_flow",
          domain: "sensor",
          section: "overview",
        },
        {
          state: "4.2",
          attributes: { friendly_name: "DHE Connect - Basement Current water flow" },
        },
        {
          states: {},
          locale: { language: "de" },
          callService: async () => undefined,
        },
      ),
    ).toBe("Basement Current water flow");
  });

  it("localizes missing states", () => {
    expect(
      displayState({
        states: {},
        locale: { language: "de" },
        callService: async () => undefined,
      }),
    ).toBe("Nicht gefunden");
  });

  it("localizes common states without treating unknown as unavailable", () => {
    const hass = {
      states: {},
      locale: { language: "de" },
      callService: async () => undefined,
    };
    expect(displayState(hass, { state: "unknown", attributes: {} })).toBe("Unbekannt");
    expect(displayState(hass, { state: "unavailable", attributes: {} })).toBe(
      "Nicht verfügbar",
    );
    expect(displayState(hass, { state: "DHE Connect 18/21/24", attributes: {} })).toBe(
      "18/21/24",
    );
    expect(
      displayState(hass, {
        state: "-3.5",
        attributes: { unit_of_measurement: "°C" },
      }),
    ).toBe("-3.5 °C");
    expect(isUnavailable({ state: "unknown", attributes: {} })).toBe(false);
  });

  it("normalizes malformed Home Assistant state objects defensively", () => {
    const hass = {
      states: {
        "sensor.bad": { state: 12, attributes: undefined },
      },
      callService: async () => undefined,
    } as unknown as HomeAssistant;

    expect(entityState(hass, "sensor.bad")).toEqual({
      entity_id: "sensor.bad",
      state: "unknown",
      attributes: {},
    });
  });

  it("ignores null, boolean, and empty-string numeric attributes", () => {
    const state = {
      state: "0",
      attributes: {
        empty: "",
        missing_number: null,
        toggle: false,
        value: "4.5",
      },
    };

    expect(numericAttribute(state, "empty")).toBeUndefined();
    expect(numericAttribute(state, "missing_number")).toBeUndefined();
    expect(numericAttribute(state, "toggle")).toBeUndefined();
    expect(numericAttribute(state, "value")).toBe(4.5);
    expect(parseFiniteNumber(" 6 ")).toBe(6);
    expect(parseFiniteNumber("")).toBeUndefined();
  });

  it("detects active water heating from climate state and hvac action", () => {
    expect(isHeatingEntityState({ state: "heat", attributes: {} })).toBe(true);
    expect(
      isHeatingEntityState({
        state: "heat",
        attributes: { hvac_action: "preheating" },
      }),
    ).toBe(true);
    expect(
      isHeatingEntityState({
        state: "heat",
        attributes: { hvac_action: "idle" },
      }),
    ).toBe(false);
    expect(isHeatingEntityState({ state: "unavailable", attributes: {} })).toBe(false);
  });
});

function definition(label: string): EntityDefinition {
  return {
    key: "water_heating",
    domain: "climate",
    section: "controls",
    label,
    icon: "mdi:water-thermometer",
    order: 1,
  };
}
