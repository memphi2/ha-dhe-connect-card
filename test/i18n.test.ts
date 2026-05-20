import { describe, expect, it, vi } from "vitest";
import { ENTITY_DEFINITION_BY_KEY } from "../src/catalog";
import {
  entityLabel,
  localize,
  registerDheConnectTranslation,
  TRANSLATIONS_CHANGED_EVENT,
} from "../src/i18n";
import type { HomeAssistant } from "../src/types";

describe("i18n runtime translations", () => {
  it("uses late registered translation packs with English fallback", () => {
    registerDheConnectTranslation("zz", {
      ui: {
        state: {
          unavailable: "Runtime base unavailable",
        },
      },
      entity_labels: {
        error_status: "Runtime base error",
      },
    });

    const listener = vi.fn();
    window.addEventListener(TRANSLATIONS_CHANGED_EVENT, listener, { once: true });

    registerDheConnectTranslation("zz-ZZ", {
      ui: {
        label: {
          memory: "Runtime memory {slot}",
        },
        state: {
          loading: "Runtime loading",
        },
      },
      entity_labels: {
        water_heating: "Runtime water heating",
      },
    });

    const hass: HomeAssistant = {
      states: {},
      locale: { language: "zz-ZZ" },
      callService: async () => undefined,
    };

    expect(localize(hass, "state.loading")).toBe("Runtime loading");
    expect(localize(hass, "label.memory", { slot: 3 })).toBe("Runtime memory 3");
    expect(localize(hass, "state.unavailable")).toBe("Runtime base unavailable");
    expect(localize(hass, "state.unknown")).toBe("Unknown");
    expect(entityLabel(ENTITY_DEFINITION_BY_KEY["water_heating"]!, hass)).toBe(
      "Runtime water heating",
    );
    expect(entityLabel(ENTITY_DEFINITION_BY_KEY["error_status"]!, hass)).toBe(
      "Runtime base error",
    );
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({
      language: "zz-zz",
    });
  });
});
