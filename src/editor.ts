import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  DEFAULT_SECTIONS,
  ENTITY_DEFINITIONS_BY_SECTION,
} from "./catalog";
import { normalizeConfig } from "./config";
import { DiscoveryCache } from "./discovery-cache";
import {
  ACTION_OPTIONS,
  actionConfigFromEditor,
  actionNameFromConfig,
  formatActionData,
  parseActionData,
  targetFieldToString,
  updateActionTargetField,
  type ActionConfigKey,
  type ActionTargetField,
} from "./editor-actions";
import {
  renderBasicEditor,
  type BasicBooleanConfigKey,
} from "./editor-basic";
import { editorFoldout, formRow, switchFormField, textareaRow } from "./editor-form";
import {
  activeOverviewEntities,
  reorderActiveOverviewEntity,
  reorderItem,
  renderOverviewEntityEditor,
  renderSectionOrderEditor,
  toggleListItem,
  type EditorOrderingContext,
} from "./editor-ordering";
import { editorStyles } from "./editor-styles";
import { checkedFromEvent, inputStringFromEvent, pickerValueFromEvent } from "./editor-events";
import { entityLabel, localize, TRANSLATIONS_CHANGED_EVENT } from "./i18n";
import {
  logLegacyEntityMigration,
  migrateLegacyEntityAnchor,
  type LegacyEntityMigration,
} from "./migration";
import { sectionsWithSupportMode } from "./sections";
import type {
  DheConnectCardConfig,
  EntityDomain,
  EntityDefinition,
  EntityKey,
  HomeAssistant,
  IconTheme,
  IconTone,
  LayoutMode,
  SectionId,
  TileSize,
} from "./types";

type ActionTextProperty = "navigation_path" | "url_path" | "service";
interface ActionField {
  key: ActionConfigKey;
  labelKey: string;
}

