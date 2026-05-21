#!/usr/bin/env node
/* global document, getComputedStyle, PointerEvent, requestAnimationFrame, window */
import http from "node:http";
import { readFile } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const chromePath = process.env.CHROME_BIN || "/usr/bin/google-chrome";
const args = process.argv.slice(2);
const screenshotIndex = args.indexOf("--screenshot");
const screenshotPath = screenshotIndex >= 0 ? args[screenshotIndex + 1] : undefined;
const screenshotWidthIndex = args.indexOf("--screenshot-width");
const screenshotWidth =
  screenshotWidthIndex >= 0 ? Number.parseInt(args[screenshotWidthIndex + 1] ?? "", 10) : undefined;
const screenshotHeightIndex = args.indexOf("--screenshot-height");
const screenshotHeight =
  screenshotHeightIndex >= 0
    ? Number.parseInt(args[screenshotHeightIndex + 1] ?? "", 10)
    : undefined;
const screenshotPresetIndex = args.indexOf("--screenshot-preset");
const screenshotPreset =
  screenshotPresetIndex >= 0 ? args[screenshotPresetIndex + 1] ?? "compact" : "compact";
const bundle = await readFile("dist/ha-dhe-connect-card.js", "utf8");
const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 24px;
        background: #202124;
        color: #f5f5f5;
        font-family: Arial, sans-serif;
        --primary-color: #03a9f4;
        --text-primary-color: #ffffff;
        --primary-text-color: #f5f7fb;
        --secondary-text-color: #a7b0be;
        --secondary-background-color: #2f343d;
        --card-background-color: #252a32;
        --ha-card-background: #252a32;
        --divider-color: rgba(255, 255, 255, 0.12);
        --error-color: #ff6b6b;
      }
      ha-card {
        display: block;
        max-width: 760px;
      }
      dhe-connect-card {
        display: block;
        width: 420px;
      }
    </style>
  </head>
  <body>
    <script>
      customElements.define("ha-card", class extends HTMLElement {});
      customElements.define("ha-icon", class extends HTMLElement {});
    </script>
    <script type="module" src="/card.js"></script>
    <script type="module">
      await customElements.whenDefined("dhe-connect-card");
      const card = document.createElement("dhe-connect-card");
      card.hass = {
        states: {
          "climate.dhe": {
            state: "heat",
            attributes: {
              friendly_name: "DHE Connect Durchlauferhitzer",
              hvac_action: "heating",
              temperature: 42,
              current_temperature: 39
            }
          },
          "sensor.water_flow": {
            state: "4.2",
            attributes: {
              friendly_name: "DHE Connect Aktueller Wasserdurchfluss",
              unit_of_measurement: "l/min"
            }
          },
          "sensor.power": {
            state: "11",
            attributes: {
              change: 1.4,
              friendly_name: "DHE Connect Aktueller Stromverbrauch",
              history: [5, 6.5, 7.1, 9, 11],
              unit_of_measurement: "kW"
            }
          },
          "sensor.outlet_temperature": {
            state: "43.5",
            attributes: {
              friendly_name: "DHE Connect Auslauftemperatur",
              unit_of_measurement: "°C"
            }
          },
          "sensor.inlet_temperature": {
            state: "13.2",
            attributes: {
              friendly_name: "DHE Connect Zulauftemperatur",
              unit_of_measurement: "°C"
            }
          },
          "switch.eco": {
            state: "off",
            attributes: {
              friendly_name: "Stiebel Eltron DHE Connect / Eco mode"
            }
          },
          "number.child_safety_limit": {
            state: "42",
            attributes: {
              friendly_name: "DHE Connect Kindersicherung Temperatur",
              min: 30,
              max: 55,
              step: 0.5,
              unit_of_measurement: "°C"
            }
          },
          "number.eco_flow_limit": {
            state: "7.5",
            attributes: {
              friendly_name: "DHE Connect Eco Durchfluss",
              min: 4,
              max: 15,
              step: 0.5,
              unit_of_measurement: "l/min"
            }
          },
          "switch.wellness_circulation": {
            state: "on",
            attributes: {
              friendly_name: "DHE Connect Kreislaufunterstützung"
            }
          },
          "switch.bath_fill": {
            state: "off",
            attributes: {
              friendly_name: "DHE Connect Badewannenfüllung"
            }
          },
          "number.bath_fill_target": {
            state: "120",
            attributes: {
              friendly_name: "DHE Connect Badewanne Zielmenge",
              min: 20,
              max: 180,
              step: 5,
              unit_of_measurement: "l"
            }
          },
          "sensor.bath_fill_remaining": {
            state: "84",
            attributes: {
              friendly_name: "DHE Connect Badewanne Restmenge",
              unit_of_measurement: "l"
            }
          },
          "switch.brush_timer": {
            state: "on",
            attributes: {
              friendly_name: "DHE Connect Zahnbürsten-Timer"
            }
          },
          "number.brush_timer_duration": {
            state: "120",
            attributes: {
              friendly_name: "DHE Connect Zahnbürsten-Timer Sekunden",
              min: 30,
              max: 300,
              step: 15,
              unit_of_measurement: "s"
            }
          },
          "sensor.brush_timer_remaining": {
            state: "47",
            attributes: {
              friendly_name: "DHE Connect Zahnbürsten-Timer verbleibend",
              unit_of_measurement: "s"
            }
          },
          "switch.shower_timer": {
            state: "off",
            attributes: {
              friendly_name: "DHE Connect Dusch-Timer"
            }
          },
          "text.memory_1_name": {
            state: "Morning",
            attributes: {
              friendly_name: "DHE Connect Speicher 1 Name"
            }
          },
          "number.memory_1_temperature": {
            state: "41",
            attributes: {
              friendly_name: "DHE Connect Speicher 1 Temperatur",
              min: 30,
              max: 55,
              step: 0.5,
              unit_of_measurement: "°C"
            }
          },
          "button.memory_1": {
            state: "unknown",
            attributes: {
              friendly_name: "DHE Connect Speicher 1"
            }
          },
          "text.memory_2_name": {
            state: "Shower",
            attributes: {
              friendly_name: "DHE Connect Speicher 2 Name"
            }
          },
          "number.memory_2_temperature": {
            state: "38",
            attributes: {
              friendly_name: "DHE Connect Speicher 2 Temperatur",
              min: 30,
              max: 55,
              step: 0.5,
              unit_of_measurement: "°C"
            }
          },
          "button.memory_2": {
            state: "unknown",
            attributes: {
              friendly_name: "DHE Connect Speicher 2"
            }
          },
          "sensor.device_info": {
            state: "DHE Connect 18/21/24",
            attributes: {
              friendly_name: "DHE Connect Geräteinfo"
            }
          },
          "weather.dhe": {
            state: "sunny",
            attributes: {
              friendly_name: "DHE Connect New York, USA"
            }
          },
          "select.weather_location": {
            state: "New York, USA",
            attributes: {
              friendly_name: "DHE Connect Wetter-Standort",
              options: ["DHE Connect New York, USA", "Berlin, Deutschland"]
            }
          },
          "media_player.radio": {
            state: "idle",
            attributes: {
              friendly_name: "DHE Connect Radio",
              media_title: "DHE Connect Radio Stream",
              source: "DHE Connect Oldie Radio",
              source_list: ["DHE Connect Oldie Radio", "Antenne Düsseldorf"],
              favorites: [
                { id: 12, name: "DHE Connect Oldie Radio" },
                { id: 34, name: "Antenne Düsseldorf" }
              ],
              volume_level: 0.4
            }
          }
        },
        locale: { language: "de" },
        callService: async () => undefined
      };
      const baseConfig = {
        type: "custom:dhe-connect-card",
        name: "DHE Connect Badezimmer",
        sections: ["overview", "controls", "diagnostics", "weather", "radio"],
        show_diagnostics: true,
        entities: {
          water_heating: "climate.dhe",
          water_flow: "sensor.water_flow",
          power: "sensor.power",
          outlet_temperature: "sensor.outlet_temperature",
          inlet_temperature: "sensor.inlet_temperature",
          eco_mode: "switch.eco",
          child_safety_temperature_limit: "number.child_safety_limit",
          eco_flow_limit: "number.eco_flow_limit",
          wellness_circulation_support: "switch.wellness_circulation",
          bath_fill_active: "switch.bath_fill",
          bath_fill_target_volume: "number.bath_fill_target",
          bath_fill_remaining_volume: "sensor.bath_fill_remaining",
          brush_timer_active: "switch.brush_timer",
          brush_timer_duration: "number.brush_timer_duration",
          brush_timer_remaining: "sensor.brush_timer_remaining",
          shower_timer_active: "switch.shower_timer",
          temperature_memory_1_name: "text.memory_1_name",
          temperature_memory_1_temperature: "number.memory_1_temperature",
          temperature_memory_1: "button.memory_1",
          temperature_memory_2_name: "text.memory_2_name",
          temperature_memory_2_temperature: "number.memory_2_temperature",
          temperature_memory_2: "button.memory_2",
          device_info: "sensor.device_info",
          weather: "weather.dhe",
          weather_location: "select.weather_location",
          radio: "media_player.radio"
        },
        tap_action: { action: "more-info" },
        hold_action: { action: "navigate", navigation_path: "/lovelace/dhe" },
        double_tap_action: { action: "toggle" }
      };
      window.__baseConfig = baseConfig;
      card.setConfig(baseConfig);
      document.body.append(card);
      await card.updateComplete;
      window.__cardReady = true;
    </script>
  </body>
