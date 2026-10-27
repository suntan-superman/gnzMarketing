# GNZ Marketing Group — First 30 Days: SEO and Website Implementation
**Prepared by:** Workside Software LLC  
**Client:** GNZ Marketing Group, LLC  
**Date:** October 13, 2026  
**Basis:** Previously proposed fixed-scope SEO Proposal A ($3,500 / 30 days) and Proposal B ($6,500 / 45–60 days). This is an execution plan, not an expansion of the contracted deliverables.

## Shared objectives and non-negotiable requirements
Run two clearly differentiated organic-search acquisition campaigns: (1) Bakersfield/Kern County property sellers and (2) prospective real estate investors/buyers. Capture inquiries reliably, tag their source, measure form completions, and give GNZ a manageable follow-up workflow. Preserve GNZ Marketing Group's umbrella positioning and existing green design, leadership biographies, contact forms, Admin panel, domain, and published content. Avoid implying licensed brokerage status, guaranteed cash offers, guaranteed closings or returns. **Do not publish investment opportunities.**

**Approval gate before public seller copy:** Gabe must confirm whether GNZ purchases assignable contract interests, purchases directly, or instead introduces third parties. A California real-estate attorney should review licensing-sensitive copy, transaction representations and disclosures. Until then, use neutral, factual language and develop pages in a nonpublic review environment.

**Shared measurement specification:** GA4 events `seller_form_submit` and `investor_form_submit` on confirmed server-side submission success (not merely button clicks); track page location, campaign and consent-compatible attribution. Do not send names, email, phone, street address or other personal data to GA4. Configure Google Search Console and submit valid XML sitemap(s) after launch. Track organic impressions, clicks, engaged sessions, form starts, successful submissions, qualified leads and follow-up status. Set baseline as zero/unknown where no historical data exists; never fabricate performance.

**Shared programming principles:** Inspect the actual repository before choosing routes or schema. Reuse the existing GNZ Next.js/Netlify/Supabase stack and Admin controls where viable. Implement server-side validation, spam/rate limiting, role-based admin access, Supabase RLS, safe migrations, privacy/consent notices, and notifications only through existing configured providers. Do not expose service-role keys or private seller details to clients or public pages. Confirm the site framework and current deployment setup before making assumptions.

---

# SCENARIO A — EXISTING GNZ WEBSITE ONLY
**Fee:** $3,500 fixed  | **Delivery target:** 30 calendar days after access, content and compliance prerequisites  
**Public sites:** `gnzmarketingllc.com` only. **No separate seller domain.**

## Week 1 — Days 1–7: Discovery, baseline, architecture
**Business/SEO:** Kickoff; verify seller transaction model and intended buyer/investor audience; confirm service area and actual claims; collect contact routing requirements. Audit crawlability, robots, sitemap, canonicals, indexability, 404s/redirects, heading hierarchy, title/description uniqueness, Core Web Vitals and mobile usability. Review competitor pages and map search intent for seller vs investor queries; prioritize achievable, relevant phrases rather than assumed volumes.

**Programming:** Inspect current route tree, form submission APIs, Supabase schema/RLS, admin lead views, analytics integration and environment variables. Produce short implementation map showing pages and existing components to reuse. Establish or verify Search Console domain property via Cloudflare DNS, GA4 and conversion plan; do not disturb Netlify DNS/SSL. Snapshot current build/test baseline and prepare rollback plan.

**Day-7 outputs:** Audit and prioritized issue list; keyword-to-page map; wireframes/copy outlines for both funnels; field schema and security review; analytics baseline; explicit copy approval checklist.

## Week 2 — Days 8–14: Build both lead funnels
**Seller page:** Create a clear seller-focused page under the existing GNZ Real Estate hierarchy (example `/real-estate/sell-your-property`, subject to route audit). Explain who GNZ is, what a homeowner can expect, service area, frequently asked questions, and one primary CTA. Do not claim GNZ itself will buy a property or pay cash unless verified.

**Investor page:** Create or upgrade an investor-focused landing page (example `/real-estate/investors`), emphasizing relationship-building, acquisition interests and contact intake; do not publicly display unapproved opportunities.

