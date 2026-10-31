# GNZ Marketing Group — Structured Data Audit

Audit date: 2026-10-31  
Scope: production HTML and local schema helpers.

## Certification

**PASS WITH OBSERVATIONS.** Production JSON-LD was valid JSON and consistent with visible site identity. Organization and WebSite data are present sitewide; BreadcrumbList is present on the Insights and Selected Work list pages. Article schema is implemented for dynamic detail pages but could not be observed with a published record.

## Observed production schemas

| Page type | Schemas observed | Result |
|---|---|---|
| Homepage and fixed public pages | `Organization`, `WebSite` | PASS |
| `/insights` | `Organization`, `WebSite`, `BreadcrumbList` | PASS |
| `/selected-work` | `Organization`, `WebSite`, `BreadcrumbList` | PASS |
| Published Insights detail | `Article` helper exists; no published record available | NOT VERIFIED |
| Published Selected Work detail | Breadcrumb/detail implementation exists; no published record available | NOT VERIFIED |
| Investment Opportunity detail | Gate disabled and route unavailable | NOT VERIFIED / intentionally unavailable |

The production homepage contained two actual JSON-LD script blocks, both valid: Organization and WebSite. RSC serialization references were not counted as additional rendered JSON-LD blocks.

## Consistency and safety

- Organization name, URL, and email match GNZ branding.
- WebSite URL matches the preferred HTTPS origin.
- Breadcrumb URLs are absolute HTTPS URLs.
- Article helper uses published/updated content dates and an Organization author/publisher.
- No fabricated reviews, ratings, physical address, license claims, or unsupported investment claims were found.
- No LocalBusiness schema is present, which is appropriate until operating location, service area, and eligibility are confirmed.

## Findings

| Severity | Affected URL/file | Evidence | Business impact | Recommended remediation | Code change? |
|---|---|---|---|---|---|
| Medium | Dynamic Insights/Selected Work detail routes; `lib/seo.js` | Article/detail behavior could not be validated against a live published record | A defect could remain hidden until the first publication | Validate one approved published record end to end before publishing a larger content set | No immediate change; regression test/certification later |
| Medium | Organization schema | `Organization` contains name, URL, and email only | Search engines receive basic identity but not richer verified organization information | Add only verified social profiles, logo, phone, or service-area facts after authorization | Optional code change |
| Low | LocalBusiness schema | None present | No local enhancement is available, but there is no risk of an incorrect address/category | Do not add until GNZ’s actual operations and GBP eligibility are confirmed | No current change |

## Conclusion

The existing schema is conservative and non-misleading. The main remaining task is production validation after real dynamic content is published, not immediate schema expansion.
