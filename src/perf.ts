/// <reference types="vite/client" />

type PerfMarks = Window & {
  __DHE_CONNECT_DEBUG_TIMING__?: boolean;
};

export function measure<T>(label: string, run: () => T): T {
  if (!perfDebugEnabled()) {
    return run();
  }
  const start = performance.now();
  const result = run();
  const duration = performance.now() - start;
  console.debug(`[dhe-connect-card][perf] ${label}: ${duration.toFixed(2)}ms`);
  return result;
}

function perfDebugEnabled(): boolean {
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return false;
  }
  return Boolean((window as PerfMarks).__DHE_CONNECT_DEBUG_TIMING__);
}
