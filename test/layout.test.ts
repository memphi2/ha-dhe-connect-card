import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/config";
import { layoutCardSize, layoutClassNames, layoutStyle } from "../src/layout";

describe("layout helpers", () => {
  it("builds stable card classes for layout and tile sizing", () => {
    const config = normalizeConfig({
      layout_mode: "tablet",
      tile_size: "large",
    });

    expect(layoutClassNames(config)).toEqual([
      "layout-tablet",
      "tile-size-large",
    ]);
  });

  it("exports overview grid variables for dynamic tile sizing", () => {
    const style = layoutStyle(
      normalizeConfig({
        overview_columns: 5,
        tile_size: "normal",
      }),
    );

    expect(style).toContain("--dhe-overview-columns: 5;");
    expect(style).toContain("--dhe-overview-tile-height: 60px;");
    expect(style).toContain("--dhe-layout-icon-bubble-size: 36px;");
  });

  it("lets mini auto mode keep its compact icon sizing", () => {
    const style = layoutStyle(
      normalizeConfig({
        layout_mode: "mini",
        tile_size: "auto",
      }),
    );

    expect(style).toContain("--dhe-overview-tile-height: clamp(52px, 7cqi, 68px);");
    expect(style).not.toContain("--dhe-layout-icon-bubble-size");
  });

  it("estimates larger cards for fullscreen-style modes", () => {
    expect(layoutCardSize(normalizeConfig({ layout_mode: "mini" }))).toBe(4);
    expect(layoutCardSize(normalizeConfig({ layout_mode: "panel" }))).toBe(10);
    expect(layoutCardSize(normalizeConfig({ layout_mode: "kiosk" }))).toBe(10);
  });
});
