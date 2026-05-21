import { css } from "lit";

export const iconStyles = css`
  .icon-bubble {
    --dhe-icon-color: var(--dhe-water-color);
    position: relative;
    display: inline-flex;
    flex: 0 0 var(--dhe-ha-icon-bubble-size);
    align-items: center;
    justify-content: center;
    width: var(--dhe-ha-icon-bubble-size);
    height: var(--dhe-ha-icon-bubble-size);
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--dhe-icon-color) var(--dhe-icon-background-alpha),
      transparent
    );
    color: var(--dhe-icon-color);
    --state-icon-color: var(--dhe-icon-color);
    --paper-item-icon-color: var(--dhe-icon-color);
    --iron-icon-fill-color: var(--dhe-icon-color);
    --mdc-icon-size: var(--dhe-ha-icon-size);
    box-shadow:
      inset 0 0 0 1px
        color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-ring-alpha), transparent),
      0 0 0 color-mix(in srgb, var(--dhe-icon-color) 0%, transparent);
    transition:
      background 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .icon-bubble ha-icon {
    position: relative;
    z-index: 1;
    color: var(--dhe-icon-color) !important;
    fill: var(--dhe-icon-color) !important;
  }

  .icon-bubble.animated::after {
    position: absolute;
    inset: 5px;
    border-radius: inherit;
    background: currentColor;
    content: "";
    opacity: 0.2;
    contain: paint;
    animation-play-state: var(--dhe-icon-motion-state, running);
  }

  .icon-bubble.primary {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
    background: linear-gradient(
      135deg,
      var(--dhe-primary-gradient-start),
      var(--dhe-primary-gradient-end)
    );
    color: var(--dhe-icon-color);
    box-shadow: 0 8px 18px
      color-mix(in srgb, var(--dhe-water-color) 28%, transparent);
  }

  .icon-bubble.primary.water {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
  }

  .icon-bubble.primary.hot {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
    background: linear-gradient(
      135deg,
      var(--dhe-hot-gradient-start),
      var(--dhe-hot-gradient-end)
    );
    box-shadow: 0 8px 18px
      color-mix(in srgb, var(--dhe-hot-color) 26%, transparent);
  }

  .icon-bubble.active {
    background: color-mix(
      in srgb,
      var(--dhe-icon-color) var(--dhe-icon-active-background-alpha),
      transparent
    );
    box-shadow:
      0 0 0 1px
        color-mix(
          in srgb,
          var(--dhe-icon-color) var(--dhe-icon-active-ring-alpha),
          transparent
        ),
      0 0 18px color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-glow-alpha), transparent),
      inset 0 0 18px
        color-mix(in srgb, var(--dhe-icon-color) 24%, transparent);
  }

  .icon-bubble.primary.active {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--dhe-water-color) 94%, var(--dhe-accent-color)),
      color-mix(in srgb, var(--dhe-water-color) 72%, var(--dhe-card-background))
    );
  }

  .icon-bubble.primary.hot.active {
    background: linear-gradient(
      135deg,
      var(--dhe-hot-gradient-start),
      var(--dhe-hot-gradient-end)
    );
  }

  .icon-bubble.water {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .icon-bubble.wellness {
    --dhe-icon-color: var(--dhe-wellness-color);
  }

  .icon-bubble.energy {
    --dhe-icon-color: var(--dhe-energy-color);
  }

  .icon-bubble.hot {
    --dhe-icon-color: var(--dhe-hot-color);
  }

  .icon-bubble.eco {
    --dhe-icon-color: var(--dhe-eco-color);
  }

  .icon-bubble.timer {
    --dhe-icon-color: var(--dhe-timer-color);
  }

  .icon-bubble.weather {
    --dhe-icon-color: var(--dhe-weather-color);
  }

  .icon-bubble.radio {
    --dhe-icon-color: var(--dhe-radio-color);
  }

  .icon-bubble.safety {
    --dhe-icon-color: var(--dhe-safety-color);
  }

  .icon-bubble.status {
    --dhe-icon-color: var(--dhe-status-color);
  }

  .icon-bubble.ok {
    --dhe-icon-color: var(--dhe-ok-color);
  }

  .icon-bubble.alert {
    --dhe-icon-color: var(--dhe-alert-color);
  }

  .icon-bubble.memory {
    --dhe-icon-color: var(--dhe-memory-color);
  }

  .icon-bubble.action {
    --dhe-icon-color: var(--dhe-action-color);
  }

  .icon-theme-ha .icon-bubble:not(.primary):not(.alert):not(.hot):not(.ok) {
    --dhe-icon-color: var(--dhe-state-active-color);
    background: color-mix(
      in srgb,
      var(--dhe-state-active-color) var(--dhe-icon-background-alpha),
      var(--dhe-card-background)
    );
    color: var(--dhe-icon-color);
  }

  .icon-theme-muted .icon-bubble:not(.primary) {
    --dhe-icon-background-alpha: 10%;
    --dhe-icon-active-background-alpha: 16%;
    --dhe-icon-ring-alpha: 14%;
    --dhe-icon-active-ring-alpha: 28%;
    --dhe-icon-glow-alpha: 10%;
    background: color-mix(in srgb, var(--dhe-row-background) 78%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 80%, transparent);
    opacity: 0.9;
  }

  .icon-theme-vivid .icon-bubble:not(.primary) {
    --dhe-icon-background-alpha: 26%;
    --dhe-icon-active-background-alpha: 38%;
    --dhe-icon-ring-alpha: 44%;
    --dhe-icon-active-ring-alpha: 58%;
    --dhe-icon-glow-alpha: 24%;
    background: color-mix(in srgb, var(--dhe-icon-color) 26%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--dhe-icon-color) 44%, transparent),
      0 0 14px color-mix(in srgb, var(--dhe-icon-color) 16%, transparent);
  }

  .icon-bubble.animated ha-icon {
    filter: drop-shadow(
      0 0 5px
        color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-filter-alpha), transparent)
    );
    contain: paint;
    animation-play-state: var(--dhe-icon-motion-state, running);
  }

  .icon-bubble.animated.active::after,
  .icon-bubble.animated.active ha-icon {
    will-change: transform, opacity, filter, clip-path;
  }

  .icon-bubble.animated.motion-water-flow::after {
    background: linear-gradient(180deg, transparent 38%, currentColor 40%);
    animation: dhe-water-wave 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-flow ha-icon {
    animation: dhe-icon-float 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-fill::after {
    background: linear-gradient(180deg, transparent 42%, currentColor 44%);
    animation: dhe-water-fill 3.2s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-fill ha-icon {
    animation: dhe-water-fill-icon 3.2s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-energy ha-icon {
    animation: dhe-energy-spark 1.7s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-energy::after {
    animation: dhe-energy-glow 1.7s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-heat ha-icon {
    transform-origin: 50% 85%;
    animation: dhe-heat-flicker 2.1s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-heat::after {
    background:
      radial-gradient(circle at 45% 72%, currentColor 0 12%, transparent 13%),
      radial-gradient(circle at 58% 65%, currentColor 0 10%, transparent 11%);
    animation: dhe-heat-steam 2.1s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-eco ha-icon {
    transform-origin: 50% 82%;
    animation: dhe-leaf-sway 3.4s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-eco::after {
    animation: dhe-eco-orbit 3.4s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-timer::after {
    inset: 9px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    background: transparent;
    animation: dhe-timer-orbit 1.8s linear infinite;
  }

  .icon-bubble.animated.motion-timer ha-icon {
    transform-origin: center;
    animation: dhe-timer-tick 1.4s steps(2, end) infinite;
  }

  .icon-bubble.animated.motion-weather::after {
    background:
      radial-gradient(circle at 36% 50%, currentColor 0 23%, transparent 25%),
      radial-gradient(circle at 58% 46%, currentColor 0 30%, transparent 32%);
    animation: dhe-weather-cloud 3.6s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-weather ha-icon {
    animation: dhe-weather-drift 3.6s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-wellness::after {
    background:
      radial-gradient(circle at 42% 44%, currentColor 0 19%, transparent 21%),
      radial-gradient(circle at 58% 58%, currentColor 0 24%, transparent 26%);
    animation: dhe-wellness-aura 2.9s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-wellness ha-icon {
    transform-origin: 50% 75%;
    animation: dhe-heart-beat 2.2s ease-out infinite;
  }

  .icon-bubble.animated.motion-radio::after {
    animation: dhe-radio-pulse 2s ease-out infinite;
  }

  .icon-bubble.animated.motion-radio ha-icon {
    transform-origin: 50% 80%;
    animation: dhe-radio-beat 1.6s ease-out infinite;
  }

  .icon-bubble.animated.motion-safety::after {
    animation: dhe-shield-sweep 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-status::after {
    animation: dhe-status-signal 2.4s steps(4, end) infinite;
  }

  .icon-bubble.animated.motion-alert ha-icon {
    transform-origin: 50% 80%;
    animation: dhe-alert-shake 1.45s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-alert::after {
    animation: dhe-alert-pulse 1.45s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-memory ha-icon {
    animation: dhe-memory-rise 2.4s ease-in-out infinite;
  }
`;
