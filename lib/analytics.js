export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || window.__gnzAnalyticsConsent !== true || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
