import type { NormalizedDheConnectCardConfig, TileSize } from "./types";

const TILE_SIZE_STYLES: Record<
  TileSize,
  {
    height: string;
    icon: string;
  }
> = {
  auto: {
    height: "clamp(52px, 7cqi, 68px)",
    icon: "clamp(34px, 4.6cqi, 40px)",
  },
  compact: {
    height: "52px",
    icon: "34px",
  },
  normal: {
    height: "60px",
    icon: "36px",
  },
  large: {
    height: "72px",
    icon: "40px",
  },
};

export function layoutCardSize(config: NormalizedDheConnectCardConfig): number {
  if (config.layout_mode === "mini") {
    return 4;
  }
  if (["panel", "kiosk"].includes(config.layout_mode)) {
    return 10;
  }
  if (config.tile_size === "large") {
    return 9;
  }
  if (config.tile_size === "normal") {
    return 7;
  }
  return 5;
}

export function layoutClassNames(config: NormalizedDheConnectCardConfig): string[] {
  return [
    `layout-${config.layout_mode}`,
    `tile-size-${config.tile_size}`,
  ].filter(Boolean);
}

export function layoutStyle(config: NormalizedDheConnectCardConfig): string {
  const tile = TILE_SIZE_STYLES[config.tile_size];
  const icon = layoutIconSize(config);
  return [
    `--dhe-overview-columns: ${config.overview_columns};`,
    `--dhe-overview-tile-height: ${tile.height};`,
    icon ? `--dhe-layout-icon-bubble-size: ${icon};` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function layoutIconSize(config: NormalizedDheConnectCardConfig): string | undefined {
  if (config.layout_mode === "mini" && config.tile_size === "auto") {
    return undefined;
  }
  return TILE_SIZE_STYLES[config.tile_size].icon;
}
