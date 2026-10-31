# GNZ Marketing Group — Sitemap Certification

Audit date: 2026-10-31  
URL audited: `https://gnzmarketingllc.com/sitemap.xml`

## Certification

**PASS.** The production sitemap returned HTTP 200, valid XML, and exactly 17 canonical HTTPS URLs. Every returned URL was requested individually and returned HTTP 200 without a redirect.

## URL-by-URL results

| # | URL path | HTTP | Redirect | Canonical | Robots/meta | Public content |
|---:|---|---:|---|---|---|---|
| 1 | `/` | 200 | none | self | indexable | present |
| 2 | `/services` | 200 | none | self | indexable | present |
| 3 | `/marketing` | 200 | none | self | indexable | present |
| 4 | `/business-development` | 200 | none | self | indexable | present |
| 5 | `/strategic-partnerships` | 200 | none | self | indexable | present |
| 6 | `/behavioral-insight` | 200 | none | self | indexable | present |
| 7 | `/data-science` | 200 | none | self | indexable | present |
| 8 | `/performance-marketing` | 200 | none | self | indexable | present |
| 9 | `/real-estate` | 200 | none | self | indexable | present |
| 10 | `/approach` | 200 | none | self | indexable | present |
| 11 | `/about` | 200 | none | self | indexable | present |
| 12 | `/about/gabriel-gonzales` | 200 | none | self | indexable | present |
| 13 | `/about/zay-aaron-julian` | 200 | none | self | indexable | present |
| 14 | `/insights` | 200 | none | self | indexable | present |
| 15 | `/selected-work` | 200 | none | self | indexable | present |
| 16 | `/jobs` | 200 | none | self | indexable | present |
| 17 | `/contact` | 200 | none | self | indexable | present |

## Integrity checks

- XML parsed successfully with the sitemap namespace.
- Count is 17, matching the project-provided Search Console discovery count.
- All URLs use `https://gnzmarketingllc.com`.
- No duplicate URLs, query parameters, Netlify staging URLs, admin routes, API routes, malformed paths, or disabled investment-opportunity URLs were returned.
- Insights and Selected Work detail URLs are generated only for published database records. No published records were present during this audit, so no dynamic detail URLs appeared.
- The investment publishing gate was disabled in production; opportunity URLs were excluded.

## Findings

| Severity | Affected URL/file | Evidence | Business impact | Recommended remediation | Code change? |
|---|---|---|---|---|---|
| Low | `app/sitemap.js` | The final `.replace(SITE_ORIGIN, SITE_ORIGIN)` is behaviorally a no-op | No current sitemap defect; the expression may confuse future maintenance | Simplify only during a separately authorized cleanup | Optional |
| Medium | Dynamic detail URLs | No published Insights or Selected Work records were available to validate real detail pages | Dynamic SEO remains unproven until content exists | After publication, re-run URL-by-URL status, canonical, metadata, and date checks | No immediate code change |

## Conclusion

The current production sitemap is internally consistent and safe for continued Search Console monitoring. It does not claim unpublished or gated content.
