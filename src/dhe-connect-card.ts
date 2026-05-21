import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import {
  adjustClimateTemperature,
  callEntityService,
  callWeatherService,
  selectOption,
  serviceForToggle,
  setMediaVolume,
  setNumberValue,
  setTextValue,
} from "./actions";
import {
  actionEventConfig,
  isActionConfigured,
  type ActionTrigger,
} from "./card-actions";
import {
  ENTITY_DEFINITIONS_BY_SECTION,
  ENTITY_DEFINITION_BY_KEY,
  FALLBACK_ENTITY_DEFINITION,
  memoryRange,
} from "./catalog";
import { normalizeConfig } from "./config";
import { DiscoveryCache } from "./discovery-cache";
import { discoverEntities } from "./discovery";
import {
  booleanState,
  cardDisplayTitle,
  displayState,
  entityState,
  friendlyName,
  isHeatingEntityState,
  isUnavailable,
  normalizeDisplayText,
  numericAttribute,
  numericState,
} from "./format";
import { EntityActionController } from "./interaction-controller";
import { iconColorStyle } from "./icon-theme";
import { iconVisualClass } from "./icon-visuals";
import { localize, TRANSLATIONS_CHANGED_EVENT } from "./i18n";
import { layoutCardSize, layoutClassNames, layoutStyle } from "./layout";
import { logLegacyEntityMigration, migrateLegacyEntityAnchor } from "./migration";
import { measure } from "./perf";
import {
  ACTION_KEYS,
  BATH_KEYS,
  CONTROL_KEYS,
  TIMER_KEYS,
  WELLNESS_KEYS,
} from "./entity-groups";
import { renderOverviewSection } from "./render-overview";
import { OverviewTileCache, type OverviewTile } from "./overview-engine";
import { renderRadioSection } from "./render-radio";
import {
  renderActionsSection,
  renderBathSection,
  renderControlsSection,
  renderMemorySection,
  renderRowsSection,
  renderTimersSection,
  renderWeatherSection,
  type SectionRenderContext,
} from "./render-sections";
import { renderSupportSection } from "./render-support";
import {
  ServiceCallGuard,
  serviceActionKey,
  weatherActionKey,
} from "./service-call-guard";
import { sectionsWithSupportMode } from "./sections";
import { headerStatusText } from "./status-text";
import { cardStyles } from "./styles";
import {
  buildSupportModel,
  buildSupportPackage,
  downloadJsonFile,
  supportPackageFileName,
} from "./support";
import {
  DEFAULT_WEATHER_FORM,
  DEFAULT_WEATHER_SERVICE,
  type WeatherFormKey,
  type WeatherService,
} from "./weather-services";
import type {
  DheConnectCardConfig,
  DiscoveredEntities,
  EntityDefinition,
  HassEntity,
  HomeAssistant,
  NormalizedDheConnectCardConfig,
  Renderable,
  SectionId,
} from "./types";

interface ResolvedEntity {
  definition: EntityDefinition;
  entityId?: string;
  state?: HassEntity;
}

type EntityResolver = (key: string) => ResolvedEntity;
const CONTROL_AND_WELLNESS_KEYS = [...CONTROL_KEYS, ...WELLNESS_KEYS] as const;

