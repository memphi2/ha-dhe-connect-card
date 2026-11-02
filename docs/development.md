# Development, CI And Smoke Tests

This repository contains the Lovelace card source, tests, HACS metadata and the
generated frontend bundle in `dist/`.

## Tooling

The development lockfile overrides Minimatch to 11.0.1 or newer because the
ESLint and TypeScript-ESLint dependency ranges still select the vulnerable v10
matcher. Remove the override once both upstream tools require a fixed matcher.
Lint, type checking and tests must pass when refreshing this override.

- Node.js 22.13 LTS or Node.js 24 and newer (CI and releases use Node.js 26 LTS)
- npm
- TypeScript
- ESLint
- Vitest
- Vite
- Chromium or Chrome for render smoke tests

Install dependencies:

```bash
npm ci
```

## Common Commands

```bash
npm run typecheck
npm run i18n:check
npm run i18n:extract
npm run lint
npm run test
npm run build
npm run compat
npm run docs-check
npm run license-check
npm run legal-check
npm run deprecation-check
npm run check
npm run render-smoke
npm run ha:components-smoke
npm run readme-screenshots
npm audit --package-lock-only --audit-level=low
npx tsc --noEmit --noUnusedLocals --noUnusedParameters
npx ts-prune --ignore 'test|dist|node_modules'
```

`npm run check` runs translation validation, type checking, linting, Vitest,
production build and bundle compatibility checks, plus third-party notice and
legal hygiene checks.

`npm run i18n:extract` normalizes `translations/*.json` and refreshes the
English entity-label extraction from `src/catalog.ts`. `npm run i18n:check`
verifies Crowdin/Weblate JSON parity, placeholders, formatting and typed
`localize()` source usage, including dynamic key families and lookup maps.

`npm run docs-check` runs focused guards for:

- card options, entity key documentation, catalog definitions and UI
  translations
- release readiness (`package.json` version, changelog heading/date, matching
  release-notes file and README latest-release link)
- README screenshot references vs. tracked screenshot assets

`npm run legal-check` scans tracked files for committed secrets, private network
addresses, proprietary DHE web assets, undocumented media files and required
legal disclaimers.

`npm run deprecation-check` fails when `package-lock.json` contains package
entries with npm deprecation metadata.

`npm run render-smoke` builds the card and opens it in Chromium. The smoke test
verifies:

- rendered card text has no repeated DHE device prefix
- colored icon states are present
- icon animations can be disabled
- visible keyboard-focus feedback is present on interactive overview metrics
- tap, double-tap and hold actions dispatch correctly
- Mushroom-style borders and Home Assistant row sizing are present
- display-style button tiles render when enabled
- support-mode accessibility wiring is present (`aria-describedby`, list roles,
  status live region)
- compact, tablet, panel, kiosk, wide-dashboard, display-button and support
  snapshots keep controls inside the card, reject clipped labels, preserve 8px
  borders and keep responsive columns intact

For local performance inspection during development you can enable lightweight
timing logs in the browser console:

```js
window.__DHE_CONNECT_DEBUG_TIMING__ = true;
```

When enabled (only in `import.meta.env.DEV`), the card logs render-adjacent
timings for discovery, overview tiles, section filtering and support-model
generation. Production bundles never emit these timing logs.

Profile cold discovery separately from cache hits. Candidate IDs, registry
identity fields and friendly names are normalized once per discovery, and
catalog aliases are prepared once at module load. A synthetic Node run with
1,000 unrelated sensor states and no registry dropped from approximately
363 ms to 20 ms after this change. This is a local comparison, not a browser
latency guarantee. Tests enforce one friendly-name read per candidate and
verify that subsequent metadata changes are still observed; they do not use
machine-dependent timing thresholds.

## Validation Boundaries

| Check | Evidence | Not covered |
| --- | --- | --- |
| `npm run compat` | Metadata, bundle, source-map and release-document consistency. | HA runtime behavior. |
| `npm run test` | Unit and jsdom regressions, including missing climate targets, pending gestures on config changes and empty section selections. | Real device responses or native HA component behavior. |
| `npm run render-smoke` | Card layout, focus, help popovers and interactions with synthetic states and minimal HA element stubs. | Native HA picker/switch implementation. |
| `npm run ha:components-smoke` | Original HA components in Chromium with synthetic registry/API/context data. | A running HA backend, device services or Marketplace installation. |
| `npm run ha:storage-smoke -- test/fixtures/ha-config` | Storage fixture shape and registry mapping. | Live registry contents. |
| Live smoke/entity audit | The explicitly selected private test environment. | Other HA versions or devices. |

