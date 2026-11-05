#!/usr/bin/env node
/* global window, document, customElements, URL, AbortSignal */
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdtemp, readdir, rm } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import puppeteer from "puppeteer-core";

const exec = promisify(execFile);
const baselines = JSON.parse(await readFile("test/fixtures/ha-frontends.json", "utf8"));
const selected = process.argv[2] ? [process.argv[2]] : Object.keys(baselines);
for (const key of selected) {
  assert(baselines[key], `Unknown frontend baseline: ${key}`);
  await runBaseline(key, baselines[key]);
}

async function runBaseline(key, baseline) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), "dhe-components-"));
  let browser;
  let server;
  try {
    const wheel = process.env.HA_FRONTEND_WHEEL_DIR
      ? await readFile(path.join(process.env.HA_FRONTEND_WHEEL_DIR, `${baseline.version}.whl`))
      : await download(baseline.url);
    assert.equal(createHash("sha256").update(wheel).digest("hex"), baseline.sha256,
      "Frontend archive checksum mismatch");
    const archive = path.join(temporary, "frontend.whl");
    await writeFile(archive, wheel);
    await exec("unzip", ["-q", archive, "hass_frontend/frontend_latest/*.js",
      "hass_frontend/static/translations/*.json", "-d", temporary]);
    const root = path.join(temporary, "hass_frontend");
    const app = (await readdir(path.join(root, "frontend_latest")))
      .find((file) => /^app\.[a-f0-9]+\.js$/.test(file));
    assert(app, "Frontend app entrypoint missing");
    const bundle = await readFile("dist/ha-dhe-connect-card.js");
    server = http.createServer(async (request, response) => {
      try {
        const pathname = new URL(request.url, "http://localhost").pathname;
        if (pathname === "/") {
          response.setHeader("Content-Type", "text/html");
          response.end(`<!doctype html><meta charset="utf-8"><body>
            <script>window.hassConnection=new Promise(()=>{});window.latestJS=true;</script>
            <script type="module" src="/frontend_latest/${app}"></script></body>`);
          return;
        }
        response.setHeader("Content-Type", pathname.endsWith(".json")
          ? "application/json" : "text/javascript");
        if (pathname === "/card.js") { response.end(bundle); return; }
        const file = path.resolve(root, `.${decodeURIComponent(pathname)}`);
        if (!file.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
        response.end(await readFile(file));
      } catch {
        response.writeHead(404).end();
      }
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.stack));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(async () => {
      await customElements.whenDefined("partial-panel-resolver");
      // Use the pinned frontend's own route loader, without mounting an app or backend.
      const router = document.createElement("partial-panel-resolver");
      await router._getRoutes({ lovelace: { component_name: "lovelace", url_path: "lovelace" } })
        .routes.lovelace.load();
      const helpers = await window.loadCardHelpers();
      helpers.createCardElement({ type: "entities", entities: [] });
      await customElements.whenDefined("hui-entities-card");
      await customElements.get("hui-entities-card").getConfigElement();
      await import("/card.js");
      const states = {
        "climate.fixture": { entity_id: "climate.fixture", state: "heat", attributes: { friendly_name: "Heater" } },
        "climate.fixture_other": { entity_id: "climate.fixture_other", state: "heat", attributes: { friendly_name: "Other heater" } },
        "climate.second_device": { entity_id: "climate.second_device", state: "heat", attributes: { friendly_name: "Second heater" } },
        "sensor.fixture_power": { entity_id: "sensor.fixture_power", state: "12", attributes: { friendly_name: "Power" } },
        "sensor.fixture_other": { entity_id: "sensor.fixture_other", state: "14", attributes: { friendly_name: "Other power" } },
      };
      const entities = Object.fromEntries(Object.keys(states).map((entity_id) => [entity_id, {
        entity_id, device_id: entity_id === "climate.second_device" ? "second-device" : "fixture-device", config_entry_id: "fixture-entry",
        name: states[entity_id].attributes.friendly_name,
        original_name: states[entity_id].attributes.friendly_name, has_entity_name: true,
        platform: "stiebel_dhe_connect", labels: [],
        translation_key: entity_id.startsWith("climate.") ? "water_heating" : "power",
      }]));
      const devices = {
        "fixture-device": { id: "fixture-device", name: "Fixture heater", labels: [], config_entries: ["fixture-entry"] },
        "second-device": { id: "second-device", name: "Second fixture", labels: [], config_entries: ["fixture-entry"] },
      };
      const hass = {
        states, entities, devices, areas: {}, floors: {}, labels: {}, services: {},
        language: "en", locale: { language: "en", number_format: "language", time_format: "24" },
        translationMetadata: { translations: { en: { name: "English", nativeName: "English" } } },
        config: { components: [], unit_system: { temperature: "°C" } },
        themes: { themes: {}, darkMode: false }, selectedTheme: {},
        localize: (key) => key.split(".").at(-1),
        formatEntityState: (state) => state.state,
        formatEntityName: (state) => state.attributes.friendly_name,
        loadBackendTranslation: async () => undefined,
        loadFragmentTranslation: async () => undefined,
        callWS: async ({ type }) => type === "config_entries/get"
          ? [{ entry_id: "fixture-entry", domain: "stiebel_dhe_connect", title: "Fixture" }] : [],
        callService: async () => undefined,
        connection: { subscribeMessage: async () => () => undefined },
      };
      // Only data is synthetic. All UI components and their event handling are HA originals.
      document.addEventListener("context-request", (event) => {
        const contexts = {
          hassRegistries: hass, hassInternationalization: hass, hassApi: hass,
          hassConfig: hass, hassUi: hass, hassFormatters: hass, hassConnection: hass,
          states, entities, devices, areas: {}, floors: {}, labels: [],
          locale: hass.locale, localize: hass.localize, config: hass.config,
          themes: hass.themes, narrowViewport: false, reducedMotion: true,
          related: undefined, brandsAccessToken: undefined,
        };
        if (Object.hasOwn(contexts, event.context)) {
          event.stopPropagation();
          event.callback(contexts[event.context], () => undefined);
        }
      });
      const editor = document.createElement("dhe-connect-card-editor");
      editor.hass = hass;
      editor.setConfig({
        device_id: "fixture-device", overview_entities: ["power"], show_diagnostics: false,
        hold_action: { action: "navigate", navigation_path: "/lovelace/initial" },
      });
      window.__editorChanges = [];
      editor.addEventListener("config-changed", (event) => window.__editorChanges.push(event.detail.config));
      document.body.append(editor);
      await editor.updateComplete;
      editor.shadowRoot.querySelectorAll("details").forEach((details) => { details.open = true; });
    });
    await page.waitForSelector('dhe-connect-card-editor >>> ha-selector[data-editor-field="name"] >>> input');
    const name = await page.$('dhe-connect-card-editor >>> ha-selector[data-editor-field="name"] >>> input');
    await name.click();
    await name.type("Fixture title");
    await page.keyboard.press("Tab");
    await page.waitForFunction(() => window.__editorChanges.some((config) => config.name === "Fixture title"));
    const navigation = await page.waitForSelector(
      'dhe-connect-card-editor >>> ha-input[data-action-property="navigation_path"] >>> input',
      { visible: true },
    );
    await navigation.focus();
    await navigation.evaluate((input) => input.select());
    await navigation.type("/lovelace/fixture");
    await page.keyboard.press("Tab");
    await page.waitForFunction(() => window.__editorChanges.at(-1).hold_action.navigation_path === "/lovelace/fixture");
    const switchLabels = await page.$$eval("dhe-connect-card-editor >>> .switch-formfield-label", (labels) =>
      labels.map((label) => ({ text: label.textContent, width: label.getBoundingClientRect().width })));
    assert(switchLabels.length > 0 && switchLabels.every((label) => label.width > 0),
      `Switch labels are not visible: ${JSON.stringify(switchLabels.filter((label) => !label.width))}`);
    const changeCount = await page.evaluate(() => window.__editorChanges.length);
    const caption = await page.$("dhe-connect-card-editor >>> .checks .switch-formfield-label");
    await caption.click();
    await page.waitForFunction(() => window.__editorChanges.at(-1).show_diagnostics === true);
    assert.equal(await page.evaluate(() => window.__editorChanges.length), changeCount + 1,
      "A label click must toggle exactly once");
    const control = await page.$("dhe-connect-card-editor >>> .checks ha-switch");
    await control.click();
    await page.waitForFunction(() => window.__editorChanges.at(-1).show_diagnostics === false);
    assert.equal(await page.evaluate(() => window.__editorChanges.length), changeCount + 2,
      "A switch click must toggle exactly once");
    await control.focus();
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.__editorChanges.at(-1).show_diagnostics === true);
    assert.equal(await page.evaluate(() => window.__editorChanges.length), changeCount + 3);
    for (const width of [390, 900]) {
      await page.setViewport({ width, height: 900 });
      const help = await page.$("dhe-connect-card-editor >>> .advanced-editor > summary .help-icon");
      await help.evaluate((button) => button.scrollIntoView({ block: "center" }));
      await help.focus();
      await page.waitForFunction(() => document.querySelector("dhe-connect-card-editor")
        .shadowRoot.querySelector(".help-tooltip:popover-open"));
      const bounds = await page.$eval("dhe-connect-card-editor >>> .help-tooltip:popover-open", (tooltip) => {
        const rect = tooltip.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: rect.width };
      });
      assert(bounds.width > 0 && bounds.left >= 0 && bounds.right <= width);
      await page.keyboard.press("Escape");
      assert.equal(await page.$("dhe-connect-card-editor >>> .help-tooltip:popover-open"), null);
      await help.click();
      assert(await page.$("dhe-connect-card-editor >>> .help-tooltip:popover-open"));
      await page.keyboard.press("Escape");
      await page.keyboard.press("Tab");
    }
    const picker = 'dhe-connect-card-editor >>> .section-entity-toggle[data-entity-key="water_heating"] ha-selector >>> ha-entity-picker';
    await page.waitForSelector(picker);
    await page.$eval(picker, async (element) => { await element.updateComplete; await element.open(); });
    const search = await page.waitForSelector(`${picker} >>> input`, { visible: true });
    await search.click();
    await search.type("Other heater");
    await page.locator(`${picker} >>> :is([role="option"], .combo-box-row)`)
      .filter((option) => option.textContent.includes("Other heater")).click();
    await page.waitForFunction(() => window.__editorChanges.at(-1).entities?.water_heating === "climate.fixture_other");
    const devicePicker = "dhe-connect-card-editor >>> .basic-editor ha-selector >>> ha-device-picker";
    await page.waitForSelector(devicePicker);
    await page.$eval(devicePicker, async (element) => { await element.updateComplete; await element.open(); });
    const deviceSearch = await page.waitForSelector(`${devicePicker} >>> input`, { visible: true });
    await deviceSearch.click();
    await deviceSearch.type("Second fixture");
    await page.locator(`${devicePicker} >>> :is([role="option"], .combo-box-row)`)
      .filter((option) => option.textContent.includes("Second fixture")).click();
    await page.waitForFunction(() => window.__editorChanges.at(-1).device_id === "second-device");
    assert.deepEqual(errors, [], "HA component runtime errors");
    console.log(`PASS: real HA components ${key} (${baseline.version})`);
  } finally {
    await browser?.close();
    if (server) await new Promise((resolve) => server.close(resolve));
    await rm(temporary, { recursive: true, force: true });
  }
}

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(180000) });
  assert(response.ok, `Frontend download failed: ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}
