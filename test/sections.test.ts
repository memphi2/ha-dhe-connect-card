import { describe, expect, it } from "vitest";
import { sectionsWithSupportMode } from "../src/sections";

describe("sectionsWithSupportMode", () => {
  it("adds support after diagnostics when support mode is enabled", () => {
    expect(
      sectionsWithSupportMode(["overview", "diagnostics", "actions"], true),
    ).toEqual(["overview", "diagnostics", "support", "actions"]);
  });

  it("keeps existing section order when support is already configured", () => {
    expect(sectionsWithSupportMode(["support", "overview"], true)).toEqual([
      "support",
      "overview",
    ]);
  });

  it("does not add support when support mode is disabled", () => {
    expect(sectionsWithSupportMode(["overview", "actions"], false)).toEqual([
      "overview",
      "actions",
    ]);
  });
});
