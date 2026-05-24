# Configuration

The card can be configured through the Home Assistant visual editor or YAML.
The visual editor is preferred for normal usage because it exposes sections,
actions, hidden entity keys and entity overrides with native controls.

## Minimal Config

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
```

The visual editor exposes the Home Assistant device as the mandatory primary
selector and includes a collapsed, non-technical device preview. YAML
configurations should use the same `device_id` value.
Private pre-`0.5.0` top-level `entity` anchors are migrated automatically; see
[../MIGRATION.md](../MIGRATION.md).

## Full Example

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
name: Bad
show_unavailable: false
show_optional: false
show_diagnostics: true
show_dangerous_actions: false
show_weather_services: false
show_icon_animations: true
show_display_buttons: false
layout_mode: auto
tile_size: auto
overview_columns: 3
overview_entities:
  - water_flow
  - power
  - outlet_temperature
  - inlet_temperature
  - water_consumption_total
  - energy_consumption_total
  - bath_fill_remaining_volume
sections:
  - overview
  - controls
  - bath
  - timers
  - memory
  - consumption
  - saving
  - weather
  - radio
  - diagnostics
  - actions
hide_entities:
  - reconnect_count
entities:
  water_flow: sensor.dhe_connect_current_water_flow
  eco_mode: switch.dhe_connect_eco_mode
tap_action:
  action: more-info
hold_action:
  action: navigate
  navigation_path: /lovelace/dhe
double_tap_action:
  action: toggle
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | required | Must be `custom:dhe-connect-card`. |
| `device_id` | string | unset | Required in the visual editor; selects the HA device used to scope entity discovery. |
| `name` | string/object | cleaned climate name | Card title override. Non-string Home Assistant name configs are preserved. |
| `layout_mode` | enum | `auto` | Dashboard section flow: `auto`, `mini`, `tablet`, `panel` or `kiosk`. |
| `tile_size` | enum | `auto` | Dynamic overview and display tile sizing: `auto`, `compact`, `normal` or `large`. |
| `show_unavailable` | boolean | `false` | Shows unavailable entities instead of hiding them. |
| `show_optional` | boolean | `false` | Shows optional missing entities as placeholders. |
| `show_diagnostics` | boolean | `true` | Enables diagnostic entities and the diagnostics section. |
| `show_dangerous_actions` | boolean | `false` | Shows pairing and delete actions. Dangerous actions still ask for confirmation. |
| `show_weather_services` | boolean | `false` | Shows the weather service helper form. |
| `show_icon_animations` | boolean | `true` | Enables state-specific animated icon states. Disable for a calmer dashboard. |
| `icon_theme` | enum | `state` | Icon color behavior: `state`, `ha`, `muted`, `vivid` or `custom`. |
| `icon_colors` | map | `{}` | Optional per-tone CSS colors for `icon_theme: custom`. Supported tones are `water`, `hot`, `energy`, `eco`, `wellness`, `timer`, `weather`, `radio`, `safety`, `status`, `ok`, `alert`, `memory` and `action`. |
| `show_display_buttons` | boolean | `false` | Shows Eco, wellness, bath fill, timers and memories as display-style button tiles. |
| `show_support_mode` | boolean | `false` | Shows the diagnostics and support section with an anonymized support package export, entity audit, compatibility checker and self-test. |
| `overview_columns` | number | `3` | Number of overview tile columns outside very narrow mobile cards. Values are clamped from 1 to 6. |
| `overview_entities` | list | `water_flow`, `power`, `outlet_temperature`, `inlet_temperature`, `water_consumption_total`, `energy_consumption_total`, `bath_fill_remaining_volume` | Known entity keys to render as overview tiles, in display order. |
| `section_entity_order` | map | `{}` | Optional per-section entity-key order written by the editor drag handles in **Entities**. Keys omitted here follow the catalog default order. |
| `sections` | list | all sections | Ordered list of visible sections. The visual editor can reorder them. |
| `hide_entities` | list | `[]` | Entity definition keys to hide. |
| `entities` | map | `{}` | Entity ID overrides by known key. |
| `tap_action` | action | `{ action: more-info }` | Action fired on click. |
| `hold_action` | action | unset | Action fired on long press. |
| `double_tap_action` | action | unset | Action fired on double click. |

## Layout Behavior

The card adapts to the width Home Assistant gives it:

- narrow dashboard cards render as a vertical stack of sections
- overview tiles use the configured number of columns outside very narrow cards
- medium and tablet cards use a dense twelve-track grid so sections can reflow
  into side-by-side blocks without changing their configured order
- wide cards keep the overview across the top and can use a three-block
  arrangement for the remaining sections
- `layout_mode: mini` tightens spacing for small dashboards
- `layout_mode: tablet` prefers a stable two-column flow on medium and wide
  dashboards
- `layout_mode: panel` stretches sections full width for fullscreen panel views
- `layout_mode: kiosk` removes card chrome and fills the available viewport
- `tile_size: auto` scales overview and display tiles with card width; use
  `compact`, `normal` or `large` when you need fixed sizing

This behavior is automatic and does not require YAML. Use `tile_size: normal` or
`tile_size: large` when you want roomier spacing inside the same responsive
block layout. Older YAML using `compact` is accepted as legacy input and mapped
to `tile_size` when no explicit tile size is set.

## Theme And Icon Colors

The default `state` icon theme derives its tones from Home Assistant theme
variables such as `--primary-color`, `--accent-color`, `--success-color`,
`--warning-color`, `--error-color`, `--info-color`, `--state-active-color`,
`--card-background-color`, `--ha-card-background` and `--divider-color`. The
card also adapts its fallback contrast for light and dark browser color schemes.

Use `icon_theme: custom` when you want to override individual tones. Values may
be hex colors, simple `rgb()`/`hsl()` colors, named CSS colors or Home Assistant
theme variables:

```yaml
icon_theme: custom
icon_colors:
  water: var(--primary-color)
  hot: var(--error-color)
  energy: "#f9a825"
  alert: red
