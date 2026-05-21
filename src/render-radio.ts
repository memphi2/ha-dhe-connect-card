import { html, nothing } from "lit";
import { displayState, normalizeDisplayText } from "./format";
import { localize, sectionLabel } from "./i18n";
import { radioFavorites, type RadioFavorite } from "./radio-favorites";
import type { HassEntity, HomeAssistant, Renderable } from "./types";

const MEDIA_TRANSPORT_ACTIONS = [
  {
    service: "media_previous_track",
    tooltipKey: "tooltip.previous",
    icon: "mdi:skip-previous",
  },
  { service: "media_play", tooltipKey: "tooltip.play", icon: "mdi:play" },
  { service: "media_pause", tooltipKey: "tooltip.pause", icon: "mdi:pause" },
  { service: "media_next_track", tooltipKey: "tooltip.next", icon: "mdi:skip-next" },
] as const;

type MediaTransportAction = (typeof MEDIA_TRANSPORT_ACTIONS)[number];

interface RadioRenderActions {
  tap: (event: MouseEvent) => void;
  doubleTap: (event: MouseEvent) => void;
  startHold: (event: PointerEvent) => void;
  cancelHold: () => void;
  callService: (service: string) => void;
  selectSource: (event: Event) => void;
  selectSourceByName: (source: string) => void;
  setVolume: (event: Event) => void;
}

interface RadioRenderContext {
  hass: HomeAssistant;
  entityId: string;
  state: HassEntity;
  iconClass: string;
  sourceBusy: boolean;
  volumeBusy: boolean;
  mediaBusy: boolean;
  serviceBusy: (service: string) => boolean;
  actions: RadioRenderActions;
}

export function renderRadioSection(context: RadioRenderContext): Renderable {
  const sources = Array.isArray(context.state.attributes.source_list)
    ? context.state.attributes.source_list.map(String)
    : [];
  const title =
    typeof context.state.attributes.media_title === "string"
      ? normalizeDisplayText(context.state.attributes.media_title) ||
        displayState(context.hass, context.state)
      : displayState(context.hass, context.state);
  const subtitle =
    normalizeDisplayText(context.state.attributes.source) ||
    normalizeDisplayText(context.state.state);
  const favorites = radioFavorites(context.state);

  return html`
    <section class="card-section" data-section="radio">
      <h3>${sectionLabel("radio", context.hass)}</h3>
      <div class="media-row ${context.mediaBusy ? "busy" : ""}" aria-busy=${String(context.mediaBusy)}>
        <button
          class="media-main entity-action"
          type="button"
          aria-label=${`${title}: ${subtitle}`}
          @click=${context.actions.tap}
          @dblclick=${context.actions.doubleTap}
          @pointerdown=${context.actions.startHold}
          @pointerup=${context.actions.cancelHold}
          @pointerleave=${context.actions.cancelHold}
          @pointercancel=${context.actions.cancelHold}
        >
          <div class=${context.iconClass}><ha-icon icon="mdi:radio"></ha-icon></div>
          <div class="main">
            <strong>${title}</strong>
            <span>${subtitle}</span>
          </div>
        </button>
        ${MEDIA_TRANSPORT_ACTIONS.map((action) => mediaTransportButton(context, action))}
      </div>
      ${mediaSourceControl(context, sources)}
      ${radioFavoriteList(context, favorites)}
    </section>
  `;
}

function mediaTransportButton(
  context: RadioRenderContext,
  action: MediaTransportAction,
): Renderable {
  const busy = context.serviceBusy(action.service);
  const label = localize(context.hass, action.tooltipKey);
  return html`
    <button
      class="icon"
      title=${label}
      aria-label=${label}
      ?disabled=${busy}
      aria-busy=${String(busy)}
      @click=${() => context.actions.callService(action.service)}
    >
      <ha-icon icon=${action.icon}></ha-icon>
    </button>
  `;
}

function mediaSourceControl(context: RadioRenderContext, sources: string[]): Renderable {
  return html`
    <div class="inline-control ${context.sourceBusy || context.volumeBusy ? "busy" : ""}">
      <select
        ?disabled=${context.sourceBusy}
        aria-label=${localize(context.hass, "field.radio_source")}
        aria-busy=${String(context.sourceBusy)}
        @change=${context.actions.selectSource}
      >
        ${sources.map(
          (source) =>
            html`<option value=${source} ?selected=${source === context.state.attributes.source}>
              ${normalizeDisplayText(source) || source}
            </option>`,
        )}
      </select>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        .value=${String(context.state.attributes.volume_level ?? 0)}
        ?disabled=${context.volumeBusy}
        aria-label=${localize(context.hass, "field.volume")}
        aria-busy=${String(context.volumeBusy)}
        @change=${context.actions.setVolume}
      />
    </div>
  `;
}

function radioFavoriteList(
  context: RadioRenderContext,
  favorites: RadioFavorite[],
): Renderable {
  if (!favorites.length) {
    return nothing;
  }
  return html`
    <div class="radio-favorites">
      <h4>${localize(context.hass, "section.radio_favorites")}</h4>
      <div
        class="favorite-list"
        role="list"
        aria-label=${localize(context.hass, "section.radio_favorites")}
      >
        ${favorites.map(
          (favorite) => html`
            <button
              class="favorite-row ${favorite.active ? "active" : ""}"
              type="button"
              role="listitem"
              title=${favorite.label}
              aria-label=${favorite.label}
              aria-pressed=${String(favorite.active)}
              ?disabled=${context.sourceBusy}
              aria-busy=${String(context.sourceBusy)}
              @click=${() => context.actions.selectSourceByName(favorite.source)}
            >
              <div class="favorite-icon"><ha-icon icon="mdi:star"></ha-icon></div>
              <span>${favorite.label}</span>
              ${favorite.id ? html`<small>#${favorite.id}</small>` : nothing}
            </button>
          `,
        )}
      </div>
    </div>
  `;
}
