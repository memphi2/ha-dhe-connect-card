import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const config = parse(readFileSync(".github/dependabot.yml", "utf8"));

describe("dependency maintenance policy", () => {
  it("covers npm and GitHub Actions exactly once", () => {
    expect(config.version).toBe(2);
    expect(config.updates.map((entry) => entry["package-ecosystem"]).sort())
      .toEqual(["github-actions", "npm"]);
  });

  it.each(["github-actions", "npm"])("keeps %s security updates without routine PRs", (ecosystem) => {
    const entry = config.updates.find((item) => item["package-ecosystem"] === ecosystem);
    expect(entry.directory).toBe("/");
    expect(entry["open-pull-requests-limit"]).toBe(0);
    expect(entry.schedule.interval).toBe("monthly");
    for (const restriction of ["ignore", "allow", "exclude-paths", "target-branch"]) {
      expect(entry).not.toHaveProperty(restriction);
    }
    expect(Object.values(entry.groups)).toEqual([
      { "applies-to": "security-updates", patterns: ["*"] },
    ]);
  });

  it("pins every workflow action to a consistent full commit SHA", () => {
    const refs = new Map();
    for (const file of readdirSync(".github/workflows").filter((name) => /\.ya?ml$/.test(name))) {
      const workflow = parse(readFileSync(`.github/workflows/${file}`, "utf8"));
      for (const job of Object.values(workflow.jobs)) {
        const uses = [job.uses, ...(job.steps ?? []).map((step) => step.uses)].filter(Boolean);
        for (const action of uses) {
          expect(action, `${file}: ${action}`).toMatch(/^[\w.-]+\/[\w./-]+@[a-f0-9]{40}$/);
          const [name, ref] = action.split("@");
          const repository = name.split("/").slice(0, 2).join("/");
          if (refs.has(repository)) expect(ref).toBe(refs.get(repository));
          refs.set(repository, ref);
        }
      }
    }
    expect(refs.size).toBeGreaterThan(0);
  });
});