```

## Sections

| Section | Purpose |
| --- | --- |
| `overview` | Water flow, power, temperatures, consumption totals, device status and error status. |
| `controls` | Climate control, Eco mode, child safety and wellness programs. |
| `bath` | Bath fill state, target volume and current/remaining volume. |
| `timers` | Brush and shower timers, durations and reset buttons. |
| `memory` | Temperature memory names, temperatures, apply buttons and delete buttons. |
| `consumption` | Water, energy, duration and cost metrics. |
| `saving` | Saving monitor values for water, energy, CO2 and cost. |
| `weather` | Weather entity, weather location and optional weather service form when enabled. |
| `radio` | Media player controls, source selector, volume and favorites. |
| `diagnostics` | Device, connection and protocol diagnostics. |
| `support` | Optional diagnostics and support tools for GitHub issues. |
| `actions` | Repair and radio pairing actions. |

## Overview Tiles

The `overview` section can render known entity keys as compact tiles. The visual
editor exposes this as "Overview tiles" with selection and drag handles, but
only offers active entities discovered from Home Assistant and hides empty
selection groups. Editor options use Home Assistant style form fields with
inline help and tooltip hints. YAML can use the same `overview_entities` list.
The list order is the display order:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
sections:
  - overview
overview_entities:
  - water_flow
  - power
  - eco_mode
  - error_status
  - last_usage_energy
```

Keys still obey `hide_entities`, `show_unavailable`, `show_optional`,
`show_diagnostics` and `show_dangerous_actions`.

Overview tiles are rendered by the advanced overview engine:

- every tile receives an internal semantic metric group for layout and color
  handling, without exposing group names inside the overview tile
- tile colors are conditional, for example live flow or power, idle zero
  values, OK status, warnings and active alarms
- supported HA attributes such as `change`, `delta`, `change_percent`,
  `trend`, `history`, `samples` or `sparkline` add trend indicators, delta
  values and small inline sparklines
