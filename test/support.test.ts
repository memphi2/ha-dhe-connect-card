import { describe, expect, it, vi } from "vitest";
import { normalizeConfig } from "../src/config";
import { discoverEntities } from "../src/discovery";
import { UI_TRANSLATIONS } from "../src/i18n";
import {
  buildSupportModel,
  buildSupportPackage,
  type SupportCheck,
} from "../src/support";
import { INTEGRATION_DOMAIN, type HomeAssistant } from "../src/types";
import { entity, renderCard, visibleText } from "./helpers/card";

describe("diagnostics support mode", () => {
  it("builds an anonymized support package", () => {
    const hass = supportHass();
    const config = normalizeConfig({
      device_id: "device-private-bathroom",
      show_support_mode: true,
      layout_mode: "tablet",
      tile_size: "large",
      sections: ["support"],
      entities: {
        water_heating: "climate.dhe_private_bathroom",
        wlan_mac: "sensor.dhe_wlan_mac",
      },
    });
    const discovered = discoverEntities(hass, config);
    const supportPackage = buildSupportPackage(
      buildSupportModel(hass, config, discovered),
      config,
    );
    const json = JSON.stringify(supportPackage);

    expect(supportPackage.schema).toBe("dhe-connect-card-support/v1");
    expect(supportPackage.card.options.layout_mode).toBe("tablet");
    expect(supportPackage.card.options.tile_size).toBe("large");
    expect(supportPackage.summary.mappedEntities).toBeGreaterThan(0);
    expect(supportPackage.summary.disabledOrHiddenRegistryEntities).toBe(1);
    expect(
      supportPackage.entities.find((row) => row.key === "energy_consumption_total")
        ?.registryStatus,
    ).toBe("disabled");
    expect(json).not.toContain("device-private-bathroom");
    expect(json).not.toContain("entry-private-bathroom");
    expect(json).not.toContain("climate.dhe_private_bathroom");
    expect(json).not.toContain("AA:BB:CC:DD:EE:FF");
    expect(json).toContain("entityIdHash");
  });

  it("keeps hidden keys out of support compatibility counts", () => {
    const hass = supportHass();
    const visibleConfig = normalizeConfig({
      device_id: "device-private-bathroom",
      show_support_mode: true,
      sections: ["support"],
    });
    const hiddenConfig = normalizeConfig({
      device_id: "device-private-bathroom",
      show_support_mode: true,
      sections: ["support"],
      hide_entities: ["water_flow"],
    });
    const visibleModel = buildSupportModel(
      hass,
      visibleConfig,
      discoverEntities(hass, visibleConfig),
    );
    const hiddenModel = buildSupportModel(
      hass,
      hiddenConfig,
      discoverEntities(hass, hiddenConfig),
    );

    expect(hiddenModel.entities.some((row) => row.key === "water_flow")).toBe(false);
    expect(hiddenModel.summary.knownEntities).toBe(visibleModel.summary.knownEntities - 1);
    expect(hiddenModel.summary.missingRequiredEntities).toBe(
      visibleModel.summary.missingRequiredEntities - 1,
    );
  });

  it("warns when the configured device cannot be resolved", () => {
    const hass = supportHass();
    const config = normalizeConfig({
      device_id: "stale-device-id",
      show_support_mode: true,
      sections: ["support"],
    });
    const model = buildSupportModel(hass, config, discoverEntities(hass, config));

    expect(model.diagnostics.selectedDevice).toBe(false);
    expect(model.checks.find((check) => check.key === "device")?.level).toBe("warn");
    expect(model.summary.mappedEntities).toBe(0);
    expect(model.summary.disabledOrHiddenRegistryEntities).toBe(0);
  });

  it("renders the support page and exports the package through an event", async () => {
    const hass = supportHass();
    const card = await renderCard(hass, {
      device_id: "device-private-bathroom",
      show_support_mode: true,
      sections: ["support"],
      entities: {
        water_heating: "climate.dhe_private_bathroom",
        device_status: "sensor.dhe_device_status",
      },
    });
    const exported = vi.fn();
    card.addEventListener("dhe-connect-support-package", exported);

    expect(card.shadowRoot?.querySelector('[data-section="support"]')).toBeTruthy();
    expect(visibleText(card)).toContain("Compatibility checker");
    expect(visibleText(card)).toContain("Entity audit");

    card.shadowRoot?.querySelector<HTMLButtonElement>(".support-actions button")?.click();
    await card.updateComplete;

    expect(exported).toHaveBeenCalledTimes(1);
    const detail = (exported.mock.calls[0]?.[0] as CustomEvent).detail;
    expect(detail.supportPackage.schema).toBe("dhe-connect-card-support/v1");
    expect(detail.json).not.toContain("device-private-bathroom");
    expect(detail.json).not.toContain("climate.dhe_private_bathroom");
  });

  it("shows support mode when enabled even if existing sections omit support", async () => {
    const hass = supportHass();
    const card = await renderCard(hass, {
      device_id: "device-private-bathroom",
      show_support_mode: true,
      sections: ["overview"],
      entities: {
        device_status: "sensor.dhe_device_status",
      },
    });
    const sections = [...(card.shadowRoot?.querySelectorAll("[data-section]") ?? [])].map(
      (section) => section.getAttribute("data-section"),
    );

    expect(sections).toEqual(["overview", "support"]);
    expect(visibleText(card)).toContain("Support package");
  });

  it("translates all support compatibility checks", () => {
    const checkKeys: SupportCheck["key"][] = [
      "active_entities",
      "base_entity",
      "custom_element",
      "device",
      "device_registry",
      "disabled_entities",
      "entity_registry",
      "required_entities",
      "support_export",
      "unavailable_entities",
    ];
    for (const language of ["de", "en"] as const) {
      for (const key of checkKeys) {
        expect(UI_TRANSLATIONS[language][`support.check.${key}`]).toBeTruthy();
      }
      for (const key of ["available", "missing", "unknown", "unavailable"]) {
        expect(UI_TRANSLATIONS[language][`support.entity_status.${key}`]).toBeTruthy();
      }
      for (const key of ["disabled", "enabled", "hidden", "unknown"]) {
        expect(UI_TRANSLATIONS[language][`support.registry_status.${key}`]).toBeTruthy();
      }
    }
  });
});

