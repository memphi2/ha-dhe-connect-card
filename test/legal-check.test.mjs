import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import process from "node:process";
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

  it("rejects trademark affiliation claims but allows explicit non-affiliation disclaimers", () => {
    expect(
      textFailures(
        "release-notes.md",
        "This project is an official Home Assistant companion card.",
      ),
    ).toEqual(["release-notes.md: possible trademark affiliation claim"]);

    expect(
      textFailures(
        "legal.md",
        "This project is an unofficial community custom card and is not affiliated with, sponsored by or endorsed by Home Assistant.",
      ),
    ).toEqual([]);
  });

  it("supports external blocklist terms and regex without hardcoding personal fragments", () => {
    const previousTerms = process.env.LEGAL_BLOCKLIST_TERMS;
    const previousRegex = process.env.LEGAL_BLOCKLIST_REGEX;
    try {
      process.env.LEGAL_BLOCKLIST_TERMS = "placeholder-fragment,alpha";
      process.env.LEGAL_BLOCKLIST_REGEX = String.raw`private-host-\d+`;

      expect(textFailures("note.md", "Contains placeholder-fragment marker")).toContain(
        "note.md: possible external blocklisted text fragment",
      );
      expect(pathFailures("docs/private-host-42.md")).toContain(
        "docs/private-host-42.md: possible external blocklisted path regex",
      );
      expect(textFailures("note.md", "alphabetic digest")).toEqual([]);
    } finally {
      if (previousTerms === undefined) {
        delete process.env.LEGAL_BLOCKLIST_TERMS;
      } else {
        process.env.LEGAL_BLOCKLIST_TERMS = previousTerms;
      }
      if (previousRegex === undefined) {
        delete process.env.LEGAL_BLOCKLIST_REGEX;
      } else {
        process.env.LEGAL_BLOCKLIST_REGEX = previousRegex;
      }
    }
  });

  it("reports invalid external blocklist regex patterns", () => {
    const previousRegex = process.env.LEGAL_BLOCKLIST_REGEX;
    try {
      process.env.LEGAL_BLOCKLIST_REGEX = "[";
      expect(textFailures("docs/legal.md", "safe text")).toEqual([
        "docs/legal.md: invalid LEGAL_BLOCKLIST_REGEX pattern",
      ]);
    } finally {
      if (previousRegex === undefined) {
        delete process.env.LEGAL_BLOCKLIST_REGEX;
      } else {
        process.env.LEGAL_BLOCKLIST_REGEX = previousRegex;
      }
    }
  });
});