- group and condition names stay internal so the overview remains focused on
  the entity label, value, trend and sparkline

## Icon Animation And Color

`show_icon_animations: true` enables meaningful, state-aware motion rather than
a single generic pulse:

- water flow uses a flowing water motion only when flow is above zero
- bath fill uses a fill motion
- timers rotate and tick when a timer value is active
- active wellness programs use a heartbeat/aura motion
- active radio uses a broadcast pulse
- error and alarm states use alert color and alert motion
- OK, connected or ready status values use the OK color
- DHE error codes such as `target_below_inlet` are treated as active alerts
- active water heating shifts from the blue water tone toward the warm heat tone

Set `show_icon_animations: false` to keep the colors but remove all motion.

## Display-Style Buttons

Set `show_display_buttons: true` to render the device-control areas as button
tiles instead of normal list rows:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
show_display_buttons: true
sections:
  - controls
  - bath
  - timers
  - memory
```

This affects:

- Eco and child-safety controls
- Wellness programs
- Bath fill
- Brush and shower timers
- Temperature memories

The controls keep the same Home Assistant services as the row view. Click, hold
and double-click actions also continue to work on the button tile itself.

## Diagnostics And Support Mode

Set `show_support_mode: true` to show a local support page inside the card.
The section is added automatically for existing cards even when their custom
`sections` list does not contain `support`:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
show_support_mode: true
sections:
  - overview
```

Add `support` to `sections` only when you want to control its exact placement
or build a support-only troubleshooting view.

The support section contains:

- anonymized support package export for GitHub issues
- entity audit summary for mapped, missing and unavailable entities
- integration diagnostics with hashed device, config-entry and base-entity IDs
- compatibility checker for registry availability, selected device and card setup
- self-test summary with pass, warning and failure counts
- explicit accessibility semantics (region landmarks, labeled lists and live
  status text) for screen-reader compatibility

The exported JSON intentionally avoids raw entity IDs, device IDs, config entry
IDs, MAC addresses and entity state values. It keeps stable hashes, domains,
entity keys and coarse status classes so issues can be debugged without leaking
private Home Assistant details.

## Actions

Actions follow the same shape as Home Assistant and Mushroom cards:

```yaml
tap_action:
  action: more-info
hold_action:
  action: navigate
  navigation_path: /lovelace/dhe
double_tap_action:
  action: toggle
```

Supported action names in the editor:

- `more-info`
- `toggle`
- `navigate`
- `url`
- service action, shown as `call-service` in the editor and stored as
  `perform-action` with `perform_action`
- `none`

The clicked entity is injected automatically. Set `entity` inside an action
only when the action should always target a different entity:

```yaml
tap_action:
  action: more-info
  entity: sensor.dhe_connect_device_status
```

Service action example:

```yaml
tap_action:
  action: perform-action
  perform_action: switch.toggle
  target:
    entity_id: switch.dhe_connect_eco_mode
  data:
    transition: 1
```

The visual editor exposes the service name, target entity, target area IDs,
target device IDs and service data. Service data must be a JSON object in the
editor; invalid JSON is marked in place and does not overwrite the current
action config.

`action: none` disables that interaction. For `hold_action` and
`double_tap_action`, `none` is treated as inactive and does not start long-press
or double-click timers, so normal clicks stay responsive:

```yaml
hold_action:
  action: none
double_tap_action:
  action: none
```

## Entity Discovery

The card discovers entities by matching Home Assistant registry metadata:

- selected Home Assistant device
- platform `stiebel_dhe_connect`
- enabled and visible in the registry
- known translation key, original name or entity ID pattern

If registry metadata is missing, the card falls back to known entity keys and
labels. Manual overrides can be provided through `entities` and are accepted
only when the referenced entity exists in Home Assistant and matches the
expected domain for that key.

The `device_id` setting scopes discovery for dashboards with one or more DHE
devices. The visual editor exposes this as a required Home Assistant device
selector.

## Entity Overrides

Use overrides when the auto-discovery result is incomplete or a custom entity
should be rendered for a known key:

