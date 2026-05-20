import { describe, expect, it, vi } from "vitest";
import {
  logLegacyEntityMigration,
  migrateLegacyEntityAnchor,
} from "../src/migration";
import { entity, registry } from "./helpers/card";

describe("legacy entity migration", () => {
  it("migrates a legacy entity anchor to its registry device id", () => {
    const result = migrateLegacyEntityAnchor(
      {
        states: {
          "climate.legacy_dhe": entity("heat"),
        },
        entities: {
          "climate.legacy_dhe": registry("device-a", "water_heating"),
        },
        callService: async () => undefined,
      },
      { type: "custom:dhe-connect-card", entity: "climate.legacy_dhe" },
    );

    expect(result.config).toEqual({
      type: "custom:dhe-connect-card",
      device_id: "device-a",
    });
    expect(result.legacy).toMatchObject({
      legacyEntity: "climate.legacy_dhe",
      migratedDeviceId: "device-a",
      resolved: true,
    });
  });

  it("keeps explicit device ids and removes the legacy entity anchor", () => {
    const result = migrateLegacyEntityAnchor(
      {
        states: {
          "climate.legacy_dhe": entity("heat"),
        },
        entities: {
          "climate.legacy_dhe": registry("device-a", "water_heating"),
        },
        callService: async () => undefined,
      },
      {
        type: "custom:dhe-connect-card",
        device_id: "device-b",
        entity: "climate.legacy_dhe",
      },
    );

    expect(result.config).toEqual({
      type: "custom:dhe-connect-card",
      device_id: "device-b",
    });
    expect(result.legacy?.migratedDeviceId).toBe("device-b");
  });

  it("uses a temporary water heating override when registry metadata is missing", () => {
    const result = migrateLegacyEntityAnchor(
      {
        states: {
          "climate.legacy_dhe": entity("heat"),
        },
        callService: async () => undefined,
      },
      { type: "custom:dhe-connect-card", entity: "climate.legacy_dhe" },
    );

    expect(result.config).toEqual({
      type: "custom:dhe-connect-card",
      entities: { water_heating: "climate.legacy_dhe" },
    });
    expect(result.legacy).toMatchObject({
      usedWaterHeatingOverride: true,
      resolved: true,
    });
  });

  it("respects existing domain-nested water heating overrides", () => {
    const result = migrateLegacyEntityAnchor(
      {
        states: {
          "climate.legacy_dhe": entity("heat"),
          "climate.custom_dhe": entity("heat"),
        },
        callService: async () => undefined,
      },
      {
        type: "custom:dhe-connect-card",
        entity: "climate.legacy_dhe",
        entities: {
          climate: { water_heating: "climate.custom_dhe" },
        },
      },
    );

    expect(result.config).toEqual({
      type: "custom:dhe-connect-card",
      entities: {
        climate: { water_heating: "climate.custom_dhe" },
      },
    });
    expect(result.legacy).toMatchObject({
      usedWaterHeatingOverride: false,
      resolved: true,
    });
  });

  it("logs each legacy migration warning once", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    logLegacyEntityMigration("test", {
      legacyEntity: "climate.legacy_dhe",
      migratedDeviceId: "device-a",
      usedWaterHeatingOverride: false,
      resolved: true,
    });
    logLegacyEntityMigration("test", {
      legacyEntity: "climate.legacy_dhe",
      migratedDeviceId: "device-a",
      usedWaterHeatingOverride: false,
      resolved: true,
    });

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it("does not claim an unresolved migration has already used the override fallback", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    logLegacyEntityMigration("unresolved-test", {
      legacyEntity: "climate.legacy_dhe",
      usedWaterHeatingOverride: false,
      resolved: false,
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("waiting for Home Assistant registry metadata"),
    );
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("temporary water_heating"));
    warn.mockRestore();
  });
});
