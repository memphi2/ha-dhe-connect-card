#!/usr/bin/env node
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { textFailures } from "./legal_check.mjs";

const execFileAsync = promisify(execFile);

const GITHUB_API_ROOT = "https://api.github.com";
const SCAN_SOURCES = [
  {
    name: "releases",
    path: "/repos/{repo}/releases?per_page=100",
    fields: ["name", "body"],
    urlField: "html_url",
  },
  {
    name: "issues",
    path: "/repos/{repo}/issues?state=all&per_page=100",
    fields: ["title", "body"],
    urlField: "html_url",
  },
  {
    name: "pulls",
    path: "/repos/{repo}/pulls?state=all&per_page=100",
    fields: ["title", "body"],
    urlField: "html_url",
  },
  {
    name: "issue_comments",
    path: "/repos/{repo}/issues/comments?per_page=100",
    fields: ["body"],
    urlField: "html_url",
  },
  {
    name: "review_comments",
    path: "/repos/{repo}/pulls/comments?per_page=100",
    fields: ["body"],
    urlField: "html_url",
  },
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function parseNextLink(linkHeader) {
  if (!linkHeader) {
    return undefined;
  }
  const links = linkHeader.split(",").map((part) => part.trim());
  for (const link of links) {
    const match = /^<([^>]+)>;\s*rel="([^"]+)"$/.exec(link);
    if (match?.[2] === "next") {
      return match[1];
    }
  }
  return undefined;
}

async function resolveRepository() {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY;
  }
  if (process.argv[2]) {
    return process.argv[2];
  }
  const { stdout } = await execFileAsync("git", ["config", "--get", "remote.origin.url"]);
  const origin = stdout.trim();
  const sshMatch = /^git@github\.com:([^/]+\/[^/]+?)(?:\.git)?$/.exec(origin);
  if (sshMatch?.[1]) {
    return sshMatch[1];
  }
  const httpsMatch = /^https:\/\/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/.exec(origin);
  if (httpsMatch?.[1]) {
    return httpsMatch[1];
  }
  return undefined;
}

async function resolveGitHubToken() {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }
  if (process.env.GH_TOKEN) {
    return process.env.GH_TOKEN;
  }
  try {
    const { stdout } = await execFileAsync("gh", ["auth", "token"]);
    const token = stdout.trim();
    return token || undefined;
  } catch {
    return undefined;
  }
}

async function fetchPaginatedJson(url, token) {
  const items = [];
  let nextUrl = url;
  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed (${response.status}) for ${nextUrl}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      items.push(...data);
    } else if (data) {
      items.push(data);
    }
    nextUrl = parseNextLink(response.headers.get("link"));
  }
  return items;
}

async function scanSource(source, repository, token) {
  const path = source.path.replace("{repo}", repository);
  const url = `${GITHUB_API_ROOT}${path}`;
  const entries = await fetchPaginatedJson(url, token);
  const failures = [];
  for (const entry of entries) {
    const itemUrl = String(entry[source.urlField] || "");
    const itemId = String(entry.id || entry.number || "unknown");
    for (const field of source.fields) {
      const text = entry[field];
      if (typeof text !== "string" || !text.trim()) {
        continue;
      }
      const virtualPath = `github/${source.name}/${itemId}/${field}${itemUrl ? ` (${itemUrl})` : ""}`;
      failures.push(...textFailures(virtualPath, text));
    }
  }
  return { count: entries.length, failures };
}

async function main() {
  const repository = await resolveRepository();
  if (!repository) {
    fail("could not determine GitHub repository (set GITHUB_REPOSITORY or pass owner/repo)");
    return;
  }
  const token = await resolveGitHubToken();
  if (!token) {
    fail("missing GitHub token (set GITHUB_TOKEN or GH_TOKEN, or authenticate gh CLI)");
    return;
  }

  const allFailures = [];
  for (const source of SCAN_SOURCES) {
    const result = await scanSource(source, repository, token);
    pass(`GitHub ${source.name} scanned (${result.count} items)`);
    allFailures.push(...result.failures);
  }

  if (allFailures.length) {
    fail(`GitHub metadata scan failed:\n${[...new Set(allFailures)].join("\n")}`);
    return;
  }
  pass("GitHub metadata passed anonymization, trademark and copyright scan");
}

await main();
