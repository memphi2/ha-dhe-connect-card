# Translation Workflow

The card uses structured monolingual JSON files in `translations/`.

- Source language: `translations/en.json`
- Existing translation: `translations/de.json`
- Runtime source of truth: the bundled JSON files imported by `src/i18n.ts`
- Extraction and validation: `npm run i18n:extract` and `npm run i18n:check`

## Crowdin

`crowdin.yml` is ready for Crowdin CLI:

```yaml
source: /translations/en.json
translation: /translations/%two_letters_code%.json
type: json
```

Crowdin should translate only files below `translations/`. The source language
is English and translated files are returned as two-letter language JSON files,
for example `translations/fr.json`.

Do not commit Crowdin project IDs or API tokens. Keep credentials in Crowdin CLI
environment variables or a local user identity file.

## Weblate

Use one monolingual JSON component with these settings:

| Setting | Value |
| --- | --- |
| File format | JSON nested structure file |
| File mask | `translations/*.json` |
| Monolingual base language file | `translations/en.json` |
| Template for new translations | Empty |
| Source language | English |

Weblate requires a monolingual base language file for JSON components; keep
`translations/en.json` as the complete source file.

## Local Development

Run the extractor after changing translation keys, English copy, entity labels
or generated source keys:

```bash
npm run i18n:extract
```

Run the CI validation locally before opening a PR:

```bash
npm run i18n:check
```

The check validates:

- every language has the same structured UI keys as English
- every language has the same entity-label keys as English
- placeholders such as `{label}` or `{state}` match the source language
- committed JSON formatting matches the extractor output
- literal `localize()` keys used in `src/` exist in `translations/en.json`

## Late Runtime Translations

External translation packs can be registered before or after the card module is
loaded:

```js
window.registerDheConnectCardTranslation("fr", {
  ui: {
    state: {
      loading: "Chargement"
    }
  },
  entity_labels: {
    water_heating: "Eau chaude"
  }
});
```

The card and editor listen for translation updates and re-render automatically.
Partial runtime packs are allowed; missing `fr-CA` keys fall back to `fr` and
then to English.
