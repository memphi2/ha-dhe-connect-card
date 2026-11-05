import { describe, expect, it } from "vitest";
import ts from "typescript";
import { extractLocalizeKeys } from "../scripts/i18n_sync.mjs";

function program(source) {
  const file = "/translation-fixture.ts";
  const options = { strict: true, noEmit: true, types: [], target: ts.ScriptTarget.ES2022 };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, languageVersion, ...rest) => name === file
    ? ts.createSourceFile(file, source, languageVersion, true)
    : getSourceFile(name, languageVersion, ...rest);
  return ts.createProgram([file], options, host);
}

describe("typed translation extraction", () => {
  it("extracts template families and mapped keys, not just direct literals", () => {
    const keys = extractLocalizeKeys(program(`
      declare function localize(hass: unknown, key: "section.overview" | "section.controls" | "editor.name"): string;
      function sectionLabel(section: "overview" | "controls") {
        return localize(undefined, \`section.\${section}\`);
      }
      const fields = [{ labelKey: "editor.name" }] as const;
      fields.map(field => localize(undefined, field.labelKey));
    `));
    expect(keys).toEqual(["editor.name", "section.controls", "section.overview"]);
  });

  it("rejects a dynamic key missing from the source language", () => {
    expect(() => extractLocalizeKeys(program(`
      declare function localize(hass: unknown, key: "section.overview"): string;
      function sectionLabel(section: "overview" | "controls") {
        return localize(undefined, \`section.\${section}\`);
      }
    `))).toThrow(/section.controls/);
  });

  it("rejects unbounded dynamic keys", () => {
    expect(() => extractLocalizeKeys(program(`
      declare function localize(hass: unknown, key: string): string;
      function label(key: string) { return localize(undefined, key); }
    `))).toThrow(/unbounded translation key/);
  });
});