const ACTION_FIELDS: ActionField[] = [
  { key: "tap_action", labelKey: "editor.tap_action" },
  { key: "hold_action", labelKey: "editor.hold_action" },
  { key: "double_tap_action", labelKey: "editor.double_tap_action" },
];
@customElement("dhe-connect-card-editor")
export class DheConnectCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config = normalizeConfig({});
  @state() private _legacyMigration?: LegacyEntityMigration;
  private readonly _discoveryCache = new DiscoveryCache();
  private _sourceConfig: DheConnectCardConfig = {};
  private _emittedLegacyMigrationKey?: string;

  public setConfig(config: DheConnectCardConfig): void {
    this._sourceConfig = config;
    this._applyConfigMigration(false);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(TRANSLATIONS_CHANGED_EVENT, this._translationsChanged);
  }

  public override disconnectedCallback(): void {
    window.removeEventListener(TRANSLATIONS_CHANGED_EVENT, this._translationsChanged);
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("hass")) {
      this._applyConfigMigration(true);
    }
  }

  private readonly _translationsChanged = (): void => {
    this.requestUpdate();
  };

  protected override render() {
    const activeEntityKeys = this._activeEntityKeys();
    const hiddenEntityKeys = new Set(this._config.hide_entities);
    const orderingContext = this._orderingContext(activeEntityKeys);
    return html`
      <div class="editor">
        ${renderBasicEditor({
          hass: this.hass,
          config: this._config,
          devicePreviewLabel: this._devicePreviewLabel(),
          devicePreviewReady: activeEntityKeys !== undefined,
          legacyMigration: this._legacyMigration,
          deviceChanged: this._deviceChanged,
          iconColorChanged: (tone, event) => this._iconColorChanged(tone, event),
          nameChanged: this._nameChanged,
          overviewColumnsChanged: this._overviewColumnsChanged,
          selectChanged: (key, value) => this._selectOptionChanged(key, value),
          checkboxChanged: (key, checked) => this._checkboxChanged(key, checked),
        })}
        ${renderSectionOrderEditor(orderingContext)}
        ${renderOverviewEntityEditor(orderingContext)}
        <section class="actions-editor">
          ${editorFoldout(this.hass, {
            className: "actions-foldout",
            titleKey: "section.actions",
            helpKey: "editor.actions_help",
            content: html`
              <div class="action-list">
                ${ACTION_FIELDS.map((field) => this._actionField(field))}
              </div>
            `,
          })}
        </section>
        <section class="entity-editor">
          ${editorFoldout(this.hass, {
            className: "entities-foldout",
            titleKey: "editor.entities",
            helpKey: "editor.entities_help",
            content: html`
              <div class="entity-section-list">
                ${DEFAULT_SECTIONS.map((section) =>
                  this._entitySection(section, hiddenEntityKeys),
                )}
              </div>
            `,
          })}
        </section>
      </div>
    `;
  }

  private _orderingContext(activeEntityKeys: Set<EntityKey> | undefined): EditorOrderingContext {
    return {
      hass: this.hass,
      sections: this._config.sections,
      overviewEntities: activeEntityKeys
        ? activeOverviewEntities(this._config.overview_entities, activeEntityKeys)
        : this._config.overview_entities,
      activeEntityKeys,
      toggleSection: (section, checked) => this._toggleSection(section, checked),
      reorderSection: (source, target) => this._reorderSection(source, target),
      toggleOverviewEntity: (key, checked) => this._overviewEntityChanged(key, checked),
      reorderOverviewEntity: (source, target) =>
        this._reorderOverviewEntity(source, target, activeEntityKeys),
    };
  }

  private _devicePreviewLabel(): string | undefined {
    const deviceId = this._config.device_id;
    if (!deviceId) {
      return undefined;
    }
    const device = this.hass?.devices?.[deviceId];
    return device?.name_by_user || device?.name || undefined;
  }

  private _activeEntityKeys(): Set<EntityKey> | undefined {
    if (!this.hass) {
      return undefined;
    }
    return new Set(Object.keys(this._discoveryCache.get(this.hass, this._config).entityIds));
  }

  private _entitySection(section: SectionId, hiddenEntityKeys: Set<EntityKey>) {
    const definitions = ENTITY_DEFINITIONS_BY_SECTION[section] ?? [];
    if (!definitions.length) {
      return "";
    }
    const visibleCount = definitions.filter((definition) => !hiddenEntityKeys.has(definition.key))
      .length;
    return editorFoldout(this.hass, {
      className: "entity-section",
      titleKey: `section.${section}`,
      count: `${visibleCount}/${definitions.length}`,
      content: html`
        <div class="entity-mapping-list">
          ${definitions.map((definition) =>
            this._entityMappingRow(definition, hiddenEntityKeys),
          )}
        </div>
      `,
    });
  }

  private _entityMappingRow(
    definition: EntityDefinition,
    hiddenEntityKeys: Set<string>,
  ) {
    const hidden = hiddenEntityKeys.has(definition.key);
    const override = entityOverride(this._config.entities, definition);
    const overridePreview = override || localize(this.hass, "editor.entity_override_auto");
    const overridePreviewClass = override
      ? "entity-override-preview"
      : "entity-override-preview is-auto";
    return html`
      <div class="entity-mapping-row" data-entity-key=${definition.key}>
        <div class="entity-visible switch-row">
          ${switchFormField(
            this.hass,
            entityLabel(definition, this.hass),
            !hidden,
            (event: Event) =>
              this._entityVisibilityChanged(definition.key, checkedFromEvent(event)),
            {
              helpKey: "editor.entity_visibility_help",
              isLocalizedText: true,
            },
          )}
        </div>
        ${formRow(
          this.hass,
          "editor.entity_override",
          "editor.entity_override_help",
          html`
            <div class="entity-override-control">
              <ha-selector
                class="ha-picker-control"
                .hass=${this.hass}
                .value=${override}
                .selector=${domainEntitySelector(definition.domain)}
                @value-changed=${(event: Event) =>
                  this._entityOverrideChanged(definition, event)}
              ></ha-selector>
              <ha-textfield
                .value=${override}
                .label=${localize(this.hass, "editor.entity_override_custom")}
                .helper=${localize(this.hass, "editor.entity_override_custom_help")}
                helperPersistent
                @change=${(event: Event) =>
                  this._entityOverrideTextChanged(definition, event)}
              ></ha-textfield>
              <small class=${overridePreviewClass} title=${overridePreview}>${overridePreview}</small>
            </div>
          `,
          "entity-override-row",
        )}
      </div>
    `;
  }

  private _actionField(field: ActionField) {
    const action = this._config[field.key];
    const actionName = actionNameFromConfig(action, field.key);
    const open = actionCardOpen(field.key, action, actionName);
    return html`
      <details class="editor-foldout action-card" data-action-card-key=${field.key} ?open=${open}>
        <summary>
          <span class="summary-label">
            <span>${localize(this.hass, field.labelKey)}</span>
          </span>
          <small>${localize(this.hass, `editor.action.${actionName}`)}</small>
        </summary>
        <div class="action-fields">
          ${formRow(
            this.hass,
            "editor.action_type",
            "editor.action_type_help",
            html`
              <select
                data-action-key=${field.key}
                .value=${actionName}
                aria-label=${localize(this.hass, "editor.action_type")}
                @change=${(event: Event) => this._actionTypeChanged(field.key, event)}
              >
                ${ACTION_OPTIONS.map(
                  (option) =>
                    html`<option value=${option} ?selected=${option === actionName}>
                      ${localize(this.hass, `editor.action.${option}`)}
                    </option>`,
                )}
              </select>
            `,
            "action-form-row",
          )}
          ${actionName !== "none"
            ? html`
                ${formRow(
                  this.hass,
                  "editor.action_entity",
                  "editor.action_entity_help",
                  html`
                    <ha-entity-picker
                      data-action-key=${field.key}
                      data-action-property="entity"
                      .hass=${this.hass}
                      .value=${typeof action?.entity === "string" ? action.entity : ""}
                      aria-label=${localize(this.hass, "editor.action_entity")}
                      @value-changed=${(event: Event) =>
                        this._actionEntityChanged(field.key, event)}
                    ></ha-entity-picker>
                  `,
                  "action-form-row",
                )}
              `
            : ""}
          ${actionName === "navigate"
            ? this._actionTextField(field.key, "navigation_path", "editor.navigation_path")
            : ""}
          ${actionName === "url"
            ? this._actionTextField(field.key, "url_path", "editor.url_path")
            : ""}
          ${actionName === "call-service"
            ? html`
                ${this._actionTextField(field.key, "service", "editor.service")}
                ${this._actionTargetEntityField(field.key)}
                ${this._actionTargetTextField(
                  field.key,
                  "area_id",
                  "editor.service_target_area",
                )}
                ${this._actionTargetTextField(
                  field.key,
                  "device_id",
                  "editor.service_target_device",
                )}
                ${this._actionDataField(field.key)}
              `
            : ""}
        </div>
      </details>
    `;
  }

  private _actionTextField(
    key: ActionConfigKey,
    property: ActionTextProperty,
    labelKey: string,
  ) {
    const action = this._config[key];
    const value =
      property === "service" ? (action?.service ?? action?.perform_action) : action?.[property];
    return formRow(
      this.hass,
      labelKey,
      `${labelKey}_help`,
      html`
        <ha-textfield
          data-action-key=${key}
          data-action-property=${property}
          .value=${typeof value === "string" ? value : ""}
          aria-label=${localize(this.hass, labelKey)}
          .helper=${localize(this.hass, `${labelKey}_help`)}
          helperPersistent
          @input=${(event: Event) => this._actionPropertyChanged(key, property, event)}
        ></ha-textfield>
      `,
      "action-form-row",
    );
  }

  private _actionTargetEntityField(key: ActionConfigKey) {
    const action = this._config[key];
    return formRow(
      this.hass,
      "editor.service_target_entity",
      "editor.service_target_entity_help",
      html`
        <ha-entity-picker
          data-action-key=${key}
          data-action-property="target_entity"
          .hass=${this.hass}
          .value=${targetFieldToString(action?.target, "entity_id")}
          aria-label=${localize(this.hass, "editor.service_target_entity")}
          @value-changed=${(event: Event) =>
            this._actionTargetEntityChanged(key, event)}
        ></ha-entity-picker>
      `,
      "action-form-row",
    );
  }

  private _actionTargetTextField(
    key: ActionConfigKey,
    field: Exclude<ActionTargetField, "entity_id">,
    labelKey: string,
  ) {
    const action = this._config[key];
    return formRow(
      this.hass,
      labelKey,
      `${labelKey}_help`,
      html`
        <ha-textfield
          data-action-key=${key}
          data-action-property=${`target_${field}`}
          .value=${targetFieldToString(action?.target, field)}
          aria-label=${localize(this.hass, labelKey)}
          .helper=${localize(this.hass, `${labelKey}_help`)}
          helperPersistent
          @input=${(event: Event) => this._actionTargetTextChanged(key, field, event)}
        ></ha-textfield>
      `,
      "action-form-row",
    );
  }

  private _actionDataField(key: ActionConfigKey) {
    const action = this._config[key];
    return textareaRow(
      this.hass,
      "editor.service_data",
      "editor.service_data_help",
      html`
        <ha-textarea
          data-action-key=${key}
          data-action-property="data"
          .value=${formatActionData(action?.data)}
          aria-label=${localize(this.hass, "editor.service_data")}
          .helper=${localize(this.hass, "editor.service_data_help")}
          helperPersistent
          @input=${(event: Event) => this._actionDataChanged(key, event)}
        ></ha-textarea>
      `,
    );
  }

  private _deviceChanged = (event: Event): void => {
    const deviceId = pickerValueFromEvent(event);
    if (!deviceId) {
      return;
    }
    this._updateConfig({ device_id: deviceId });
  };

  private _nameChanged = (event: Event): void => {
    this._updateConfig({ name: inputStringFromEvent(event) || undefined });
  };

  private _checkboxChanged(key: BasicBooleanConfigKey, checked: boolean): void {
    if (key === "show_support_mode") {
      this._updateConfig({
        show_support_mode: checked,
        sections: sectionsWithSupportMode(this._config.sections, checked),
      });
      return;
    }
    this._updateConfig({ [key]: checked });
  }

  private _overviewColumnsChanged = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const value = Number.parseInt(target.value, 10);
    this._updateConfig({ overview_columns: value });
  };

  private _selectOptionChanged(
    key: "icon_theme" | "layout_mode" | "tile_size",
    value: string,
  ): void {
    this._updateConfig({
      [key]: value as IconTheme | LayoutMode | TileSize,
    });
  }

  private _iconColorChanged(tone: IconTone, event: Event): void {
    const color = inputStringFromEvent(event);
    const iconColors = { ...this._config.icon_colors };
    if (color) {
      iconColors[tone] = color;
    } else {
      delete iconColors[tone];
    }
    this._updateConfig({ icon_colors: iconColors });
  }

  private _entityVisibilityChanged(key: EntityKey, checked: boolean): void {
    const hidden = new Set(this._config.hide_entities);
    if (checked) {
      hidden.delete(key);
    } else {
      hidden.add(key);
    }
    this._updateConfig({ hide_entities: [...hidden] });
  }

  private _entityOverrideChanged(
    definition: EntityDefinition,
    event: Event,
  ): void {
    this._updateConfig({
      entities: updateEntityOverride(
        this._config.entities,
        definition,
        pickerValueFromEvent(event),
      ),
    });
  }

  private _entityOverrideTextChanged(
    definition: EntityDefinition,
    event: Event,
  ): void {
    this._updateConfig({
      entities: updateEntityOverride(
        this._config.entities,
        definition,
        inputStringFromEvent(event) || undefined,
      ),
    });
  }

  private _actionTypeChanged(key: ActionConfigKey, event: Event): void {
    const target = event.target as HTMLSelectElement;
    this._updateActionConfig(key, { action: target.value });
  }

  private _actionEntityChanged(
    key: ActionConfigKey,
    event: Event,
  ): void {
    this._updateActionConfig(key, { entity: pickerValueFromEvent(event) });
  }

  private _actionPropertyChanged(
    key: ActionConfigKey,
    property: ActionTextProperty,
    event: Event,
  ): void {
    const value = inputStringFromEvent(event);
    if (property === "service") {
      this._updateActionConfig(key, {
        perform_action: value || undefined,
        service: value || undefined,
      });
      return;
    }
    this._updateActionConfig(key, { [property]: value || undefined });
  }

  private _actionTargetEntityChanged(
    key: ActionConfigKey,
    event: Event,
  ): void {
    this._updateActionTarget(key, "entity_id", pickerValueFromEvent(event));
  }

  private _actionTargetTextChanged(
    key: ActionConfigKey,
    field: Exclude<ActionTargetField, "entity_id">,
    event: Event,
  ): void {
    this._updateActionTarget(key, field, inputStringFromEvent(event));
  }

  private _updateActionTarget(
    key: ActionConfigKey,
    field: ActionTargetField,
    value: string | undefined,
  ): void {
    this._updateActionConfig(key, {
      target: updateActionTargetField(this._config[key]?.target, field, value),
    });
  }

  private _actionDataChanged(key: ActionConfigKey, event: Event): void {
    const target = event.target as HTMLElement & { value?: unknown };
    const parsed = parseActionData(typeof target.value === "string" ? target.value : "");
    target.classList.toggle("invalid", !parsed.valid);
    target.toggleAttribute("aria-invalid", !parsed.valid);
    if (!parsed.valid) {
      return;
    }
    this._updateActionConfig(key, { data: parsed.value });
  }

  private _updateActionConfig(key: ActionConfigKey, patch: Record<string, unknown>): void {
    const current = this._config[key];
    const next = actionConfigFromEditor(key, { ...current, ...patch });
    this._updateConfig({ [key]: next });
  }

  private _toggleSection(section: SectionId, checked: boolean): void {
    this._updateConfig({
      sections: toggleListItem(this._config.sections, section, checked),
    });
  }

  private _reorderSection(source: SectionId, target: SectionId): void {
    const sections = reorderItem(this._config.sections, source, target);
    this._updateConfig({ sections });
  }

  private _overviewEntityChanged(key: EntityKey, checked: boolean): void {
    this._updateConfig({
      overview_entities: toggleListItem(
        this._config.overview_entities,
        key,
        checked,
      ),
    });
  }

  private _reorderOverviewEntity(
    source: EntityKey,
    target: EntityKey,
    activeEntityKeys?: Set<EntityKey>,
  ): void {
    const overview_entities = reorderActiveOverviewEntity(
      this._config.overview_entities,
      source,
      target,
      activeEntityKeys,
    );
    this._updateConfig({ overview_entities });
  }

  private _updateConfig(patch: Partial<DheConnectCardConfig>): void {
    const next = normalizeConfig({ ...this._config, ...patch });
    this._sourceConfig = this._configForDispatch(next);
    this._config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._sourceConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static override styles = editorStyles;

  private _applyConfigMigration(emitConfig: boolean): void {
    const migration = migrateLegacyEntityAnchor(this.hass, this._sourceConfig);
    this._legacyMigration = migration.legacy;
    this._config = normalizeConfig(migration.config);
    if (!migration.legacy) {
      return;
    }
    logLegacyEntityMigration("editor", migration.legacy);
    if (!emitConfig || !migration.legacy.resolved) {
      return;
    }
    const key = `${migration.legacy.legacyEntity}:${migration.legacy.migratedDeviceId ?? "override"}`;
    if (this._emittedLegacyMigrationKey === key) {
      return;
    }
    this._emittedLegacyMigrationKey = key;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _configForDispatch(config: DheConnectCardConfig): DheConnectCardConfig {
    if (
      !this._legacyMigration ||
      this._legacyMigration.resolved ||
      hasModernAnchor(config)
    ) {
      this._legacyMigration = undefined;
      return config;
    }
    return {
      ...config,
      entity: this._legacyMigration.legacyEntity,
    };
  }
}

function hasModernAnchor(config: DheConnectCardConfig): boolean {
  if (typeof config.device_id === "string" && config.device_id.trim()) {
    return true;
  }
  const waterHeating = config.entities?.water_heating;
  if (typeof waterHeating === "string" && waterHeating.trim()) {
    return true;
  }
  const climateOverrides = config.entities?.climate;
  return Boolean(
    climateOverrides &&
      typeof climateOverrides === "object" &&
      !Array.isArray(climateOverrides) &&
      typeof climateOverrides.water_heating === "string" &&
      climateOverrides.water_heating.trim(),
  );
}

function actionCardOpen(
  key: ActionConfigKey,
  action: DheConnectCardConfig["tap_action"],
  actionName: string,
): boolean {
  if (key !== "tap_action") {
    return actionName !== "none";
  }
  if (!action) {
    return false;
  }
  const keys = Object.keys(action);
  return !(action.action === "more-info" && keys.length === 1);
}

function entityOverride(
  entities: NonNullable<DheConnectCardConfig["entities"]>,
  definition: EntityDefinition,
): string {
  const direct = entities[definition.key];
  if (typeof direct === "string") {
    return direct;
  }
  const domainOverrides = entities[definition.domain];
  if (domainOverrides && typeof domainOverrides === "object" && !Array.isArray(domainOverrides)) {
    const nested = domainOverrides[definition.key];
    return typeof nested === "string" ? nested : "";
  }
  return "";
}

function updateEntityOverride(
  entities: NonNullable<DheConnectCardConfig["entities"]>,
  definition: EntityDefinition,
  entityId: string | undefined,
): NonNullable<DheConnectCardConfig["entities"]> {
  const next = { ...entities };
  const domainOverrides = next[definition.domain];
  if (domainOverrides && typeof domainOverrides === "object" && !Array.isArray(domainOverrides)) {
    const nested = { ...domainOverrides };
    delete nested[definition.key];
    if (Object.keys(nested).length) {
      next[definition.domain] = nested;
    } else {
      delete next[definition.domain];
    }
  }
  if (entityId) {
    next[definition.key] = entityId;
  } else {
    delete next[definition.key];
  }
  return next;
}

function domainEntitySelector(domain: EntityDomain) {
  return {
    entity: {
      filter: [{ domain }],
    },
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "dhe-connect-card-editor": DheConnectCardEditor;
  }
}
