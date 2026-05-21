import { css } from "lit";

export const componentStyles = css`
  .temperature {
    text-align: right;
  }

  .error-banner {
    margin: 0 0 12px;
    padding: 10px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--error-color) 12%, transparent);
    color: var(--error-color);
    font-size: 13px;
    line-height: 1.35;
  }

  .temperature strong {
    display: block;
    font-size: 28px;
    line-height: 1;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(var(--dhe-overview-columns, 3), minmax(0, 1fr));
    gap: 8px;
  }

  .metric {
    --dhe-metric-icon-bubble-size: var(
      --dhe-layout-icon-bubble-size,
      var(--dhe-ha-icon-bubble-size)
    );
    position: relative;
    display: grid;
    grid-template-columns: var(--dhe-metric-icon-bubble-size) minmax(0, 1fr) auto;
    gap: 2px 8px;
    align-items: center;
    box-sizing: border-box;
    min-width: 0;
    min-height: var(--dhe-overview-tile-height, var(--dhe-ha-tile-height));
    padding: 7px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .metric-label,
  .metric-value,
  .overview-trend {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-label {
    grid-row: 1;
    grid-column: 2;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.2;
  }

  .metric-value {
    grid-row: 2;
    grid-column: 2;
    color: var(--primary-text-color);
    font-size: 16px;
  }

  .metric .icon-bubble {
    grid-row: 1 / 3;
    flex-basis: var(--dhe-metric-icon-bubble-size);
    width: var(--dhe-metric-icon-bubble-size);
    height: var(--dhe-metric-icon-bubble-size);
    --mdc-icon-size: clamp(18px, calc(var(--dhe-metric-icon-bubble-size) * 0.56), 24px);
  }

  .overview-trend {
    position: absolute;
    top: 7px;
    right: 7px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    max-width: 72px;
    color: var(--secondary-text-color);
    font-size: 11px;
  }

  .overview-trend ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 14px;
  }

  .overview-trend.trend-up {
    color: var(--dhe-warning-color);
  }

  .overview-trend.trend-down {
    color: var(--dhe-info-color);
  }

  .overview-trend.trend-flat {
    color: var(--secondary-text-color);
  }

  @container (max-width: 520px) {
    .overview-trend {
      max-width: 18px;
    }

    .overview-trend .overview-delta {
      display: none;
    }
  }

  .overview-sparkline {
    position: absolute;
    right: 7px;
    bottom: 3px;
    left: calc(var(--dhe-metric-icon-bubble-size) + 15px);
    width: auto;
    height: 10px;
    color: var(--dhe-icon-color, var(--primary-color));
    opacity: 0.58;
    pointer-events: none;
  }

  .overview-sparkline polyline {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .metric.overview-condition-alert {
    border-color: color-mix(in srgb, var(--dhe-error-color) 46%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--dhe-error-color) 8%, var(--dhe-row-background));
  }

  .metric.overview-condition-warning {
    border-color: color-mix(in srgb, var(--dhe-warning-color) 42%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--dhe-warning-color) 8%, var(--dhe-row-background));
  }

  .metric.overview-condition-active,
  .metric.overview-condition-ok {
    border-color: color-mix(in srgb, var(--dhe-success-color) 26%, var(--dhe-row-border));
  }

  .metric.overview-group-water {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .metric.overview-group-temperature {
    --dhe-icon-color: var(--dhe-hot-color);
  }

  .metric.overview-group-energy {
    --dhe-icon-color: var(--dhe-energy-color);
  }

  .metric.overview-group-status {
    --dhe-icon-color: var(--dhe-status-color);
  }

  .metric.overview-group-bath {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .metric.overview-group-timer {
    --dhe-icon-color: var(--dhe-timer-color);
  }

  .metric.overview-group-saving,
  .metric.overview-group-control {
    --dhe-icon-color: var(--dhe-eco-color);
  }

  .rows {
    display: grid;
    gap: 6px;
  }

  .entity-row,
  .media-row,
  .memory-row {
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-height);
    padding: 4px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .entity-row:hover,
  .entity-row:focus-within,
  .media-row:hover,
  .media-row:focus-within,
  .memory-row:hover,
  .memory-row:focus-within,
  .display-button-tile:hover,
  .display-button-tile:focus-within,
  .metric:hover,
  .metric:focus-visible {
    border-color: color-mix(in srgb, var(--primary-color) 40%, var(--dhe-row-border));
    background: var(--dhe-row-hover);
    box-shadow:
      var(--dhe-row-shadow),
      0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .subsection,
  .radio-favorites {
    margin-top: 12px;
  }

  .favorite-list {
    display: grid;
    gap: 6px;
  }

  .favorite-item {
    min-width: 0;
  }

  .favorite-item > .favorite-row {
    width: 100%;
  }

  .main {
    display: grid;
    flex: 1;
    min-width: 0;
    gap: 2px;
  }

  .main strong,
  .main span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main strong {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
  }

  .main span {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.25;
  }

  button,
  select,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: 0;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--secondary-background-color) 86%, transparent);
  }

  button:disabled,
  input:disabled,
  select:disabled {
    cursor: default;
    opacity: 0.62;
  }

  .display-button-tile.busy,
  .entity-row.busy,
  .media-row.busy,
  .memory-row.busy,
  .climate-control.busy,
  .inline-control.busy,
  .service-box.busy {
    border-color: color-mix(in srgb, var(--primary-color) 36%, var(--dhe-row-border));
  }

  .entity-action {
    min-width: 0;
    border: 0;
    color: inherit;
    background: transparent;
    text-align: left;
    transition:
      background 160ms ease,
      color 160ms ease;
  }

  .metric.entity-action {
    border: 1px solid var(--dhe-row-border);
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .metric.entity-action:not(:disabled):hover,
  .metric.entity-action:not(:disabled):focus-visible {
    border-color: color-mix(in srgb, var(--primary-color) 40%, var(--dhe-row-border));
    background: var(--dhe-row-hover);
    box-shadow:
      var(--dhe-row-shadow),
      0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .entity-action:not(:disabled):hover .icon-bubble,
  .entity-action:not(:disabled):focus-visible .icon-bubble {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--dhe-icon-color) 42%, transparent),
      0 6px 16px color-mix(in srgb, var(--dhe-icon-color) 20%, transparent);
  }

  .title-block.entity-action,
  .temperature.entity-action,
  .entity-main,
  .media-main {
    padding: 0;
  }

  .title-block.entity-action {
    flex: 1 1 auto;
  }

  .temperature.entity-action {
    flex: 0 0 auto;
  }

  .entity-main,
  .media-main {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-inner-height);
    padding: 0 6px;
    border-radius: 8px;
  }

  .row-control {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
  }

  .row-control select {
    width: min(154px, 100%);
    max-width: 154px;
  }

  button.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border-radius: 999px;
  }

  button.chip {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }

  button.active,
  button.chip:hover,
  button.icon:hover,
  .favorite-row.active,
  .favorite-row:hover {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    color: var(--primary-color);
  }

  button.danger {
    color: var(--error-color);
  }

  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--dhe-focus-ring-color);
    outline-offset: 2px;
  }

  input,
  select {
    min-height: 36px;
    box-sizing: border-box;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  input[type="number"] {
    width: 76px;
    padding: 6px 8px;
    text-align: center;
  }

  input[type="text"],
  select {
    width: 100%;
    min-width: 0;
    padding: 6px 8px;
  }

  .entity-row input[type="text"],
  .entity-row select {
    width: min(190px, 34vw);
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--primary-color);
  }

  .climate-control {
    flex-wrap: wrap;
    margin-bottom: 8px;
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-height);
    padding: 8px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .temperature-control {
    display: grid;
    flex: 1 1 180px;
    min-width: 0;
    gap: 4px;
  }

  .inline-control,
  .service-box {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(120px, 1fr);
    gap: 8px;
    margin-top: 8px;
  }

  .service-box {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    padding: 8px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .support-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .support-actions button.chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: 8px;
  }

  .support-panel {
    min-width: 0;
    padding: 10px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .support-panel h4 {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .support-score {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .support-score strong {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dhe-support-color) 16%, transparent);
    color: var(--dhe-support-color);
    font-size: 18px;
  }

  .support-score.pass {
    --dhe-support-color: var(--dhe-success-color);
  }

  .support-score.warn {
    --dhe-support-color: var(--dhe-warning-color);
  }

  .support-score.fail {
    --dhe-support-color: var(--dhe-error-color);
  }

  .support-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: 8px;
    margin: 0;
  }

  .support-stats div {
    min-width: 0;
  }

  .support-stats dt,
  .support-check span,
  .support-entity-row span,
  .support-domain-list span {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .support-stats dd {
    margin: 2px 0 0;
    overflow: hidden;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support-checks,
  .support-entity-list,
  .support-domain-list {
    display: grid;
    gap: 6px;
  }

  .support-entity-list {
    max-height: 340px;
    overflow: auto;
    padding-right: 2px;
  }

  .support-domain-list {
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    margin-top: 10px;
  }

  .support-check,
  .support-entity-row {
    display: grid;
    align-items: center;
    gap: 6px;
    min-width: 0;
    min-height: 32px;
    padding: 4px 6px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--dhe-card-background) 72%, transparent);
  }

  .support-check:focus-within,
  .support-entity-row:focus-within {
    outline: 2px solid var(--dhe-focus-ring-color);
    outline-offset: 1px;
  }

  .support-check {
    grid-template-columns: 22px minmax(0, 1fr) auto auto;
  }

  .support-entity-row {
    grid-template-columns: minmax(0, 1fr) auto auto auto;
    border-left: 3px solid transparent;
  }

  .support-check ha-icon {
    --mdc-icon-size: 20px;
    color: var(--dhe-support-color);
  }

  .support-check.pass {
    --dhe-support-color: var(--dhe-success-color);
  }

  .support-check.warn {
    --dhe-support-color: var(--dhe-warning-color);
  }

  .support-check.fail {
    --dhe-support-color: var(--dhe-error-color);
  }

  .support-entity-row.available {
    border-left-color: var(--dhe-success-color);
  }

  .support-entity-row.unavailable,
  .support-entity-row.unknown {
    border-left-color: var(--dhe-warning-color);
  }

  .support-entity-row.missing {
    border-left-color: var(--dhe-error-color);
  }

  .support-check span,
  .support-entity-row span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support-check strong,
  .support-check small,
  .support-entity-row strong,
  .support-entity-row small {
    font-size: 12px;
    white-space: nowrap;
  }

  .display-button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    gap: 8px;
  }

  .display-button-tile {
    display: grid;
    grid-template-rows: 1fr auto;
    box-sizing: border-box;
    min-width: 0;
    min-height: max(96px, calc(var(--dhe-overview-tile-height, 56px) * 1.75));
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .display-button-tile.active {
    border-color: color-mix(in srgb, var(--primary-color) 46%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--primary-color) 10%, var(--dhe-row-background));
  }

  .display-button-main {
    display: grid;
    align-content: start;
    justify-items: start;
    min-width: 0;
    padding: 8px;
    gap: 6px;
    border-radius: 8px;
    background: transparent;
    text-align: left;
  }

  .display-button-main span,
  .display-button-main strong {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .display-button-main span {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .display-button-main strong {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
  }

  .display-button-control {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    padding: 0 8px 8px;
  }

  .display-button-control > * {
    flex: 1 1 auto;
    min-width: 0;
  }

  .display-button-control button.icon {
    flex: 0 0 36px;
  }

  .display-button-control button.chip {
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }

  .favorite-row {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    min-width: 0;
    min-height: var(--dhe-ha-row-height);
    padding: 4px 8px 4px 5px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    text-align: left;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .favorite-row.active {
    border-color: color-mix(in srgb, var(--primary-color) 46%, var(--dhe-row-border));
  }

  .favorite-row span {
    min-width: 0;
    overflow: hidden;
    color: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .favorite-row small {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .favorite-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
    --state-icon-color: var(--primary-color);
    --paper-item-icon-color: var(--primary-color);
    --mdc-icon-size: 18px;
  }

  .memory-fields {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) 92px;
    flex: 1;
    min-width: 0;
    gap: 8px;
  }

  @container (min-width: 560px) {
    .dhe-card {
      padding: 18px;
    }

    .content-grid {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      align-items: start;
      column-gap: var(--dhe-layout-column-gap, 16px);
    }

    .content-grid > .card-section {
      grid-column: span 6;
    }

    .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }

    .content-grid > [data-section="controls"],
    .content-grid > [data-section="memory"] {
      grid-column: span 7;
    }

    .content-grid > [data-section="bath"],
    .content-grid > [data-section="timers"],
    .content-grid > [data-section="consumption"],
    .content-grid > [data-section="saving"],
    .content-grid > [data-section="weather"],
    .content-grid > [data-section="radio"],
    .content-grid > [data-section="support"],
    .content-grid > [data-section="actions"] {
      grid-column: span 5;
    }

    .rows.memory {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .favorite-list {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .display-button-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    }

    .service-box {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .layout-panel .content-grid > [data-section] {
      grid-column: 1 / -1;
    }

    .layout-tablet .content-grid > [data-section],
    .layout-kiosk .content-grid > [data-section] {
      grid-column: span 6;
    }

    .layout-tablet .content-grid > [data-section="overview"],
    .layout-tablet .content-grid > [data-section="diagnostics"],
    .layout-tablet .content-grid > [data-section="support"] {
      grid-column: 1 / -1;
    }

    .layout-kiosk .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }
  }

  @container (min-width: 1060px) {
    .layout-auto .content-grid,
    .layout-kiosk .content-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: 18px;
    }

    .layout-auto .content-grid > [data-section],
    .layout-kiosk .content-grid > [data-section] {
      grid-column: span 1;
    }

    .layout-auto .content-grid > [data-section="overview"],
    .layout-kiosk .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }

    .layout-auto .content-grid > [data-section="controls"],
    .layout-auto .content-grid > [data-section="memory"] {
      grid-column: span 2;
    }

    .layout-panel .content-grid > [data-section] {
      grid-column: 1 / -1;
    }
  }

  @container (max-width: 360px) {
    .metric-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .entity-row,
    .media-row,
    .memory-row {
      gap: 8px;
    }

    .entity-main,
    .media-main {
      gap: 8px;
      padding: 0 2px;
    }

    input[type="number"] {
      width: 68px;
    }

    .entity-row input[type="text"],
    .entity-row select {
      width: min(112px, 100%);
    }

    .row-control select {
      width: 112px;
      max-width: 112px;
    }
  }

  @media (max-width: 520px) {
    .dhe-card {
      padding: 12px;
    }

    header {
      align-items: flex-start;
    }

    .temperature strong {
      font-size: 22px;
    }

    .entity-row,
    .media-row,
    .memory-row {
      gap: 8px;
    }

    .media-row {
      flex-wrap: wrap;
    }

    .memory-fields,
    .inline-control {
      grid-template-columns: 1fr;
    }
  }
`;