function supportHass(): HomeAssistant {
  return {
    states: {
      "climate.dhe_private_bathroom": entity("heat", {
        current_temperature: 41,
        friendly_name: "Private bathroom DHE",
        temperature: 42,
      }),
      "sensor.dhe_device_status": entity("ready", {
        friendly_name: "Device status",
      }),
      "sensor.dhe_wlan_mac": entity("AA:BB:CC:DD:EE:FF", {
        friendly_name: "WLAN MAC",
      }),
    },
    entities: {
      "climate.dhe_private_bathroom": registry("device-private-bathroom", "water_heating"),
      "sensor.dhe_device_status": registry("device-private-bathroom", "device_status"),
      "sensor.dhe_wlan_mac": registry("device-private-bathroom", "wlan_mac"),
      "sensor.dhe_disabled_energy": {
        ...registry("device-private-bathroom", "energy_consumption_total"),
        disabled_by: "user",
      },
    },
    devices: {
      "device-private-bathroom": {
        id: "device-private-bathroom",
        name: "Private bathroom DHE",
      },
    },
    callService: async () => undefined,
  };
}

function registry(deviceId: string, translationKey: string) {
  return {
    config_entry_id: "entry-private-bathroom",
    device_id: deviceId,
    platform: INTEGRATION_DOMAIN,
    translation_key: translationKey,
    unique_id: `${INTEGRATION_DOMAIN}_${translationKey}_private`,
  };
}