@customElement("dhe-connect-card")
export class DheConnectCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  private _sourceConfig: DheConnectCardConfig = {};
  private _config: NormalizedDheConnectCardConfig = normalizeConfig({});
  @state() private _weatherService: WeatherService = DEFAULT_WEATHER_SERVICE;
  @state() private _weatherForm: Record<WeatherFormKey, string> = { ...DEFAULT_WEATHER_FORM };
  @state() private _errorMessage?: string;
  @state() private _busyActionKeys = new Set<string>();
  private readonly _discoveryCache = new DiscoveryCache();
  private readonly _overviewTiles = new OverviewTileCache();
  private readonly _actions = new EntityActionController();
  private readonly _serviceCalls = new ServiceCallGuard((keys) => {
    this._busyActionKeys = new Set(keys);
  });
  private _supportModelCache?: {
    signature: string;
    model: ReturnType<typeof buildSupportModel>;
  };

  public setConfig(config: DheConnectCardConfig): void {
    const previousSignature = configRenderSignature(this._config);
    this._sourceConfig = config;
    this._applyConfigMigration();
    this._supportModelCache = undefined;
    if (configRenderSignature(this._config) !== previousSignature) {
      this.requestUpdate();
    }
  }

  public getCardSize(): number {
    return layoutCardSize(this._config);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("dhe-connect-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): DheConnectCardConfig {
    const discovered = discoverEntities(hass, normalizeConfig({}));
    return { type: "custom:dhe-connect-card", device_id: discovered.deviceId };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(TRANSLATIONS_CHANGED_EVENT, this._translationsChanged);
  }

  public override disconnectedCallback(): void {
    window.removeEventListener(TRANSLATIONS_CHANGED_EVENT, this._translationsChanged);
    this._actions.clear();
    this._serviceCalls.clear();
    this._discoveryCache.clear();
    this._overviewTiles.clear();
    this._supportModelCache = undefined;
    super.disconnectedCallback();
  }

  private readonly _translationsChanged = (): void => {
    this._overviewTiles.clear();
    this.requestUpdate();
  };

  protected override render() {
    if (!this.hass) {
      return html`<ha-card class="dhe-card">${localize(undefined, "state.loading")}</ha-card>`;
    }

    this._applyConfigMigration();
    const discovered = measure("discovery", () => this._discoverEntities());
    const entityFor = this._entityResolver(discovered);
    const climate = entityFor("water_heating");
    const climateEntityId = climate.entityId;
    const title = cardDisplayTitle(
      this._config.name,
      climate.definition,
      climate.state,
      this.hass,
    );

    const sectionContext = this._sectionRenderContext(entityFor);
    const overviewTiles = measure("overview-tiles", () =>
      this._overviewTiles.get(sectionContext, discovered),
    );
    const renderableSections = measure("section-filter", () =>
      this._renderableSections(discovered, entityFor),
    );

    return html`
      <ha-card class=${this._cardClass()} style=${this._cardStyle()}>
        <header>
          ${this._renderActionButton(
            climateEntityId,
            "title-block entity-action",
            title,
            html`
              <div class=${this._headerIconClass(climate.state)}><ha-icon icon="mdi:water-thermometer"></ha-icon></div>
              <div>
                <h2>${title}</h2>
                <p>${this._statusText(discovered, entityFor)}</p>
              </div>
            `,
          )}
          ${this._renderHeaderTemperature(climate.state, climateEntityId)}
        </header>
        ${this._errorMessage
          ? html`<div class="error-banner" role="alert">${this._errorMessage}</div>`
          : nothing}

        <div
          class="content-grid"
          style=${`--dhe-section-count: ${renderableSections.length};`}
        >
          ${repeat(
            renderableSections,
            (section) => section,
            (section) =>
              this._renderSection(sectionContext, discovered, section, overviewTiles),
          )}
        </div>
      </ha-card>
    `;
  }

  private _discoverEntities(): DiscoveredEntities {
    return this._discoveryCache.get(this.hass!, this._config);
  }

  private _cardClass(): string {
    return [
      "dhe-card",
      ...layoutClassNames(this._config),
      `icon-theme-${this._config.icon_theme}`,
    ]
      .filter(Boolean)
      .join(" ");
  }

  private _cardStyle(): string {
    const styles = [layoutStyle(this._config)];
    if (this._config.icon_theme === "custom") {
      styles.push(iconColorStyle(this._config.icon_colors));
    }
    return styles.join(" ");
  }

  private _applyConfigMigration(): void {
    const migration = migrateLegacyEntityAnchor(this.hass, this._sourceConfig);
    this._config = normalizeConfig(migration.config);
    if (migration.legacy) {
      logLegacyEntityMigration("card", migration.legacy);
    }
  }

  private _renderSection(
    context: SectionRenderContext,
    discovered: DiscoveredEntities,
    section: SectionId,
    overviewTiles: readonly OverviewTile[],
  ): Renderable {
    switch (section) {
      case "overview":
        return renderOverviewSection(context, discovered, overviewTiles);
      case "controls":
        return renderControlsSection(context, discovered);
      case "bath":
        return renderBathSection(context, discovered);
      case "timers":
        return renderTimersSection(context, discovered);
      case "memory":
        return renderMemorySection(context, discovered);
      case "consumption":
      case "saving":
        return renderRowsSection(context, discovered, section);
      case "weather":
        return renderWeatherSection(context, discovered);
      case "radio":
        return this._renderRadio(discovered, context.entity);
      case "diagnostics":
        return this._config.show_diagnostics
          ? renderRowsSection(context, discovered, "diagnostics")
          : nothing;
      case "support":
        return this._config.show_support_mode
          ? renderSupportSection({
              hass: this.hass!,
              model: this._supportModel(discovered),
              exportSupportPackage: () => this._exportSupportPackage(discovered),
            })
          : nothing;
      case "actions":
        return renderActionsSection(context, discovered);
      default:
        return nothing;
    }
  }

  private _sectionRenderContext(entityFor: EntityResolver): SectionRenderContext {
    return {
      hass: this.hass!,
      config: this._config,
      weatherService: this._weatherService,
      weatherForm: this._weatherForm,
      entity: (_discovered, key) => entityFor(key),
      canRender: (definition, state) => this._canRender(definition, state),
      iconBubbleClass: (definition, state) => this._iconBubbleClass(definition, state),
      renderClimateControl: (entityId, state) => this._climateControl(entityId, state),
      renderRowControl: (definition, entityId, state) =>
        this._rowControl(definition, entityId, state),
      isActionBusy: (key) => this._isActionBusy(key),
      isServiceBusy: (entityId, service) => this._isServiceBusy(entityId, service),
      isEntityBusy: (entityId) => this._isEntityBusy(entityId),
      handleTap: (event, entityId) => this._handleTapAction(event, entityId),
      handleDoubleTap: (event, entityId) => this._handleDoubleTapAction(event, entityId),
      startHold: (event, entityId) => this._startHoldAction(event, entityId),
      cancelHold: this._cancelHoldAction,
      pressButton: (definition, entityId) => {
        void this._pressButton(definition, entityId);
      },
      setNumber: (entityId, state, event) => {
        void this._setNumber(entityId, state, event);
      },
      setText: (entityId, event) => {
        void this._setText(entityId, event);
      },
      callWeather: (discovered) => {
        void this._callWeather(discovered);
      },
      setWeatherService: (service) => {
        this._weatherService = service;
      },
      setWeatherFormValue: (key, value) => {
        this._weatherForm = {
          ...this._weatherForm,
          [key]: value,
        };
      },
    };
  }

  private _renderActionButton(
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
        @click=${(event: MouseEvent) => this._handleTapAction(event, entityId)}
        @dblclick=${(event: MouseEvent) => this._handleDoubleTapAction(event, entityId)}
        @pointerdown=${(event: PointerEvent) => this._startHoldAction(event, entityId)}
        @pointerup=${this._cancelHoldAction}
        @pointerleave=${this._cancelHoldAction}
        @pointercancel=${this._cancelHoldAction}
      >
        ${content}
      </button>
    `;
  }

  private _renderHeaderTemperature(state?: HassEntity, entityId?: string) {
    const target = numericAttribute(state, "temperature");
    const current = numericAttribute(state, "current_temperature");
    const ariaLabel =
      target !== undefined
        ? localize(this.hass, "label.target", { value: `${target}°` })
        : current !== undefined
          ? localize(this.hass, "label.current", { value: current })
          : displayState(this.hass!, state);
    return html`
      ${this._renderActionButton(
        entityId,
        "temperature entity-action",
        ariaLabel,
        html`
          <strong>${target !== undefined ? `${target}°` : displayState(this.hass!, state)}</strong>
          <span>
            ${current !== undefined
              ? localize(this.hass, "label.current", { value: current })
              : localize(this.hass, "label.target")}
          </span>
        `,
      )}
    `;
  }

  private _renderRadio(
    discovered: DiscoveredEntities,
    entityFor: (discovered: DiscoveredEntities, key: string) => ResolvedEntity,
  ) {
    const radio = entityFor(discovered, "radio");
    const entityId = radio.entityId;
    const state = radio.state;
    if (!this._canRender(radio.definition, state) || !entityId || !state) {
      return nothing;
    }
    return renderRadioSection({
      hass: this.hass!,
      entityId,
      state,
      iconClass: this._iconBubbleClass(radio.definition, state),
      sourceBusy: this._isServiceBusy(entityId, "select_source"),
      volumeBusy: this._isServiceBusy(entityId, "volume_set"),
      mediaBusy: this._isEntityBusy(entityId),
      serviceBusy: (service) => this._isServiceBusy(entityId, service),
      actions: {
        tap: (event) => this._handleTapAction(event, entityId),
        doubleTap: (event) => this._handleDoubleTapAction(event, entityId),
        startHold: (event) => this._startHoldAction(event, entityId),
        cancelHold: this._cancelHoldAction,
        callService: (service) => {
          void this._call(entityId, service);
        },
        selectSource: (event) => {
          void this._selectMediaSource(entityId, event);
        },
        selectSourceByName: (source) => {
          void this._selectMediaSourceByName(entityId, source);
        },
        setVolume: (event) => {
          void this._setVolume(entityId, event);
        },
      },
    });
  }

  private _renderableSections(
    discovered: DiscoveredEntities,
    entityFor: EntityResolver,
  ): SectionId[] {
    return sectionsWithSupportMode(
      this._config.sections,
      this._config.show_support_mode,
    ).filter((section) =>
      this._sectionHasRenderableContent(discovered, section, entityFor),
    );
  }

  private _sectionHasRenderableContent(
    discovered: DiscoveredEntities,
    section: SectionId,
    entityFor: EntityResolver,
  ): boolean {
    switch (section) {
      case "overview":
        return this._config.overview_entities.some((key) =>
          this._isEntityRenderable(entityFor, key),
        );
      case "controls": {
        const climate = entityFor("water_heating");
        return Boolean(climate.entityId && climate.state) ||
          this._hasRenderableEntity(entityFor, CONTROL_AND_WELLNESS_KEYS);
      }
      case "bath":
        return this._hasRenderableEntity(entityFor, BATH_KEYS);
      case "timers":
        return this._hasRenderableEntity(entityFor, TIMER_KEYS);
      case "memory":
        return memoryRange().some((slot) =>
          this._hasRenderableEntity(entityFor, [
            `temperature_memory_${slot}_name`,
            `temperature_memory_${slot}_temperature`,
            `temperature_memory_${slot}`,
            `delete_temperature_memory_${slot}`,
          ]),
        );
      case "consumption":
      case "saving":
      case "diagnostics":
        if (section === "diagnostics" && !this._config.show_diagnostics) {
          return false;
        }
        return (ENTITY_DEFINITIONS_BY_SECTION[section] ?? []).some((definition) =>
          this._isEntityRenderable(entityFor, definition.key),
        );
      case "support":
        return this._config.show_support_mode;
      case "weather":
        return this._hasRenderableEntity(entityFor, ["weather", "weather_location"]);
      case "radio":
        return this._isEntityRenderable(entityFor, "radio");
      case "actions":
        return this._hasRenderableEntity(entityFor, ACTION_KEYS);
      default:
        return false;
    }
  }

  private _hasRenderableEntity(
    entityFor: EntityResolver,
    keys: readonly string[],
  ): boolean {
    return keys.some((key) => this._isEntityRenderable(entityFor, key));
  }

  private _isEntityRenderable(entityFor: EntityResolver, key: string): boolean {
    const item = entityFor(key);
    return this._canRender(item.definition, item.state);
  }

  private _climateControl(entityId: string, state: HassEntity) {
    const target = numericAttribute(state, "temperature") ?? numericState(state) ?? 38;
    const min = numericAttribute(state, "min_temp") ?? 20;
    const max = numericAttribute(state, "max_temp") ?? 60;
    const step = numericAttribute(state, "target_temp_step") ?? 0.5;
    const temperatureBusy = this._isServiceBusy(entityId, "set_temperature");
    const toggleService = state.state === "off" ? "turn_on" : "turn_off";
    const toggleBusy = this._isServiceBusy(entityId, toggleService);
    const busy = this._isEntityBusy(entityId);
    return html`
      <div class="climate-control ${busy ? "busy" : ""}" aria-busy=${String(busy)}>
        <button class="icon" type="button" title=${localize(this.hass, "tooltip.decrease")} aria-label=${localize(this.hass, "tooltip.decrease")} ?disabled=${temperatureBusy} aria-busy=${String(temperatureBusy)} @click=${() => this._adjustTemp(entityId, state, -step)}>
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="temperature-control">
          <strong>${target} °C</strong>
          <input
            type="range"
            min=${String(min)}
            max=${String(max)}
            step=${String(step)}
            .value=${String(target)}
            aria-label=${localize(this.hass, "label.target")}
            ?disabled=${temperatureBusy}
            aria-busy=${String(temperatureBusy)}
            @change=${(event: Event) => this._setClimateFromInput(entityId, state, event)}
          />
        </div>
        <button class="icon" type="button" title=${localize(this.hass, "tooltip.increase")} aria-label=${localize(this.hass, "tooltip.increase")} ?disabled=${temperatureBusy} aria-busy=${String(temperatureBusy)} @click=${() => this._adjustTemp(entityId, state, step)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="chip" type="button" ?disabled=${toggleBusy} aria-busy=${String(toggleBusy)} @click=${() => this._toggleClimate(entityId, state)}>
          ${state.state === "off"
            ? localize(this.hass, "button.turn_on")
            : localize(this.hass, "button.turn_off")}
        </button>
      </div>
    `;
  }

  private _rowControl(
    definition: EntityDefinition,
    entityId: string | undefined,
    state: HassEntity | undefined,
  ) {
    if (!entityId || !state || isUnavailable(state)) {
      return nothing;
    }
    switch (definition.domain) {
      case "switch": {
        const service = serviceForToggle(state);
        const busy = this._isServiceBusy(entityId, service);
        const label = friendlyName(definition, state, this.hass);
        return html`
          <button class="chip ${booleanState(state) ? "active" : ""}" type="button" aria-label=${label} ?disabled=${busy} aria-busy=${String(busy)} @click=${() => this._toggleSwitch(entityId, state)}>
            ${booleanState(state)
              ? localize(this.hass, "button.on")
              : localize(this.hass, "button.off")}
          </button>
        `;
      }
      case "button": {
        const busy = this._isServiceBusy(entityId, "press");
        const label = friendlyName(definition, state, this.hass);
        return html`
          <button class="chip" type="button" aria-label=${label} ?disabled=${busy} aria-busy=${String(busy)} @click=${() => this._pressButton(definition, entityId)}>
            ${localize(this.hass, "button.press")}
          </button>
        `;
      }
      case "number": {
        const busy = this._isServiceBusy(entityId, "set_value");
        const label = friendlyName(definition, state, this.hass);
        return html`
          <input
            class="number"
            type="number"
            min=${String(state.attributes.min ?? "")}
            max=${String(state.attributes.max ?? "")}
            step=${String(state.attributes.step ?? 1)}
            .value=${String(numericState(state) ?? "")}
            aria-label=${label}
            ?disabled=${busy}
            aria-busy=${String(busy)}
            @change=${(event: Event) => this._setNumber(entityId, state, event)}
          />
        `;
      }
      case "select":
        return this._selectControl(entityId, state);
      case "text": {
        const busy = this._isServiceBusy(entityId, "set_value");
        const label = friendlyName(definition, state, this.hass);
        return html`
          <input
            class="text"
            type="text"
            .value=${state.state}
            aria-label=${label}
            ?disabled=${busy}
            aria-busy=${String(busy)}
            @change=${(event: Event) => this._setText(entityId, event)}
          />
        `;
      }
      default:
        return nothing;
    }
  }

  private _selectControl(entityId: string, state: HassEntity) {
    const busy = this._isServiceBusy(entityId, "select_option");
    const options = Array.isArray(state.attributes.options)
      ? state.attributes.options.map(String)
      : [];
    const label =
      normalizeDisplayText(state.attributes.friendly_name, entityId) || entityId;
    if (!options.length) {
      return nothing;
    }
    return html`
      <select
        ?disabled=${busy}
        aria-label=${label}
        aria-busy=${String(busy)}
        @change=${(event: Event) => this._selectOption(entityId, event)}
      >
        ${options.map(
          (option) =>
            html`<option value=${option} ?selected=${option === state.state}>
              ${normalizeDisplayText(option) || option}
            </option>`,
        )}
      </select>
    `;
  }

  private _entity(discovered: DiscoveredEntities, key: string): ResolvedEntity {
    const definition = ENTITY_DEFINITION_BY_KEY[key] ?? FALLBACK_ENTITY_DEFINITION;
    const entityId = discovered.entityIds[key];
    const state = entityState(this.hass!, entityId);
    return { definition, entityId, state };
  }

  private _entityResolver(discovered: DiscoveredEntities): EntityResolver {
    const cache = new Map<string, ResolvedEntity>();
    return (key: string): ResolvedEntity => {
      const cached = cache.get(key);
      if (cached) {
        return cached;
      }
      const resolved = this._entity(discovered, key);
      cache.set(key, resolved);
      return resolved;
    };
  }

  private _canRender(definition: EntityDefinition, state?: HassEntity): boolean {
    if (definition.dangerous && !this._config.show_dangerous_actions) {
      return false;
    }
    if (definition.diagnostic && !this._config.show_diagnostics) {
      return false;
    }
    if (!state) {
      return this._config.show_optional && Boolean(definition.optional);
    }
    return this._config.show_unavailable || !isUnavailable(state);
  }

  private _iconBubbleClass(definition: EntityDefinition, state?: HassEntity): string {
    return iconVisualClass(definition, state, this._config.show_icon_animations);
  }

  private _headerIconClass(state?: HassEntity): string {
    const heating = isHeatingEntityState(state);
    const tone = heating ? "hot" : "water";
    return [
      "icon-bubble",
      "primary",
      tone,
      "motion-heat",
      heating ? "active" : "",
      heating && this._config.show_icon_animations ? "animated" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private _handleTapAction(event: Event, entityId: string | undefined): void {
    this._actions.handleClick(event, this._interactionOptions(entityId));
  }

  private _handleDoubleTapAction(event: Event, entityId: string | undefined): void {
    this._actions.handleDoubleClick(event, this._interactionOptions(entityId));
  }

  private _startHoldAction(event: PointerEvent, entityId: string | undefined): void {
    this._actions.handlePointerDown(event, this._interactionOptions(entityId));
  }

  private _cancelHoldAction = (): void => {
    this._actions.handlePointerEnd();
  };

  private _interactionOptions(entityId: string | undefined) {
    return {
      entityId,
      hasDoubleTap: isActionConfigured(this._config.double_tap_action),
      hasHold: isActionConfigured(this._config.hold_action),
      dispatch: (targetEntityId: string, trigger: ActionTrigger) =>
        this._fireAction(targetEntityId, trigger),
    };
  }

  private _fireAction(entityId: string | undefined, trigger: ActionTrigger): void {
    if (!entityId) {
      return;
    }
    const config = actionEventConfig(this._config, trigger, entityId);
    if (!config) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        bubbles: true,
        composed: true,
        detail: { action: trigger, config },
      }),
    );
  }

  private _isActionBusy(key: string): boolean {
    return this._busyActionKeys.has(key);
  }

  private _isServiceBusy(entityId: string, service: string): boolean {
    return this._isActionBusy(serviceActionKey(entityId, service));
  }

  private _isEntityBusy(entityId: string | undefined): boolean {
    return entityId ? this._serviceCalls.isEntityBusy(entityId) : false;
  }

  private _statusText(
    discovered: DiscoveredEntities,
    entityFor: EntityResolver,
  ): string {
    return headerStatusText(this.hass, {
      connection: entityFor("connection_state").state,
      device: entityFor("device_status").state,
      error: entityFor("error_status").state,
      hasBaseEntity: Boolean(discovered.baseEntity),
    });
  }

  private _supportModel(discovered: DiscoveredEntities): ReturnType<typeof buildSupportModel> {
    const signature = JSON.stringify({
      deviceId: discovered.deviceId ?? "",
      configEntryId: discovered.configEntryId ?? "",
      baseEntity: discovered.baseEntity ?? "",
      entityIds: discovered.entityIds,
      hideEntities: this._config.hide_entities,
      showDiagnostics: this._config.show_diagnostics,
      statesToken: objectIdentityToken(this.hass?.states),
      entitiesToken: objectIdentityToken(this.hass?.entities),
      devicesToken: objectIdentityToken(this.hass?.devices),
    });
    if (this._supportModelCache?.signature === signature) {
      return this._supportModelCache.model;
    }
    const model = measure("support-model", () =>
      buildSupportModel(this.hass!, this._config, discovered),
    );
    this._supportModelCache = { signature, model };
    return model;
  }

  private async _call(entityId: string, service: string): Promise<void> {
    await this._runEntityService(entityId, service);
  }

  private async _toggleClimate(entityId: string, state: HassEntity): Promise<void> {
    const service = state.state === "off" ? "turn_on" : "turn_off";
    await this._runEntityService(entityId, service);
  }

  private async _toggleSwitch(entityId: string, state: HassEntity): Promise<void> {
    const service = serviceForToggle(state);
    await this._runEntityService(entityId, service);
  }

  private async _pressButton(definition: EntityDefinition, entityId: string): Promise<void> {
    if (
      definition.dangerous &&
      !window.confirm(
        localize(this.hass, "confirm.run", {
          label: friendlyName(definition, undefined, this.hass),
        }),
      )
    ) {
      return;
    }
    await this._runEntityService(entityId, "press");
  }

  private async _adjustTemp(entityId: string, state: HassEntity, delta: number): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "set_temperature"), () =>
      adjustClimateTemperature(this.hass!, entityId, state, delta),
    );
  }

  private async _setClimateFromInput(
    entityId: string,
    state: HassEntity,
    event: Event,
  ): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "set_temperature"), () =>
      adjustClimateTemperature(
        this.hass!,
        entityId,
        state,
        Number((event.target as HTMLInputElement).value) -
          (numericAttribute(state, "temperature") ?? numericState(state) ?? 0),
      ),
    );
  }

  private async _setNumber(
    entityId: string,
    state: HassEntity | undefined,
    event: Event,
  ): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "set_value"), () =>
      setNumberValue(this.hass!, entityId, state, (event.target as HTMLInputElement).value),
    );
  }

  private async _setText(entityId: string, event: Event): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "set_value"), () =>
      setTextValue(this.hass!, entityId, (event.target as HTMLInputElement).value),
    );
  }

  private async _selectOption(entityId: string, event: Event): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "select_option"), () =>
      selectOption(this.hass!, entityId, (event.target as HTMLSelectElement).value),
    );
  }

  private async _selectMediaSource(entityId: string, event: Event): Promise<void> {
    await this._selectMediaSourceByName(entityId, (event.target as HTMLSelectElement).value);
  }

  private async _selectMediaSourceByName(entityId: string, source: string): Promise<void> {
    await this._runEntityService(entityId, "select_source", { source });
  }

  private async _runEntityService(
    entityId: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, service), () =>
      callEntityService(this.hass!, entityId, service, serviceData),
    );
  }

  private async _setVolume(entityId: string, event: Event): Promise<void> {
    await this._runServiceCall(serviceActionKey(entityId, "volume_set"), () =>
      setMediaVolume(this.hass!, entityId, (event.target as HTMLInputElement).value),
    );
  }

  private async _callWeather(discovered: DiscoveredEntities): Promise<void> {
    await this._runServiceCall(weatherActionKey(this._weatherService), () =>
      callWeatherService(
        this.hass!,
        this._weatherService,
        this._weatherForm,
        discovered.configEntryId,
      ),
    );
  }

  private _exportSupportPackage(discovered: DiscoveredEntities): void {
    const model = this._supportModel(discovered);
    const supportPackage = buildSupportPackage(model, this._config);
    const json = JSON.stringify(supportPackage, null, 2);
    this.dispatchEvent(
      new CustomEvent("dhe-connect-support-package", {
        bubbles: true,
        composed: true,
        detail: { supportPackage, json },
      }),
    );
    downloadJsonFile(supportPackageFileName(), json);
  }

  private async _runServiceCall(
    key: string,
    action: () => Promise<unknown>,
  ): Promise<void> {
    await this._serviceCalls.run(key, async () => {
      try {
        this._errorMessage = undefined;
        await action();
      } catch (error) {
        const message = localize(this.hass, "error.action_failed", {
          message: error instanceof Error ? error.message : String(error),
        });
        this._errorMessage = message;
        this.dispatchEvent(
          new CustomEvent("hass-notification", {
            bubbles: true,
            composed: true,
            detail: { message },
          }),
        );
      }
    });
  }

  static override styles = cardStyles;
}

function configRenderSignature(config: NormalizedDheConnectCardConfig): string {
  return JSON.stringify(config);
}

const OBJECT_TOKENS = new WeakMap<object, number>();
let nextObjectToken = 1;

function objectIdentityToken(value: unknown): number {
  if (!value || typeof value !== "object") {
    return 0;
  }
  const objectValue = value as object;
  const existing = OBJECT_TOKENS.get(objectValue);
  if (existing !== undefined) {
    return existing;
  }
  const token = nextObjectToken++;
  OBJECT_TOKENS.set(objectValue, token);
  return token;
}

declare global {
  interface HTMLElementTagNameMap {
    "dhe-connect-card": DheConnectCard;
  }
}
