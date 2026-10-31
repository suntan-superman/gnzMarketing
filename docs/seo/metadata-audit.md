# GNZ Marketing Group — Metadata Audit

Audit date: 2026-10-31  
Scope: the 17 URLs returned by the production sitemap, plus representative private/legacy routes.

## Certification

**PASS WITH OBSERVATIONS.** All 17 sitemap URLs returned non-empty titles, descriptions, canonicals, Open Graph titles/images, and Twitter cards. No duplicate canonical was observed. Public pages did not emit a blocking robots meta tag.

## Verified coverage

| Check | Result | Evidence |
|---|---|---|
| Title present | PASS | 17/17 production sitemap URLs |
| Description present | PASS | 17/17 |
| Canonical present | PASS | 17/17; HTTPS; self-referencing; no UTM parameters |
| Open Graph title/image | PASS | 17/17 |
| Twitter/X card | PASS | 17/17; `summary_large_image` |
| Public robots metadata | PASS | No `noindex` observed on public sitemap URLs |
| Duplicate canonical | PASS | None observed |
| Preferred host | PASS | `www` returned HTTP 301 to `https://gnzmarketingllc.com/` |
| Admin protection | PASS | `/admin/login` returned `noindex, nofollow`; protected admin layout also declares noindex |

## Representative title and description audit

| Path | Title | Description assessment |
|---|---|---|
| `/` | Business Development, Marketing & Real Estate \| GNZ Marketing Group | Specific, branded, and aligned to the site proposition |
| `/services` | What We Do \| GNZ Marketing Group | Specific service overview |
| `/marketing` | Marketing \| GNZ Marketing Group | Service-specific and useful |
| `/business-development` | Business Development \| GNZ Marketing Group | Service-specific and useful |
| `/real-estate` | Real Estate \| GNZ Marketing Group | Specific; does not make unsupported brokerage claims |
| `/about` | About GNZ Marketing Group | Brand/about intent |
| `/insights` | Insights \| GNZ Marketing Group | Appropriate list-page title |
| `/selected-work` | Selected Work \| GNZ Marketing Group | Appropriate list-page title |
| `/contact` | Contact GNZ Marketing Group | Clear conversion intent |

Descriptions were unique in the production audit and generally within a useful search-snippet range. No generic placeholder text or wrong-brand reference was observed.

## Findings

| Severity | Affected URL/file | Evidence | Business impact | Recommended remediation | Code change? |
|---|---|---|---|---|---|
| Medium | `/insights/[slug]`, `/selected-work/[slug]` | No published records existed, so production detail-page metadata could not be exercised | Article/detail metadata is not yet production-certified with real content | Publish a controlled test record when content is ready, then verify title, description, canonical, dates, OG image, and schema | No current change |
| Low | `lib/seo.js` | The shared social image is reused for all pages and its metadata does not declare dimensions | Social previews are functional but may be less distinctive or predictable across pages | Add page-specific approved images and dimensions only when approved assets exist | Optional code/content change |
| Low | Public H1 extraction | Automated HTML text extraction is not reliable around icon/hidden markup; source pages render H1 elements | No confirmed H1 defect; avoid treating parser output as a content issue | Validate H1s with a DOM-aware crawler if needed | No current change |

## Recommended metadata improvements (not defects)

1. When Insights and Selected Work are populated, use unique, concise titles based on each published record.
2. Add approved page-specific social images only where they materially improve sharing.
3. Keep the canonical origin fixed at `https://gnzmarketingllc.com`; do not introduce tracking parameters.
