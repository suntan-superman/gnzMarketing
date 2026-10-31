# GNZ Marketing Group — Analytics Readiness

Audit date: 2026-10-31

## Certification

**PASS WITH OBSERVATIONS for implementation; NOT VERIFIED/NOT CONFIGURED for production collection.** The code has consent-gated GA4 support and a successful-lead event that avoids submitted PII. Production HTML indicated an undefined measurement ID, so active GA4 collection could not be confirmed.

## Implementation review

| Capability | Result | Evidence |
|---|---|---|
| Measurement ID source | PASS | `NEXT_PUBLIC_GA_MEASUREMENT_ID` is passed from `app/layout.js` to `components/Analytics.js` |
| Script loading | PASS WITH OBSERVATIONS | GA script loads only after local consent and only when an ID exists |
| Privacy behavior | PASS | Consent stored locally; IP anonymization, Google Signals, and ad personalization are disabled |
| Admin exclusion | PASS | Analytics component returns nothing on `/admin` paths |
| Successful lead conversion | PASS | `generate_lead` fires only after `/api/contact` returns success |
| PII protection | PASS | Event parameters contain form location and service interest, not name, email, phone, message, or property details |
| Contact form starts | NOT IMPLEMENTED | No `form_start` event exists |
| Inquiry segmentation | PASS WITH OBSERVATIONS | Service interest is a parameter on `generate_lead`, not separate event names |
| Phone/email/CTA clicks | PASS in code | `phone_click`, `email_click`, and CTA events are wired through tracked links |
| Production measurement ID | NOT VERIFIED | Production HTML exposed an undefined measurement ID and no active GA script was confirmed |

## Findings

| Severity | Affected URL/file | Evidence | Business impact | Recommended remediation | Code change? |
|---|---|---|---|---|---|
| High | Production GA4 configuration; `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production output indicated the measurement ID was undefined | Visits and conversions may not be recorded | Configure the approved GA4 measurement ID in the deployment environment, redeploy through the normal release process, and verify a consented test visit in DebugView | Environment/deployment change; no audit change made |
| Medium | Contact form | No form-start event; only successful submissions are converted | Funnel abandonment cannot be measured | Add a non-PII form-start event if funnel analysis is required | Code change |
| Medium | Consent behavior | Consent is a local opt-in banner, but legal retention/consent policy was not provided | Analytics compliance and reporting expectations remain unverified | Confirm privacy/consent requirements and document the operating policy before enabling collection | Policy/configuration; possibly code |
| Low | Service-interest reporting | Interest is an event parameter rather than separate event names | Reporting requires parameter-based exploration | Register/standardize the parameter in GA4 and document reports | GA4 configuration |

No analytics code or environment variable was changed during this audit. No production test lead or email was sent.
