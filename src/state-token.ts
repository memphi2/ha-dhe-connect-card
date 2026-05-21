const TOKEN_CACHE_LIMIT = 256;
const tokenCache = new Map<string, string>();

export function normalizeStateToken(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  const cached = tokenCache.get(value);
  if (cached !== undefined) {
    return cached;
  }
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
  if (tokenCache.size >= TOKEN_CACHE_LIMIT) {
    tokenCache.clear();
  }
  tokenCache.set(value, normalized);
  return normalized;
}
