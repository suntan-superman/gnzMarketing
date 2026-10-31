"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CONSENT_KEY = "gnz-analytics-consent";

export default function Analytics({ measurementId = "" }) {
  const [consent, setConsent] = useState(null);
  const pathname = usePathname();

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

  if (!measurementId || pathname?.startsWith("/admin")) return null;
  return <>
    {consent === "granted" ? <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="gnz-gtag" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });`}</Script>
    </> : null}
    {consent === null ? <aside className="analytics-consent" aria-label="Analytics consent"><p>GNZ uses privacy-conscious analytics to understand site performance. No names, email addresses, phone numbers, or property details are sent to analytics.</p><div><button className="button" type="button" onClick={() => choose("granted")}>Allow analytics</button><button className="button button-secondary" type="button" onClick={() => choose("denied")}>Decline</button></div></aside> : null}
  </>;
}
