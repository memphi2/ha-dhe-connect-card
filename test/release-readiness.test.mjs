import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const version = String(pkg.version ?? "");
const tag = `v${version}`;
const readme = readFileSync("README.md", "utf8");
const changelog = readFileSync("CHANGELOG.md", "utf8");
const migration = readFileSync("MIGRATION.md", "utf8");
const releasing = readFileSync("RELEASING.md", "utf8");

describe("release readiness", () => {
  it("keeps semver and release documents aligned", () => {
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(existsSync(`release-notes/${tag}.md`)).toBe(true);
    const notes = readFileSync(`release-notes/${tag}.md`, "utf8");
    expect(notes).toContain(`# DHE Connect Card ${tag}`);
    expect(readme).toContain(`[Latest release notes](release-notes/${tag}.md)`);
    expect(changelog).toMatch(
      new RegExp(`^##\\s+${escapeRegExp(version)}\\s+-\\s+\\d{4}-\\d{2}-\\d{2}`, "m"),
    );
  });

  it("keeps migration and release process docs in sync with device_id migration", () => {
    expect(migration).toContain("Legacy entity anchor detected");
    expect(migration).toContain("device_id");
    expect(releasing).toContain("release-notes/<tag>.md");
    expect(releasing).toContain("npm run check");
    expect(releasing).toContain("npm run render-smoke");
  });

  it("keeps README screenshot references consistent with tracked assets", () => {
    const screenshotRefs = [...readme.matchAll(/assets\/screenshot[0-9-]*[^"\s]*\.png/g)].map(
      (match) => match[0],
    );
    expect(screenshotRefs.length).toBeGreaterThanOrEqual(4);
    for (const asset of new Set(screenshotRefs)) {
      expect(existsSync(asset), `missing screenshot asset ${asset}`).toBe(true);
    }
  });

  it("avoids stale references to the removed pre-v0.5 public history", () => {
    const docs = [readme, changelog, migration, releasing].join("\n");
    expect(docs).not.toMatch(/\bv0\.[0-4]\.\d+\b/);
  });
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
