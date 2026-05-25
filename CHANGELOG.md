# Changelog

All notable changes to this project are documented here.

This repository starts its public release line with `v0.5.0` as a fresh initial
release. Earlier local and prerelease iteration history is intentionally not
listed in this public changelog.

## 0.6.4 - 2026-05-25

### Baseline Hardening

- Removed remaining legacy/fallback migration paths from runtime config
  normalization and the visual editor.
- Removed legacy wellness key remapping aliases and the legacy `compact` to
  `tile_size` fallback path.
- Removed the legacy editor migration module and its now-obsolete test suite.

### Editor And API Surface Cleanup

- Simplified editor config emission flow and reduced duplicate update churn.
- Tightened override/editor helper paths and reduced unused/dead style surface.
- Reduced overview engine API exposure by keeping internal grouping/condition
  helpers private and validating behavior through public tile APIs.

### Compatibility

- Current card baseline requires `ha-dhe-connect >= 1.8.4` to ensure the
  post-legacy entity surface is present.

### Validation

- Release preparation validated with lint, typecheck, unit tests, docs checks
  and render smoke.

## 0.6.3 - 2026-05-24

### Editor Ordering Stabilization

- Restored a dedicated `Sections` editor block with explicit section enable/disable
  controls and drag ordering.
- Reordered the visual editor structure to keep action configuration first,
  followed by sections, overview tiles, and then per-section entity editors.
- Synced per-section editor ordering with the selected section order to remove
  UI ordering drift.

### UX And Regression Hardening

- Fixed section drag/toggle regressions introduced during the previous editor
  flattening pass.
- Added/updated editor tests to assert top-level editor ordering and section
  ordering behavior after drag operations.

### Validation

- Validation remains green for this release candidate:
  `npm run lint`, `npm run typecheck`, and targeted editor suites
  `npm run test -- test/editor.test.ts test/editor-ordering.test.ts`.

## 0.6.2 - 2026-05-23

### CI Deprecation Hardening

- Upgraded the `jsdom` toolchain dependency to `^29.1.1` to remove the
  transitive deprecated `whatwg-encoding` path observed during dependency
  installation.
- Added `scripts/deprecated-dependency-check.mjs` and wired
  `npm run deprecation-check` into `npm run check`.
- Added `scripts/npm_ci_with_deprecation_guard.mjs` so CI and Release workflows
  fail immediately when `npm ci` emits deprecation warnings.

### Docs And Release UX

- Refined README quick-start guidance for visual-editor-first setup.
- Updated release documentation linkage for `v0.6.2`.

### Validation

- Full validation remains green after hardening and docs updates:
  `npm run check`, `npm run docs-check`, `npm run render-smoke`,
  `npm run ha:storage-smoke -- test/fixtures/ha-config`,
  `npm audit --omit=dev` and strict TypeScript no-unused checks.

## 0.6.1 - 2026-05-21

### Entity Sync

- Synced card entity coverage with `ha-dhe-connect` `v1.8.0` and added the new
  diagnostics sensor key `wellness_runtime_normalized`.
- Updated integration key fixtures, entity-label translations (`en`/`de`) and
  configuration reference docs for the new sensor.

### UI Semantics

- Refined icon semantics for wellness-related keys: only wellness program
  switches use wellness visual mapping; the new runtime diagnostics sensor keeps
  timer/runtime visuals.

### Validation

- Full validation and render/docs checks remain green after the entity sync.

## 0.6.0 - 2026-05-21

### Stabilization

- Diagnostics rendering now keeps selected diagnostics visible when entities are
  integration-disabled in Home Assistant registry metadata.
- Visual editor entity overrides now keep a working picker even when
  `ha-selector` is unavailable in the current frontend runtime by falling back
  to `ha-entity-picker`.
- Discovery caching now uses a fast-path for unchanged Home Assistant object
  references and lighter signature handling to reduce repeated discovery churn
  on larger dashboards.
- Smoke and live-audit scripts now treat Home Assistant
  `unsupported_grant_type` revoke responses as a known variant and continue with
  explicit localhost token cleanup, reducing noisy false-warning output.

### Validation

- Full project validation stays green (`npm run check`, `npm run docs-check`,
  `npm run render-smoke`) including compatibility, legal/license checks, render
  smoke and Home Assistant fixture/live audit helpers.

## 0.5.1 - 2026-05-21

### Stabilization

- Release hardening: stricter compatibility checks now validate source-map
  linkage, source-map JSON integrity and changelog/README release consistency.
- Docs hardening: `npm run docs-check` now includes release-readiness coverage
  for semver alignment, notes/changelog linkage and screenshot-reference checks.
- Accessibility polish for the visual editor: helper tooltips are now semantic
  keyboard-focusable buttons and foldout summaries have explicit focus-visible
  rings.
- Accessibility polish for support mode and radio favorites: support lists now
  expose explicit ARIA labels; radio favorites expose list semantics and
  `aria-pressed` state.
- Performance stabilization for large dashboards: overview signature handling
  avoids large array serialization churn, support-model cache signatures are
  lighter, and section-visibility filtering is memoized per render signature.
- Regression coverage expanded for editor tooltip behavior, support-list ARIA
  labels, radio favorite accessibility state and section re-render behavior
  during Home Assistant availability changes.

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
