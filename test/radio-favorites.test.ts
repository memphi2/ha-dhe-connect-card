import { describe, expect, it } from "vitest";
import { radioFavorites } from "../src/radio-favorites";

describe("radioFavorites", () => {
  it("keeps raw favorite names as source values when source_list is missing", () => {
    const favorites = radioFavorites({
      state: "playing",
      attributes: {
        source: "DHE Connect Oldie Radio",
        favorites: [{ id: 12, name: "DHE Connect Oldie Radio" }],
      },
    });

    expect(favorites).toEqual([
      {
        id: "12",
        label: "Oldie Radio",
        source: "DHE Connect Oldie Radio",
        active: true,
      },
    ]);
  });
});