```yaml
entities:
  water_flow: sensor.custom_water_flow
  eco_mode: switch.custom_eco
```

The visual editor provides a domain-filtered picker per visible key and writes
the same `entities` config, so YAML and GUI edits stay compatible. The list is
kept focused on active discovered entities, but hidden keys and already
configured override keys stay visible so they can be re-enabled or corrected.
If a YAML override points at a stale entity or the wrong domain, the card
ignores that override and falls back to automatic discovery for the key.

The **Entities** section in the visual editor also supports drag-and-drop
ordering per section. That order is stored in `section_entity_order`:

```yaml
section_entity_order:
  overview:
    - power
    - water_flow
    - device_status
  diagnostics:
    - reconnect_count
    - error_status
```

If a section is not listed, default catalog order is used for that section.

## Hidden Entities

Hide individual known keys with:

```yaml
hide_entities:
  - error_status
  - reconnect_count
```

The visual editor groups active discovered keys by section when Home Assistant
state is available, keeps hidden rows visible so they can be switched back on
and stores unchecked rows in `hide_entities`. Empty entity groups are hidden.

## Entity Key Reference

### Overview

| Key | Domain | Description |
| --- | --- | --- |
| `water_flow` | sensor | Current water flow. |
| `power` | sensor | Current power consumption. |
| `inlet_temperature` | sensor | Inlet temperature. |
| `outlet_temperature` | sensor | Outlet temperature. |
| `water_consumption_total` | sensor | Total water consumption. |
| `energy_consumption_total` | sensor | Total energy consumption. |
| `bath_fill_remaining_volume` | sensor | Remaining bath fill volume. |
| `device_status` | sensor | Device status, preferred in the header after connection state. |
| `error_status` | sensor | Error status, shown with alert color and motion when the value is not an OK state. |

### Controls

| Key | Domain | Description |
| --- | --- | --- |
| `water_heating` | climate | Main water-heating climate entity. |
| `eco_mode` | switch | Eco mode. |
| `child_safety_active` | switch | Child safety state. |
| `child_safety_temperature_limit` | number | Child safety temperature limit. |
| `eco_flow_limit` | number | Eco flow limit. |
| `bridge_temperature_maximum` | button | Temporarily overrides the maximum temperature for five minutes. |
| `wellness_cold_prevention` | switch | Cold prevention program. |
| `wellness_winter_pick_me_up` | switch | Winter pick-me-up program. |
| `wellness_summer_fitness` | switch | Summer fitness program. |
| `wellness_circulation_boost` | switch | Circulation boost program. |

### Bath And Timers

| Key | Domain | Description |
| --- | --- | --- |
| `bath_fill_active` | switch | Bath fill activation. |
| `bath_fill_target_volume` | number | Bath fill target volume. |
| `bath_fill_remaining_volume` | sensor | Remaining bath fill volume. |
| `bath_fill_current_volume` | sensor | Current bath fill volume. |
| `brush_timer_active` | switch | Brush timer activation. |
| `brush_timer_duration` | number | Brush timer duration. |
| `brush_timer_remaining` | sensor | Brush timer remaining time. |
| `reset_brush_timer` | button | Reset brush timer. |
| `shower_timer_active` | switch | Shower timer activation. |
| `shower_timer_duration` | number | Shower timer duration. |
| `shower_timer_remaining` | sensor | Shower timer remaining time. |
| `reset_shower_timer` | button | Reset shower timer. |

### Temperature Memories

Memory keys are slot based. Slots 1 and 2 are always expected; later slots are
optional.

| Pattern | Domain | Description |
| --- | --- | --- |
| `temperature_memory_<slot>_name` | text | Memory name. |
| `temperature_memory_<slot>_temperature` | number | Memory temperature. |
| `temperature_memory_<slot>` | button | Apply memory. |
| `delete_temperature_memory_<slot>` | button | Delete memory. |

### Consumption And Saving

