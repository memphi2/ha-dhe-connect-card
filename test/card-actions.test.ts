import { describe, expect, it } from "vitest";
import { actionEventConfig, isActionConfigured } from "../src/card-actions";
import { normalizeConfig } from "../src/config";

describe("card action helpers", () => {
  it("treats explicit none actions as disabled", () => {
    expect(isActionConfigured({ action: "none" })).toBe(false);
    expect(isActionConfigured(undefined)).toBe(false);
    expect(isActionConfigured({ action: "more-info" })).toBe(true);
  });

  it("does not dispatch Home Assistant action events for tap none", () => {
    const config = normalizeConfig({ tap_action: { action: "none" } });

    expect(actionEventConfig(config, "tap", "sensor.water_flow")).toBeUndefined();
  });

  it("keeps hold and double tap actions when the tap action is disabled", () => {
    const config = normalizeConfig({
      tap_action: { action: "none" },
      hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
    });

    expect(actionEventConfig(config, "hold", "sensor.water_flow")).toEqual({
      entity: "sensor.water_flow",
      hold_action: {
        action: "navigate",
        entity: "sensor.water_flow",
        navigation_path: "/lovelace/dhe",
      },
    });
  });
});
