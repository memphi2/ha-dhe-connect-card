# Legal And Asset Hygiene

This file is a repository hygiene note, not legal advice.

This repository is an unofficial community project for local Home Assistant
interoperability with compatible DHE Connect devices. Product and project names
are used only to describe compatibility, integration targets and user-facing
context.

The project must not contain vendor JavaScript, CSS, HTML, firmware,
screenshots, product artwork, logos or copied web-interface templates. The
bundled screenshots are project-local images of this card's own rendered UI and
intentionally avoid vendor logos, copied product marks, official app
screenshots, product photos and copied Home Assistant or Mushroom screenshots.

Entity names, service names and compatibility notes in this repository record
observed interoperability behavior only. They are not a copy of, or a
substitute for, any vendor software, vendor documentation or vendor
specification.

## Project License

The card source code is published under the MIT License. Keep `LICENSE` with
source distributions and release artifacts.

The generated frontend bundle includes Lit runtime code. Lit uses the BSD
3-Clause License, so the required notice is kept in
[`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md).

## Trademarks And Affiliation

Home Assistant, HACS, Mushroom, STIEBEL ELTRON and DHE Connect are third-party
names or marks. This project uses those names only to describe compatibility,
integration targets and user-facing context.

This project is an unofficial community custom card. It is not affiliated with,
sponsored by or endorsed by Home Assistant, HACS, the Open Home Foundation, the
Mushroom card project, STIEBEL ELTRON, OpenAI or their respective owners.

The card was built iteratively with OpenAI Codex as the implementation agent
for this repository. This is a development attribution, not an endorsement or
affiliation statement.

Do not add official logos, brand graphics, product photos, app screenshots,
vendor web-interface assets or website material from those projects or
companies unless the asset is clearly licensed for this use or explicit
permission exists. The MIT License in this repository does not grant rights to
third-party trademarks, DHE device firmware, vendor web interfaces or other
third-party assets.

## Copyright Audit

Current repository assets:

| Asset | Source | Risk note |
| --- | --- | --- |
| `assets/screenshot-card.png` | Screenshot of this card's own rendered overview and water-heating controls. | Does not use official Home Assistant, Mushroom or STIEBEL ELTRON imagery. |
| `assets/screenshot2-card.png` | Screenshot of this card's own rendered wellness programs and bath-fill controls. | Does not use official Home Assistant, Mushroom or STIEBEL ELTRON imagery. |
| `assets/screenshot3-card.png` | Screenshot of this card's own rendered timer and temperature-memory controls. | Does not use official Home Assistant, Mushroom or STIEBEL ELTRON imagery. |
| `assets/screenshot4-card.png` | Screenshot of this card's own rendered weather and radio controls. | Does not use official Home Assistant, Mushroom or STIEBEL ELTRON imagery. |

The card's visual language is Mushroom-like, but this repository does not copy
Mushroom source code, icons, screenshots or documentation. References to
Mushroom describe compatible action semantics and visual intent.

Radio support controls Home Assistant's `media_player` entity and does not
redistribute radio audio, station artwork or station metadata beyond values
already exposed by the user's Home Assistant instance.

## Code-Origin Audit

Last local audit: 2026-05-20.

Checks performed:

- searched source, tests, scripts, docs and assets for copied/adapted/source
  markers, copyright headers and embedded third-party code notes
- compared distinctive local identifiers and animation names against public
  GitHub code search
- cloned `piitaya/lovelace-mushroom` at commit `c96206b` and ran exact clone
  detection between this repository's `src/` and Mushroom's `src/`
- ran an internal exact clone scan to identify local duplication hot spots
- ran dependency and source-surface checks before the initial `v0.5.0` release,
  including `npm audit --omit=dev`, TypeScript unused-local checks and
  `ts-prune` for obsolete exports

Findings:

- no copied third-party source headers or attribution markers were found in the
  card source
- no exact cross-project clones were found between this card's `src/` and
  Mushroom's `src/`
- public GitHub exact searches for distinctive local code identifiers did not
  return external matches
- local duplicate code exists only in small test and smoke-script helper
  patterns; it is project-internal and not evidence of third-party copying
- Lit is the only bundled runtime dependency and is covered by
  `THIRD_PARTY_NOTICES.md`
- no production dependency vulnerabilities were reported by the current npm
  audit run

Automated release validation scans tracked files for common secret material,
private network addresses, vendor web assets, undocumented media assets,
proprietary DHE web-interface markers and known proprietary license/copyright
markers.

These checks do not prove the absence of every possible infringement or reduce
legal risk to zero. They are practical repository due diligence and should be
repeated before a public release if major assets or source modules are added.

## Contribution Checklist

- Keep third-party notices when adding runtime dependencies.
- Add source and license information for every new image, icon, screenshot or
  other media asset.
- Update this document before adding any new media asset. The automated legal
  check intentionally blocks undocumented image files.
- Avoid official logos unless the applicable brand rules explicitly allow the
  intended use.
- Use third-party product and project names descriptively, not as endorsement.
- Do not commit private Home Assistant URLs, IP addresses, tokens, passwords or
  screenshots containing private dashboard data.

## Reference Material

- Home Assistant terms describe third-party content responsibilities and
  trademark reservations: <https://www.home-assistant.io/tos/>
- Home Assistant developer docs describe brand image handling for integrations:
  <https://developers.home-assistant.io/docs/core/integration/brand_images/>
- STIEBEL ELTRON's imprint states that its website contents are copyright
  protected: <https://www.stiebel-eltron.com/en/info/imprint.html>
- STIEBEL ELTRON's DHE Connect terms note that radio content may be copyright
  protected and restricted to non-public use:
  <https://www.stiebel-eltron.com/en/home/company/about-stiebel-eltron/terms-of-use.html>
