import { DheConnectCard as DheConnectCardElement } from "../../src/dhe-connect-card";
import type { HassRegistryEntity, HomeAssistant } from "../../src/types";
import { INTEGRATION_DOMAIN } from "../../src/types";

export { DheConnectCardElement as DheConnectCard };

export async function renderCard(
  hass: HomeAssistant,
  config: Parameters<DheConnectCardElement["setConfig"]>[0],
): Promise<DheConnectCardElement> {
  const card = document.createElement("dhe-connect-card") as DheConnectCardElement;
  card.hass = hass;
  card.setConfig({ type: "custom:dhe-connect-card", ...config });
  document.body.append(card);
  await card.updateComplete;
  return card;
}

export function entity(state: string, attributes: Record<string, unknown> = {}) {
  return { state, attributes };
}

export function registry(deviceId: string, translationKey: string): HassRegistryEntity {
  return {
    config_entry_id: "entry-a",
    device_id: deviceId,
    platform: INTEGRATION_DOMAIN,
    translation_key: translationKey,
    unique_id: INTEGRATION_DOMAIN + "_entry_" + translationKey,
  };
}

export function text(card: DheConnectCardElement): string {
  return card.shadowRoot?.textContent ?? "";
}

export function visibleText(card: DheConnectCardElement): string {
  const root = card.shadowRoot;
  if (!root) {
    return "";
  }

  const formValues = [...root.querySelectorAll("input, select")]
    .map((element) => {
      if (element instanceof HTMLSelectElement) {
        return element.selectedOptions.item(0)?.textContent ?? "";
      }
      return element instanceof HTMLInputElement ? element.value : "";
    })
    .join(" ");
  const labels = [...root.querySelectorAll("[aria-label], [title]")]
    .map(
      (element) =>
        `${element.getAttribute("aria-label") ?? ""} ${element.getAttribute("title") ?? ""}`,
    )
    .join(" ");

  return `${root.textContent ?? ""} ${formValues} ${labels}`.replace(/\s+/g, " ");
}
