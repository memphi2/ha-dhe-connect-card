import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import {
  DEFAULT_SECTIONS,
  ENTITY_DEFINITION_BY_KEY,
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
import { ACTION_KEYS, BATH_KEYS, CONTROL_KEYS, TIMER_KEYS, WELLNESS_KEYS } from "./entity-groups";
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
  DiscoveredEntities,
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
const ENTITY_EDITOR_SECTIONS = DEFAULT_SECTIONS.filter(
  (section) => section !== "overview",
) satisfies SectionId[];
const ENTITY_EDITOR_SECTION_SET = new Set<SectionId>(ENTITY_EDITOR_SECTIONS);
const SECTION_ENTITY_DRAG_TYPE = "application/x-dhe-connect-section-entity";
const SECTION_DEFAULT_KEY_ORDER: Partial<Record<SectionId, readonly EntityKey[]>> = {
  controls: [...CONTROL_KEYS, ...WELLNESS_KEYS],
  bath: BATH_KEYS,
  timers: TIMER_KEYS,
  weather: ["weather", "weather_location"],
  actions: ACTION_KEYS,
};
@customElement("dhe-connect-card-editor")
export class DheConnectCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config = normalizeConfig({});
  @state() private _legacyMigration?: LegacyEntityMigration;
  private readonly _discoveryCache = new DiscoveryCache();
  private _sourceConfig: DheConnectCardConfig = {};
  private _emittedLegacyMigrationKey?: string;
  private readonly _activeEntityKeysCache = new WeakMap<DiscoveredEntities, Set<EntityKey>>();

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
        ${renderSectionOrderEditor(orderingContext)}
        ${renderOverviewEntityEditor(orderingContext)}
        <section class="entity-editor section-entities-editor">
          ${this._orderedEntityEditorSections().map((section) =>
            this._sectionEntitySelector(section, hiddenEntityKeys, activeEntityKeys),
          )}
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
    const discovered = this._discoveryCache.get(this.hass, this._config);
    const cached = this._activeEntityKeysCache.get(discovered);
    if (cached) {
      return cached;
    }
    const keys = new Set(Object.keys(discovered.entityIds));
    this._activeEntityKeysCache.set(discovered, keys);
    return keys;
  }

  private _orderedEntityEditorSections(): SectionId[] {
    return this._config.sections.filter(
      (section): section is SectionId =>
        section !== "overview" && ENTITY_EDITOR_SECTION_SET.has(section),
    );
  }

  private _sectionEntitySelector(
    section: SectionId,
    hiddenEntityKeys: Set<EntityKey>,
    activeEntityKeys?: Set<EntityKey>,
  ) {
    const definitions = this._orderedSectionEntityDefinitions(
      section,
      hiddenEntityKeys,
      activeEntityKeys,
    );
    if (!definitions.length) {
      return "";
    }
    const selectedDefinitions = definitions.filter((definition) => !hiddenEntityKeys.has(definition.key));
    const availableDefinitions = definitions.filter((definition) => hiddenEntityKeys.has(definition.key));
    const selectedOrder = selectedDefinitions.map((definition) => definition.key);
    const selected = new Set(selectedOrder);
    return editorFoldout(this.hass, {
      className: `overview-foldout entity-section entity-section-${section}`,
      titleKey: `section.${section}`,
      count: selectedDefinitions.length,
      content: html`
        <div class="overview-entity-groups">
          ${selectedDefinitions.length
            ? editorFoldout(this.hass, {
                className: "overview-entity-section",
                titleKey: "editor.selected_section_entities",
                count: selectedDefinitions.length,
                content: html`
                  <div class="order-list overview-order-list">
                    ${repeat(
                      selectedDefinitions,
                      (definition) => definition.key,
                      (definition) =>
                        this._sectionEntityToggle(section, definition, selected, selectedOrder),
                    )}
                  </div>
                `,
              })
            : ""}
          ${availableDefinitions.length
            ? editorFoldout(this.hass, {
                className: "overview-entity-section",
                titleKey: "editor.available_section_entities",
                count: availableDefinitions.length,
                content: html`
                  <div class="overview-entity-grid">
                    ${repeat(
                      availableDefinitions,
                      (definition) => definition.key,
                      (definition) =>
                        this._sectionEntityToggle(section, definition, selected, selectedOrder),
                    )}
                  </div>
                `,
              })
            : ""}
        </div>
      `,
    });
  }

  private _orderedSectionEntityDefinitions(
    section: SectionId,
    hiddenEntityKeys?: ReadonlySet<EntityKey>,
    activeEntityKeys?: ReadonlySet<EntityKey>,
  ): EntityDefinition[] {
    const overrides = this._entityOverrideKeys();
    const hidden = hiddenEntityKeys ? [...hiddenEntityKeys] : [];
    const pinned = new Set<EntityKey>([...hidden, ...overrides]);
    const definitions = (ENTITY_DEFINITIONS_BY_SECTION[section] ?? []).filter((definition) =>
      !activeEntityKeys || activeEntityKeys.has(definition.key) || pinned.has(definition.key)
    );
    if (!definitions.length) {
      return [];
    }
    const definitionByKey = new Map(
      definitions.map((definition) => [definition.key, definition] as const),
    );
    const sectionCatalogKeys = (ENTITY_DEFINITIONS_BY_SECTION[section] ?? []).map(
      (definition) => definition.key,
    );
    const preferredDefaultKeys = sectionDefaultKeys(section, sectionCatalogKeys).filter((key) =>
      definitionByKey.has(key)
    );
    const baseKeySet = new Set(preferredDefaultKeys);
    const baseDefinitions = [
      ...preferredDefaultKeys
        .map((key) => definitionByKey.get(key))
        .filter((definition): definition is EntityDefinition => Boolean(definition)),
      ...definitions.filter((definition) => !baseKeySet.has(definition.key)),
    ];

    const configuredOrder = this._config.section_entity_order[section];
    if (!configuredOrder?.length) {
      return baseDefinitions;
    }
    const ordered = configuredOrder
      .map((key) => definitionByKey.get(key))
      .filter((definition): definition is EntityDefinition => Boolean(definition));
    const orderedKeys = new Set(ordered.map((definition) => definition.key));
    return [
      ...ordered,
      ...baseDefinitions.filter((definition) => !orderedKeys.has(definition.key)),
    ];
  }

  private _entityOverrideKeys(): Set<EntityKey> {
    const keys = new Set<EntityKey>();
    for (const [entryKey, value] of Object.entries(this._config.entities)) {
      if (typeof value === "string" && ENTITY_DEFINITION_BY_KEY[entryKey]) {
        keys.add(entryKey);
      }
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        continue;
      }
      for (const nestedKey of Object.keys(value)) {
        if (ENTITY_DEFINITION_BY_KEY[nestedKey]) {
          keys.add(nestedKey);
        }
      }
    }
    return keys;
  }

  private _sectionEntityToggle(
    section: SectionId,
    definition: EntityDefinition,
    selected: Set<EntityKey>,
    selectedOrder: EntityKey[],
  ) {
    const checked = selected.has(definition.key);
    const reorderable = section !== "memory";
    const override = entityOverride(this._config.entities, definition);
    const overridePreview = typeof override === "string" ? override : "";
    return html`
      <div
        class="overview-entity-toggle section-entity-toggle"
        data-entity-key=${definition.key}
        data-entity-section=${section}
        @dragover=${(event: DragEvent) =>
          checked && reorderable ? this._allowEntityDrop(event) : undefined}
        @drop=${(event: DragEvent) =>
          checked && reorderable
            ? this._dropSectionEntity(section, definition.key, event)
            : undefined}
      >
        <div class="check switch-row">
          ${switchFormField(
            this.hass,
            entityLabel(definition, this.hass),
            checked,
            (event: Event) =>
              this._entityVisibilityChanged(definition.key, checkedFromEvent(event)),
            {
              helpKey: "editor.overview_entity_visibility_help",
              isLocalizedText: true,
            },
          )}
        </div>
        ${checked && reorderable
          ? html`
              <div class="order-actions">
                <button
                  class="drag-handle"
                  type="button"
                  title=${localize(this.hass, "editor.drag_to_reorder")}
                  aria-label=${localize(this.hass, "editor.drag_to_reorder")}
                  aria-keyshortcuts="ArrowUp ArrowDown"
                  draggable="true"
                  @dragstart=${(event: DragEvent) =>
                    this._setSectionEntityDragData(event, definition.key)}
                  @keydown=${(event: KeyboardEvent) =>
                    this._reorderSectionEntityByKeyboard(
                      event,
                      section,
                      definition.key,
                      selectedOrder,
                    )}
                >
                  <ha-icon icon="mdi:drag"></ha-icon>
                </button>
              </div>
            `
          : ""}
        <div class="entity-override-control entity-override-inline">
          ${domainEntityPicker(
            this.hass,
            definition,
            override,
            (event: Event) => this._entityOverrideChanged(definition, event),
          )}
          <ha-textfield
            .value=${overridePreview}
            .label=${localize(this.hass, "editor.entity_override_custom")}
            .helper=${localize(this.hass, "editor.entity_override_custom_help")}
            helperPersistent
            @change=${(event: Event) => this._entityOverrideTextChanged(definition, event)}
          ></ha-textfield>
        </div>
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

  private _setSectionEntityDragData(event: DragEvent, key: EntityKey): void {
    event.dataTransfer?.setData(SECTION_ENTITY_DRAG_TYPE, key);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  }

  private _allowEntityDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  private _dropSectionEntity(
    section: SectionId,
    target: EntityKey,
    event: DragEvent,
  ): void {
    event.preventDefault();
    const source = event.dataTransfer?.getData(SECTION_ENTITY_DRAG_TYPE) as
      | EntityKey
      | undefined;
    if (!source) {
      return;
    }
    this._reorderSectionEntity(section, source, target);
  }

  private _reorderSectionEntityByKeyboard(
    event: KeyboardEvent,
    section: SectionId,
    current: EntityKey,
    orderedKeys: EntityKey[],
  ): void {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const index = orderedKeys.indexOf(current);
    if (index < 0) {
      return;
    }
    const delta = event.key === "ArrowUp" ? -1 : 1;
    const target = orderedKeys[index + delta];
    if (!target) {
      return;
    }
    this._reorderSectionEntity(section, current, target);
  }

  private _reorderSectionEntity(
    section: SectionId,
    source: EntityKey,
    target: EntityKey,
  ): void {
    const current = this._orderedSectionEntityDefinitions(section).map(
      (definition) => definition.key,
    );
    const next = reorderItem(current, source, target);
    if (sameStringList(current, next)) {
      return;
    }
    const defaults = sectionDefaultKeys(
      section,
      (ENTITY_DEFINITIONS_BY_SECTION[section] ?? []).map((definition) => definition.key),
    );
    const section_entity_order = { ...this._config.section_entity_order };
    if (sameStringList(next, defaults)) {
      delete section_entity_order[section];
    } else {
      section_entity_order[section] = next;
    }
    this._updateConfig({ section_entity_order });
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

function sectionDefaultKeys(section: SectionId, sectionCatalogKeys: EntityKey[]): EntityKey[] {
  const preferred = SECTION_DEFAULT_KEY_ORDER[section] ?? [];
  const preferredSet = new Set(preferred);
  const knownCatalogKeys = new Set(sectionCatalogKeys);
  const inSectionPreferred = preferred.filter((key) => knownCatalogKeys.has(key));
  const remaining = sectionCatalogKeys.filter((key) => !preferredSet.has(key));
  return [...inSectionPreferred, ...remaining];
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

function domainEntityPicker(
  hass: HomeAssistant | undefined,
  definition: EntityDefinition,
  value: string,
  onValueChanged: (event: Event) => void,
) {
  if (supportsHaSelector()) {
    return html`
      <ha-selector
        class="ha-picker-control"
        .hass=${hass}
        .value=${value}
        .selector=${domainEntitySelector(definition.domain)}
        @value-changed=${onValueChanged}
      ></ha-selector>
    `;
  }
  return html`
    <ha-entity-picker
      class="ha-picker-control"
      .hass=${hass}
      .value=${value}
      .includeDomains=${[definition.domain]}
      @value-changed=${onValueChanged}
    ></ha-entity-picker>
  `;
}

function supportsHaSelector(): boolean {
  return typeof customElements !== "undefined" && Boolean(customElements.get("ha-selector"));
}

function sameStringList(left: string[], right: string[]): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

declare global {
  interface HTMLElementTagNameMap {
    "dhe-connect-card-editor": DheConnectCardEditor;
  }
}
