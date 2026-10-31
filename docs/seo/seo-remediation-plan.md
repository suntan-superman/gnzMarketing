# GNZ Marketing Group — SEO Remediation Plan

Audit date: 2026-10-31  
This plan is based on the read-only production certification. It is not authorization to implement changes.

## Priority plan

| Priority | Task | Severity | Estimated effort | Code change? | Acceptance evidence |
|---|---|---:|---:|---|---|
| 1 | Verify/configure the approved production GA4 measurement ID and consented DebugView events | High | 1–2 hours | Environment/GA4; possibly none | GA4 records a consented page view and successful test conversion without PII |
| 2 | Record the exact Netlify deployment SHA/status with releases | Medium | 1–2 hours | Release workflow | Deployment artifact is provably tied to `origin/main` SHA |
| 3 | Validate a real published Insights and Selected Work record end to end | Medium | 2–4 hours | No immediate code change | Published detail returns 200, has unique metadata/canonical/schema/date, appears in sitemap; drafts do not |
| 4 | Decide the `/behavioral-sciences` legacy-route policy | Medium | 1–2 hours | Likely redirect/config | One intentional destination, no competing indexable duplicate |
| 5 | Measure Core Web Vitals with Lighthouse/PageSpeed on desktop and mobile | Medium | 2–4 hours | No initial code change | LCP, INP, CLS, mobile usability, and transfer sizes recorded |
| 6 | Optimize approved images if measurement identifies a material issue | Medium | 2–6 hours | Yes, if warranted | Before/after performance evidence; visual regression pass |
| 7 | Confirm GNZ local service area and GBP eligibility | High decision / low implementation | 1–2 hours stakeholder review | No until approved | Written decision on geography, address/service area, and eligibility |
| 8 | Add factual local/service-area content if approved | Medium | 4–8 hours | Content/code | Unique, accurate pages with internal links and metadata |
| 9 | Add a non-PII contact-form start event if funnel analysis is needed | Medium | 1–2 hours | Yes | Start and successful-submit events appear correctly in GA4 |
| 10 | Crawl newly published dynamic content and confirm internal links | Low | 1–3 hours per release | No or minor content change | No broken links/orphans in the release crawl |

## No-action items

The current sitemap, robots policy, public canonical tags, public metadata, basic structured data, and admin noindex controls showed no blocking defect. Do not change them merely to create activity.

## Risks and dependencies

- Search Console indexing status remains pending in the project-provided brief; no indexing guarantee is made.
- Production deployment identity was not independently available.
- Local SEO work depends on verified business operations.
- Dynamic SEO depends on approved content publication.
- Any implementation should preserve GNZ Admin, Supabase authorization, contact/lead handling, investment gating, and existing redirects.