**Forms/database:** Seller fields: contact name, email or phone, property city/address, property type, general condition, desired timing, optional notes, privacy acknowledgement. Investor fields: contact, geographic interests, property types, general acquisition criteria, optional notes. Minimize required fields and collect only necessary data. Save server-side into existing lead model or additive migration with `lead_type`, `source_site`, `landing_page`, `utm_*`, `status`, `created_at`; RLS prevents public reads. Ensure duplicate submission handling, error/success states and notification routing. Extend Admin lead filters for seller/investor only if the existing model supports it without a CRM rebuild.

**Day-14 outputs:** Responsive pages and functional form flows on review deployment; tested admin lead visibility and source tagging; no production release until approved.

## Week 3 — Days 15–21: On-page SEO and content
Optimize up to **five existing GNZ pages** (including Real Estate and supporting service pages) for distinct search intent, human-readable headings, accurate titles/meta descriptions, internal links and appropriate local signals. Deliver **four content assets/sections total**: two seller-focused and two investor-focused; reuse approved Hub/Insights material where relevant. Add canonical tags, schema only when accurate (Organization, BreadcrumbList, Article as appropriate), XML sitemap and sensible robots policy; exclude admin, drafts and disabled opportunity pages. Check page rendering/indexability and avoid duplicate near-identical location pages.

**Day-21 outputs:** Search-optimized copy, metadata inventory, technical changes merged into review branch, content approval list.

## Week 4 — Days 22–30: QA, launch, measurement, handoff
Test at 375/390/768/1280/1440 widths; validate form input, server errors, anti-spam, email routing, admin permissions, RLS, keyboard use, performance and accessibility. Verify GA4 successful-submission events and that no PII is transmitted. Confirm Search Console ownership, sitemap/robots, redirects, HTTPS and noindex controls. Obtain written approval for sensitive seller copy, then deploy via normal Netlify workflow. Run production smoke tests with test leads, remove test records, and hand off a dashboard baseline plus 60–90-day recommendations.

**Day-30 acceptance:** Two live lead pages, two working secure intake paths, campaign/source attribution, approved technical SEO corrections, up to five optimized existing pages, four content assets/sections, analytics and Search Console, QA evidence, training/handoff and a ranked next-quarter plan.

---

# SCENARIO B — SELL MY KERN HOME + GNZ INVESTOR CAMPAIGN
**Fee:** $6,500 fixed  | **Full proposal timeline:** 45–60 days  
**First 30 days:** Foundation and working review build, **not a promise of completed public launch**.  
**Public destinations at completion:** `SellMyKernHome.com` for seller intent; `gnzmarketingllc.com` for corporate/investor intent.

## Week 1 — Days 1–7: Discovery, domain, brand and architecture
Complete the same legal/business clarification, competitor/keyword research, Search Console/GA4 baseline and repository audit as Scenario A. Confirm domain purchase/ownership (registration fee separate), Cloudflare DNS strategy and Netlify site configuration. Define seller-site name, GNZ affiliation/disclosure, page map and design direction. Avoid copying competitor site content or graphics. Decide on single codebase vs separate site repo based on existing architecture, deployment isolation and maintenance needs. Prefer distinct deployment with shared secure lead services; no duplicate Admin panel.

**Programming:** Define Supabase tenant/source segregation and RLS; document which existing GNZ Admin views and notification mechanisms can be reused. Prepare environment variable matrix and deployment secrets plan. Draft responsive components and a content approval matrix.

**Day-7 outputs:** Site map and wireframes; approved brand/copy direction; DNS/deployment plan; shared lead-data design; SEO/measurement plan.

## Week 2 — Days 8–14: New seller website shell
Implement mobile-first seller website templates/components with GNZ affiliation and green-compatible but differentiated identity. Within the **up-to-six-core-page/template** contract, prioritize: (1) Home/seller CTA, (2) How It Works, (3) Seller FAQs, (4) Bakersfield/Kern County service area, (5) Contact/seller intake, (6) Privacy/disclosures (legal wording supplied/approved by GNZ). No misleading “guaranteed offer” claims. Implement accessibility, responsive navigation, clear contact information and editable content structure consistent with existing GNZ CMS capabilities where practical.

**Day-14 outputs:** Browsable review build with core page templates, draft copy and working navigation; no unreviewed public transaction claims.

