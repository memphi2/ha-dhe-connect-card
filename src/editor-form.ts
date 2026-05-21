import { html, type TemplateResult } from "lit";
import { localize } from "./i18n";
import type { HomeAssistant, Renderable } from "./types";

interface FoldoutOptions {
  className?: string;
  count?: string | number;
  helpKey?: string;
  open?: boolean;
  titleKey: string;
  content: Renderable;
}

export function editorFoldout(hass: HomeAssistant | undefined, options: FoldoutOptions) {
  const classes = ["editor-foldout", options.className].filter(Boolean).join(" ");
  return html`
    <details class=${classes} ?open=${Boolean(options.open)}>
      <summary>
        <span class="summary-label">
          <span>${localize(hass, options.titleKey)}</span>
          ${options.helpKey ? helpIcon(hass, options.helpKey) : ""}
        </span>
        ${options.count !== undefined
          ? html`<small>${options.count}</small>`
          : options.helpKey
            ? html`<small>${localize(hass, options.helpKey)}</small>`
            : ""}
      </summary>
      <div class="editor-foldout-content">${options.content}</div>
    </details>
  `;
}

export function formRow(
  hass: HomeAssistant | undefined,
  labelKey: string,
  helpKey: string | undefined,
  control: Renderable,
  className = "",
) {
  return html`
    <div class=${["ha-form-row", className].filter(Boolean).join(" ")}>
      ${fieldLabel(hass, labelKey, helpKey)}
      ${control}
    </div>
  `;
}

export function textareaRow(
  hass: HomeAssistant | undefined,
  labelKey: string,
  helpKey: string | undefined,
  control: Renderable,
) {
  return html`
    <div class="action-textarea-row">
      ${fieldLabel(hass, labelKey, helpKey)}
      ${control}
    </div>
  `;
}

export function switchFormField(
  hass: HomeAssistant | undefined,
  labelKeyOrText: string,
  checked: boolean,
  onChange: (event: Event) => void,
  options: {
    helpKey?: string;
    isLocalizedText?: boolean;
  } = {},
) {
  const label = options.isLocalizedText ? labelKeyOrText : localize(hass, labelKeyOrText);
  const help = options.helpKey ? localize(hass, options.helpKey) : undefined;
  const change = (event: Event): void => {
    event.stopPropagation();
    onChange(event);
  };
  return html`
    <ha-formfield
      class="switch-formfield"
      .label=${label}
      title=${help ?? label}
      aria-label=${help ?? label}
    >
      <ha-switch
        .checked=${checked}
        aria-label=${help ?? label}
        @click=${stopPropagation}
        @change=${change}
      ></ha-switch>
      <span slot="label" class="switch-formfield-label">${label}</span>
      ${help ? helpIconText(help, "label") : ""}
    </ha-formfield>
  `;
}

function fieldLabel(
  hass: HomeAssistant | undefined,
  labelKey: string,
  helpKey?: string,
): TemplateResult {
  return html`
    <span class="field-label">
      <span>${localize(hass, labelKey)}</span>
      ${helpKey ? helpIcon(hass, helpKey) : ""}
    </span>
  `;
}

function helpIcon(hass: HomeAssistant | undefined, helpKey: string): TemplateResult {
  return helpIconText(localize(hass, helpKey));
}

function helpIconText(help: string, slot?: string): TemplateResult {
  const icon = html`<ha-icon icon="mdi:help-circle-outline" aria-hidden="true"></ha-icon>`;
  if (slot) {
    return html`
      <button
        class="help-icon"
        type="button"
        slot=${slot}
        title=${help}
        aria-label=${help}
        @click=${stopInteraction}
        @pointerdown=${stopInteraction}
        @keydown=${stopInteraction}
      >
        ${icon}
      </button>
    `;
  }
  return html`
    <button
      class="help-icon"
      type="button"
      title=${help}
      aria-label=${help}
      @click=${stopInteraction}
      @pointerdown=${stopInteraction}
      @keydown=${stopInteraction}
    >
      ${icon}
    </button>
  `;
}

function stopPropagation(event: Event): void {
  event.stopPropagation();
}

function stopInteraction(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}
