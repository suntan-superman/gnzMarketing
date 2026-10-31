"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAnalyticsMeasurementId, initializeAnalytics, trackPageView } from "@/lib/analytics";

const CONSENT_KEY = "gnz-analytics-consent";

export default function Analytics({ measurementId = "" }) {
  const [consent, setConsent] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const pathname = usePathname();
  const normalizedMeasurementId = getAnalyticsMeasurementId(measurementId);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "granted" || saved === "denied") {
      window.__gnzAnalyticsConsent = saved === "granted";
      setConsent(saved);
    }
  }, []);

  function choose(value) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.__gnzAnalyticsConsent = value === "granted";
    setConsent(value);
  }

  useEffect(() => {
    if (consent !== "granted" || !scriptLoaded || pathname?.startsWith("/admin")) return;
    if (initializeAnalytics(normalizedMeasurementId)) trackPageView(pathname || "/", document.title);
  }, [consent, normalizedMeasurementId, pathname, scriptLoaded]);

  if (!normalizedMeasurementId || pathname?.startsWith("/admin")) return null;
  return <>
    {consent === "granted" ? <>
      <Script id="gnz-gtag-bootstrap" strategy="afterInteractive">{"window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}; window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });"}</Script>
      <Script id="gnz-google-tag" src={`https://www.googletagmanager.com/gtag/js?id=${normalizedMeasurementId}`} strategy="afterInteractive" onLoad={() => setScriptLoaded(true)} />
    </> : null}
    {consent === null ? <aside className="analytics-consent" aria-label="Analytics consent"><p>GNZ uses privacy-conscious analytics to understand site performance. No names, email addresses, phone numbers, or property details are sent to analytics.</p><div><button className="button" type="button" onClick={() => choose("granted")}>Allow analytics</button><button className="button button-secondary" type="button" onClick={() => choose("denied")}>Decline</button></div></aside> : null}
  </>;
}
