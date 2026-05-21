import type { TemplateResult } from "lit";

export const INTEGRATION_DOMAIN = "stiebel_dhe_connect";

export type EntityDomain =
  | "binary_sensor"
  | "button"
  | "climate"
  | "media_player"
  | "number"
  | "select"
  | "sensor"
  | "switch"
  | "text"
  | "weather";

export type SectionId =
  | "overview"
  | "controls"
  | "bath"
  | "timers"
  | "memory"
  | "consumption"
  | "saving"
  | "weather"
  | "radio"
  | "diagnostics"
  | "support"
  | "actions";

export type EntityKey = string;
export type IconTheme = "state" | "ha" | "muted" | "vivid" | "custom";
export type IconTone =
  | "action"
  | "alert"
  | "eco"
  | "energy"
  | "hot"
  | "memory"
  | "ok"
  | "radio"
  | "safety"
  | "status"
  | "timer"
  | "water"
  | "wellness"
  | "weather";
export type IconColorOverrides = Partial<Record<IconTone, string>>;
export type LayoutMode = "auto" | "mini" | "tablet" | "panel" | "kiosk";
export type TileSize = "auto" | "compact" | "normal" | "large";

export interface HassEntity {
  entity_id?: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassRegistryEntity {
  area_id?: string | null;
  config_entry_id?: string | null;
  device_id?: string | null;
  disabled_by?: string | null;
  display_precision?: number | null;
  entity_category?: string | null;
  hidden?: boolean | null;
  hidden_by?: string | null;
  icon?: string | null;
  name?: string | null;
  original_name?: string | null;
  platform?: string | null;
  translation_key?: string | null;
  unique_id?: string | null;
}

interface HassDevice {
  area_id?: string | null;
  disabled_by?: string | null;
  id?: string;
  manufacturer?: string | null;
  model?: string | null;
  name?: string | null;
  name_by_user?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassRegistryEntity>;
  devices?: Record<string, HassDevice>;
  locale?: {
    language?: string;
  };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
  formatEntityState?: (stateObj: HassEntity) => string;
  formatEntityName?: (
    stateObj: HassEntity,
    components?: Array<{ type: string }>,
    options?: { separator?: string },
  ) => string;
  localize?: (key: string, ...args: unknown[]) => string;
}

export interface DheConnectCardConfig {
  type?: string;
  /**
   * @deprecated Legacy card-level anchor kept only for automatic migration to
   * device_id. New configs should use device_id and per-key entity overrides.
   */
  entity?: string;
  /**
   * @deprecated Legacy density switch. New configs should use tile_size.
   */
  compact?: boolean;
  device_id?: string;
  name?: unknown;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  show_unavailable?: boolean;
  show_optional?: boolean;
  show_diagnostics?: boolean;
  show_dangerous_actions?: boolean;
  show_weather_services?: boolean;
  show_icon_animations?: boolean;
  show_display_buttons?: boolean;
  show_support_mode?: boolean;
  icon_theme?: IconTheme;
  icon_colors?: IconColorOverrides;
  layout_mode?: LayoutMode;
  tile_size?: TileSize;
  overview_columns?: number;
  sections?: SectionId[];
  overview_entities?: EntityKey[];
  hide_entities?: EntityKey[];
  entities?: Record<string, string | Record<string, string> | undefined>;
}

export interface ActionConfig {
  action?: string;
  entity?: string;
  [key: string]: unknown;
}

export interface NormalizedDheConnectCardConfig
  extends Required<
    Pick<
      DheConnectCardConfig,
      | "show_unavailable"
      | "show_optional"
      | "show_diagnostics"
      | "show_dangerous_actions"
      | "show_weather_services"
      | "show_icon_animations"
      | "show_display_buttons"
      | "show_support_mode"
      | "icon_theme"
      | "icon_colors"
      | "layout_mode"
      | "tile_size"
      | "overview_columns"
    >
  > {
  type: string;
  device_id?: string;
  name?: unknown;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_colors: IconColorOverrides;
  sections: SectionId[];
  overview_entities: EntityKey[];
  hide_entities: EntityKey[];
  entities: Record<string, string | Record<string, string> | undefined>;
}

export interface EntityDefinition {
  key: EntityKey;
  domain: EntityDomain;
  section: SectionId;
  label: string;
  icon: string;
  aliases?: string[];
  optional?: boolean;
  diagnostic?: boolean;
  dangerous?: boolean;
  order: number;
}

export interface DiscoveredEntities {
  baseEntity?: string;
  configEntryId?: string;
  deviceId?: string;
  entityIds: Record<EntityKey, string>;
  definitions: EntityDefinition[];
}

export type Renderable =
  | TemplateResult
  | typeof import("lit").nothing
  | string
  | number
  | null
  | undefined;
