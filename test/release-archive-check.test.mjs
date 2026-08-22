import { describe, expect, it } from "vitest";
import { archiveMemberFailures } from "../scripts/release_archive_check.mjs";

describe("release archive check", () => {
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
