import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { localize } from "./i18n";
import type { HomeAssistant, Renderable } from "./types";
import type {
  SupportCheck,
  SupportCheckLevel,
  SupportEntityAudit,
  SupportModel,
} from "./support";

interface SupportRenderContext {
  hass: HomeAssistant;
  model: SupportModel;
  exportSupportPackage: () => void;
}

const CHECK_LABEL_KEYS: Record<SupportCheck["key"], string> = {
  active_entities: "support.check.active_entities",
  base_entity: "support.check.base_entity",
  custom_element: "support.check.custom_element",
  device: "support.check.device",
  device_registry: "support.check.device_registry",
  disabled_entities: "support.check.disabled_entities",
  entity_registry: "support.check.entity_registry",
  required_entities: "support.check.required_entities",
  support_export: "support.check.support_export",
  unavailable_entities: "support.check.unavailable_entities",
};

const STATUS_LABEL_KEYS: Record<SupportCheckLevel, string> = {
  fail: "support.status.fail",
  pass: "support.status.pass",
  warn: "support.status.warn",
};

export function renderSupportSection(context: SupportRenderContext): Renderable {
  const exportLabel = localize(context.hass, "support.export");
  return html`
    <section
      class="card-section support-section"
      data-section="support"
      role="region"
      aria-labelledby="dhe-support-heading"
    >
      <h3 id="dhe-support-heading">${localize(context.hass, "section.support")}</h3>
      <div class="support-actions">
        <button
          class="chip"
          type="button"
          aria-label=${exportLabel}
          aria-describedby="dhe-support-export-hint"
          @click=${context.exportSupportPackage}
        >
          <ha-icon icon="mdi:package-down"></ha-icon>
          ${exportLabel}
        </button>
        <span id="dhe-support-export-hint">${localize(context.hass, "support.export_hint")}</span>
      </div>
      <div class="support-grid">
        ${summaryPanel(context)}
        ${diagnosticsPanel(context)}
        ${compatibilityPanel(context)}
        ${auditPanel(context)}
      </div>
    </section>
  `;
}

function summaryPanel(context: SupportRenderContext): Renderable {
  const summary = context.model.summary;
  const failing = context.model.checks.filter((check) => check.level === "fail").length;
  const warnings = context.model.checks.filter((check) => check.level === "warn").length;
  return panel(
    context,
    "support.self_test",
    "dhe-support-self-test-title",
    "mdi:clipboard-pulse-outline",
    html`
      <div
        class="support-score ${failing ? "fail" : warnings ? "warn" : "pass"}"
        role="status"
        aria-live="polite"
      >
        <strong>${failing ? failing : warnings ? warnings : summary.availableEntities}</strong>
        <span>
          ${failing
            ? localize(context.hass, "support.self_test_failed")
            : warnings
              ? localize(context.hass, "support.self_test_warn")
              : localize(context.hass, "support.self_test_pass")}
        </span>
      </div>
      <dl class="support-stats">
        ${stat(context, "support.stat.mapped", summary.mappedEntities)}
        ${stat(context, "support.stat.available", summary.availableEntities)}
        ${stat(context, "support.stat.unavailable", summary.unavailableEntities)}
        ${stat(context, "support.stat.missing_required", summary.missingRequiredEntities)}
      </dl>
    `,
  );
}

function diagnosticsPanel(context: SupportRenderContext): Renderable {
  const diagnostics = context.model.diagnostics;
  return panel(
    context,
    "support.integration_diagnostics",
    "dhe-support-diagnostics-title",
    "mdi:stethoscope",
    html`
      <dl class="support-stats">
        ${stat(context, "support.stat.device", diagnostics.deviceIdHash ?? "-")}
        ${stat(context, "support.stat.config_entry", diagnostics.configEntryIdHash ?? "-")}
        ${stat(context, "support.stat.base_entity", diagnostics.baseEntityHash ?? "-")}
        ${stat(
          context,
          "support.stat.registry",
          localize(
            context.hass,
            diagnostics.entityRegistryAvailable ? "support.value.yes" : "support.value.no",
          ),
        )}
      </dl>
      ${Object.keys(diagnostics.domains).length
        ? html`
            <div
              class="support-domain-list"
              role="list"
              aria-label=${localize(context.hass, "support.domain_distribution")}
            >
              ${repeat(
                Object.entries(diagnostics.domains),
                ([domain]) => domain,
                ([domain, count]) =>
                  html`<span role="listitem">${domain}: ${count}</span>`,
              )}
            </div>
          `
        : nothing}
    `,
  );
}

function compatibilityPanel(context: SupportRenderContext): Renderable {
  return panel(
    context,
    "support.compatibility",
    "dhe-support-compatibility-title",
    "mdi:check-decagram-outline",
    html`
      <div
        class="support-checks"
        role="list"
        aria-label=${localize(context.hass, "support.compatibility_list")}
      >
        ${repeat(
          context.model.checks,
          (check) => check.key,
          (check) => checkRow(context, check),
        )}
      </div>
    `,
  );
}

function auditPanel(context: SupportRenderContext): Renderable {
  return panel(
    context,
    "support.entity_audit",
    "dhe-support-entity-audit-title",
    "mdi:format-list-checks",
    html`
      <div
        class="support-entity-list"
        role="list"
        aria-label=${localize(context.hass, "support.entity_audit_list")}
      >
        ${repeat(
          context.model.entities,
          (entity) => entity.key,
          (entity) => entityAuditRow(context, entity),
        )}
      </div>
    `,
  );
}

function panel(
  context: SupportRenderContext,
  titleKey: string,
  titleId: string,
  icon: string,
  content: Renderable,
): Renderable {
  return html`
    <article class="support-panel" role="group" aria-labelledby=${titleId}>
      <h4 id=${titleId}>
        <ha-icon icon=${icon}></ha-icon>
        ${localize(context.hass, titleKey)}
      </h4>
      ${content}
    </article>
  `;
}

function checkRow(context: SupportRenderContext, check: SupportCheck): Renderable {
  return html`
    <div class="support-check ${check.level}" role="listitem">
      <ha-icon icon=${checkIcon(check.level)}></ha-icon>
      <span>${localize(context.hass, CHECK_LABEL_KEYS[check.key])}</span>
      <strong>${localize(context.hass, STATUS_LABEL_KEYS[check.level])}</strong>
      ${check.value !== undefined ? html`<small>${check.value}</small>` : nothing}
    </div>
  `;
}

function entityAuditRow(context: SupportRenderContext, entity: SupportEntityAudit): Renderable {
  const status = localize(context.hass, `support.entity_status.${entity.status}`);
  const registryStatus = localize(
    context.hass,
    `support.registry_status.${entity.registryStatus}`,
  );
  return html`
    <div
      class="support-entity-row ${entity.status}"
      role="listitem"
      title=${entity.key}
      aria-label=${`${entity.key}: ${status}, ${registryStatus}`}
    >
      <span>${entity.key}</span>
      <small>${entity.domain}</small>
      <strong>${status}</strong>
      <small>${registryStatus}</small>
    </div>
  `;
}

function stat(
  context: SupportRenderContext,
  labelKey: string,
  value: number | string,
): Renderable {
  return html`
    <div>
      <dt>${localize(context.hass, labelKey)}</dt>
      <dd>${value}</dd>
    </div>
  `;
}

function checkIcon(level: SupportCheckLevel): string {
  switch (level) {
    case "pass":
      return "mdi:check-circle-outline";
    case "warn":
      return "mdi:alert-circle-outline";
    case "fail":
      return "mdi:close-circle-outline";
  }
}