</html>`;

const server = http.createServer((request, response) => {
  if (request.url === "/card.js") {
    response.writeHead(200, { "content-type": "text/javascript" });
    response.end(bundle);
    return;
  }
  response.writeHead(200, { "content-type": "text/html" });
  response.end(html);
});

await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 720, deviceScaleFactor: 1 });
  const port = server.address().port;
  await page.goto(`http://127.0.0.1:${port}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForFunction(() => window.__cardReady === true, { timeout: 30000 });
  const result = await page.evaluate(async () => {
    const card = document.querySelector("dhe-connect-card");
    const root = card.shadowRoot;
    const actionDetails = [];
    document.body.addEventListener("hass-action", (event) => {
      actionDetails.push(event.detail);
    });
    const row = root.querySelector(".entity-row .entity-action");
    const metric = root.querySelector(".metric.entity-action");
    row.click();
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    metric.click();
    metric.click();
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    metric.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      composed: true,
      isPrimary: true
    }));
    await new Promise((resolve) => {
      setTimeout(resolve, 550);
    });
    metric.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      button: 0,
      composed: true,
      isPrimary: true
    }));
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    const defaultTileSize = root.querySelector(".dhe-card")?.classList.contains("tile-size-auto") === true;
    card.setConfig({ ...window.__baseConfig, tile_size: "large" });
    await card.updateComplete;
    const largeTileSize = root.querySelector(".dhe-card")?.classList.contains("tile-size-large") === true;
    card.setConfig(window.__baseConfig);
    await card.updateComplete;
    const nextFrame = () => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
    const applyTheme = (theme) => {
      const dark = {
        page: "#202124",
        text: "#f5f5f5",
        primaryText: "#f5f7fb",
        secondaryText: "#a7b0be",
        secondaryBg: "#2f343d",
        cardBg: "#252a32",
        divider: "rgba(255, 255, 255, 0.12)",
      };
      const light = {
        page: "#f3f5f8",
        text: "#1f2630",
        primaryText: "#1f2630",
        secondaryText: "#586170",
        secondaryBg: "#e6ebf2",
        cardBg: "#ffffff",
        divider: "rgba(0, 0, 0, 0.12)",
      };
      const vars = theme === "light" ? light : dark;
      const style = document.body.style;
      style.background = vars.page;
      style.color = vars.text;
      style.setProperty("--primary-text-color", vars.primaryText);
      style.setProperty("--secondary-text-color", vars.secondaryText);
      style.setProperty("--secondary-background-color", vars.secondaryBg);
      style.setProperty("--card-background-color", vars.cardBg);
      style.setProperty("--ha-card-background", vars.cardBg);
      style.setProperty("--divider-color", vars.divider);
      style.setProperty("--ha-card-border-color", vars.divider);
      style.setProperty("--ha-card-border-width", "1px");
      document.body.dataset.dheSmokeTheme = theme;
    };
    applyTheme("dark");
    const columnCount = (selector) => {
      const element = root.querySelector(selector);
      if (!element) {
        return 0;
      }
      return getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length;
    };
    const sectionLayout = () => {
      const controls = root.querySelector('[data-section="controls"]').getBoundingClientRect();
      const weather = root.querySelector('[data-section="weather"]').getBoundingClientRect();
      return {
        controlsLeft: Math.round(controls.left),
        controlsTop: Math.round(controls.top),
        controlsBottom: Math.round(controls.bottom),
        weatherLeft: Math.round(weather.left),
        weatherTop: Math.round(weather.top),
      };
    };
    const visualSnapshot = async (name, width, config, theme = "dark") => {
      applyTheme(theme);
      card.setConfig({ ...window.__baseConfig, ...config });
      card.style.width = `${width}px`;
      await card.updateComplete;
      await nextFrame();
      const cardRect = root.querySelector(".dhe-card").getBoundingClientRect();
      const visualElements = [
        ...root.querySelectorAll(
          ".metric, .entity-row, .display-button-tile, .media-row, .favorite-row, .climate-control, .service-box, .support-panel, .support-check, .support-entity-row",
        ),
      ];
      const textElements = [
        ...root.querySelectorAll(
          ".metric span, .metric strong, .entity-row strong, .entity-row span, .display-button-main span, .display-button-main strong, .media-main strong, .media-main span, .favorite-row span, .support-check strong, .support-entity-row strong, .support-stats dd",
        ),
      ];
      const overflowing = visualElements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const overflowContainer = element.closest(".support-entity-list");
          if (overflowContainer) {
            const bounds = overflowContainer.getBoundingClientRect();
            return rect.left < bounds.left - 1 || rect.right > bounds.right + 1;
          }
          return rect.left < cardRect.left - 1
            || rect.right > cardRect.right + 1
            || rect.top < cardRect.top - 1
            || rect.bottom > cardRect.bottom + 1;
        })
        .map((element) => element.className);
      const clippedText = textElements
        .filter((element) =>
          element.scrollWidth > element.clientWidth + 1
          || element.scrollHeight > element.clientHeight + 1)
        .map((element) => ({
          text: element.textContent?.trim() ?? element.className,
          className: element.className,
          rowControlWidth: Math.round(
            element.closest(".entity-row")?.querySelector(".row-control")?.getBoundingClientRect()
              .width ?? 0,
          ),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        }));
      const zeroSized = visualElements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width <= 0 || rect.height <= 0;
        })
        .map((element) => element.className);
      const largeRadius = visualElements
        .filter((element) => Number.parseFloat(getComputedStyle(element).borderRadius) > 8)
        .map((element) => element.className);
      const smallButtons = [...root.querySelectorAll("button")]
        .filter((button) => {
          const rect = button.getBoundingClientRect();
          return rect.width < 32 || rect.height < 32;
        })
        .map((button) => button.className || button.textContent?.trim() || button.tagName);
      const metricCount = root.querySelectorAll(".metric").length;
      const visibleOverviewChips = [...root.querySelectorAll(".overview-chip")]
        .filter((chip) => {
          const style = getComputedStyle(chip);
          const rect = chip.getBoundingClientRect();
          return style.display !== "none" && rect.width > 0 && rect.height > 0;
        }).length;
      return {
        name,
        theme,
        width,
        contentColumns: columnCount(".content-grid"),
        metricColumns: columnCount(".metric-grid"),
        metricCount,
        visibleOverviewChips,
        overflowing,
        clippedText,
        clippedTextCount: clippedText.length,
        zeroSized,
        largeRadius,
        smallButtons,
        visualElementCount: visualElements.length,
      };
    };
    card.style.width = "420px";
    await nextFrame();
    const narrowContentColumns = columnCount(".content-grid");
    const narrowLayout = sectionLayout();
    card.style.width = "860px";
    await nextFrame();
    const wideContentColumns = columnCount(".content-grid");
    const wideLayout = sectionLayout();
    card.style.width = "420px";
    await nextFrame();
    const returnedNarrowContentColumns = columnCount(".content-grid");
    const collectIcons = () => [...root.querySelectorAll(".icon-bubble")].map((element) => ({
      background: getComputedStyle(element).backgroundColor,
      color: getComputedStyle(element).color,
      iconAnimation: getComputedStyle(element.querySelector("ha-icon")).animationName,
      overlayAnimation: getComputedStyle(element, "::after").animationName,
      bubbleAnimation: getComputedStyle(element).animationName,
      className: element.className,
    }));
    const countAnimatedIcons = (icons) => icons.filter(
      (icon) =>
        icon.iconAnimation !== "none" ||
        icon.overlayAnimation !== "none" ||
        icon.bubbleAnimation !== "none",
    ).length;
    const icons = collectIcons();
    const borderedRows = [...root.querySelectorAll(".entity-row, .media-row, .favorite-row")].filter(
      (element) => getComputedStyle(element).borderTopStyle !== "none"
    ).length;
    const metricTiles = root.querySelectorAll(".metric").length;
    const overviewChips = root.querySelectorAll(".overview-chip").length;
    const overviewSparklines = root.querySelectorAll(".overview-sparkline polyline[points]").length;
    const overviewDeltas = root.querySelectorAll(".overview-delta").length;
    const borderedMetrics = [...root.querySelectorAll(".metric")].filter(
      (element) => getComputedStyle(element).borderTopStyle !== "none"
    ).length;
    const overviewChipTexts = [...root.querySelectorAll(".overview-chip")]
      .map((element) => element.textContent?.replace(/\s+/g, " ").trim() ?? "")
      .filter(Boolean);
    const forbiddenOverviewChipLabels = overviewChipTexts.filter((label) =>
      [
        "Alert",
        "Check",
        "Idle",
        "Live",
        "OK",
        "Stable",
        "Alarm",
        "Inaktiv",
        "Prüfen",
        "Stabil",
        "Bath",
        "Control",
        "Energy",
        "Saving",
        "Status",
        "Temperature",
        "Timer",
        "Water",
        "Bad",
        "Steuerung",
        "Energie",
        "Sparen",
        "Temperatur",
        "Wasser",
      ].includes(label)
    );
    const wellnessIcon = root.querySelector(".wellness .icon-bubble.wellness.active");
    const favoriteRows = root.querySelectorAll(".favorite-row").length;
    const iconElement = root.querySelector(".entity-row .icon-bubble");
    const iconSize = Math.round(Number.parseFloat(getComputedStyle(iconElement).width));
    const rowRect = root.querySelector(".entity-row").getBoundingClientRect();
    const metricRect = root.querySelector(".metric").getBoundingClientRect();
    const fontFamily = getComputedStyle(root.querySelector(".dhe-card")).fontFamily;
    const text = [
      root.textContent,
      ...[...root.querySelectorAll("input")].map((input) => input.value),
      ...[...root.querySelectorAll("select")].map((select) => select.selectedOptions[0]?.textContent ?? ""),
      ...[...root.querySelectorAll("[aria-label], [title]")].map(
        (element) => `${element.getAttribute("aria-label") ?? ""} ${element.getAttribute("title") ?? ""}`
      )
    ].join(" ").replace(/\s+/g, " ").trim();
    const visualSnapshots = [
      await visualSnapshot("compact-mobile", 320, {
        tile_size: "auto",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather"],
      }),
      await visualSnapshot("compact-default", 420, {
        tile_size: "auto",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather", "radio"],
      }),
      await visualSnapshot("wide-dashboard", 860, {
        tile_size: "auto",
        show_display_buttons: false,
        show_weather_services: false,
        sections: ["overview", "controls", "weather", "radio", "diagnostics"],
      }),
      await visualSnapshot("tablet-mode", 760, {
        tile_size: "auto",
        layout_mode: "tablet",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather", "radio"],
      }),
      await visualSnapshot("panel-mode", 860, {
        tile_size: "auto",
        layout_mode: "panel",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather"],
      }),
      await visualSnapshot("kiosk-mode", 1120, {
        tile_size: "auto",
        layout_mode: "kiosk",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather", "radio", "diagnostics"],
      }),
      await visualSnapshot("display-buttons", 420, {
        tile_size: "auto",
        show_display_buttons: true,
        sections: ["controls", "bath", "timers", "memory"],
      }),
      await visualSnapshot("support-mode", 420, {
        tile_size: "auto",
        show_support_mode: true,
        sections: ["support"],
      }),
      await visualSnapshot("light-compact-default", 420, {
        tile_size: "auto",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather", "radio"],
      }, "light"),
      await visualSnapshot("icon-theme-ha", 420, {
        tile_size: "auto",
        icon_theme: "ha",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather"],
      }),
      await visualSnapshot("icon-theme-vivid", 420, {
        tile_size: "auto",
        icon_theme: "vivid",
        show_display_buttons: false,
        sections: ["overview", "controls", "weather"],
      }),
      await visualSnapshot("tablet-support", 760, {
        tile_size: "auto",
        layout_mode: "tablet",
        show_support_mode: true,
        sections: ["overview", "support"],
      }),
    ];
    card.setConfig({
      ...window.__baseConfig,
      show_support_mode: true,
      sections: ["overview"],
    });
    await card.updateComplete;
    await nextFrame();
    const supportAutoVisible = Boolean(root.querySelector('[data-section="support"]'));
    const supportA11yReady = Boolean(
      root.querySelector('.support-actions button[aria-describedby="dhe-support-export-hint"]')
        && root.querySelector('.support-checks[role="list"]')
        && root.querySelector('.support-entity-list[role="list"]'),
    );
    card.setConfig({
      ...window.__baseConfig,
      tile_size: "large",
      sections: ["overview", "controls"],
    });
    await card.updateComplete;
    await nextFrame();
    const largeMetricHeight = Math.round(
      root.querySelector(".metric").getBoundingClientRect().height,
    );
    const largeMetricIconSize = Math.round(
      root.querySelector(".metric .icon-bubble").getBoundingClientRect().width,
    );
    card.setConfig({
      ...window.__baseConfig,
      layout_mode: "panel",
      sections: ["overview", "controls", "weather"],
    });
    card.style.width = "860px";
    await card.updateComplete;
    await nextFrame();
    const panelGridRect = root.querySelector(".content-grid").getBoundingClientRect();
    const panelSectionsFullWidth = [...root.querySelectorAll(".content-grid > [data-section]")]
      .every((section) => {
        const rect = section.getBoundingClientRect();
        return Math.abs(rect.width - panelGridRect.width) <= 8;
      });
    card.setConfig({
      ...window.__baseConfig,
      layout_mode: "kiosk",
      sections: ["overview", "controls", "weather"],
    });
    await card.updateComplete;
    await nextFrame();
    const kioskBorderRadius = Number.parseFloat(
      getComputedStyle(root.querySelector(".dhe-card")).borderRadius,
    );
    card.setConfig(window.__baseConfig);
    card.style.width = "420px";
    await card.updateComplete;
    await nextFrame();
    card.setConfig({ ...window.__baseConfig, show_display_buttons: true });
    await card.updateComplete;
    const displayButtonTiles = root.querySelectorAll(".display-button-tile").length;
    const borderedDisplayButtons = [...root.querySelectorAll(".display-button-tile")].filter(
      (element) => getComputedStyle(element).borderTopStyle !== "none"
    ).length;
    const displayWellnessIcon = root.querySelector(
      ".display-button-grid.wellness .icon-bubble.wellness"
    );
    card.setConfig({ ...window.__baseConfig, show_icon_animations: false });
    await card.updateComplete;
    const disabledAnimationIcons = collectIcons();
    card.setConfig(window.__baseConfig);
    await card.updateComplete;
    await nextFrame();
    const focusMetric = root.querySelector(".metric.entity-action");
    if (!focusMetric) {
      throw new Error("expected focusable overview metric for focus smoke assertion");
    }
    const focusBefore = getComputedStyle(focusMetric);
    const focusBeforeShadow = focusBefore.boxShadow;
    focusMetric.focus();
    await nextFrame();
    const focusAfter = getComputedStyle(focusMetric);
    const focusOutlineWidth = Number.parseFloat(focusAfter.outlineWidth);
    const focusVisible = focusMetric.matches(":focus-visible") || focusMetric.matches(":focus");
    const focusOutlineVisible = focusAfter.outlineStyle !== "none" && focusOutlineWidth >= 1;
    const focusShadowChanged = focusAfter.boxShadow !== focusBeforeShadow;
    return {
      actionDetails,
      animatedIcons: countAnimatedIcons(icons),
      disabledAnimatedIcons: countAnimatedIcons(disabledAnimationIcons),
      defaultTileSize,
      narrowContentColumns,
      narrowLayout,
      returnedNarrowContentColumns,
      wideContentColumns,
      wideLayout,
      coloredIcons: icons.filter(
        (icon) =>
          icon.background !== "rgba(0, 0, 0, 0)" &&
          icon.background !== "transparent" &&
          icon.color !== "rgb(245, 247, 251)",
      ).length,
      prefixStillVisible: /\bDHE[\s_-]*Connect\b/i.test(text),
      borderedRows,
      borderedMetrics,
      borderedDisplayButtons,
      displayButtonTiles,
      favoriteRows,
      metricTiles,
      overviewChips,
      overviewChipTexts,
      forbiddenOverviewChipLabels,
      overviewDeltas,
      overviewSparklines,
      supportAutoVisible,
      supportA11yReady,
      focusVisible,
      focusOutlineVisible,
      focusShadowChanged,
      largeMetricHeight,
      largeMetricIconSize,
      panelSectionsFullWidth,
      kioskBorderRadius,
      hasDisplayWellnessIcon: Boolean(displayWellnessIcon),
      hasWellnessIcon: Boolean(wellnessIcon),
      largeTileSize,
      iconSize,
      fontFamily,
      metricHeight: Math.round(metricRect.height),
      rowHeight: Math.round(rowRect.height),
      visualSnapshots,
      sampleClasses: icons.slice(0, 4).map((icon) => icon.className),
      text,
    };
  });
  const metricHoverBaseline = await page.evaluate(() => {
    const metric = document
      .querySelector("dhe-connect-card")
      .shadowRoot.querySelector(".metric.entity-action");
    const rect = metric.getBoundingClientRect();
    const style = getComputedStyle(metric);
    return {
      background: style.backgroundColor,
      borderColor: style.borderTopColor,
      boxShadow: style.boxShadow,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  });
  await page.mouse.move(metricHoverBaseline.x, metricHoverBaseline.y);
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  result.metricHoverFeedback = await page.evaluate((baseline) => {
    const metric = document
      .querySelector("dhe-connect-card")
      .shadowRoot.querySelector(".metric.entity-action");
    const style = getComputedStyle(metric);
    return {
      backgroundChanged: style.backgroundColor !== baseline.background,
      borderChanged: style.borderTopColor !== baseline.borderColor,
      boxShadowChanged: style.boxShadow !== baseline.boxShadow,
      hovered: metric.matches(":hover"),
    };
  }, metricHoverBaseline);
  if (result.prefixStillVisible) {
    throw new Error(`DHE Connect prefix is still visible in rendered card text: ${result.text}`);
  }
  if (result.coloredIcons < 3) {
    throw new Error(`expected colored icons, got ${result.coloredIcons}`);
  }
  if (result.animatedIcons < 3) {
    throw new Error(`expected animated icons, got ${result.animatedIcons}`);
  }
  if (result.disabledAnimatedIcons !== 0) {
    throw new Error(`expected disabled animations, got ${result.disabledAnimatedIcons}`);
  }
  if (!result.defaultTileSize || !result.largeTileSize) {
    throw new Error(
      `expected tile size auto default with large opt-in, got default=${result.defaultTileSize} large=${result.largeTileSize}`,
    );
  }
  if (
    result.narrowContentColumns !== 1 ||
    result.returnedNarrowContentColumns !== 1 ||
    result.wideContentColumns < 12
  ) {
    throw new Error(
      `expected responsive content grid 1->2+->1 columns, got ${result.narrowContentColumns}->${result.wideContentColumns}->${result.returnedNarrowContentColumns}`,
    );
  }
  const narrowBlocksStacked =
    Math.abs(result.narrowLayout.controlsLeft - result.narrowLayout.weatherLeft) <= 4 &&
    result.narrowLayout.weatherTop >= result.narrowLayout.controlsBottom;
  const wideBlocksReflowed =
    Math.abs(result.wideLayout.controlsTop - result.wideLayout.weatherTop) <= 6 &&
    result.wideLayout.weatherLeft > result.wideLayout.controlsLeft + 120;
  if (!narrowBlocksStacked || !wideBlocksReflowed) {
    throw new Error(
      `expected blocks to reflow from vertical stack to side-by-side, got narrow=${JSON.stringify(result.narrowLayout)} wide=${JSON.stringify(result.wideLayout)}`,
    );
  }
  if (!result.hasWellnessIcon) {
    throw new Error("expected active wellness icon");
  }
  if (result.favoriteRows < 2) {
    throw new Error(`expected radio favorite rows, got ${result.favoriteRows}`);
  }
  if (result.displayButtonTiles < 2 || !result.hasDisplayWellnessIcon) {
    throw new Error(
      `expected display-style button tiles, got ${result.displayButtonTiles}`,
    );
  }
  if (result.borderedRows < 4) {
    throw new Error(`expected Mushroom-style bordered rows, got ${result.borderedRows}`);
  }
  if (result.borderedMetrics !== result.metricTiles) {
    throw new Error(
      `expected bordered overview metric tiles, got ${result.borderedMetrics}/${result.metricTiles}`,
    );
  }
  if (
    result.overviewChips !== 0 ||
    result.overviewDeltas < 1 ||
    result.overviewSparklines < 1
  ) {
    throw new Error(
      `expected hidden overview chips plus delta/sparklines, got chips=${result.overviewChips} delta=${result.overviewDeltas} sparklines=${result.overviewSparklines}`,
    );
  }
  if (result.forbiddenOverviewChipLabels.length) {
    throw new Error(
      `overview should not expose technical condition chips: ${result.forbiddenOverviewChipLabels.join(", ")}`,
    );
  }
  if (
    !result.metricHoverFeedback.hovered ||
    (!result.metricHoverFeedback.backgroundChanged &&
      !result.metricHoverFeedback.borderChanged &&
      !result.metricHoverFeedback.boxShadowChanged)
  ) {
    throw new Error(
      `expected hover feedback on overview metric tiles: ${JSON.stringify(result.metricHoverFeedback)}`,
    );
  }
  if (result.borderedDisplayButtons !== result.displayButtonTiles) {
    throw new Error(
      `expected bordered display buttons, got ${result.borderedDisplayButtons}/${result.displayButtonTiles}`,
    );
  }
  if (result.iconSize !== 36) {
    throw new Error(`expected HA-sized 36px icons, got ${result.iconSize}`);
  }
  if (!/Roboto|Noto|sans-serif/i.test(result.fontFamily)) {
    throw new Error(`expected Home Assistant font stack, got ${result.fontFamily}`);
  }
  if (result.rowHeight > 52) {
    throw new Error(`expected HA-sized entity rows, got ${result.rowHeight}px`);
  }
  if (result.metricHeight > 64) {
    throw new Error(`expected HA-sized metric tiles, got ${result.metricHeight}px`);
  }
  const badVisualSnapshot = result.visualSnapshots.find(
    (snapshot) =>
      snapshot.overflowing.length ||
      snapshot.clippedText.length ||
      snapshot.zeroSized.length ||
      snapshot.largeRadius.length ||
      snapshot.smallButtons.length,
  );
  if (badVisualSnapshot) {
    throw new Error(`visual snapshot failed: ${JSON.stringify(badVisualSnapshot)}`);
  }
  const mobileSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "compact-mobile");
  const defaultSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "compact-default");
  const wideSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "wide-dashboard");
  const tabletSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "tablet-mode");
  const panelSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "panel-mode");
  const kioskSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "kiosk-mode");
  const displaySnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "display-buttons");
  const supportSnapshot = result.visualSnapshots.find((snapshot) => snapshot.name === "support-mode");
  const lightSnapshot = result.visualSnapshots.find(
    (snapshot) => snapshot.name === "light-compact-default",
  );
  const iconHaSnapshot = result.visualSnapshots.find(
    (snapshot) => snapshot.name === "icon-theme-ha",
  );
  const iconVividSnapshot = result.visualSnapshots.find(
    (snapshot) => snapshot.name === "icon-theme-vivid",
  );
  const tabletSupportSnapshot = result.visualSnapshots.find(
    (snapshot) => snapshot.name === "tablet-support",
  );
  if (
    mobileSnapshot?.contentColumns !== 1 ||
    mobileSnapshot?.metricColumns !== 1 ||
    defaultSnapshot?.contentColumns !== 1 ||
    defaultSnapshot?.metricColumns !== 3 ||
    (wideSnapshot?.contentColumns ?? 0) < 12 ||
    wideSnapshot?.metricColumns !== 3 ||
    tabletSnapshot?.contentColumns !== 12 ||
    tabletSnapshot?.metricColumns !== 3 ||
    panelSnapshot?.contentColumns !== 12 ||
    kioskSnapshot?.visualElementCount < 4 ||
    displaySnapshot?.visualElementCount < 4 ||
    supportSnapshot?.visualElementCount < 4 ||
    lightSnapshot?.visualElementCount < 4 ||
    lightSnapshot?.theme !== "light" ||
    iconHaSnapshot?.visualElementCount < 4 ||
    iconVividSnapshot?.visualElementCount < 4 ||
    tabletSupportSnapshot?.contentColumns !== 12 ||
    tabletSupportSnapshot?.visualElementCount < 4 ||
    mobileSnapshot?.visibleOverviewChips !== 0
  ) {
    throw new Error(`unexpected visual snapshot layout: ${JSON.stringify(result.visualSnapshots)}`);
  }
  if (
    result.largeMetricHeight < 70 ||
    result.largeMetricIconSize < 39 ||
    !result.panelSectionsFullWidth ||
    result.kioskBorderRadius !== 0
  ) {
    throw new Error(
      `unexpected layout mode behavior: largeMetricHeight=${result.largeMetricHeight} largeMetricIcon=${result.largeMetricIconSize} panelFull=${result.panelSectionsFullWidth} kioskRadius=${result.kioskBorderRadius}`,
    );
  }
  if (!result.supportAutoVisible) {
    throw new Error("expected support mode to render when enabled without a support section entry");
  }
  if (!result.supportA11yReady) {
    throw new Error("expected support mode accessibility wiring for export button and list semantics");
  }
  if (
    !result.focusVisible ||
    (!result.focusOutlineVisible && !result.focusShadowChanged)
  ) {
    throw new Error(
      `expected visible focus indicator on overview metric, got visible=${result.focusVisible} outline=${result.focusOutlineVisible} shadow=${result.focusShadowChanged}`,
    );
  }
  if (
    result.actionDetails[0]?.action !== "tap" ||
    result.actionDetails[0]?.config?.tap_action?.action !== "more-info" ||
    result.actionDetails[1]?.action !== "double_tap" ||
    result.actionDetails[1]?.config?.double_tap_action?.action !== "toggle" ||
    result.actionDetails[2]?.action !== "hold" ||
    result.actionDetails[2]?.config?.hold_action?.action !== "navigate"
  ) {
    throw new Error(`unexpected action details: ${JSON.stringify(result.actionDetails)}`);
  }
  if (screenshotPath) {
    const screenshotConfigWidth =
      Number.isFinite(screenshotWidth) && screenshotWidth > 0 ? screenshotWidth : 420;
    await page.evaluate(
      async ({ preset, width }) => {
        const card = document.querySelector("dhe-connect-card");
        const baseConfig = window.__baseConfig;
        const presetConfigs = {
          compact: {
            ...baseConfig,
            tile_size: "auto",
            show_display_buttons: false,
            sections: ["overview", "controls", "diagnostics"],
          },
          wide: {
            ...baseConfig,
            tile_size: "auto",
            show_display_buttons: false,
            show_weather_services: false,
            sections: ["overview", "controls", "weather", "radio", "diagnostics"],
          },
          media: {
            ...baseConfig,
            tile_size: "auto",
            show_display_buttons: false,
            show_weather_services: false,
            sections: ["weather", "radio"],
          },
          display: {
            ...baseConfig,
            tile_size: "auto",
            show_display_buttons: true,
            sections: ["bath", "timers", "memory"],
          },
        };
        card.setConfig(presetConfigs[preset] ?? presetConfigs.compact);
        card.style.width = `${width}px`;
        await card.updateComplete;
        await new Promise((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(resolve));
        });
      },
      { preset: screenshotPreset, width: screenshotConfigWidth },
    );
    const card = await page.$("dhe-connect-card");
    if (!card) {
      throw new Error("screenshot target card is missing");
    }
    if (Number.isFinite(screenshotHeight) && screenshotHeight > 0) {
      const box = await card.boundingBox();
      if (!box) {
        throw new Error("screenshot target is not visible");
      }
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: Math.min(box.height, screenshotHeight),
        },
      });
    } else {
      await card.screenshot({ path: screenshotPath });
    }
  }
  console.log(
    `PASS: render smoke colored=${result.coloredIcons} animated=${result.animatedIcons} disabledAnimated=${result.disabledAnimatedIcons} visualSnapshots=${result.visualSnapshots.length} actions=${result.actionDetails.map((detail) => detail.action).join(",")}`,
  );
} finally {
  if (browser) {
    await browser.close();
  }
  server.close();
}
