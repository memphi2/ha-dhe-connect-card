# Releasing

This repository is not released from local builds. Releases are prepared by the
GitHub `Release` workflow so every published asset has passed the same checks.

## Preflight

1. Update `CHANGELOG.md`.
2. Update `package.json` and `package-lock.json` with
   `npm version X.Y.Z --no-git-tag-version`.
3. Add or update `release-notes/vX.Y.Z.md` for the tag being published.
4. Update the README "Latest release notes" link.
5. Verify user-facing options are documented in `README.md` and
   `docs/configuration.md`.
6. Run `npm run check`.
7. Run `npm run docs-check`.
8. Run `npm run render-smoke`.
9. Run `npm run ha:storage-smoke -- test/fixtures/ha-config`.
10. Run `npm audit --omit=dev`.
11. Run `npx tsc --noEmit --noUnusedLocals --noUnusedParameters`.
12. Run `npm run deprecation-check`.
13. Run `npx ts-prune --ignore 'test|dist|node_modules'` and review actionable findings.
14. Run `npm run github-metadata-check` to scan GitHub releases, PRs, issues and comments for
    private-network references, accidental credentials and trademark/copyright risk markers.
    Optionally set external blocklist inputs from your secret store before this step when you
    want project-specific privacy fragments blocked without hardcoding them in the repository:
    - `LEGAL_BLOCKLIST_TERMS` (comma/newline separated plain fragments)
    - `LEGAL_BLOCKLIST_REGEX` (single case-insensitive regex)
15. Optionally run the live HA test checks with `HA_TEST_TOKEN` and
   `HA_CARD_CONFIG_DIR` set from the shell or secret store:
   - `HA_TEST_TOKEN='<token>' HA_CARD_CONFIG_DIR=/path/to/ha/config npm run ha:live-entity-audit`
   - `HA_TEST_TOKEN='<token>' HA_CARD_CONFIG_DIR=/path/to/ha/config npm run smoke -- --deploy`

Never commit live Home Assistant URLs, IP addresses, tokens, passwords or
screenshots containing private dashboard data. `npm run legal-check` is part of
`npm run check` and blocks tracked secrets, private-host references, proprietary
DHE web assets and undocumented media assets.

For GitHub workflows, keep project-specific privacy terms in repository or
organization secrets (`LEGAL_BLOCKLIST_TERMS`, `LEGAL_BLOCKLIST_REGEX`). This
keeps sensitive fragments out of tracked files while still enforcing the policy
in CI and release jobs.

## Release Workflow

The workflow in `.github/workflows/release.yml` runs on `v*` tags and manual
dispatch. It performs:

- dependency install with Node 24 LTS
- dependency install guarded against npm deprecation warnings
- `npm run check`
- browser render smoke
- HA storage fixture smoke
- GitHub metadata anonymization and legal scan (`npm run github-metadata-check`)
- HACS asset packaging
- artifact upload
- GitHub Release publication only for tag-triggered runs, using
  `release-notes/<tag>.md` as the release body

## Publishing

When release publication is intentionally desired:

```bash
git tag -a vX.Y.Z -m "DHE Connect Card vX.Y.Z"
git push origin vX.Y.Z
```

Do not create tags until CI on `main` is green and the release notes are ready.

For the clean initial public release, `v0.5.0` is the first published tag. The
GitHub repository should contain only the fresh baseline, current release notes
and current assets, without older public tags or release artifacts.

After the workflow completes, verify the public release and archive layout:

```bash
gh release view vX.Y.Z --repo memphi2/ha-dhe-connect-card
gh release download vX.Y.Z --repo memphi2/ha-dhe-connect-card --dir /tmp/dhe-card-release
unzip -l /tmp/dhe-card-release/ha-dhe-connect-card.zip
```

The ZIP root should contain `ha-dhe-connect-card.js` and
`ha-dhe-connect-card.js.map`.
