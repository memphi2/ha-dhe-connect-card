import { isUnavailable, normalizeDisplayText } from "./format";
import { localize } from "./i18n";
import type { HassEntity, HomeAssistant } from "./types";

interface HeaderStatusInput {
  connection?: HassEntity;
  device?: HassEntity;
  error?: HassEntity;
  hasBaseEntity: boolean;
}

export function headerStatusText(
  hass: HomeAssistant | undefined,
  input: HeaderStatusInput,
): string {
  const connection = statusStateText(hass, input.connection);
  if (connection) {
    return localize(hass, "status.connection", { state: connection });
  }

  const device = statusStateText(hass, input.device);
  if (device) {
    return localize(hass, "status.device", { state: device });
  }

  const error = statusStateText(hass, input.error);
  if (error) {
    return localize(hass, "status.status", { state: error });
  }

  return input.hasBaseEntity
    ? localize(hass, "status.discovered")
    : localize(hass, "status.select_device");
}

function statusStateText(
  hass: HomeAssistant | undefined,
  state: HassEntity | undefined,
): string | undefined {
  if (!state || isUnavailable(state)) {
    return undefined;
  }
  return normalizeDisplayText(state.state) || localize(hass, "state.unknown");
}