## Week 3 — Days 15–21: Forms, shared admin, investor campaign
Build seller inquiry form with secure API, server validation, spam protection and private Supabase storage. Reuse GNZ Admin lead workflows; add source-site, campaign and seller/investor filters, but **do not build a full new CRM**. Add investor landing page and form to GNZ (or optimize existing route), with distinct messaging and no public investment listings. Confirm notification delivery, failure behavior, duplicate handling and source attribution across both domains. Ensure CORS, environment segregation, RLS and data privacy are verified for cross-site intake.

**Day-21 outputs:** Both lead funnels functional in review environments, shared lead records correctly labeled, admin access restricted and notifications tested.

## Week 4 — Days 22–30: Technical SEO, content, launch readiness
Set up separate Search Console properties and per-site GA4 measurement, consent-aware event tracking, canonical domains, sitemaps, robots, structured data where warranted, Open Graph tags, page performance and internal links. Build the first seller- and investor-focused content assets toward the proposal's **up-to-six total targeted assets/sections**. Optimize GNZ investor/Real Estate content; check indexability and duplicate content across domains. Complete mobile and accessibility QA; test lead capture end to end. Prepare client preview and a punch list with blockers, legal approvals, and launch steps.

**Day-30 acceptance (interim milestone):** New seller site core pages working in preview, secure seller form, GNZ investor landing/form, shared lead attribution/admin visibility, initial technical SEO and analytics, first content assets, documented QA and remaining-work backlog. **Not yet acceptance of the entire $6,500 project.**

## Days 31–60 — Completion work already included in Proposal B
Finish remaining targeted content (up to six total), revise copy from Gabe/legal feedback, harden performance/security, complete cross-site analytics verification, configure live DNS/SSL, launch both campaigns following approval, submit both sitemaps, conduct production smoke tests, and deliver the 90-day growth roadmap and handoff. Target weeks 6–8 for final deployment, subject to timely approvals.

---

# Shared deliverable ownership and checkpoints
| Deliverable | Workside Software | GNZ / Gabe |
|---|---|---|
| SEO audit, keyword map, technical fixes | Build and document | Review target services and markets |
| Seller and investor copy | Draft and implement | Confirm actual operations and approve claims |
| Legal/compliance review | Flag questions; implement approved text | Obtain California counsel review |
| Site design, programming and QA | Implement, test and deploy after approval | Review preview within 3 business days |
| Search Console / GA4 | Configure with authorized access | Own Google accounts and provide permissions |
| Lead storage / notifications | Implement securely using existing systems | Specify recipients and follow-up owner |
| Content examples / business proof | Format approved materials | Provide genuine evidence; approve publication |

## Definition of done for each campaign
1. Landing page loads on mobile and desktop and clearly identifies who GNZ serves.
2. Contact form accepts valid submissions, rejects malformed/spam input and handles errors without losing clarity.
3. Lead appears in authorized admin view with correct seller/investor and site/campaign attribution; public users cannot read it.
4. Success event fires once after confirmed submission, with no personal data in analytics.
5. Canonical/indexing metadata and sitemap are correct; page is internally linked.
6. Contact owner receives notification (where provider configured) and can follow up.
7. Approved copy makes no unsupported licensing, offer, investment or performance claims.

## Dependencies, exclusions and change control
**Client dependencies:** Access to source, Netlify, Cloudflare, Supabase, Google accounts and notification provider; business/transaction-model confirmation; legal approval; prompt copy reviews; domain purchase for B. **Excluded:** paid ads, paid backlink campaigns, purchased SEO tools, property marketplace, investor login portal, custom full CRM, ongoing monthly content, legal services and guaranteed leads/rankings. Any expansion (e.g., automations, SMS campaigns, advanced lead scoring, additional locations or listing systems) requires separate written scope and pricing. If approval delays or third-party access prevent a milestone, record the blocker and adjust dates transparently.

## Recommended sequencing
**Scenario A** is the fastest, lower-cost way to validate two funnels with one site. **Scenario B** is better brand separation for homeowner intent but needs an additional 15–30 days and will start without established domain authority. Neither should be judged by closed transactions in its first month; establish accurate baseline tracking and improve after real data arrives.
