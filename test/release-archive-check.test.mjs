import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { archiveMemberFailures, releaseArchiveFailures } from "../scripts/release_archive_check.mjs";

const bundle = "ha-dhe-connect-card.js";
const validBundle = "console.log('fixture');\n//# sourceMappingURL=ha-dhe-connect-card.js.map";
const validMap = JSON.stringify({ version: 3, file: bundle, sources: ["fixture.ts"], sourcesContent: ["fixture"], mappings: "AAAA" });

async function checkArchive(js, map, buildJs = js) {
  const directory = await mkdtemp(path.join(tmpdir(), "card-archive-"));
  try {
    const build = path.join(directory, "dist");
    await mkdir(build);
    await writeFile(path.join(build, bundle), buildJs);
    await writeFile(path.join(build, `${bundle}.map`), map);
    await writeFile(path.join(directory, bundle), js);
    await writeFile(path.join(directory, `${bundle}.map`), map);
    execFileSync("zip", ["-q", "asset.zip", bundle, `${bundle}.map`], { cwd: directory });
    return await releaseArchiveFailures(path.join(directory, "asset.zip"), build);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

describe("release archive check", () => {
  it("accepts nonempty assets matching the validated build", async () => {
    expect(await checkArchive(validBundle, validMap)).toEqual([]);
  });

  it("rejects empty files even when the build is also empty", async () => {
    expect(await checkArchive("", "")).toEqual(expect.arrayContaining([
      `empty release archive member: ${bundle}`,
      `empty release archive member: ${bundle}.map`,
    ]));
  });

  it("rejects stale assets and missing map references", async () => {
    expect(await checkArchive("outdated", validMap, validBundle)).toEqual(expect.arrayContaining([
      `release archive differs from build: ${bundle}`,
      `missing release source map reference: ${bundle}`,
    ]));
  });

  it.each(["invalid json", "null", "{}", JSON.stringify({ version: 3, file: "wrong.js" })])(
    "rejects malformed source maps: %s", async (map) => {
      expect(await checkArchive(validBundle, map)).toContain(`invalid release source map: ${bundle}.map`);
    },
  );

  it("rejects duplicate members", () => {
    expect(archiveMemberFailures([bundle, `${bundle}.map`, bundle])).toContain("duplicate release archive members");
  });

  it("accepts the exact public HACS asset layout", () => {
    expect(
      archiveMemberFailures(["ha-dhe-connect-card.js", "ha-dhe-connect-card.js.map"]),
    ).toEqual([]);
  });

  it("rejects unexpected, missing and unsafe archive members", () => {
    expect(
      archiveMemberFailures(["ha-dhe-connect-card.js", "../private.txt", "notes.txt"]),
    ).toEqual(
      expect.arrayContaining([
        "unsafe release archive member: ../private.txt",
        "unexpected release archive members: ../private.txt, notes.txt",
        "missing release archive members: ha-dhe-connect-card.js.map",
      ]),
    );
  });
});
