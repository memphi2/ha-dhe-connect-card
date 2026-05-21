import { describe, expect, it } from "vitest";
import {
  checkedFromEvent,
  inputStringFromEvent,
  pickerValueFromEvent,
  textInputValue,
} from "../src/editor-events";

describe("editor event helpers", () => {
  it("prefers a checked target when both target and currentTarget exist", () => {
    const event = {
      target: { checked: true },
      currentTarget: { checked: false },
    } as unknown as Event;

    expect(checkedFromEvent(event)).toBe(true);
  });

  it("falls back to currentTarget checked when target has no checked value", () => {
    const event = {
      target: {},
      currentTarget: { checked: true },
    } as unknown as Event;

    expect(checkedFromEvent(event)).toBe(true);
  });

  it("returns false when checked state is unavailable", () => {
    const event = {
      target: {},
      currentTarget: {},
    } as unknown as Event;

    expect(checkedFromEvent(event)).toBe(false);
  });

  it("reads text values from input events safely", () => {
    expect(inputStringFromEvent({ target: { value: "abc" } } as unknown as Event)).toBe("abc");
    expect(inputStringFromEvent({ target: { value: 42 } } as unknown as Event)).toBe("");
    expect(textInputValue("abc")).toBe("abc");
    expect(textInputValue(42)).toBe("");
  });

  it("reads picker values from detail first and falls back to target", () => {
    const detailEvent = {
      detail: { value: "sensor.power" },
      target: { value: "sensor.ignored" },
    } as unknown as Event;
    expect(pickerValueFromEvent(detailEvent)).toBe("sensor.power");

    const targetEvent = {
      detail: {},
      target: { value: "sensor.power" },
    } as unknown as Event;
    expect(pickerValueFromEvent(targetEvent)).toBe("sensor.power");
  });
});
