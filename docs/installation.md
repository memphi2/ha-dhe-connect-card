# Installation

This card is a Lovelace frontend module for Home Assistant. It expects the
`stiebel_dhe_connect` integration to provide the device entities.

## Prerequisites

- Home Assistant with dashboards enabled.
- The DHE integration is installed and configured (`ha-dhe-connect >= 1.8.4`).
- At least one DHE device exists in the Home Assistant device registry.
- Browser cache can be cleared or refreshed after updates.

## Recommended: HACS Custom Repository

1. Open HACS.
2. Open custom repositories.
3. Add this repository URL:
   `https://github.com/memphi2/ha-dhe-connect-card`
4. Select the dashboard/Lovelace category when HACS asks for a type.
5. Install `DHE Connect Card`.
6. Reload the browser tab.
7. Add the card to a dashboard through the visual editor and select the DHE
   Home Assistant device.

Minimal YAML config:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
```

HACS should add the resource automatically. If it does not, add:

```yaml
url: /hacsfiles/ha-dhe-connect-card/ha-dhe-connect-card.js
type: module
```

## Manual Installation

Manual installation is useful for local testing or when HACS is not available.

Build the bundle:

```bash
npm ci
npm run build
```

Create a directory in Home Assistant:

```text
config/www/community/ha-dhe-connect-card/
```

Copy these files into that directory:

```text
dist/ha-dhe-connect-card.js
dist/ha-dhe-connect-card.js.map
```

Add this dashboard resource:

```yaml
url: /local/community/ha-dhe-connect-card/ha-dhe-connect-card.js
type: module
```

## Updating

For HACS installations:

1. Update through HACS.
2. Restart or reload the Home Assistant frontend if HACS asks for it.
3. Reload the dashboard.
4. Clear the browser cache if the old bundle is still visible.

For manual installations:

1. Run `npm ci` if dependencies changed.
2. Run `npm run build`.
3. Replace the files in `config/www/community/ha-dhe-connect-card/`.
4. Reload the dashboard.

## Cache Busting

If Home Assistant still renders an old card version:

1. Hard reload the browser tab.
2. Open Home Assistant settings and reload dashboard resources.
3. Temporarily append a query string to the resource URL:

```yaml
url: /local/community/ha-dhe-connect-card/ha-dhe-connect-card.js?v=dev
type: module
```

Remove the query string after the browser has picked up the new bundle.

## First Card

Start with the smallest possible config:

```yaml
type: custom:dhe-connect-card
device_id: <home_assistant_device_id>
```

Then open the visual editor to enable sections, display-style buttons, icon
animations or custom actions.

When using the visual editor, the DHE device selector is mandatory. YAML
dashboards should use the same Home Assistant `device_id` value.
