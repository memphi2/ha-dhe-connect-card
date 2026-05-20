import { normalizeDisplayText } from "./format";
import type { HassEntity } from "./types";

export interface RadioFavorite {
  id?: string;
  label: string;
  source: string;
  active: boolean;
}

export function radioFavorites(state: HassEntity): RadioFavorite[] {
  const sources = Array.isArray(state.attributes.source_list)
    ? state.attributes.source_list.map(String).filter(Boolean)
    : [];
  const favorites = favoriteAttributes(state);
  const currentSource =
    typeof state.attributes.source === "string" ? state.attributes.source : "";
  const items = sources.map((source) => {
    const label = normalizeDisplayText(source) || source;
    const favorite = favorites.find((item) => favoriteMatchesSource(item, source, label));
    return {
      id: favorite?.id,
      label,
      source,
      active: source === currentSource,
    };
  });

  if (items.length) {
    return uniqueFavorites(items);
  }

  return uniqueFavorites(
    favorites.map((favorite) => ({
      id: favorite.id,
      label: favorite.label,
      source: favorite.source,
      active:
        favorite.source === currentSource ||
        favorite.label === normalizeDisplayText(currentSource),
    })),
  );
}

function favoriteAttributes(state: HassEntity): RadioFavoriteAttribute[] {
  if (!Array.isArray(state.attributes.favorites)) {
    return [];
  }
  return state.attributes.favorites.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const record = item as Record<string, unknown>;
    const id = record.id ?? record.Id;
    const name = record.name ?? record.Name;
    const source = String(name ?? id ?? "").trim();
    const label = normalizeDisplayText(source) || source;
    if (!label) {
      return [];
    }
    return [
      {
        id: id === undefined ? undefined : String(id),
        label,
        source,
      },
    ];
  });
}

function favoriteMatchesSource(
  favorite: RadioFavoriteAttribute,
  source: string,
  label: string,
): boolean {
  if (favorite.label === label) {
    return true;
  }
  const normalizedSource = normalizeDisplayText(source);
  if (favorite.label === normalizedSource) {
    return true;
  }
  return Boolean(favorite.id && normalizedSource.includes(`(${favorite.id})`));
}

function uniqueFavorites(items: RadioFavorite[]): RadioFavorite[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.source}:${item.id ?? ""}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

interface RadioFavoriteAttribute {
  id?: string;
  label: string;
  source: string;
}
