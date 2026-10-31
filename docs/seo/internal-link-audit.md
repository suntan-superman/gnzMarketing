# GNZ Marketing Group — Internal Link Audit

Audit date: 2026-10-31  
Scope: public navigation, page-level CTAs, sitemap routes, redirects, and known legacy destinations.

## Certification

**PASS WITH OBSERVATIONS.** No broken link was identified in the audited route set. The sitemap’s 17 URLs are represented through header navigation, footer navigation, or page-level links. Dynamic detail links could not be exercised because no published records were available.

## Link structure observed

- Header navigation exposes Home, What We Do, Real Estate, About GNZ, Hub/Insights, and Contact.
- What We Do links to Marketing, Business Development, Strategic Partnerships, and Behavioral Insight.
- Real Estate links to its overview and investment subareas; gated opportunity links remain unavailable while disabled.
- About links to the company page, approach, and both principal profiles.
- Footer links reinforce the core service pages, Real Estate, Approach, Insights, and Jobs.
- Home and service pages use CTA links to Contact; tracked telephone and email links are available in the site frame/footer.
- Marketing cross-links to Behavioral Insight and Performance Marketing; Business Development cross-links to Strategic Partnerships.

## Redirect and legacy checks

| URL | Result |
|---|---|
| `https://www.gnzmarketingllc.com/` | HTTP 301 to preferred non-www HTTPS root |
| `/hub` | HTTP 307 to `/insights` |
| `/hub/example` | HTTP 307 to `/insights/example` |
| `/behavioral-sciences` | HTTP 200 legacy page; canonical/branding should be monitored against `/behavioral-insight` |
| `/real-estate/investment-opportunities` | HTTP 404 while the global gate is disabled |

## Findings

| Severity | Affected URL/file | Evidence | Business impact | Recommended remediation | Code change? |
|---|---|---|---|---|---|
| Medium | `/behavioral-sciences` and `/behavioral-insight` | Legacy route remains reachable with HTTP 200 while the newer service route is in the sitemap | Two destinations may split signals or create overlapping search results | Decide whether to retain the legacy route with a clear canonical or add an authorized permanent redirect; verify before changing | Likely code/config change |
| Medium | Dynamic detail routes | No published Insights or Selected Work records were available | Orphan/broken detail links cannot yet be certified | After publication, crawl every detail link and confirm list → detail → Contact/related-service paths | No immediate change |
| Low | `/services` and priority service pages | Navigation is good, but an explicit services hub link from every relevant service/detail page was not uniformly verified | Some topical paths may receive less internal authority | Add contextual links where useful, without repetitive anchor text | Optional code/content change |

## Conclusion

The primary information architecture is coherent and supports the requested business areas. The legacy behavioral route and future database-driven detail pages are the main follow-up items.
