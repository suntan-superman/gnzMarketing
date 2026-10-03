export function getSessionCookieOptions(requestHeaders, siteUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  let configuredUrl;
  try {
    configuredUrl = new URL(siteUrl);
  } catch {
    // The request still supplies local/HTTPS information when no site URL is set.
  }

  const requestHost = requestHeaders?.get("host") || requestHeaders?.get("x-forwarded-host")?.split(",")[0]?.trim();
  let hostname = configuredUrl?.hostname || "";
  if (requestHost) {
    try {
      hostname = new URL(`http://${requestHost}`).hostname;
    } catch {
      hostname = "";
    }
  }

  const localHost = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "[::1]" || /^127\./.test(hostname);
  const forwardedProtocol = requestHeaders?.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: !localHost && Boolean(forwardedProtocol === "https" || configuredUrl?.protocol === "https:"),
  };
}
