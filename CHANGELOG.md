# Changelog

All notable changes to this project are documented here.

This repository starts its public release line with `v0.5.0` as a fresh initial
release. Earlier local and prerelease iteration history is intentionally not
listed in this public changelog.

## 0.5.0 - 2026-05-20

### Initial Release

- Initial public release of the DHE Connect Card as a Home Assistant Lovelace
  dashboard card for the `stiebel_dhe_connect` integration.
- Visual editor first setup with mandatory Home Assistant device selection,
  Home Assistant style form fields, collapsible advanced groups and GUI support
  for sections, overview tiles, actions, hidden entity keys and entity
  overrides.
- Automatic same-device entity discovery from Home Assistant state and registry
  metadata, with disabled and hidden registry entities excluded by default.
- Mushroom-style `tap_action`, `hold_action` and `double_tap_action` handling
  for header, overview tiles, entity rows and display-style buttons.
- Responsive dashboard layout with compact default behavior, wide-column section
  reflow, configurable overview columns and dynamic tile sizing.
- State-aware overview engine with conditional tile colors, trend indicators,
  delta values, inline sparklines and compact sensor chips when Home Assistant
  attributes provide that data.
- Stateful icon colors and optional meaningful animations for flow, heating,
  bath fill, timers, wellness programs, radio, safety, alarms and normal device
  states.
- Optional display-style button layout for Eco mode, wellness programs, bath
  fill, timers and temperature memories.
- Weather, radio, diagnostics, support-mode and service-call helper sections
  with guarded Home Assistant service calls and visible error feedback.
- German and English structured translations with CI validation and
  Crowdin/Weblate-ready extraction workflow.
- HACS custom repository metadata, committed production bundle, source map and
  GitHub release workflow for tag-based asset publication.

### Hardening

- Runtime config normalization, legacy pre-`0.5.0` config migration and
  defensive Home Assistant state handling.
- Memoized discovery, keyed section rendering and throttled animation behavior
  for larger dashboards.
- Legal hygiene validation that blocks committed secrets, private HA hosts,
  undocumented media assets, proprietary DHE web assets and copied
  web-interface markers.
- Third-party notice tracking for bundled Lit runtime code.

### Validation

- CI runs structured translation validation, TypeScript type checking, ESLint,
  Vitest unit/render tests, Vite production build, HACS compatibility checks,
  license checks, legal checks, Home Assistant storage fixture smoke and
  Chromium render smoke.
- Local release validation also supports live Home Assistant smoke and entity
  audit scripts through environment-only credentials.
