import { describe, expect, it } from "vitest";
import { normalizeStateToken } from "../src/state-token";

describe("normalizeStateToken", () => {
  it("normalizes whitespace and separators", () => {
    expect(normalizeStateToken("  NO_ERROR-state  ")).toBe("no error state");
    expect(normalizeStateToken("target__below---inlet")).toBe("target below inlet");
  });

  it("returns an empty token for non-string values", () => {
    expect(normalizeStateToken(undefined)).toBe("");
    expect(normalizeStateToken(null)).toBe("");
    expect(normalizeStateToken(42)).toBe("");
  });
});
