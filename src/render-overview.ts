import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { layoutStyle } from "./layout";
import { buildOverviewTiles, type OverviewTile } from "./overview-engine";
import type { SectionRenderContext } from "./render-sections";
import type { DiscoveredEntities, Renderable } from "./types";

export function renderOverviewSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const tiles = buildOverviewTiles(context, discovered);
  if (!tiles.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section="overview">
      <div
        class="metric-grid"
        style=${layoutStyle(context.config)}
      >
        ${repeat(
          tiles,
          (tile) => tile.key,
          (tile) => metricTile(context, tile),
        )}
      </div>
    </section>
  `;
}

function metricTile(context: SectionRenderContext, tile: OverviewTile): Renderable {
  return html`
    <button
      class=${metricClass(tile)}
      type="button"
      data-overview-key=${tile.key}
      data-overview-group=${tile.group}
      data-overview-condition=${tile.condition}
      ?disabled=${!tile.entityId}
      aria-label=${`${tile.label}: ${tile.value}`}
      @click=${(event: MouseEvent) => context.handleTap(event, tile.entityId)}
      @dblclick=${(event: MouseEvent) => context.handleDoubleTap(event, tile.entityId)}
      @pointerdown=${(event: PointerEvent) => context.startHold(event, tile.entityId)}
      @pointerup=${context.cancelHold}
      @pointerleave=${context.cancelHold}
      @pointercancel=${context.cancelHold}
    >
      <div class=${tile.iconClass}>
        <ha-icon icon=${tile.definition.icon}></ha-icon>
      </div>
      <span class="metric-label" title=${tile.label}>${tile.shortLabel}</span>
      <strong class="metric-value">${tile.value}</strong>
      ${tile.trend
        ? html`
            <span class=${`overview-trend trend-${tile.trend.direction}`}>
              <ha-icon icon=${tile.trend.icon}></ha-icon>
              <span class=${tile.delta ? "overview-delta" : ""}>${tile.trend.label}</span>
            </span>
          `
        : nothing}
      ${tile.sparkline
        ? html`
            <svg
              class="overview-sparkline"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points=${tile.sparkline.points}></polyline>
            </svg>
          `
        : nothing}
    </button>
  `;
}

function metricClass(tile: OverviewTile): string {
  return [
    "metric",
    "entity-action",
    `overview-group-${tile.group}`,
    `overview-condition-${tile.condition}`,
    tile.trend ? `has-trend trend-${tile.trend.direction}` : "",
    tile.delta ? "has-delta" : "",
    tile.sparkline ? "has-sparkline" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
