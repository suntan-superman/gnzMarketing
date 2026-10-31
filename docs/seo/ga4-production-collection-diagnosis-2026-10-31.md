# GNZ Marketing — GA4 Production Collection Diagnosis

Date: 2026-10-31  
Production: `https://gnzmarketingllc.com`  
Deployment: not performed from this workspace

## Conclusion

**Confirmed application defect: the deployed analytics implementation did not send Google Consent Mode commands.** The site had a consent banner and blocked the tag until acceptance, but it did not send a `consent default` or a `consent update` command. This leaves the consent state uninitialized from Google’s perspective and is consistent with Tag Assistant reporting missing tag/consent detection even though collection requests receive HTTP 204 responses.

The smallest safe local fix has been implemented. It preserves basic consent behavior: no Google tag loads before acceptance; after acceptance, analytics storage is granted while advertising-related consent remains denied.

## Production evidence

Read-only inspection of the deployed homepage and its JavaScript bundle found:

- Homepage returned HTTP 200 from Netlify.
- The production Measurement ID is passed into the client component; it is not hardcoded in the repository.
- The initial HTML includes the consent banner and does not load the Google tag before consent.
- The deployed analytics bundle contained `send_page_view: false`, the manual pageview logic, the correct tag URL construction, and the Measurement ID path.
- The deployed bundle did not contain `analytics_storage`, a Consent Mode `default` command, or a Consent Mode `update` command.
- No Content-Security-Policy response header was present, so the HTTP response did not show a CSP policy that would block the Google tag. Browser extension interference was not independently testable here.
- Application search found one analytics component and one analytics helper; no second Google tag or competing GA4 implementation was found.

The supplied browser evidence additionally confirms that collection requests reached Google, returned HTTP 204, used the correct Measurement ID, transmitted `page_view`, and handled client-side navigation.

## Consent-state analysis

Before this local fix, the flow was:

1. Render the banner without loading Google’s tag.
2. On acceptance, load the bootstrap and Google tag.
3. Call `config` and manually send `page_view`.

The missing steps were:

1. `gtag('consent', 'default', ...)` before the tag/config commands.
2. `gtag('consent', 'update', ...)` after the visitor accepts.

Google documents that a manually managed consent banner must initialize consent defaults and update the consent state after interaction. The fix now sends:

- Default: `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage` = `denied`.
- Accepted analytics choice: `analytics_storage` = `granted`; advertising-related consent remains `denied`.

This keeps the existing privacy promise and does not disable consent gating.

## `gcd`, `gcs`, and `npa`

- `gcs` is Google’s transport signal for `ad_storage` and `analytics_storage` consent state.
- `gcd` carries detailed Consent Mode information. Google documents that its encoding is compact and may change; it should be interpreted through Tag Assistant rather than decoded with an application-specific guess.
- `npa=1` is expected under the existing `allow_ad_personalization_signals: false` setting. Google documents that this marks hits as ineligible for personalized advertising. It does not mean that GA4 measurement itself is disabled.

Sources: [Google Consent Mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode), [Google consent debugging](https://developers.google.com/tag-platform/security/guides/consent-debugging), and [Google privacy controls](https://developers.google.com/tag-platform/security/guides/privacy).

## Sessions and automatic events

The application intentionally sets `send_page_view: false` to prevent duplicate initial pageviews, then sends one deduplicated `page_view` event for the initial pathname and each client-side pathname change. The parameter allowlist only filters application-supplied custom parameters; it does not remove GA4’s own event/session fields.

When the Google tag is initialized correctly, GA4 normally generates `session_start` and `first_visit` automatically when appropriate. The supplied browser evidence did not include those events, and this workspace has no authenticated DebugView or browser automation session to independently confirm them. They must be checked after deploying the fix.

Google documents these automatically collected events in [GA4 troubleshooting](https://developers.google.com/analytics/devguides/collection/ga4/troubleshoot) and [automatically collected events](https://support.google.com/analytics/answer/9234069).

## Local fix

Changed files:

- `components/Analytics.js`: adds the denied Consent Mode default to the pre-tag bootstrap.
- `lib/analytics.js`: sends the accepted-consent update before `js`, `config`, and pageview commands.
- `tests/validation.test.js`: verifies default/update presence, analytics storage grant, pageview deduplication, automatic-pageview suppression, and PII filtering.

No contact form, Supabase, Admin, DNS, Netlify environment, or production data was changed.

## Verification results

| Check | Result |
|---|---|
| Automated tests | PASS — 16/16 |
| ESLint | PASS |
| Next.js production build | PASS — Next.js 16.4.1 |
| Production dependency audit | PASS — 0 vulnerabilities with production dependencies |
| Full dependency audit | 5 moderate development-dependency advisories remain; no automatic fix applied |
| Production form submission | Not performed, per safety requirement |
| Tag Assistant | Not directly accessible from this workspace |
| GA4 DebugView | Not directly accessible from this workspace |

## Post-deployment verification

After authorized deployment, use a fresh browser session and Google Tag Assistant:

1. Open the production URL and confirm the earliest Consent event sets all four defaults to denied.
2. Select **Allow analytics** and confirm the update sets `analytics_storage` to granted while the three advertising-related values remain denied.
3. Confirm one Google tag/configuration and one initial `page_view`.
4. Navigate to another route and confirm exactly one additional `page_view`.
5. In DebugView, confirm `session_start` and `first_visit` when appropriate; do not submit a production contact form during this verification.
6. Confirm requests use the non-www production stream and the approved Measurement ID.
7. If Realtime remains empty after this verification, review the selected GA4 property/data stream, data filters, internal-traffic configuration, and reporting delay. The internal filter being in Testing mode should not by itself exclude the traffic.

No deployment was initiated.
