import { html } from "lit";
import { editorFoldout, formRow, switchFormField } from "./editor-form";
import { ICON_THEMES, ICON_TONES } from "./icon-theme";
import { LAYOUT_MODES, TILE_SIZES } from "./config";
import { localize } from "./i18n";
import {
  INTEGRATION_DOMAIN,
  type HomeAssistant,
  type IconTheme,
  type IconTone,
  type LayoutMode,
  type NormalizedDheConnectCardConfig,
  type TileSize,
} from "./types";
import { checkedFromEvent, textInputValue } from "./editor-events";

export type BasicBooleanConfigKey =
  | "show_diagnostics"
  | "show_weather_services"
  | "show_icon_animations"
  | "show_display_buttons"
  | "show_support_mode"
  | "show_dangerous_actions"
  | "show_unavailable"
  | "show_optional";

interface BooleanField {
  key: BasicBooleanConfigKey;
  labelKey: string;
}

interface SelectField<T extends string> {
  key: "icon_theme" | "layout_mode" | "tile_size";
  labelKey: string;
  options: readonly T[];
}

interface EditorBasicContext {
  hass?: HomeAssistant;
  config: NormalizedDheConnectCardConfig;
  devicePreviewLabel?: string;
  devicePreviewReady?: boolean;
  deviceChanged: (event: Event) => void;
  iconColorChanged: (tone: IconTone, event: Event) => void;
  nameChanged: (event: Event) => void;
  selectChanged: (key: "icon_theme" | "layout_mode" | "tile_size", value: string) => void;
  checkboxChanged: (key: BasicBooleanConfigKey, checked: boolean) => void;
}

const DHE_DEVICE_SELECTOR = {
  device: {
    filter: [{ integration: INTEGRATION_DOMAIN }],
    entity: [{ domain: "climate" }],
  },
};

const NAME_SELECTOR = {
  text: {},
};

const BOOLEAN_FIELDS: BooleanField[] = [
  { key: "show_diagnostics", labelKey: "editor.diagnostics" },
  { key: "show_weather_services", labelKey: "editor.weather_services" },
  { key: "show_icon_animations", labelKey: "editor.icon_animations" },
  { key: "show_display_buttons", labelKey: "editor.display_buttons" },
  { key: "show_support_mode", labelKey: "editor.support_mode" },
  { key: "show_dangerous_actions", labelKey: "editor.dangerous_actions" },
  { key: "show_unavailable", labelKey: "editor.unavailable" },
  { key: "show_optional", labelKey: "editor.optional_missing" },
];

const SELECT_FIELDS: Array<SelectField<IconTheme | LayoutMode | TileSize>> = [
  {
    key: "layout_mode",
    labelKey: "editor.layout_mode",
    options: LAYOUT_MODES,
  },
  {
    key: "tile_size",
    labelKey: "editor.tile_size",
    options: TILE_SIZES,
  },
  {
    key: "icon_theme",
    labelKey: "editor.icon_theme",
    options: ICON_THEMES,
  },
];

export function renderBasicEditor(context: EditorBasicContext) {
  return html`
    <section class="editor-section basic-editor">
      <h3>${localize(context.hass, "editor.basic_settings")}</h3>
      <div class="ha-form-list">
        <ha-selector
          class="ha-picker-control"
          .hass=${context.hass}
          .label=${localize(context.hass, "editor.device")}
          .helper=${localize(context.hass, "editor.device_help")}
          .selector=${DHE_DEVICE_SELECTOR}
          .value=${context.config.device_id ?? ""}
          .required=${true}
          @value-changed=${context.deviceChanged}
        ></ha-selector>
        ${devicePreview(context)}
        <ha-selector
          class="ha-picker-control"
          data-editor-field="name"
          .hass=${context.hass}
          .label=${localize(context.hass, "editor.name")}
          .helper=${localize(context.hass, "editor.name_help")}
          .selector=${NAME_SELECTOR}
          .value=${textInputValue(context.config.name)}
          @value-changed=${context.nameChanged}
          @change=${context.nameChanged}
        ></ha-selector>
      </div>

      ${editorFoldout(context.hass, {
        className: "advanced-editor",
        titleKey: "editor.advanced_options",
        helpKey: "editor.advanced_options_help",
        content: html`
          <div class="advanced-group advanced-selects">
            ${SELECT_FIELDS.map((field) => selectField(context, field))}
          </div>
          ${context.config.icon_theme === "custom"
            ? html`<div class="advanced-group">${customIconColors(context)}</div>`
            : ""}
          <div class="advanced-group checks">
            ${BOOLEAN_FIELDS.map((field) => checkbox(context, field))}
          </div>
        `,
      })}
    </section>
  `;
}

