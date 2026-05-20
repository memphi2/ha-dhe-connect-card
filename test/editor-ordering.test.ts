import { describe, expect, it } from "vitest";
import { activeOverviewEntities, reorderActiveOverviewEntity, reorderItem } from "../src/editor-ordering";

describe("editor ordering helpers", () => {
  it("reorders items by source/target indices", () => {
    expect(reorderItem(["a", "b", "c"], "a", "c")).toEqual(["b", "c", "a"]);
    expect(reorderItem(["a", "b", "c"], "c", "a")).toEqual(["c", "a", "b"]);
  });

  it("keeps order when source and target are identical", () => {
    expect(reorderItem(["a", "b", "c"], "b", "b")).toEqual(["a", "b", "c"]);
  });

  it("keeps order unchanged for unknown drag keys", () => {
    expect(reorderItem(["a", "b", "c"], "x", "b")).toEqual(["a", "b", "c"]);
    expect(reorderItem(["a", "b", "c"], "a", "z")).toEqual(["a", "b", "c"]);
  });

  it("filters overview entities to active keys", () => {
    expect(activeOverviewEntities(["water", "eco", "memory"], new Set(["water", "memory"]))).toEqual([
      "water",
      "memory",
    ]);
  });

  it("reorders only active overview entities while keeping inactive entries in place", () => {
    const keys = ["water_flow", "outside_temp", "memory", "eco", "power"];
    const reordered = reorderActiveOverviewEntity(
      keys,
      "water_flow",
      "eco",
      new Set(["water_flow", "eco", "power"]),
    );

    expect(reordered).toEqual(["eco", "outside_temp", "memory", "water_flow", "power"]);
  });
});

