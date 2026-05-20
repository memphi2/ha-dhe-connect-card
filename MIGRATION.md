# Pre-0.5.0 Configuration Notes

## From Card-Level `entity` To `device_id`

Private prerelease YAML examples used a top-level climate entity as the card
anchor:

```yaml
type: custom:dhe-connect-card
entity: climate.dhe_connect_durchlauferhitzer
```

Current versions use the Home Assistant device registry instead:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
```

The visual editor is the safest way to write the correct value:

1. Open the dashboard editor.
2. Edit the DHE Connect Card.
3. Select the DHE Home Assistant device in the device picker.
4. Save the card.

## Automatic Migration

The card still accepts pre-`0.5.0` configs that contain a top-level `entity`
value long enough to migrate them safely:

- if Home Assistant exposes registry metadata, the card derives `device_id` from
  the legacy climate entity
- the visual editor writes the migrated config back without the top-level
  `entity` key
- the editor shows a `Legacy entity anchor detected` warning until the config is
  saved
- if the visual editor loads before Home Assistant registry metadata is
  available, edits keep the legacy `entity` anchor until migration can resolve
- the browser console logs a one-time warning for development/debugging

If registry metadata is unavailable, the card temporarily maps the old climate
entity to:

```yaml
entities:
  water_heating: climate.dhe_connect_durchlauferhitzer
```

That keeps the card renderable, but selecting the actual Home Assistant device
in the editor is still recommended.

## What Still Uses `entity`

The top-level card `entity` key is legacy-only. These keys remain valid because
they are part of normal Home Assistant action or override configuration:

```yaml
entities:
  water_flow: sensor.dhe_connect_current_water_flow

tap_action:
  action: more-info
  entity: sensor.dhe_connect_device_status
```

`entities` is for per-key card overrides. `tap_action.entity`,
`hold_action.entity` and `double_tap_action.entity` are action targets.
