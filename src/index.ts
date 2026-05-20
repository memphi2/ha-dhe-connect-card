import "./editor";
import "./dhe-connect-card";
import {
  registerDheConnectTranslation,
  registerDheConnectTranslations,
} from "./i18n";

declare global {
  interface Window {
    customCards?: Array<Record<string, string | boolean>>;
    dheConnectCardTranslations?: Record<string, unknown>;
    registerDheConnectCardTranslation?: typeof registerDheConnectTranslation;
    registerDheConnectCardTranslations?: typeof registerDheConnectTranslations;
  }
}

window.registerDheConnectCardTranslation = registerDheConnectTranslation;
window.registerDheConnectCardTranslations = registerDheConnectTranslations;
if (window.dheConnectCardTranslations) {
  registerDheConnectTranslations(window.dheConnectCardTranslations);
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "Mushroom-style card for the Stiebel DHE Connect integration",
  preview: true,
});
