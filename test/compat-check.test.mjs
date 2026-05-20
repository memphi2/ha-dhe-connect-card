import { describe, expect, it } from "vitest";
import {
  workflowPinsOnlyNodeVersion,
  workflowSetupNodeVersions,
  workflowUsesReleaseNotes,
} from "../scripts/compat_check.mjs";

describe("workflow compatibility checks", () => {
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
      - uses: softprops/action-gh-release@v2
        with:
          body_path: release-notes/\${{ github.ref_name }}.md
`;

    expect(workflowUsesReleaseNotes(workflow)).toBe(true);
  });
});