| Key | Domain | Description |
| --- | --- | --- |
| `water_consumption_week` | sensor | Weekly water consumption. |
| `water_consumption_year` | sensor | Yearly water consumption. |
| `water_consumption_total` | sensor | Total water consumption. |
| `energy_consumption_week` | sensor | Weekly energy consumption. |
| `energy_consumption_year` | sensor | Yearly energy consumption. |
| `energy_consumption_total` | sensor | Total energy consumption. |
| `odb_hot_water_volume` | sensor | Total ODB hot water volume. |
| `odb_heating_energy` | sensor | Total ODB heating energy. |
| `last_usage_water` | sensor | Last usage water. |
| `last_usage_energy` | sensor | Last usage energy. |
| `last_usage_time` | sensor | Last usage duration. |
| `last_usage_cost` | sensor | Last usage cost. |
| `odb_possible_energy_saving` | sensor | Possible ODB energy saving. |
| `odb_actual_water_saving` | sensor | Actual ODB water saving. |
| `saving_monitor_consumption_water` | sensor | Saving monitor water consumption. |
| `saving_monitor_consumption_energy` | sensor | Saving monitor energy consumption. |
| `saving_monitor_consumption_co2` | sensor | Saving monitor CO2 consumption. |
| `saving_monitor_activation_rate` | sensor | Saving monitor activation rate. |
| `saving_monitor_possible_water` | sensor | Possible water saving. |
| `saving_monitor_possible_energy` | sensor | Possible energy saving. |
| `saving_monitor_possible_co2` | sensor | Possible CO2 saving. |
| `saving_monitor_possible_cost` | sensor | Possible cost saving. |
| `saving_monitor_real_water` | sensor | Actual water saving. |
| `saving_monitor_real_energy` | sensor | Actual energy saving. |
| `saving_monitor_real_co2` | sensor | Actual CO2 saving. |
| `saving_monitor_real_cost` | sensor | Actual cost saving. |

### Weather, Radio And Diagnostics

| Key | Domain | Description |
| --- | --- | --- |
| `weather_location` | select | Weather location selector. |
| `weather` | weather | Weather entity. |
| `radio` | media_player | DHE radio media player. |
| `connection_state` | sensor | Connection state, preferred first in the header. |
| `controlunit_name` | text | Device name text entity. |
| `device_info` | sensor | Device information. |
| `protocol_version` | sensor | Protocol version. |
| `product_id` | sensor | Product ID. |
| `nominal_power` | sensor | Nominal power. |
| `scald_protection_active` | binary_sensor | Scald protection state. |
| `scald_protection_temperature_limit` | sensor | Scald protection temperature limit. |
| `reconnect_count` | sensor | Reconnect counter. |
| `last_reconnect_reason` | sensor | Last reconnect reason. |
| `next_reconnect_delay` | sensor | Delay until the next reconnect attempt. |
| `wellness_runtime_normalized` | sensor | Wellness runtime in normalized seconds. |
| `wlan_mac` | sensor | WLAN MAC address. |
| `bluetooth_mac` | sensor | Bluetooth MAC address. |
| `operating_duration` | sensor | Operating duration. |
| `repair_pairing` | button | Repair pairing. |
| `disconnect_radio_pairing` | button | Disconnect radio pairing. |

## Weather Service Helper

The weather helper form is hidden by default:

```yaml
show_weather_services: false
```

When enabled, the card can call the known `stiebel_dhe_connect` weather helper
services exposed by the backend integration:

| Service | Fields used by the card |
| --- | --- |
| `search_weather_location` | `entry_id`, `name`, `country_id` |
| `add_weather_favorite` | `entry_id`, `name`, `country_id`, `result_number`, `location_id` |
| `remove_weather_favorite` | `entry_id`, `name`, `country_id`, `result_number`, `location_id` |
| `toggle_weather_favorite` | `entry_id`, `name`, `country_id`, `result_number`, `location_id` |
| `select_weather_location` | `entry_id`, `name`, `country_id`, `result_number`, `location_id` |

Unsupported service names are ignored by the action helper and are not sent to
Home Assistant.
