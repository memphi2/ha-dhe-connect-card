import { html, nothing } from "lit";
import { ENTITY_DEFINITIONS_BY_SECTION, memoryRange } from "./catalog";
import {
  ACTION_KEYS,
  BATH_KEYS,
  CONTROL_KEYS,
  TIMER_KEYS,
  WELLNESS_KEYS,
} from "./entity-groups";
import {
  booleanState,
  displayState,
  friendlyName,
  isUnavailable,
  normalizeDisplayText,
  numericState,
} from "./format";
import { localize, sectionLabel } from "./i18n";
import { isVisibleRenderable } from "./rendering";
import { weatherActionKey } from "./service-call-guard";
import {
  WEATHER_FORM_FIELDS,
  WEATHER_SERVICE_OPTIONS,
  type WeatherFormKey,
  type WeatherService,
} from "./weather-services";
import type {
  DiscoveredEntities,
  EntityDefinition,
  EntityKey,
  HassEntity,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
  Renderable,
  SectionId,
} from "./types";

const CONTROL_KEY_SET = new Set(CONTROL_KEYS);
const WELLNESS_KEY_SET = new Set(WELLNESS_KEYS);

interface SectionEntity {
  definition: EntityDefinition;
  entityId?: string;
  state?: HassEntity;
}

interface MemoryEntities {
  name: SectionEntity;
  temp: SectionEntity;
  press: SectionEntity;
  del: SectionEntity;
}

export interface SectionRenderContext {
  hass: HomeAssistant;
  config: NormalizedDheConnectCardConfig;
  weatherService: WeatherService;
  weatherForm: Record<WeatherFormKey, string>;
  entity: (discovered: DiscoveredEntities, key: EntityKey) => SectionEntity;
  canRender: (definition: EntityDefinition, state?: HassEntity) => boolean;
  iconBubbleClass: (definition: EntityDefinition, state?: HassEntity) => string;
  renderClimateControl: (entityId: string, state: HassEntity) => Renderable;
  renderRowControl: (
    definition: EntityDefinition,
    entityId: string | undefined,
    state: HassEntity | undefined,
  ) => Renderable;
  isActionBusy: (key: string) => boolean;
  isServiceBusy: (entityId: string, service: string) => boolean;
  isEntityBusy: (entityId: string | undefined) => boolean;
  handleTap: (event: MouseEvent, entityId: string | undefined) => void;
  handleDoubleTap: (event: MouseEvent, entityId: string | undefined) => void;
  startHold: (event: PointerEvent, entityId: string | undefined) => void;
  cancelHold: () => void;
  pressButton: (definition: EntityDefinition, entityId: string) => void;
  setNumber: (
    entityId: string,
    state: HassEntity | undefined,
    event: Event,
  ) => void;
  setText: (entityId: string, event: Event) => void;
  callWeather: (discovered: DiscoveredEntities) => void;
  setWeatherService: (service: WeatherService) => void;
  setWeatherFormValue: (key: WeatherFormKey, value: string) => void;
}

export function renderControlsSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const climate = context.entity(discovered, "water_heating");
  const orderedControlSectionKeys = orderedSectionKeys(context, "controls", [
    ...CONTROL_KEYS,
    ...WELLNESS_KEYS,
  ]);
  const orderedControlKeys = orderedControlSectionKeys.filter((key) => CONTROL_KEY_SET.has(key));
  const orderedWellnessKeys = orderedControlSectionKeys.filter((key) =>
    WELLNESS_KEY_SET.has(key)
  );
  const controlRows = entityRows(context, discovered, orderedControlKeys);
  const wellnessRows = entityRows(context, discovered, orderedWellnessKeys);
  const controlContent = context.config.show_display_buttons
    ? displayButtonGrid(context, discovered, orderedControlKeys, "controls")
    : controlRows.length
      ? html`<div class="rows entity-list">${controlRows}</div>`
      : nothing;
  const wellnessContent = context.config.show_display_buttons
    ? displayButtonGrid(context, discovered, orderedWellnessKeys, "wellness")
    : wellnessRows.length
      ? html`<div class="rows entity-list wellness">${wellnessRows}</div>`
      : nothing;
  const climateControl =
    climate.entityId && climate.state
      ? context.renderClimateControl(climate.entityId, climate.state)
      : nothing;

  if (
    !isVisibleRenderable(climateControl) &&
    !isVisibleRenderable(controlContent) &&
    !isVisibleRenderable(wellnessContent)
  ) {
    return nothing;
  }

  return html`
    <section class="card-section" data-section="controls">
      <h3>${localize(context.hass, "section.water_heating")}</h3>
      ${climateControl}
      ${controlContent}
      ${isVisibleRenderable(wellnessContent)
        ? html`
            <div class="subsection">
              <h4>${localize(context.hass, "section.wellness")}</h4>
              ${wellnessContent}
            </div>
          `
        : nothing}
    </section>
  `;
}