The original-component test covers the HA 2026.4.0 frontend (`20260325.5`)
and package `20261028.3`. It types into native text controls, changes a device
and an entity override through the real pickers, checks switch-label visibility
and single-toggle behavior, and exercises keyboard switching and help dismissal
at mobile and desktop widths. Synthetic data does not replace any HA controls.

The test downloads checksum-pinned official PyPI wheels from
`test/fixtures/ha-frontends.json`, extracts them into a temporary directory and
removes that directory on completion. It needs `unzip`, Chromium and network
access. No upstream frontend assets are committed or included in the release.
For offline runs, set `HA_FRONTEND_WHEEL_DIR` to a directory containing
`20260325.5.whl` and `20261028.3.whl`; the same SHA-256 checks still apply.
Run one baseline with `npm run ha:components-smoke -- minimum` or `-- current`.

When updating a baseline, verify its official release provenance and checksum,
then run both baselines. The harness invokes the pinned frontend's route loader
to initialize Lovelace without a backend; changes to that upstream loader must
be reviewed rather than bypassed with substitute components.

`npm run readme-screenshots` builds the card and regenerates the four README
screenshots from deterministic Chromium render-smoke presets.

`ts-prune` is used as an extra review aid only. The expected residual findings
are the Vite default export and TypeScript parser noise around `satisfies`
syntax; actionable source exports should be removed or justified.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`.
`.github/workflows/codeql.yml` adds GitHub CodeQL analysis for JavaScript and
TypeScript on the same events, plus a weekly scheduled scan. The workflow has
only read access to repository data and write access to security events.

Jobs:

| Job | Coverage |
| --- | --- |
| `test` | `npm run check` on Node.js 26 LTS. |
| `ha-compat` | Build, HACS metadata compatibility and HA storage fixture smoke. |
| `browser-smoke` | Chromium render smoke with built bundle. |
| `ha-components` | Original HA frontend components on minimum/current package baselines. |
| `Dependency Audit` | All locked runtime and development dependencies on PRs, main pushes and weekly. |
| `CodeQL` | GitHub static analysis for JavaScript and TypeScript. |

## Release Workflow

`.github/workflows/release.yml` runs on `v*` tags and manual dispatch. It:

1. Installs dependencies on Node.js 26 LTS.
   The workflow install step uses `scripts/npm_ci_with_deprecation_guard.mjs`,
   which fails the job when `npm ci` outputs deprecation warnings.
2. Runs `npm run check`.
3. Runs `npm run render-smoke`, `npm run ha:components-smoke` and HA storage smoke.
4. Packages and validates the HACS archive, including unique public filenames,
   nonempty contents, byte-for-byte agreement with `dist/`, source-map structure
   and reference, and the privacy/legal scan.
5. Uploads workflow artifacts.
6. Verifies `release-notes/<tag>.md` exists for tag-triggered runs.
7. Publishes a GitHub Release only for tag-triggered runs, using the matching
   release-notes file as the public release body.

The project should not be released from an unvalidated local build.
Releases also require `npm audit --package-lock-only --audit-level=low`.
Known vulnerabilities, including build-tool vulnerabilities, fail that gate;
audit failures are not filtered or ignored.

## Home Assistant Smoke

Live Home Assistant checks require environment variables. Keep credentials in
the shell or secret store, never in committed files.

```bash
HA_TEST_URL=http://<ha-test-host>:8123 \
HA_TEST_TOKEN='<long-lived-access-token>' \
npm run smoke
```

The long-lived token path is preferred for repeatable test automation because
it does not create temporary Home Assistant refresh tokens. Username/password
login is still available for short-lived test accounts:

```bash
HA_TEST_URL=http://<ha-test-host>:8123 \
HA_TEST_USERNAME='<user>' \
HA_TEST_PASSWORD='<password>' \
npm run smoke
```

Optional deploy smoke:

```bash
HA_CARD_DEPLOY_DIR=/mnt/ha-test-config/www/community/ha-dhe-connect-card \
npm run smoke -- --deploy
```

The deploy smoke updates only this card's frontend assets in the target
directory.

## HA Storage Fixture Smoke

```bash
npm run ha:storage-smoke -- test/fixtures/ha-config
```

This checks fixture metadata from Home Assistant storage without connecting to a
live instance.

## Live Entity Audit

```bash
HA_CARD_CONFIG_DIR=/path/to/ha/config \
npm run ha:live-entity-audit
```

The audit compares known card entity keys with the integration entities exposed
by a Home Assistant config directory. Set `HA_TEST_TOKEN` to use a long-lived
Home Assistant token; otherwise the username/password login flow is used and
temporary refresh tokens are cleaned up from the config directory if revocation
fails. You can also pass the config directory as an argument:

```bash
npm run ha:live-entity-audit -- /path/to/ha/config
```

## Code Map

| Path | Purpose |
| --- | --- |
| `src/dhe-connect-card.ts` | Main Lit card orchestration, discovery wiring and service-call UI. |
| `src/card-actions.ts` | Home Assistant/Mushroom action normalization and event config helpers. |
| `src/editor.ts` | Visual card editor. |
| `src/editor-events.ts` | Shared visual-editor event value helpers. |
| `src/editor-ordering.ts` | Visual editor section order and overview tile controls. |
| `src/editor-styles.ts` | Visual editor CSS. |
| `src/catalog.ts` | Known entity definitions and sections. |
| `src/entity-groups.ts` | Section-specific entity key groups used by card renderers. |
| `src/discovery.ts` | Entity discovery from HA state and registry metadata. |
| `src/discovery-cache.ts` | Discovery memoization with shared, weakly held state projections and order-independent comparison. |
| `src/perf.ts` | Development-only timing helper for render-adjacent instrumentation. |
| `src/display-text.ts` | Prefix cleanup, display labels and state formatting. |
| `src/interaction-controller.ts` | Tap, double-tap and hold handling. |
| `src/actions.ts` | Home Assistant service-call helpers and shared climate bounds/defaults for controls. |
| `src/icon-visuals.ts` | Icon color and animation classification. |
| `src/layout.ts` | Layout mode, tile sizing and card-size helpers. |
| `src/overview-engine.ts` | Pure overview tile model for groups, conditions, trends, delta values and sparklines. |
| `src/render-overview.ts` | Overview tile renderer and interaction wiring. |
| `src/render-radio.ts` | Radio media-player renderer, source selector, volume and favorites. |
| `src/render-sections.ts` | Controls, bath, timer, memory, weather, action and row section renderers. |
| `src/support.ts` | Anonymized support package, entity audit and compatibility/self-test model. |
| `src/render-support.ts` | Diagnostics and support section renderer. |
| `src/rendering.ts` | Shared Lit renderability helpers. |
| `src/status-text.ts` | Header status priority and fallback text. |
| `src/service-call-guard.ts` | Duplicate service-call prevention and busy state tracking. |
| `src/styles.ts` and `src/styles/` | Ordered card CSS modules for base layout, icons, components and animations. |
| `src/weather-services.ts` | Weather service form defaults and supported service list. |
| `scripts/render_smoke.mjs` | Chromium render smoke. |
| `scripts/ha_components_smoke.mjs` | Checksum-pinned original HA component interaction tests. |
| `scripts/readme_screenshots.mjs` | Regenerates README screenshots from render-smoke presets. |
| `scripts/compat_check.mjs` | HACS, bundle and release-consistency checks (including source-map integrity). |
| `scripts/license_check.mjs` | Runtime dependency notice checks. |

## Test Map

| Path | Coverage |
| --- | --- |
| `test/card-layout-render.test.ts` | Card layout, section ordering, overview tiles, labels and weather visibility. |
| `test/overview-engine.test.ts` | Overview tile grouping, visual conditions, trend, delta and sparkline models. |
| `test/card-actions-render.test.ts` | Tap, double-tap, hold, service-call errors and duplicate-call guards. |
| `test/card-actions.test.ts` | Action helper behavior, including disabled `none` actions. |
| `test/card-visuals-render.test.ts` | Icon colors, animations, localized labels and display-style control rows. |
| `test/card-radio-render.test.ts` | Radio favorite display and source selection. |
| `test/card-stub-render.test.ts` | Visual-editor stub config discovery. |
| `test/catalog-docs.test.ts` | Configuration docs, catalog definitions and i18n parity. |
| `test/i18n-extraction.test.mjs` | Typed dynamic translation extraction and rejection of missing or unbounded keys. |
| `test/release-archive-check.test.mjs` | Empty, duplicate, stale and malformed archive assets. |
| `test/helpers/card.ts` | Shared fake Home Assistant state, registry and text extraction helpers. |

## Review Checklist

- New UI state has Vitest coverage.
- New rendering behavior is represented in `scripts/render_smoke.mjs` when it
  affects visible layout or interactions.
- Documentation describes new user-facing options.
- `dist/` is rebuilt when source changes.
- No credentials, private URLs or private IPs appear in commits, docs or PR
  text.
