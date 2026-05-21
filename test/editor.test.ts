import { describe, expect, it, vi } from "vitest";
import "../src/editor";
import type { DheConnectCardEditor } from "../src/editor";
import { entity, registry } from "./helpers/card";

describe("DheConnectCardEditor", () => {
  it("renders controls for advanced card options", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({
      device_id: "device-a",
      hide_entities: ["error_status"],
      overview_columns: 4,
      entities: { water_flow: "sensor.custom_flow" },
    });
    document.body.append(editor);
    await editor.updateComplete;

    const text = editor.shadowRoot?.textContent ?? "";
    expect(text).toContain("Device and layout");
    expect(text).toContain("Device");
    expect(text).not.toContain("Selected device");
    expect(text).toContain("Device preview");
    expect(text).toContain("DHE device selected");
    expect(text).not.toContain("device-a");
    expect(text).toContain("Overview columns");
    expect(text).toContain("Advanced options");
    expect(text).toContain("Layout mode");
    expect(text).toContain("Tile size");
    expect(text).toContain("Icon theme");
    expect(text).not.toContain("Temperature step");
    expect(text).not.toContain("Max sensor rows");
    expect(text).toContain("Icon animations");
    expect(text).toContain("Display-style buttons");
    expect(text).toContain("Sections");
    expect(text).toContain("Overview tiles");
    expect(text).toContain("Tap action");
    expect(text).toContain("Hold action");
    expect(text).toContain("More info");
    expect(text).toContain("Navigate");
    expect(text).toContain("Entities");
    expect(text).toContain("Error status");
    expect(text).toContain("Current water flow");
    expect(text).not.toContain("error_status");
    expect(text).not.toContain("water_flow");
  });

  it("renders editor labels in German when Home Assistant locale is German", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.hass = { states: {}, locale: { language: "de" }, callService: async () => undefined };
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const text = editor.shadowRoot?.textContent ?? "";
    expect(text).toContain("Gerät und Darstellung");
    expect(text).toContain("Gerät");
    expect(text).not.toContain("Ausgewähltes Gerät");
    expect(text).toContain("Geräte-Vorschau");
    expect(text).toContain("DHE-Gerät ausgewählt");
    expect(text).toContain("Übersicht-Spalten");
    expect(text).toContain("Erweiterte Optionen");
    expect(text).toContain("Layoutmodus");
    expect(text).toContain("Kachelgröße");
    expect(text).toContain("Icon-Theme");
    expect(text).not.toContain("Temperaturschritt");
    expect(text).not.toContain("Maximale Sensorzeilen");
    expect(text).toContain("Icon-Animationen");
    expect(text).toContain("Display-Button-Ansicht");
    expect(text).toContain("Abschnitte");
    expect(text).toContain("Übersicht-Kacheln");
    expect(text).toContain("Klick-Aktion");
    expect(text).toContain("Halten-Aktion");
    expect(text).toContain("Mehr Info");
    expect(text).toContain("Navigieren");
    expect(text).toContain("Entitäten");
    expect(text).toContain("Übersicht");
    expect(editor.shadowRoot?.querySelector(".basic-editor ha-entity-picker")).toBeNull();
  });

  it("keeps advanced options collapsed by default", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const advanced = editor.shadowRoot?.querySelector(".advanced-editor") as HTMLDetailsElement;
    const helpIcon = advanced.querySelector(".help-icon") as HTMLButtonElement;
    expect(advanced.open).toBe(false);
    expect(helpIcon.tagName).toBe("BUTTON");
    expect(helpIcon.getAttribute("type")).toBe("button");
    expect(helpIcon.getAttribute("aria-label")).toBeTruthy();
    helpIcon.click();
    await editor.updateComplete;
    expect(advanced.open).toBe(false);
  });

  it("keeps the device preview collapsed and non-technical by default", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.hass = {
      devices: {
        "device-a": {
          id: "device-a",
          name: "Bathroom DHE",
        },
      },
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
      },
      callService: async () => undefined,
    };
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const preview = editor.shadowRoot?.querySelector(
      ".device-preview-foldout",
    ) as HTMLDetailsElement;
    expect(preview.open).toBe(false);
    expect(preview.textContent).toContain("Device preview");
    expect(preview.textContent).toContain("Bathroom DHE");
    expect(preview.textContent).toContain("Ready");
    expect(preview.textContent).not.toContain("device-a");
    expect(preview.textContent).not.toContain("active entities");
  });

  it("marks the device preview ready after empty discovery completes", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.hass = { states: {}, entities: {}, callService: async () => undefined };
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const preview = editor.shadowRoot?.querySelector(
      ".device-preview-foldout",
    ) as HTMLDetailsElement;
    expect(preview.textContent).toContain("Ready");
    expect(preview.textContent).not.toContain("Loading entities");
    expect(preview.textContent).not.toContain("device-a");
  });

  it("migrates legacy entity anchors to device_id and warns in the editor", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ entity: "climate.legacy_dhe" });
    editor.hass = {
      states: {
        "climate.legacy_dhe": entity("heat"),
      },
      entities: {
        "climate.legacy_dhe": registry("device-legacy", "water_heating"),
      },
      callService: async () => undefined,
    };
    document.body.append(editor);
    await editor.updateComplete;

    const text = editor.shadowRoot?.textContent ?? "";
    expect(text).toContain("Legacy entity anchor detected");
    expect(text).toContain("device-legacy");
    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.device_id).toBe("device-legacy");
    expect("entity" in config).toBe(false);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("legacy card-level entity anchor"));
    warn.mockRestore();
  });

  it("preserves unresolved legacy entity anchors when edited before hass is ready", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ entity: "climate.legacy_dhe" });
    document.body.append(editor);
    await editor.updateComplete;

    const nameInput = editor.shadowRoot?.querySelector(
      '.basic-editor ha-textfield',
    ) as HTMLElement & { value: string };
    nameInput.value = "Legacy DHE";
    nameInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const editedConfig = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(editedConfig.name).toBe("Legacy DHE");
    expect(editedConfig.entity).toBe("climate.legacy_dhe");
    expect(editedConfig.device_id).toBeUndefined();

    editor.hass = {
      states: {
        "climate.legacy_dhe": entity("heat"),
      },
      entities: {
        "climate.legacy_dhe": registry("device-legacy", "water_heating"),
      },
      callService: async () => undefined,
    };
    await editor.updateComplete;

    const migratedConfig = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(migratedConfig.name).toBe("Legacy DHE");
    expect(migratedConfig.device_id).toBe("device-legacy");
    expect("entity" in migratedConfig).toBe(false);
    warn.mockRestore();
  });

  it("ignores generic picker change events to avoid duplicate config updates", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const picker = editor.shadowRoot?.querySelector(".basic-editor ha-selector") as HTMLElement;
    picker.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    expect(listener).not.toHaveBeenCalled();
  });

  it("requires the selected DHE device through a Home Assistant device selector", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const picker = editor.shadowRoot?.querySelector(
      ".basic-editor ha-selector",
    ) as HTMLElement & {
      helper?: string;
      label?: string;
      required?: boolean;
      selector?: Record<string, unknown>;
      value?: string;
    };
    expect(picker.value).toBe("device-a");
    expect(picker.label).toBe("Device");
    expect(picker.helper).toContain("Required");
    expect(picker.required).toBe(true);
    expect(picker.selector).toEqual({
      device: {
        filter: [{ integration: "stiebel_dhe_connect" }],
        entity: [{ domain: "climate" }],
      },
    });

    picker.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "device-b" },
      }),
    );
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.device_id).toBe("device-b");
    expect("entity" in config).toBe(false);
  });

  it("ignores empty device selector changes because the device is mandatory", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const picker = editor.shadowRoot?.querySelector(
      ".basic-editor ha-selector",
    ) as HTMLElement;
    picker.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "" },
      }),
    );
    await editor.updateComplete;

    expect(listener).not.toHaveBeenCalled();
  });

  it("updates layout, tile size and icon theme through GUI controls", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const layout = editor.shadowRoot?.querySelector(
      'select[data-option-key="layout_mode"]',
    ) as HTMLSelectElement;
    layout.value = "panel";
    layout.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const tileSize = editor.shadowRoot?.querySelector(
      'select[data-option-key="tile_size"]',
    ) as HTMLSelectElement;
    tileSize.value = "large";
    tileSize.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const iconTheme = editor.shadowRoot?.querySelector(
      'select[data-option-key="icon_theme"]',
    ) as HTMLSelectElement;
    iconTheme.value = "ha";
    iconTheme.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.layout_mode).toBe("panel");
    expect(config.tile_size).toBe("large");
    expect(config.icon_theme).toBe("ha");
  });

  it("edits custom icon colors through GUI controls", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const iconTheme = editor.shadowRoot?.querySelector(
      'select[data-option-key="icon_theme"]',
    ) as HTMLSelectElement;
    iconTheme.value = "custom";
    iconTheme.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const hotColor = editor.shadowRoot?.querySelector(
      'ha-textfield[data-icon-color-tone="hot"]',
    ) as HTMLElement & { value: string };
    hotColor.value = "#e53935";
    hotColor.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const waterColor = editor.shadowRoot?.querySelector(
      'ha-textfield[data-icon-color-tone="water"]',
    ) as HTMLElement & { value: string };
    waterColor.value = "var(--primary-color)";
    waterColor.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.icon_theme).toBe("custom");
    expect(config.icon_colors).toEqual({
      hot: "#e53935",
      water: "var(--primary-color)",
    });
  });

  it("updates action configs through Mushroom-style GUI controls", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const holdSelect = editor.shadowRoot?.querySelector(
      'select[data-action-key="hold_action"]',
    ) as HTMLSelectElement;
    holdSelect.value = "navigate";
    holdSelect.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const navigationInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="hold_action"][data-action-property="navigation_path"]',
    ) as HTMLElement & { value: string };
    navigationInput.value = "/lovelace/dhe";
    navigationInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.hold_action).toEqual({
      action: "navigate",
      navigation_path: "/lovelace/dhe",
    });
  });

  it("keeps default action rows collapsed until configured", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    document.body.append(editor);
    await editor.updateComplete;

    const tap = editor.shadowRoot?.querySelector(
      '[data-action-card-key="tap_action"]',
    ) as HTMLDetailsElement;
    const hold = editor.shadowRoot?.querySelector(
      '[data-action-card-key="hold_action"]',
    ) as HTMLDetailsElement;
    const doubleTap = editor.shadowRoot?.querySelector(
      '[data-action-card-key="double_tap_action"]',
    ) as HTMLDetailsElement;

    expect(tap.open).toBe(false);
    expect(hold.open).toBe(false);
    expect(doubleTap.open).toBe(false);
  });

  it("opens action rows when they contain custom action configuration", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({
      tap_action: { action: "toggle" },
      hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
    });
    document.body.append(editor);
    await editor.updateComplete;

    const tap = editor.shadowRoot?.querySelector(
      '[data-action-card-key="tap_action"]',
    ) as HTMLDetailsElement;
    const hold = editor.shadowRoot?.querySelector(
      '[data-action-card-key="hold_action"]',
    ) as HTMLDetailsElement;
    const doubleTap = editor.shadowRoot?.querySelector(
      '[data-action-card-key="double_tap_action"]',
    ) as HTMLDetailsElement;

    expect(tap.open).toBe(true);
    expect(hold.open).toBe(true);
    expect(doubleTap.open).toBe(false);
  });

  it("writes Home Assistant perform-action configs from the service action editor", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const tapSelect = editor.shadowRoot?.querySelector(
      'select[data-action-key="tap_action"]',
    ) as HTMLSelectElement;
    tapSelect.value = "call-service";
    tapSelect.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const serviceInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="service"]',
    ) as HTMLElement & { value: string };
    serviceInput.value = "switch.toggle";
    serviceInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.tap_action).toEqual({
      action: "perform-action",
      perform_action: "switch.toggle",
    });
  });

  it("edits service action targets and data through GUI controls", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const tapSelect = editor.shadowRoot?.querySelector(
      'select[data-action-key="tap_action"]',
    ) as HTMLSelectElement;
    tapSelect.value = "call-service";
    tapSelect.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const serviceInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="service"]',
    ) as HTMLElement & { value: string };
    serviceInput.value = "light.turn_on";
    serviceInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const targetPicker = editor.shadowRoot?.querySelector(
      'ha-entity-picker[data-action-key="tap_action"][data-action-property="target_entity"]',
    ) as HTMLElement;
    targetPicker.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "light.bathroom" },
      }),
    );
    await editor.updateComplete;

    const areaInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="target_area_id"]',
    ) as HTMLElement & { value: string };
    areaInput.value = "bathroom, wellness";
    areaInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const dataInput = editor.shadowRoot?.querySelector(
      'ha-textarea[data-action-key="tap_action"][data-action-property="data"]',
    ) as HTMLElement & { value: string };
    dataInput.value = '{"brightness_pct":75}';
    dataInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.tap_action).toEqual({
      action: "perform-action",
      perform_action: "light.turn_on",
      target: {
        entity_id: "light.bathroom",
        area_id: ["bathroom", "wellness"],
      },
      data: { brightness_pct: 75 },
    });
  });

  it("edits existing Home Assistant perform-action configs as service actions", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({
      tap_action: {
        action: "perform-action",
        perform_action: "light.turn_on",
        target: { entity_id: "light.bathroom", device_id: "abc123" },
        data: { brightness_pct: 30 },
      },
    });
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const tapSelect = editor.shadowRoot?.querySelector(
      'select[data-action-key="tap_action"]',
    ) as HTMLSelectElement;
    const serviceInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="service"]',
    ) as HTMLElement & { value: string };
    const targetPicker = editor.shadowRoot?.querySelector(
      'ha-entity-picker[data-action-key="tap_action"][data-action-property="target_entity"]',
    ) as { value?: string };
    const deviceInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="target_device_id"]',
    ) as HTMLElement & { value: string };
    const dataInput = editor.shadowRoot?.querySelector(
      'ha-textarea[data-action-key="tap_action"][data-action-property="data"]',
    ) as HTMLElement & { value: string };

    expect(tapSelect.value).toBe("call-service");
    expect(serviceInput.value).toBe("light.turn_on");
    expect(targetPicker.value).toBe("light.bathroom");
    expect(deviceInput.value).toBe("abc123");
    expect(dataInput.value).toBe(JSON.stringify({ brightness_pct: 30 }, null, 2));

    serviceInput.value = "light.turn_off";
    serviceInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.tap_action).toEqual({
      action: "perform-action",
      perform_action: "light.turn_off",
      target: { entity_id: "light.bathroom", device_id: "abc123" },
      data: { brightness_pct: 30 },
    });
  });

  it("can clear an existing service action in the visual editor", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({
      tap_action: {
        action: "perform-action",
        perform_action: "light.turn_on",
      },
    });
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    document.body.append(editor);
    await editor.updateComplete;

    const serviceInput = editor.shadowRoot?.querySelector(
      'ha-textfield[data-action-key="tap_action"][data-action-property="service"]',
    ) as HTMLElement & { value: string };
    serviceInput.value = "";
    serviceInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.tap_action).toEqual({ action: "perform-action" });
  });

  it("marks invalid service data without overwriting the action config", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({
      tap_action: {
        action: "perform-action",
        perform_action: "light.turn_on",
        data: { brightness_pct: 30 },
      },
    });
    document.body.append(editor);
    await editor.updateComplete;

    const dataInput = editor.shadowRoot?.querySelector(
      'ha-textarea[data-action-key="tap_action"][data-action-property="data"]',
    ) as HTMLElement & { value: string };
    dataInput.value = "{";
    dataInput.dispatchEvent(new Event("input"));
    await editor.updateComplete;

    expect(dataInput.classList.contains("invalid")).toBe(true);
    expect(listener).not.toHaveBeenCalled();
  });

  it("updates action entity overrides through the entity picker", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ tap_action: { action: "toggle" } });
    document.body.append(editor);
    await editor.updateComplete;

    const picker = editor.shadowRoot?.querySelector(
      'ha-entity-picker[value], ha-entity-picker',
    );
    const actionPickers = editor.shadowRoot?.querySelectorAll(".action-card ha-entity-picker");
    actionPickers?.item(0).dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "switch.custom" },
      }),
    );
    await editor.updateComplete;

    expect(picker).toBeTruthy();
    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.tap_action).toEqual({
      action: "toggle",
      entity: "switch.custom",
    });
  });

  it("updates hidden entity keys through GUI visibility toggles", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ hide_entities: ["error_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const row = editor.shadowRoot?.querySelector(
      '[data-entity-key="error_status"]',
    ) as HTMLElement;
    const checkbox = row.querySelector("ha-switch") as HTMLElement & { checked: boolean };
    expect(checkbox.checked).toBe(false);

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.hide_entities).not.toContain("error_status");
  });

  it("adds the support section when support mode is enabled through the GUI", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ sections: ["overview"] });
    document.body.append(editor);
    await editor.updateComplete;

    const formfield = [...(editor.shadowRoot?.querySelectorAll("ha-formfield") ?? [])].find(
      (field) => field.textContent?.includes("Diagnostics & support mode"),
    ) as HTMLElement | undefined;
    const checkbox = formfield?.querySelector("ha-switch") as
      | (HTMLElement & { checked: boolean })
      | undefined;
    expect(checkbox).toBeTruthy();

    checkbox!.checked = true;
    checkbox!.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.show_support_mode).toBe(true);
    expect(config.sections).toEqual(["overview", "support"]);
  });

  it("renders entity toggles with Home Assistant form fields", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({ hide_entities: ["error_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const row = editor.shadowRoot?.querySelector(
      '[data-entity-key="error_status"]',
    ) as HTMLElement;
    const formfield = row.querySelector("ha-formfield.switch-formfield") as HTMLElement & {
      label?: string;
    };

    expect(formfield).toBeTruthy();
    expect(formfield.textContent).toContain("Error status");
    expect(formfield.label).toBe("Error status");
  });

  it("updates overview tiles through GUI toggles while preserving chosen order", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ overview_entities: ["power"] });
    document.body.append(editor);
    await editor.updateComplete;

    const waterFlow = editor.shadowRoot?.querySelector(
      '[data-overview-key="water_flow"] ha-switch',
    ) as HTMLElement & { checked: boolean };
    const power = editor.shadowRoot?.querySelector(
      '[data-overview-key="power"] ha-switch',
    ) as HTMLElement & { checked: boolean };
    expect(waterFlow.checked).toBe(false);
    expect(power.checked).toBe(true);

    waterFlow.checked = true;
    waterFlow.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.overview_entities).toEqual(["power", "water_flow"]);
  });

  it("keeps selected overview tile switches isolated from neighbouring rows", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ overview_entities: ["water_flow", "power", "device_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const selectedRows = [
      ...(editor.shadowRoot?.querySelectorAll(".overview-order-list [data-overview-key]") ?? []),
    ];
    const powerRow = editor.shadowRoot?.querySelector(
      '.overview-order-list [data-overview-key="power"]',
    ) as HTMLElement;
    const powerSwitch = powerRow.querySelector("ha-switch") as HTMLElement & {
      checked: boolean;
    };
    const bubbledChange = vi.fn();
    powerRow.addEventListener("change", bubbledChange);

    expect(selectedRows.map((row) => row.getAttribute("data-overview-key"))).toEqual([
      "water_flow",
      "power",
      "device_status",
    ]);

    powerSwitch.checked = false;
    powerSwitch.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    const selectedAfter = [
      ...(editor.shadowRoot?.querySelectorAll(".overview-order-list [data-overview-key]") ?? []),
    ].map((row) => row.getAttribute("data-overview-key"));
    expect(bubbledChange).not.toHaveBeenCalled();
    expect(config.overview_entities).toEqual(["water_flow", "device_status"]);
    expect(selectedAfter).toEqual(["water_flow", "device_status"]);
  });

  it("keeps selected and available overview tile groups collapsed by default", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({ overview_entities: ["power"] });
    document.body.append(editor);
    await editor.updateComplete;

    const groups = editor.shadowRoot?.querySelectorAll(".overview-entity-section");
    expect(groups?.length).toBe(2);
    expect((groups?.item(0) as HTMLDetailsElement).open).toBe(false);
    expect((groups?.item(1) as HTMLDetailsElement).open).toBe(false);
  });

  it("keeps entity override groups collapsed by default", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({});
    document.body.append(editor);
    await editor.updateComplete;

    const groups = editor.shadowRoot?.querySelectorAll(".entity-section");
    expect(groups?.length).toBeGreaterThan(0);
    for (const group of groups ?? []) {
      expect((group as HTMLDetailsElement).open).toBe(false);
    }
  });

  it("only offers active discovered entities in the overview selector", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.hass = {
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
        "sensor.stiebel_eltron_dhe_power": entity("0"),
        "sensor.stiebel_eltron_dhe_device_status": entity("Connected"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
        "sensor.stiebel_eltron_dhe_power": {
          ...registry("device-a", "power"),
          disabled_by: "integration",
        },
        "sensor.stiebel_eltron_dhe_device_status": registry("device-a", "device_status"),
      },
      callService: async () => undefined,
    };
    editor.setConfig({ overview_entities: ["power", "water_flow"] });
    document.body.append(editor);
    await editor.updateComplete;

    const overview = editor.shadowRoot?.querySelector(".overview-editor") as HTMLElement;
    const waterFlow = overview.querySelector(
      '[data-overview-key="water_flow"] ha-switch',
    ) as HTMLElement & { checked: boolean };

    expect(waterFlow.checked).toBe(true);
    expect(overview.textContent).toContain("Current water flow");
    expect(overview.textContent).not.toContain("Current power consumption");
    expect(overview.querySelector('[data-overview-key="power"]')).toBeNull();
  });

  it("preserves inactive stored overview keys when toggling active tiles", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.hass = {
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
        "sensor.stiebel_eltron_dhe_power": entity("0"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
        "sensor.stiebel_eltron_dhe_power": {
          ...registry("device-a", "power"),
          disabled_by: "integration",
        },
      },
      callService: async () => undefined,
    };
    editor.setConfig({ overview_entities: ["power"] });
    document.body.append(editor);
    await editor.updateComplete;

    const waterFlow = editor.shadowRoot?.querySelector(
      '.overview-editor [data-overview-key="water_flow"] ha-switch',
    ) as HTMLElement & { checked: boolean };
    waterFlow.checked = true;
    waterFlow.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.overview_entities).toEqual(["power", "water_flow"]);
  });

  it("reorders active overview tiles without dropping inactive stored keys", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.hass = {
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
        "sensor.stiebel_eltron_dhe_power": entity("0"),
        "sensor.stiebel_eltron_dhe_device_status": entity("Connected"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
        "sensor.stiebel_eltron_dhe_power": {
          ...registry("device-a", "power"),
          disabled_by: "integration",
        },
        "sensor.stiebel_eltron_dhe_device_status": registry("device-a", "device_status"),
      },
      callService: async () => undefined,
    };
    editor.setConfig({ overview_entities: ["water_flow", "power", "device_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const selectedActions = [
      ...(editor.shadowRoot?.querySelectorAll(".overview-order-list .order-actions button") ?? []),
    ];
    expect(selectedActions.every((button) => button.classList.contains("drag-handle"))).toBe(true);
  });

  it("hides empty overview selection groups when no active entities are available", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.hass = { states: {}, entities: {}, callService: async () => undefined };
    editor.setConfig({ overview_entities: ["power"] });
    document.body.append(editor);
    await editor.updateComplete;

    const overview = editor.shadowRoot?.querySelector(".overview-editor") as HTMLElement;
    expect(overview.textContent).toContain("Overview tiles");
    expect(overview.querySelectorAll(".overview-entity-section").length).toBe(0);
  });

  it("offers all known entity keys in override groups so missing discovery can be repaired", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.hass = {
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
        "sensor.stiebel_eltron_dhe_power": entity("0"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
        "sensor.stiebel_eltron_dhe_power": {
          ...registry("device-a", "power"),
          disabled_by: "integration",
        },
      },
      callService: async () => undefined,
    };
    editor.setConfig({ device_id: "device-a" });
    document.body.append(editor);
    await editor.updateComplete;

    const entityEditor = editor.shadowRoot?.querySelector(".entity-editor") as HTMLElement;
    expect(entityEditor.querySelector('[data-entity-key="water_flow"]')).toBeTruthy();
    expect(entityEditor.querySelector('[data-entity-key="power"]')).toBeTruthy();
    expect(entityEditor.textContent).toContain("Current power consumption");
    expect(entityEditor.querySelector('[data-entity-key="radio"]')).toBeTruthy();
    expect(entityEditor.querySelectorAll(".entity-section").length).toBeGreaterThan(2);

    const powerPicker = entityEditor.querySelector(
      '[data-entity-key="power"] ha-entity-picker',
    ) as HTMLElement;
    powerPicker.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "sensor.custom_power" },
      }),
    );
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.entities.power).toBe("sensor.custom_power");
  });

  it("keeps hidden discovered entities editable so they can be shown again", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.hass = {
      states: {
        "climate.stiebel_eltron_dhe": entity("heat"),
        "sensor.stiebel_eltron_dhe_water_flow": entity("12.3"),
      },
      entities: {
        "climate.stiebel_eltron_dhe": registry("device-a", "water_heating"),
        "sensor.stiebel_eltron_dhe_water_flow": registry("device-a", "water_flow"),
      },
      callService: async () => undefined,
    };
    editor.setConfig({ device_id: "device-a", hide_entities: ["water_flow"] });
    document.body.append(editor);
    await editor.updateComplete;

    const row = editor.shadowRoot?.querySelector('[data-entity-key="water_flow"]') as HTMLElement;
    const toggle = row.querySelector("ha-switch") as HTMLElement & { checked: boolean };
    expect(row).toBeTruthy();
    expect(toggle.checked).toBe(false);

    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.hide_entities).toEqual([]);
  });

  it("uses drag handles instead of move buttons for section ordering", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({ sections: ["overview", "controls", "weather"] });
    document.body.append(editor);
    await editor.updateComplete;

    const weatherRow = editor.shadowRoot?.querySelector(
      '[data-section-key="weather"]',
    ) as HTMLElement;
    const buttons = [...weatherRow.querySelectorAll(".order-actions button")];
    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.classList.contains("drag-handle")).toBe(true);
    expect(buttons[0]?.getAttribute("aria-keyshortcuts")).toBe("ArrowUp ArrowDown");
  });

  it("reorders sections through drag handles", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ sections: ["overview", "controls", "weather"] });
    document.body.append(editor);
    await editor.updateComplete;

    const controlsRow = editor.shadowRoot?.querySelector(
      '[data-section-key="controls"]',
    ) as HTMLElement;
    const weatherRow = editor.shadowRoot?.querySelector(
      '[data-section-key="weather"]',
    ) as HTMLElement;
    controlsRow.querySelector(".drag-handle")?.dispatchEvent(dragEvent("dragstart"));
    weatherRow.dispatchEvent(
      dragEvent("drop", { "application/x-dhe-connect-section": "controls" }),
    );
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.sections).toEqual(["overview", "weather", "controls"]);
  });

  it("uses drag handles instead of move buttons for overview ordering", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    editor.setConfig({ overview_entities: ["water_flow", "power", "device_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const deviceStatusRow = editor.shadowRoot?.querySelector(
      '[data-overview-key="device_status"]',
    ) as HTMLElement;
    const buttons = [...deviceStatusRow.querySelectorAll(".order-actions button")];
    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.classList.contains("drag-handle")).toBe(true);
    expect(buttons[0]?.getAttribute("aria-keyshortcuts")).toBe("ArrowUp ArrowDown");
  });

  it("reorders sections through drag-handle keyboard arrows", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ sections: ["overview", "controls", "weather"] });
    document.body.append(editor);
    await editor.updateComplete;

    const controlsRow = editor.shadowRoot?.querySelector(
      '[data-section-key="controls"]',
    ) as HTMLElement;
    controlsRow
      .querySelector(".drag-handle")
      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.sections).toEqual(["overview", "weather", "controls"]);
  });

  it("reorders selected overview tiles through keyboard arrows", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ overview_entities: ["water_flow", "power", "device_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const powerRow = editor.shadowRoot?.querySelector(
      '[data-overview-key="power"]',
    ) as HTMLElement;
    powerRow
      .querySelector(".drag-handle")
      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.overview_entities).toEqual(["power", "water_flow", "device_status"]);
  });

  it("reorders selected overview tiles through drag handles", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ overview_entities: ["water_flow", "power", "device_status"] });
    document.body.append(editor);
    await editor.updateComplete;

    const waterFlowRow = editor.shadowRoot?.querySelector(
      '[data-overview-key="water_flow"]',
    ) as HTMLElement;
    const deviceStatusRow = editor.shadowRoot?.querySelector(
      '[data-overview-key="device_status"]',
    ) as HTMLElement;
    deviceStatusRow.querySelector(".drag-handle")?.dispatchEvent(dragEvent("dragstart"));
    waterFlowRow.dispatchEvent(
      dragEvent("drop", { "application/x-dhe-connect-overview-entity": "device_status" }),
    );
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.overview_entities).toEqual(["device_status", "water_flow", "power"]);
  });

  it("updates entity overrides through domain-filtered entity pickers", async () => {
    const editor = document.createElement("dhe-connect-card-editor") as DheConnectCardEditor;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    editor.setConfig({ entities: { water_flow: "sensor.old_flow" } });
    document.body.append(editor);
    await editor.updateComplete;

    const row = editor.shadowRoot?.querySelector(
      '[data-entity-key="water_flow"]',
    ) as HTMLElement;
    const picker = row.querySelector("ha-entity-picker") as HTMLElement;
    expect((picker as { value?: string }).value).toBe("sensor.old_flow");
    expect((picker as { includeDomains?: string[] }).includeDomains).toEqual(["sensor"]);

    picker.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "sensor.custom_flow" },
      }),
    );
    await editor.updateComplete;

    const config = (listener.mock.calls.at(-1)?.[0] as CustomEvent).detail.config;
    expect(config.entities.water_flow).toBe("sensor.custom_flow");
  });
});

function dragEvent(type: string, data: Record<string, string> = {}): DragEvent {
  const store = { ...data };
  const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
  Object.defineProperty(event, "dataTransfer", {
    value: {
      dropEffect: "move",
      effectAllowed: "move",
      getData: (key: string) => store[key] ?? "",
      setData: (key: string, value: string) => {
        store[key] = value;
      },
    },
  });
  return event;
}
