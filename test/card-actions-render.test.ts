import { describe, expect, it, vi } from "vitest";
import { entity, renderCard, text } from "./helpers/card";

describe("DheConnectCard action rendering", () => {
  it("dispatches a Home Assistant more-info tap action when an entity row is clicked", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "DHE Connect - Eco mode" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["controls"],
        entities: { eco_mode: "switch.eco" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener, { once: true });

    (card.shadowRoot?.querySelector(".entity-row .entity-action") as HTMLButtonElement).click();

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({
      action: "tap",
      config: {
        entity: "switch.eco",
        tap_action: { action: "more-info", entity: "switch.eco" },
      },
    });
  });

  it("dispatches a Home Assistant more-info tap action when a metric tile is clicked", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", {
            friendly_name: "DHE Connect - Current water flow",
            unit_of_measurement: "l/min",
          }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener, { once: true });

    (card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement).click();

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({
      action: "tap",
      config: {
        entity: "sensor.water_flow",
        tap_action: { action: "more-info", entity: "sensor.water_flow" },
      },
    });
  });

  it("supports Mushroom-compatible double tap actions", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        double_tap_action: { action: "toggle" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metric = card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement;

    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    metric.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(300);

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({
      action: "double_tap",
      config: {
        entity: "sensor.water_flow",
        tap_action: { action: "more-info", entity: "sensor.water_flow" },
        double_tap_action: { action: "toggle", entity: "sensor.water_flow" },
      },
    });
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("does not drop pending taps on different entities when double tap actions are enabled", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
          "sensor.power": entity("11", { unit_of_measurement: "kW" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: {
          water_flow: "sensor.water_flow",
          power: "sensor.power",
        },
        double_tap_action: { action: "toggle" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metrics = card.shadowRoot?.querySelectorAll(".metric.entity-action");

    metrics?.item(0).dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    metrics?.item(1).dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(300);

    expect(listener).toHaveBeenCalledTimes(2);
    const entities = listener.mock.calls.map(
      ([event]) => (event as CustomEvent).detail.config.entity,
    );
    expect(entities).toEqual(["sensor.water_flow", "sensor.power"]);
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("does not delay taps when the double tap action is explicitly disabled", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        double_tap_action: { action: "none" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metric = card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement;

    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail.action).toBe("tap");
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("supports Mushroom-compatible hold actions without also firing tap", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metric = card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement;

    metric.dispatchEvent(new Event("pointerdown", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(550);
    metric.dispatchEvent(new Event("pointerup", { bubbles: true, composed: true }));
    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({
      action: "hold",
      config: {
        entity: "sensor.water_flow",
        tap_action: { action: "more-info", entity: "sensor.water_flow" },
        hold_action: {
          action: "navigate",
          entity: "sensor.water_flow",
          navigation_path: "/lovelace/dhe",
        },
      },
    });
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("does not suppress taps when the hold action is explicitly disabled", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        hold_action: { action: "none" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metric = card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement;

    metric.dispatchEvent(new Event("pointerdown", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(550);
    metric.dispatchEvent(new Event("pointerup", { bubbles: true, composed: true }));
    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail.action).toBe("tap");
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("does not drop the next tap when a hold produces no follow-up click", async () => {
    vi.useFakeTimers();
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "sensor.water_flow": entity("4.2", { unit_of_measurement: "l/min" }),
        },
        callService: async () => undefined,
      },
      {
        sections: ["overview"],
        entities: { water_flow: "sensor.water_flow" },
        hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-action", listener);
    const metric = card.shadowRoot?.querySelector(".metric.entity-action") as HTMLButtonElement;

    metric.dispatchEvent(new Event("pointerdown", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(550);
    metric.dispatchEvent(new Event("pointerup", { bubbles: true, composed: true }));
    await vi.advanceTimersByTimeAsync(400);
    metric.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalledTimes(2);
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail.action).toBe("hold");
    expect((listener.mock.calls[1]?.[0] as CustomEvent).detail.action).toBe("tap");
    document.body.removeEventListener("hass-action", listener);
    vi.useRealTimers();
  });

  it("shows an in-card error and notification when a service call fails", async () => {
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "Eco mode" }),
        },
        callService: async () => {
          throw new Error("service unavailable");
        },
      },
      {
        sections: ["controls"],
        entities: { eco_mode: "switch.eco" },
      },
    );
    const listener = vi.fn();
    document.body.addEventListener("hass-notification", listener, { once: true });

    (card.shadowRoot?.querySelector(".entity-row button.chip") as HTMLButtonElement).click();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    await card.updateComplete;

    expect(text(card)).toContain("Action failed: service unavailable");
    expect(listener).toHaveBeenCalledOnce();
  });

  it("blocks duplicate switch calls while a service action is pending", async () => {
    const resolvers: Array<() => void> = [];
    const callService = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvers.push(resolve);
        }),
    );
    const card = await renderCard(
      {
        states: {
          "climate.dhe": entity("heat", { temperature: 42 }),
          "switch.eco": entity("on", { friendly_name: "Eco mode" }),
        },
        callService,
      },
      {
        sections: ["controls"],
        entities: { eco_mode: "switch.eco" },
      },
    );
    const chip = card.shadowRoot?.querySelector(".entity-row button.chip") as HTMLButtonElement;

    chip.click();
    chip.click();
    await card.updateComplete;

    expect(callService).toHaveBeenCalledOnce();
    const busyChip = card.shadowRoot?.querySelector(
      ".entity-row button.chip",
    ) as HTMLButtonElement;
    expect(busyChip.disabled).toBe(true);
    expect(busyChip.getAttribute("aria-busy")).toBe("true");
    expect(card.shadowRoot?.querySelector(".entity-row.busy")).toBeTruthy();

    resolvers.shift()?.();
    await Promise.resolve();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    await card.updateComplete;

    const readyChip = card.shadowRoot?.querySelector(
      ".entity-row button.chip",
    ) as HTMLButtonElement;
    expect(readyChip.disabled).toBe(false);
  });
});
