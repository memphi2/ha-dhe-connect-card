# Troubleshooting

## Card Does Not Load

Check the browser console first. Most load failures are resource path or cache
issues.

For HACS installations, the resource should be:

```yaml
url: /hacsfiles/ha-dhe-connect-card/ha-dhe-connect-card.js
type: module
```

For manual installations, the resource commonly looks like:

```yaml
url: /local/community/ha-dhe-connect-card/ha-dhe-connect-card.js
type: module
```

After changing resources, reload the dashboard and hard reload the browser tab.

## Opening A GitHub Issue

Enable diagnostics and support mode before filing an issue:

```yaml
show_support_mode: true
```

The support section appears automatically, also on cards with a custom section
order. Use it to export the anonymized support package. It includes
entity audit results, compatibility checks and self-test status without raw
entity IDs, device IDs, config entry IDs, MAC addresses or state values.

## Old Version Still Appears

Home Assistant and the browser can keep old frontend modules cached. Try:

1. Hard reload the browser.
2. Reload dashboard resources in Home Assistant.
3. Append a temporary query string to the resource URL.
4. Verify that the file in `www` or HACS actually changed.

## Entity Names Still Show A Device Prefix

The card removes common DHE device prefixes from rendered labels and states.
If a prefix still appears:

1. Verify that the installed bundle is current.
2. Check whether the text comes from an entity friendly name, state, source
   list, media title or a custom card name.
3. Add a short issue with the exact text pattern and the affected entity key.

## Entity Click Does Not Open More Info

The default `tap_action` is:

```yaml
tap_action:
  action: more-info
```

If clicks do nothing:

1. Confirm the entity row or tile is not disabled.
2. Remove custom `tap_action`, `hold_action` and `double_tap_action` temporarily.
3. Clear the frontend cache after deploying a new bundle.
4. Run `npm run render-smoke` locally; it verifies tap, double-tap and hold
   action events.

If you intentionally want to disable hold or double-tap, use:

```yaml
hold_action:
  action: none
double_tap_action:
  action: none
```

Those disabled interactions should not delay normal clicks. If they do, verify
that the installed bundle is the current `v0.5.0` release or newer.

## Missing Entities

The card intentionally skips disabled and hidden Home Assistant registry
entities. To show an entity:

1. Enable it in Home Assistant.
2. Unhide it in the entity registry.
3. Reload the dashboard.
4. Use the visual editor's entity override picker if auto-discovery still does
   not find it.

Manual override example:

```yaml
entities:
  eco_mode: switch.my_dhe_eco
```

## Too Many Entities

Use either the visual editor visibility toggles or YAML:

```yaml
hide_entities:
  - reconnect_count
  - last_reconnect_reason
```

## Service Call Fails

The card shows an inline error and dispatches a Home Assistant notification
event when a service call fails. Check:

1. Entity domain matches the control type.
2. The backend integration supports the requested service.
3. The entity is available.
4. Dangerous actions are enabled only when you actually want to show them.

Weather helper calls are intentionally allow-listed. If a custom or newly added
backend weather service is not listed in `docs/configuration.md`, the card will
not call it until the frontend has been updated.

## Radio Favorites

Radio favorites are read from media-player source and favorite attributes.
Selecting a favorite calls `media_player.select_source`. Managing the favorite
list itself remains part of the backend integration until dedicated services
exist.

## Display-Style Buttons Look Too Busy

Disable button tiles and animations independently:

```yaml
show_display_buttons: false
show_icon_animations: false
```

`show_display_buttons` controls layout. `show_icon_animations` controls motion.

## Report A Useful Bug

Include:

- Home Assistant version.
- Browser name and version.
- Card version or commit.
- Minimal YAML config.
- The affected entity key.
- Browser console error, if any.
- A screenshot with private data removed.

Do not include tokens, passwords, internal hostnames or private IP addresses in
public issues.
