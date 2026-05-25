# Development, CI And Smoke Tests

This repository contains the Lovelace card source, tests, HACS metadata and the
generated frontend bundle in `dist/`.

## Tooling

- Node.js 22
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
npm run readme-screenshots
npm audit --omit=dev
npx tsc --noEmit --noUnusedLocals --noUnusedParameters
npx ts-prune --ignore 'test|dist|node_modules'
```

`npm run check` runs translation validation, type checking, linting, Vitest,
production build and bundle compatibility checks, plus third-party notice and
legal hygiene checks.

`npm run i18n:extract` normalizes `translations/*.json` and refreshes the
English entity-label extraction from `src/catalog.ts`. `npm run i18n:check`
verifies Crowdin/Weblate JSON parity, placeholders, formatting and literal
`localize()` source usage.

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
timings for discovery, section filtering and support-model generation.

`npm run readme-screenshots` builds the card and regenerates the four README
screenshots from deterministic Chromium render-smoke presets.

`ts-prune` is used as an extra review aid only. The expected residual findings
are the Vite default export and TypeScript parser noise around `satisfies`
syntax; actionable source exports should be removed or justified.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`.

Jobs:

| Job | Coverage |
| --- | --- |
| `test` | `npm run check` on Node.js 22. |
| `ha-compat` | Build, HACS metadata compatibility and HA storage fixture smoke. |
| `browser-smoke` | Chromium render smoke with built bundle. |

## Release Workflow

`.github/workflows/release.yml` runs on `v*` tags and manual dispatch. It:

1. Installs dependencies on Node.js 22.
   The workflow install step uses `scripts/npm_ci_with_deprecation_guard.mjs`,
   which fails the job when `npm ci` outputs deprecation warnings.
2. Runs `npm run check`.
3. Runs `npm run render-smoke`.
4. Packages the HACS asset.
5. Uploads workflow artifacts.
6. Verifies `release-notes/<tag>.md` exists for tag-triggered runs.
7. Publishes a GitHub Release only for tag-triggered runs, using the matching
   release-notes file as the public release body.

The project should not be released from an unvalidated local build.

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
| `src/discovery-cache.ts` | Per-render discovery memoization keyed by HA object and discovery-significant config. |
| `src/perf.ts` | Development-only timing helper for render-adjacent instrumentation. |
| `src/display-text.ts` | Prefix cleanup, display labels and state formatting. |
| `src/interaction-controller.ts` | Tap, double-tap and hold handling. |
| `src/actions.ts` | Home Assistant service-call helpers. |
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
| `test/helpers/card.ts` | Shared fake Home Assistant state, registry and text extraction helpers. |

## Review Checklist

- New UI state has Vitest coverage.
- New rendering behavior is represented in `scripts/render_smoke.mjs` when it
  affects visible layout or interactions.
- Documentation describes new user-facing options.
- `dist/` is rebuilt when source changes.
- No credentials, private URLs or private IPs appear in commits, docs or PR
  text.