export function renderBathSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  return renderGroupedKeySection(context, discovered, "bath", BATH_KEYS);
}

export function renderTimersSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  return renderGroupedKeySection(context, discovered, "timers", TIMER_KEYS);
}

export function renderMemorySection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  if (context.config.show_display_buttons) {
    return renderMemoryDisplayButtons(context, discovered);
  }
  const rows = collectRenderable(memoryRange(), (slot) => memoryRow(context, discovered, slot));
  if (!rows.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section="memory">
      <h3>${sectionLabel("memory", context.hass)}</h3>
      <div class="rows memory">${rows}</div>
    </section>
  `;
}

export function renderWeatherSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const weatherRows = entityRows(
    context,
    discovered,
    orderedSectionKeys(context, "weather", ["weather", "weather_location"]),
  );
  if (!weatherRows.length) {
    return nothing;
  }

  return html`
    <section class="card-section" data-section="weather">
      <h3>${sectionLabel("weather", context.hass)}</h3>
      ${weatherRows}
      ${context.config.show_weather_services ? weatherServiceForm(context, discovered) : nothing}
    </section>
  `;
}

export function renderActionsSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const rows = entityRows(
    context,
    discovered,
    orderedSectionKeys(context, "actions", ACTION_KEYS),
  );
  if (!rows.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section="actions">
      <h3>${sectionLabel("actions", context.hass)}</h3>
      <div class="rows">${rows}</div>
    </section>
  `;
}

