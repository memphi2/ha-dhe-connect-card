import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import {
  checkLegalDocs,
  pathFailures,
  scanTrackedFiles,
  textFailures,
} from "../scripts/legal_check.mjs";

async function fixtureRoot() {
  const root = await mkdtemp(join(tmpdir(), "dhe-card-legal-"));
  await mkdir(join(root, "docs"), { recursive: true });
  await mkdir(join(root, "assets"), { recursive: true });
  await writeFile(join(root, "README.md"), "[docs/legal.md](docs/legal.md)\n", "utf8");
  await writeFile(
    join(root, "docs", "legal.md"),
    [
      "This file is a repository hygiene note, not legal advice.",
      "This project is an unofficial community custom card.",
      "It is not affiliated with, sponsored by or endorsed by anyone.",
      "Product and project names are used only to describe compatibility.",
      "Do not include vendor JavaScript, CSS, HTML, firmware, screenshots, product artwork, logos or copied web-interface templates.",
      "`assets/screenshot-card.png`",
      "`assets/screenshot2-card.png`",
      "`assets/screenshot3-card.png`",
      "`assets/screenshot4-card.png`",
    ].join("\n"),
    "utf8",
  );
  return root;
}

describe("legal check", () => {
  it("accepts documented project screenshots and required legal text", async () => {
    const root = await fixtureRoot();
    await writeFile(join(root, "assets", "screenshot-card.png"), "not-real-png", "utf8");

    await expect(checkLegalDocs(root)).resolves.toEqual([]);
    await expect(scanTrackedFiles(root, ["assets/screenshot-card.png"])).resolves.toEqual([]);
  });

  it("rejects committed Home Assistant tokens and private hosts", () => {
    const jwt = [
      "eyJhbGciOiJIUzI1Ni" + "IsInR5cCI6IkpXVCJ9",
      "aaaaaaaaaaaaaaaaaaaaaaaa",
      "bbbbbbbbbbbbbbbbbbbbbbbb",
    ].join(".");
    const privateHost = ["172", "16", "1", "147"].join(".");
    const privateTenHost = ["10", "1", "2", "3"].join(".");
    expect(
      textFailures(
        "README.md",
        `HA_TEST_TOKEN='${jwt}'`,
      ),
    ).toEqual(["README.md: possible Home Assistant long-lived token"]);
    expect(textFailures("note.txt", `test instance http://${privateHost}:8123`)).toEqual([
      "note.txt: possible private network address",
    ]);
    expect(textFailures("note.txt", `test instance http://${privateTenHost}:8123`)).toEqual([
      "note.txt: possible private network address",
    ]);
    expect(textFailures("note.txt", `HA_TEST_URL=${privateTenHost}`)).toEqual([
      "note.txt: possible private network address",
    ]);
  });

  it("rejects vendor web assets and undocumented media", () => {
    const assetPath = "assets/" + "ste-" + "dhe-1.9.00.js";
    expect(pathFailures(assetPath)).toContain(
      `tracked vendor web asset path: ${assetPath}`,
    );
    expect(pathFailures("assets/vendor-logo.svg")).toEqual([
      "tracked media asset needs legal review: assets/vendor-logo.svg",
    ]);
  });

  it("rejects proprietary DHE web-interface markers", () => {
    expect(
      textFailures(
        "vendor.txt",
        "ste-" + "dhe - v1.9.00\n" + "Licensed " + "proprietary\n",
      ),
    ).toEqual(["vendor.txt: possible proprietary DHE license header"]);
    expect(textFailures("template.html", "temperature/tpl/" + "display.tpl.html")).toEqual([
      "template.html: possible copied DHE web-template marker",
    ]);
  });
});
