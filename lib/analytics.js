const SAFE_PARAM_KEYS = new Set([
  "destination",
  "form_location",
  "location",
  "page_path",
  "page_title",
  "service_interest",
]);

export function getAnalyticsMeasurementId(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function sanitizeAnalyticsParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => SAFE_PARAM_KEYS.has(key) && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")),
  );
}

export function initializeAnalytics(measurementId) {
  if (typeof window === "undefined" || window.__gnzAnalyticsConsent !== true) return false;
  const id = getAnalyticsMeasurementId(measurementId);
  if (!id || typeof window.gtag !== "function") return false;
  if (window.__gnzAnalyticsConfiguredMeasurementId !== id) {
    window.gtag("js", new Date());
    window.gtag("config", id, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false,
    });
    window.__gnzAnalyticsConfiguredMeasurementId = id;
  }
  return true;
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || window.__gnzAnalyticsConsent !== true || typeof window.gtag !== "function") return false;
  window.gtag("event", name, sanitizeAnalyticsParams(params));
  return true;
}

export function trackPageView(pathname, title = "") {
  if (!pathname || typeof window === "undefined" || window.__gnzAnalyticsConsent !== true || typeof window.gtag !== "function") return false;
  if (window.__gnzAnalyticsLastPagePath === pathname) return false;
  const tracked = trackEvent("page_view", { page_path: pathname, page_title: title });
  if (tracked) window.__gnzAnalyticsLastPagePath = pathname;
  return tracked;
}