export function renderRowsSection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  section: SectionId,
): Renderable {
  const definitions = orderedSectionDefinitions(
    context,
    section,
    ENTITY_DEFINITIONS_BY_SECTION[section] ?? [],
  );
  const rows = collectRenderable(
    definitions,
    (definition) => entityRow(context, discovered, definition.key),
  );
  if (!rows.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section=${section}>
      <h3>${sectionLabel(section, context.hass)}</h3>
      <div class="rows">${rows}</div>
    </section>
  `;
}

function renderGroupedKeySection(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  section: SectionId,
  keys: string[],
): Renderable {
  const orderedKeys = orderedSectionKeys(context, section, keys);
  return context.config.show_display_buttons
    ? renderKeyDisplayButtons(
        context,
        sectionLabel(section, context.hass),
        discovered,
        orderedKeys,
        section,
      )
    : renderKeyRows(
        context,
        sectionLabel(section, context.hass),
        discovered,
        orderedKeys,
        section,
      );
}

function renderKeyRows(
  context: SectionRenderContext,
  title: string,
  discovered: DiscoveredEntities,
  keys: string[],
  section: SectionId,
): Renderable {
  const rows = entityRows(context, discovered, keys);
  if (!rows.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section=${section}>
      <h3>${title}</h3>
      <div class="rows">${rows}</div>
    </section>
  `;
}

function renderKeyDisplayButtons(
  context: SectionRenderContext,
  title: string,
  discovered: DiscoveredEntities,
  keys: string[],
  variant: string,
): Renderable {
  const buttons = displayButtonGrid(context, discovered, keys, variant);
  if (!isVisibleRenderable(buttons)) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section=${variant}>
      <h3>${title}</h3>
      ${buttons}
    </section>
  `;
}

function entityRows(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  keys: string[],
): Renderable[] {
  return collectRenderable(keys, (key) => entityRow(context, discovered, key));
}

function entityRow(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  key: string,
): Renderable {
  const item = context.entity(discovered, key);
  if (!context.canRender(item.definition, item.state)) {
    return nothing;
  }
  const label = friendlyName(item.definition, item.state, context.hass);
  const value = displayState(context.hass, item.state);
  const control = context.renderRowControl(item.definition, item.entityId, item.state);
  const busy = context.isEntityBusy(item.entityId);
  const ariaLabel = `${label}: ${value}`;
  return html`
    <div
      class="entity-row ${busy ? "busy" : ""}"
      data-entity-key=${item.definition.key}
      aria-busy=${String(busy)}
    >
      ${renderActionButton(
        context,
        item.entityId,
        "entity-main entity-action",
        ariaLabel,
        html`
          <div class=${context.iconBubbleClass(item.definition, item.state)}>
            <ha-icon icon=${item.definition.icon}></ha-icon>
          </div>
          <div class="main">
            <strong>${label}</strong>
            <span>${value}</span>
          </div>
        `,
      )}
      ${isVisibleRenderable(control) ? html`<div class="row-control">${control}</div>` : nothing}
    </div>
  `;
}

function displayButtonGrid(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  keys: string[],
  variant: string,
): Renderable {
  const buttons = collectRenderable(keys, (key) => displayButton(context, discovered, key));
  if (!buttons.length) {
    return nothing;
  }
  return html`<div class="display-button-grid ${variant}">${buttons}</div>`;
}

function displayButton(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  key: string,
): Renderable {
  const item = context.entity(discovered, key);
  if (!context.canRender(item.definition, item.state)) {
    return nothing;
  }
  const label = friendlyName(item.definition, item.state, context.hass);
  const value = displayState(context.hass, item.state);
  const control = context.renderRowControl(item.definition, item.entityId, item.state);
  const active = item.state ? booleanState(item.state) : false;
  const busy = context.isEntityBusy(item.entityId);
  const ariaLabel = `${label}: ${value}`;
  return html`
    <div
      class="display-button-tile ${active ? "active" : ""} ${busy ? "busy" : ""}"
      data-entity-key=${item.definition.key}
      aria-busy=${String(busy)}
    >
      ${renderActionButton(
        context,
        item.entityId,
        "display-button-main entity-action",
        ariaLabel,
        html`
          <div class=${context.iconBubbleClass(item.definition, item.state)}>
            <ha-icon icon=${item.definition.icon}></ha-icon>
          </div>
          <span>${label}</span>
          <strong>${value}</strong>
        `,
      )}
      ${isVisibleRenderable(control)
        ? html`<div class="display-button-control">${control}</div>`
        : nothing}
    </div>
  `;
}

function renderActionButton(
  context: SectionRenderContext,
  entityId: string | undefined,
  buttonClass: string,
  ariaLabel: string,
  content: Renderable,
): Renderable {
  return html`
    <button
      class=${buttonClass}
      type="button"
      ?disabled=${!entityId}
      aria-label=${ariaLabel}
      @click=${(event: MouseEvent) => context.handleTap(event, entityId)}
      @dblclick=${(event: MouseEvent) => context.handleDoubleTap(event, entityId)}
      @pointerdown=${(event: PointerEvent) => context.startHold(event, entityId)}
      @pointerup=${context.cancelHold}
      @pointerleave=${context.cancelHold}
      @pointercancel=${context.cancelHold}
    >
      ${content}
    </button>
  `;
}

function renderMemoryDisplayButtons(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const buttons = collectRenderable(memoryRange(), (slot) => memoryButton(context, discovered, slot));
  if (!buttons.length) {
    return nothing;
  }
  return html`
    <section class="card-section" data-section="memory">
      <h3>${sectionLabel("memory", context.hass)}</h3>
      <div class="display-button-grid memory-display">${buttons}</div>
    </section>
  `;
}

function memoryButton(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  slot: number,
): Renderable {
  const entities = memoryEntities(context, discovered, slot);
  if (!hasRenderableMemoryEntity(context, entities)) {
    return nothing;
  }
  const { name, temp, press, del } = entities;
  const nameState = name.state;
  const tempState = temp.state;
  const pressState = press.state;
  const deleteState = del.state;
  const label =
    nameState && !isUnavailable(nameState)
      ? normalizeDisplayText(nameState.state) || localize(context.hass, "label.memory", { slot })
      : localize(context.hass, "label.memory", { slot });
  const value = tempState
    ? displayState(context.hass, tempState)
    : displayState(context.hass, pressState);
  const actionEntityId = press.entityId ?? temp.entityId ?? name.entityId ?? del.entityId;
  const iconDefinition = tempState ? temp.definition : press.definition;
  const applyEntityId = press.entityId;
  const deleteEntityId = del.entityId;
  const applyBusy = applyEntityId ? context.isServiceBusy(applyEntityId, "press") : false;
  const deleteBusy = deleteEntityId ? context.isServiceBusy(deleteEntityId, "press") : false;
  const applyButton = memoryActionButton(
    context,
    press.definition,
    applyEntityId,
    pressState,
    "button.apply_memory",
    applyBusy,
    "mdi:play",
  );
  const deleteButton = memoryActionButton(
    context,
    del.definition,
    deleteEntityId,
    deleteState,
    "button.delete_memory",
    deleteBusy,
    "mdi:trash-can-outline",
    true,
  );
  const busy = context.isEntityBusy(actionEntityId);

  return html`
    <div
      class="display-button-tile memory-display-tile ${busy ? "busy" : ""}"
      data-memory-slot=${slot}
      aria-busy=${String(busy)}
    >
      ${renderActionButton(
        context,
        actionEntityId,
        "display-button-main entity-action",
        `${label}: ${value}`,
        html`
          <div class=${context.iconBubbleClass(iconDefinition, tempState ?? pressState)}>
            <ha-icon icon=${iconDefinition.icon}></ha-icon>
          </div>
          <span>${label}</span>
          <strong>${value}</strong>
        `,
      )}
      ${isVisibleRenderable(applyButton) || isVisibleRenderable(deleteButton)
        ? html`
            <div class="display-button-control memory-display-actions">
              ${applyButton}
              ${deleteButton}
            </div>
          `
        : nothing}
    </div>
  `;
}

function memoryRow(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  slot: number,
): Renderable {
  const { name, temp, press, del } = memoryEntities(context, discovered, slot);
  const nameEntityId = name.entityId;
  const nameState = name.state;
  const tempEntityId = temp.entityId;
  const tempState = temp.state;
  const pressEntityId = press.entityId;
  const pressState = press.state;
  const deleteEntityId = del.entityId;
  const deleteState = del.state;

  if (!hasRenderableMemoryEntity(context, { name, temp, press, del })) {
    return nothing;
  }

  const nameBusy = nameEntityId ? context.isServiceBusy(nameEntityId, "set_value") : false;
  const tempBusy = tempEntityId ? context.isServiceBusy(tempEntityId, "set_value") : false;
  const pressBusy = pressEntityId ? context.isServiceBusy(pressEntityId, "press") : false;
  const deleteBusy = deleteEntityId ? context.isServiceBusy(deleteEntityId, "press") : false;
  const busy = [nameEntityId, tempEntityId, pressEntityId, deleteEntityId].some((entityId) =>
    context.isEntityBusy(entityId),
  );

  return html`
    <div class="memory-row ${busy ? "busy" : ""}" aria-busy=${String(busy)}>
      <div class=${context.iconBubbleClass(temp.definition, temp.state)}>
        <ha-icon icon=${temp.definition.icon}></ha-icon>
      </div>
      <div class="memory-fields">
        ${nameEntityId && nameState
          ? html`<input
              type="text"
              .value=${nameState.state}
              aria-label=${localize(context.hass, "entity.memory_name", { slot })}
              ?disabled=${nameBusy}
              aria-busy=${String(nameBusy)}
              @change=${(event: Event) => context.setText(nameEntityId, event)}
            />`
          : html`<strong>${localize(context.hass, "label.memory", { slot })}</strong>`}
        ${tempEntityId && tempState
          ? html`<input
              type="number"
              min=${String(tempState.attributes.min ?? 20)}
              max=${String(tempState.attributes.max ?? 60)}
              step=${String(tempState.attributes.step ?? 0.5)}
              .value=${String(numericState(tempState) ?? "")}
              aria-label=${localize(context.hass, "entity.memory_temperature", { slot })}
              ?disabled=${tempBusy}
              aria-busy=${String(tempBusy)}
              @change=${(event: Event) => context.setNumber(tempEntityId, tempState, event)}
            />`
          : nothing}
      </div>
      ${memoryActionButton(
        context,
        press.definition,
        pressEntityId,
        pressState,
        "button.apply_memory",
        pressBusy,
        "mdi:play",
      )}
      ${memoryActionButton(
        context,
        del.definition,
        deleteEntityId,
        deleteState,
        "button.delete_memory",
        deleteBusy,
        "mdi:trash-can-outline",
        true,
      )}
    </div>
  `;
}

function memoryActionButton(
  context: SectionRenderContext,
  definition: EntityDefinition,
  entityId: string | undefined,
  entityState: HassEntity | undefined,
  labelKey: "button.apply_memory" | "button.delete_memory",
  busy: boolean,
  icon: string,
  danger = false,
): Renderable {
  if (!entityId || !entityState) {
    return nothing;
  }
  if (danger && !context.config.show_dangerous_actions) {
    return nothing;
  }

  const label = localize(context.hass, labelKey);
  return html`
    <button
      class=${`icon${danger ? " danger" : ""}`}
      type="button"
      title=${label}
      aria-label=${label}
      ?disabled=${busy}
      aria-busy=${String(busy)}
      @click=${() => context.pressButton(definition, entityId)}
    >
      <ha-icon icon=${icon}></ha-icon>
    </button>
  `;
}

function memoryEntities(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
  slot: number,
): MemoryEntities {
  return {
    name: context.entity(discovered, `temperature_memory_${slot}_name`),
    temp: context.entity(discovered, `temperature_memory_${slot}_temperature`),
    press: context.entity(discovered, `temperature_memory_${slot}`),
    del: context.entity(discovered, `delete_temperature_memory_${slot}`),
  };
}

function collectRenderable<T>(
  entries: readonly T[],
  renderEntry: (entry: T) => Renderable,
): Renderable[] {
  const rendered: Renderable[] = [];
  for (const entry of entries) {
    const result = renderEntry(entry);
    if (isVisibleRenderable(result)) {
      rendered.push(result);
    }
  }
  return rendered;
}

function hasRenderableMemoryEntity(
  context: SectionRenderContext,
  entities: MemoryEntities,
): boolean {
  return Object.values(entities).some((item) =>
    context.canRender(item.definition, item.state),
  );
}

function weatherServiceForm(
  context: SectionRenderContext,
  discovered: DiscoveredEntities,
): Renderable {
  const busy = context.isActionBusy(weatherActionKey(context.weatherService));
  return html`
    <div class="service-box ${busy ? "busy" : ""}" aria-busy=${String(busy)}>
      <select
        .value=${context.weatherService}
        aria-label=${localize(context.hass, "field.weather_service")}
        ?disabled=${busy}
        aria-busy=${String(busy)}
        @change=${(event: Event) => {
          context.setWeatherService((event.target as HTMLSelectElement).value as WeatherService);
        }}
      >
        ${WEATHER_SERVICE_OPTIONS.map(
          (service) =>
            html`<option value=${service}>${localize(context.hass, `service.${service}`)}</option>`,
        )}
      </select>
      ${WEATHER_FORM_FIELDS.map((field) => weatherFormInput(context, field, busy))}
      <button
        class="chip"
        type="button"
        aria-label=${localize(context.hass, "button.run")}
        ?disabled=${busy}
        aria-busy=${String(busy)}
        @click=${() => context.callWeather(discovered)}
      >
        ${localize(context.hass, "button.run")}
      </button>
    </div>
  `;
}

function orderedSectionDefinitions(
  context: SectionRenderContext,
  section: SectionId,
  definitions: EntityDefinition[],
): EntityDefinition[] {
  const configured = context.config.section_entity_order[section];
  if (!configured?.length || !definitions.length) {
    return definitions;
  }
  const byKey = new Map(definitions.map((definition) => [definition.key, definition] as const));
  const preferred = configured
    .map((key) => byKey.get(key))
    .filter((definition): definition is EntityDefinition => Boolean(definition));
  if (!preferred.length) {
    return definitions;
  }
  const preferredKeys = new Set(preferred.map((definition) => definition.key));
  return [
    ...preferred,
    ...definitions.filter((definition) => !preferredKeys.has(definition.key)),
  ];
}

function orderedSectionKeys(
  context: SectionRenderContext,
  section: SectionId,
  keys: string[],
): string[] {
  const configured = context.config.section_entity_order[section];
  if (!configured?.length || !keys.length) {
    return keys;
  }
  const keySet = new Set(keys);
  const preferred = configured.filter((key) => keySet.has(key));
  if (!preferred.length) {
    return keys;
  }
  const preferredSet = new Set(preferred);
  return [...preferred, ...keys.filter((key) => !preferredSet.has(key))];
}

function weatherFormInput(
  context: SectionRenderContext,
  field: (typeof WEATHER_FORM_FIELDS)[number],
  busy: boolean,
): Renderable {
  return html`
    <input
      placeholder=${localize(context.hass, field.labelKey)}
      .value=${context.weatherForm[field.key]}
      aria-label=${localize(context.hass, field.labelKey)}
      ?disabled=${busy}
      aria-busy=${String(busy)}
      @input=${(event: Event) =>
        context.setWeatherFormValue(field.key, (event.target as HTMLInputElement).value)}
    />
  `;
}
