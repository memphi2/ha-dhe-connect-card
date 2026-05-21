import { describe, expect, it, vi } from "vitest";
import { entity, renderCard, visibleText } from "./helpers/card";

describe("DheConnectCard radio rendering", () => {
  it("renders selectable radio favorites without the DHE Connect prefix", async () => {
    const callService = vi.fn(async () => undefined);
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "media_player.radio": entity("playing", {
            friendly_name: "DHE Connect Radio",
            media_title: "DHE Connect Radio Stream",
            source: "DHE Connect WDR 2",
            source_list: ["DHE Connect WDR 2", "DHE Connect Antenne Düsseldorf"],
            favorites: [
              { id: 12, name: "DHE Connect WDR 2" },
              { id: 34, name: "DHE Connect Antenne Düsseldorf" },
            ],
            volume_level: 0.4,
          }),
        },
        locale: { language: "de" },
        callService,
      },
      {
        sections: ["radio"],
        entities: { radio: "media_player.radio" },
      },
    );

    const rendered = visibleText(card);
    expect(rendered).toContain("Radio-Favoriten");
    expect(rendered).toContain("WDR 2");
    expect(rendered).toContain("Antenne Düsseldorf");
    expect(rendered).not.toMatch(/\bDHE[\s_-]*Connect\b/i);
    const favoriteList = card.shadowRoot?.querySelector(".favorite-list");
    const favoriteRows = card.shadowRoot?.querySelectorAll(".favorite-row");
    expect(favoriteList?.getAttribute("role")).toBe("list");
    expect(favoriteRows?.item(0).getAttribute("role")).toBe("listitem");
    expect(favoriteRows?.item(0).getAttribute("aria-pressed")).toBe("true");
    expect(favoriteRows?.item(1).getAttribute("aria-pressed")).toBe("false");

    (card.shadowRoot?.querySelectorAll(".favorite-row").item(1) as HTMLButtonElement).click();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(callService).toHaveBeenCalledWith("media_player", "select_source", {
      entity_id: "media_player.radio",
      source: "DHE Connect Antenne Düsseldorf",
    });
  });
});