function devicePreview(context: EditorBasicContext) {
  const hasDevice = Boolean(context.config.device_id);
  const statusKey = hasDevice
    ? context.devicePreviewReady
      ? "editor.device_preview_ready"
      : "editor.device_preview_loading"
    : "editor.device_preview_empty";
  const label =
    context.devicePreviewLabel ||
    localize(
      context.hass,
      hasDevice ? "editor.device_preview_selected" : "status.select_device",
    );
  return editorFoldout(context.hass, {
    className: "device-preview-foldout",
    titleKey: "editor.device_preview",
    helpKey: "editor.device_preview_help",
    count: localize(context.hass, statusKey),
    content: html`
      <div class="device-preview">
        <ha-icon icon=${hasDevice ? "mdi:check-circle-outline" : "mdi:devices-off"}></ha-icon>
        <div>
          <strong>${label}</strong>
          <span>${localize(context.hass, statusKey)}</span>
        </div>
      </div>
    `,
  });
}

function selectField(
  context: EditorBasicContext,
  field: SelectField<IconTheme | LayoutMode | TileSize>,
) {
  const value = String(context.config[field.key]);
  const label = localize(context.hass, field.labelKey);
  return formRow(
    context.hass,
    field.labelKey,
    `${field.labelKey}_help`,
    html`
      <select
        data-option-key=${field.key}
        .value=${value}
        aria-label=${label}
        @change=${(event: Event) =>
          context.selectChanged(field.key, (event.target as HTMLSelectElement).value)}
      >
        ${field.options.map(
          (option) => html`
            <option value=${option} ?selected=${option === value}>
              ${localize(context.hass, `${field.labelKey}.${option}`)}
            </option>
          `,
        )}
      </select>
    `,
  );
}

function customIconColors(context: EditorBasicContext) {
  return html`
    <div class="icon-color-grid">
      ${ICON_TONES.map((tone) => customIconColorField(context, tone))}
    </div>
  `;
}

function customIconColorField(context: EditorBasicContext, tone: IconTone) {
  const color = context.config.icon_colors[tone] ?? "";
  return formRow(
    context.hass,
    `editor.icon_color.${tone}`,
    "editor.icon_color_help",
    html`
      <div class="icon-color-control" style=${color ? `--dhe-editor-icon-color: ${color};` : ""}>
        <span class="icon-color-swatch" aria-hidden="true"></span>
        <ha-textfield
          data-icon-color-tone=${tone}
          .value=${color}
          aria-label=${localize(context.hass, `editor.icon_color.${tone}`)}
          .placeholder=${customIconColorPlaceholder(tone)}
          .helper=${localize(context.hass, "editor.icon_color_help")}
          helperPersistent
          @change=${(event: Event) => context.iconColorChanged(tone, event)}
        ></ha-textfield>
      </div>
    `,
    "icon-color-row",
  );
}

function customIconColorPlaceholder(tone: IconTone): string {
  return `var(--dhe-${tone}-color)`;
}

function checkbox(context: EditorBasicContext, field: BooleanField) {
  const checked = Boolean(context.config[field.key]);
  return switchFormField(
    context.hass,
    field.labelKey,
    checked,
    (event) => context.checkboxChanged(field.key, checkedFromEvent(event)),
    { helpKey: `${field.labelKey}_help` },
  );
}
