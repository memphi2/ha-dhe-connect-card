import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  gitPorcelainEntries,
  workflowPinsOnlyNodeVersion,
  workflowSetupNodeVersions,
  workflowUsesReleaseNotes,
} from "../scripts/compat_check.mjs";

describe("workflow compatibility checks", () => {
  it("keeps Marketplace plugin installation on the bundled JavaScript asset", () => {
    const manifest = JSON.parse(readFileSync("hacs.json", "utf8"));
    expect(typeof manifest.name).toBe("string");
    expect(manifest.filename).toBe("ha-dhe-connect-card.js");
    expect(manifest.content_in_root ?? false).toBe(false);
    expect(manifest.zip_release ?? false).toBe(false);
    expect(readFileSync(".github/workflows/release.yml", "utf8"))
      .toContain("release/ha-dhe-connect-card.js");
  });

  it("avoids components and theme tokens removed in Home Assistant 2026.11", () => {
    const source = ["src/editor-form.ts", "src/editor-styles.ts", "src/styles.ts"]
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    expect(source).not.toMatch(/<ha-formfield\b|<ha-md-list(?:-item)?\b/);
    expect(source).not.toMatch(/--mdc-typography-|--md-list-item-|--md-outlined-icon-button-/);
  });

  it("keeps setup-node version scans within each workflow step", () => {
    const workflow = `
name: CI
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v6
        with:
          node-version: 20
      - uses: actions/setup-node@v6
        with:
          node-version: 22
`;

    expect(workflowSetupNodeVersions(workflow)).toEqual(["20", "22"]);
    expect(workflowPinsOnlyNodeVersion(workflow, "22")).toBe(false);
  });

  it("requires tag-matched release notes for published releases", () => {
    const workflow = `
name: Release
jobs:
  release:
    steps:
      - uses: softprops/action-gh-release@v3
        with:
          body_path: release-notes/\${{ github.ref_name }}.md
`;

    expect(workflowUsesReleaseNotes(workflow)).toBe(true);
  });

  it("parses dirty dist status entries for committed bundle checks", () => {
    expect(gitPorcelainEntries(" M dist/ha-dhe-connect-card.js\n?? dist/extra.js\n")).toEqual([
      "M dist/ha-dhe-connect-card.js",
      "?? dist/extra.js",
    ]);
    expect(gitPorcelainEntries("\n")).toEqual([]);
  });
});
