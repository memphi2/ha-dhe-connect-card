# Configuration Baseline

## Current Policy

`ha-dhe-connect-card` no longer applies legacy/fallback config migrations.
Card configs are expected to use the current schema directly.
Use `ha-dhe-connect` integration version `1.8.4` or newer so the entity surface
matches this post-legacy baseline.

## Required Anchor

Use `device_id` as the primary anchor:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
```

Top-level `entity` is not migrated anymore and is ignored by current versions.

## Home Assistant 2026.8 Device Split

Home Assistant 2026.8 can split a device which was previously shared by more
than one integration. The card preserves existing YAML and resolves a stale
`device_id` automatically only when exactly one active DHE device is present.
With multiple DHE devices, open the visual editor, select the DHE device again,
and save the card. This keeps discovery scoped to the intended water heater.

## Tile Size

Use `tile_size` directly:

```yaml
tile_size: auto   # auto | compact | normal | large
```

Legacy `compact` is not mapped anymore.

## Wellness Key Names

Use canonical entity keys from the current catalog/integration surface. Old
wellness key aliases are no longer remapped.

## Upgrade Checklist

1. Open the visual editor and select the target DHE device.
2. Save to persist `device_id`.
3. Replace any old `compact` usage with `tile_size`.
4. Replace outdated key names with current catalog keys.
