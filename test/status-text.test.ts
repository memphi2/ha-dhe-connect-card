import { describe, expect, it } from "vitest";
import { headerStatusText } from "../src/status-text";
import type { HomeAssistant } from "../src/types";

describe("headerStatusText", () => {
  it("prefers connection state over device and error status", () => {
    expect(
      headerStatusText(mockHass(), {
        connection: entity("connected"),
        device: entity("ready"),
        error: entity("error"),
        hasBaseEntity: true,
      }),
    ).toBe("Connection connected");
  });

  it("falls back to device status before error status", () => {
    expect(
      headerStatusText(mockHass("de"), {
        connection: entity("unavailable"),
        device: entity("ready"),
        error: entity("error"),
        hasBaseEntity: true,
      }),
    ).toBe("Gerät ready");
  });

  it("uses the discovered fallback when no status entity is usable", () => {
    expect(
      headerStatusText(mockHass(), {
        connection: entity("unavailable"),
        device: undefined,
        error: undefined,
        hasBaseEntity: true,
      }),
    ).toBe("Device discovered");
  });

  it("asks for a DHE device when discovery has no base entity", () => {
    expect(
      headerStatusText(mockHass("de"), {
        hasBaseEntity: false,
      }),
    ).toBe("DHE-Gerät auswählen");
  });
});

function mockHass(language = "en"): HomeAssistant {
  return {
    states: {},
    locale: { language },
    callService: async () => undefined,
  };
}

function entity(state: string) {
  return { state, attributes: {} };
}
