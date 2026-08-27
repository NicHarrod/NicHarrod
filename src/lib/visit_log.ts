const ENDPOINT = '/api/log'

export function logVisit(page: string): void {
  if (import.meta.env.DEV) return

  try {
    const payload = {
      page,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      dpr: window.devicePixelRatio,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lang: navigator.language,
    }

    const body = new Blob([JSON.stringify(payload)], { type: 'application/json' })
    if (!navigator.sendBeacon(ENDPOINT, body)) {
      void fetch(ENDPOINT, { method: 'POST', body, keepalive: true }).catch(() => {})
    }
  } catch {
    // Logging must never break the page.
  }
}
