# GNZ Marketing Group — Codex Implementation Brief
**Revision:** October 2026 client review | **Source of truth:** Gabriel's latest supplied direction | **Website:** https://gnzmarketingllc.com/

## Mission and boundaries
Refine the existing GNZ website; do **not** rebuild it. Reposition GNZ as an umbrella organization connecting strategy, relationships, business development, marketing, real estate and opportunity. Preserve the established green visual system, existing contact information, working forms, Gabriel and Zay profiles, legitimate existing content, site integrations, accessibility, and Netlify/Cloudflare configuration. Produce a polished **review build**, not an automatic production release.

**Priority order:** (1) Gabriel's new explicit requirements; (2) preserve functioning site and factual existing information; (3) thoughtful copy/layout recommendations where Gabriel left flexibility. Do not invent credentials, clients, transactions, investment performance, regulatory status, or project examples.

## Initial repository audit — mandatory before editing
1. Inspect package scripts, framework, routing, component tree, styling/tokens, navigation data, contact form submission pipeline, analytics/SEO, deploy configuration, and tests.
2. Map all current pages and links; identify content and assets to preserve, especially Gabriel's and Zay's full profiles, contact form and success/error handling, privacy/legal pages, and existing marketing/behavioral-science material.
3. Inspect the existing real estate routes and any content model. Avoid unnecessary route churn. Document the current URL-to-new-URL mapping before implementing.
4. Create a working branch (e.g. `feature/gnz-gabe-review-oct-2026`) and capture baseline screenshots at desktop and mobile widths if the existing QA tooling supports it.
5. Do not assume that the staging banner on the current site is intended for permanent publication; retain or remove only according to existing project configuration and launch plan.

## 1. Global brand and homepage
**Keep exactly:** `Strategy. Relationships. Opportunities. Growth.`

**Hero supporting statement (Gabriel's preferred copy):**
> GNZ Marketing Group helps businesses, investors, and organizations identify opportunities, build stronger relationships, and turn strategy into measurable growth.

Make clear that GNZ is broader than marketing. Maintain the present green/forest/white/off-white visual language, typography, mobile responsiveness and professional, confident feel. Do not imitate an agency template or a real estate wholesaling site.

**Hero's four capability signals:**
- **MARKETING** — Build awareness. Create demand. Influence decisions.
- **BUSINESS DEVELOPMENT** — Find opportunities. Build relationships. Create growth.
- **REAL ESTATE** — Identify opportunities. Connect capital. Facilitate transactions.
- **BEHAVIORAL INSIGHT** — Understand what drives people to decide, act, and buy.

These four are **hero positioning signals**, not necessarily the same taxonomy as the What We Do service cards below. Display as a cohesive group, not four unrelated brands. Retain clear CTA(s) linked to functioning destinations.

## 2. What We Do — service taxonomy
Heading: **Capabilities built around opportunity and growth.**

Intro: Explain concisely that GNZ connects marketing, business development, behavioral insight, relationships and execution to help organizations move forward.

**Four cards/sections here, deliberately different from the hero signals:**
1. Marketing
2. Business Development
3. Strategic Partnerships
4. Behavioral Insight

**Elevate Strategic Partnerships** to its own capability, not a footnote under Business Development. **Real Estate remains prominent as a distinct GNZ division**, with its own homepage feature and top-level navigation. Do not delete existing marketing material that still fits.

## 3. Marketing page
Headline: **Strategic Marketing Built Around How People Think and Decide**

Frame GNZ as a strategic marketing partner rather than claiming to be a full-service agency. Present these areas clearly, as services or capability topics without overclaiming delivery scope:
- Marketing strategy
- Positioning
- Customer/consumer insight
- Campaign strategy
- Lead generation
- Market development
- Customer engagement

Behavioral insight should visibly differentiate the approach. Reuse accurate, approved content on analytics, customer behavior and performance marketing as supporting material. Avoid unsupported metrics or guaranteed results.

## 4. Business Development and Strategic Partnerships
Headline: **Connecting the Right People, Businesses, and Opportunities.**

Supporting copy:
> GNZ helps identify new opportunities, develop relationships, and create strategic connections that can lead to measurable growth.

Cover:
- New business development
- Relationship development
- Strategic partnerships
- Market expansion
- Account development
- Cross-industry collaboration
- Opportunity identification

**Architecture:** Give Business Development and Strategic Partnerships distinct destinations within What We Do, while allowing them to cross-link and share a common conceptual narrative. Distinguish partnership creation from generic sales outreach. Avoid inventing partnership agreements, networks, and named clients.

## 5. Real Estate — a genuine division, not another service card
Give Real Estate a prominent **top-level nav entry**, dedicated landing page, distinct division identity consistent with GNZ's shared brand system, and meaningful cross-links from the homepage.

Headline: **Finding Opportunity. Creating Connections. Moving Deals Forward.**

Supporting copy:
> GNZ Real Estate identifies investment opportunities, builds relationships between owners, investors, buyers, and strategic partners, and helps move opportunities from identification through disposition.

Build six visible capability sections on the division overview (individual pages only if current routing/content warrants them):
1. **Acquisitions** — Identifying properties and opportunities aligned with investor and strategic objectives.
2. **Due Diligence** — Evaluating the property, numbers, market, and risks to better understand the opportunity.
3. **Investment Opportunities** — Showcasing qualified off-market and investment opportunities.
4. **Investor Relations** — Building relationships that connect capital, opportunities, and experience.
5. **Dispositions** — Connecting properties with qualified buyers and investors.
6. **Strategic Partnerships** — Connecting owners, investors, operators, lenders, and other professionals where there is mutual value.

Rename the existing user-facing **Opportunities** navigation label to **Investment Opportunities**. Retain **Investor Network** as the navigation label Gabriel specified; the underlying page may have an **Investor Relations** content heading. If the distinction creates ambiguity, use `Investor Network` as the page title with `Investor Relations` as a subsection, and note the choice for review.

**No invented listings:** If no approved opportunities or property data exist, make Investment Opportunities a polished informational page/section with a contact CTA, not fabricated property cards. Do not introduce an investor portal, CRM, transaction workflow, public deal submission or securities solicitation as part of this revision.

**Compliance/content guardrails:** Do not claim brokerage licensure, investment adviser status, funds under management, guaranteed returns, completed deals, available investment offerings, or underwriting certifications without verified client-approved evidence. Flag real estate/licensing/securities-related claims for Gabriel/legal review; do not make up disclosures.

## 6. Behavioral Insight / Behavioral Science
Headline: **Understand What Drives People to Decide, Act, and Buy.**

Supporting copy:
> GNZ applies behavioral principles and customer insight to help businesses communicate more effectively, build stronger relationships, and make better marketing and business decisions.

Use practical, plain language rather than academic/psychology consultancy language. Gabriel calls the capability **Behavioral Insight** in navigation and What We Do; existing `Behavioral Science` content may remain where it helps explain the methodology. Preserve useful approved substance and URLs when possible; redirect old routes if they change.

## 7. Why GNZ?
Headline: **We Connect the Pieces Others Often See Separately.**

Supporting concepts: **Marketing. Relationships. Business Development. Behavioral Insight. Real Estate.**

Intro:
> GNZ looks at the bigger picture—understanding the people involved, identifying opportunities, building the right relationships, and creating a practical path forward.

Four differentiators (replace older generic consulting cards such as Data-Driven Strategy):
- **People First** — We start by understanding the people behind the decision.
- **Opportunity Driven** — We look beyond the obvious to identify where value can be created.
- **Relationship Focused** — The right relationship can create opportunities that strategy alone cannot.
- **Built for Action** — Ideas only matter when they turn into measurable movement.

Use concise, balanced cards, with icons if consistent with existing design.

## 8. Our Approach
Keep the existing five-step visual component and functionality, but update labels to:
1. **Understand the Opportunity**
2. **Understand the People**
3. **Use Data & Insight**
4. **Build the Right Relationships**
5. **Execute & Measure**

Rewrite short explanations only where necessary to reflect practical execution and measurable forward movement. Keep the existing approach route and internal links working.

## 9. About GNZ and leadership
About headline: **Marketing, Relationships, and Opportunities Connected by Strategy.**

Supporting copy:
> GNZ Marketing Group brings together marketing strategy, behavioral insight, business development, real estate, and strategic relationships to identify opportunities and help organizations grow.

Make About more personal and less corporate; position GNZ as an umbrella company capable of evolving. Do not imply future investing, ownership, or other activities are operational today.

**Gabriel Gonzales:** Preserve his existing profile page, factual background, photo and contact details. Change displayed title to **Principal, Strategy & Business Development**. Update the opening bio framing to convey experience across sales, marketing, business development, real estate and relationship development, with emphasis on understanding people, identifying opportunity and creating practical paths to growth. Do not position Gabriel primarily as a wholesaler. Retain accurate historical details and credentials already approved; do not invent new ones.

**Zay:** Preserve Zay's profile, approved name, photo, role and factual background. Maintain a **small strategic leadership team** presentation, not a large agency roster. Do not alter Zay's title or biography without client-supplied direction.

**Naming:** Use **GNZ Marketing Group** as the public brand. Preserve verified legal entity names in legal pages, copyright, forms, structured data and policies until Gabriel explicitly confirms any legal-name change.

## 10. Selected Work / Opportunities
Gabriel wants a future proof-of-work section with 3–4 concise examples across marketing/growth, business development, partnerships, real estate and investor connections. **He has not supplied examples.**

Implement a reusable, accessible, responsive content component/data schema that supports:
- category; title; 1–3 sentence context; GNZ's role; verified outcome (optional); image (optional); publication status; optional link
- explicit `approved`/`published` flag to avoid accidental publication
- no client names, deal figures, testimonials or results without approval

**For this review build:** if verified examples exist in the repository, propose them in a review-only draft and keep unpublished until approved. Otherwise, do not show empty cards, fictitious examples or lorem ipsum on the public-facing page. Optionally include a tasteful “Selected Work” navigation anchor only once real approved content is available. Report that content is pending from Gabriel.

## 11. Final CTA and contact
Headline: **Let’s Talk About the Opportunity.**

Supporting copy:
> Have a business challenge, growth opportunity, property, partnership, or idea worth exploring? Let’s talk.

Button: **Let’s Talk** — link to the existing contact form/section.

**Preserve the existing working contact form**, current business phone, email, recipient, anti-spam protection, validation, submission handler, notifications, privacy behavior and success/error states. If updating the `Service of interest` choices, do so end-to-end (frontend, schema, backend, email templates, analytics and tests), including Real Estate and Strategic Partnerships. Do not silently break old stored values.

## 12. Navigation — Gabriel's requested structure
**Top-level:** `Home | What We Do | Real Estate | About | Insights | Contact`

**What We Do submenu:**
- Marketing
- Business Development
- Strategic Partnerships
- Behavioral Insight

**Real Estate submenu:**
- Overview
- Acquisitions
- Investment Opportunities
- Investor Network
- Dispositions

**Real Estate page content must also prominently cover Due Diligence and Strategic Partnerships**, even though Gabe did not request them as submenu entries.

**About:** Include routes/links for Who We Are, Our Approach, Gabriel Gonzales, and Zay's profile. Use the existing content architecture rather than forcing a deep menu.

**Insights:** Audit the existing Hub before changing it. If it has appropriate published articles/insights, rebrand the user-facing label to Insights and keep content. If it has no meaningful content strategy, de-emphasize or hide Hub content rather than inventing posts. Because Gabe explicitly wants an Insights top-level item, provide a truthful, useful landing page using existing approved content if available; otherwise keep the route minimally useful and flag content gap for review. Do not show broken or empty navigation destinations.

**Jobs:** Do not delete an existing Jobs page or break its URL without explicit direction. Remove it from prominent primary navigation if necessary; preserve access via footer or direct route if currently relevant.

**Routing:** Preserve old inbound links with redirects where paths change. Check internal anchors, canonical URLs, sitemap and metadata.

## 13. Suggested homepage section order
1. Hero with unchanged headline, new intro and four connected capability signals
2. What We Do — Marketing, Business Development, Strategic Partnerships, Behavioral Insight
3. GNZ Real Estate division feature — strong identity and CTA to overview, with six capabilities on division page
4. Why GNZ? — new four differentiators
5. Our Approach — existing five-step design, updated labels
6. About / small leadership preview — Gabriel and Zay
7. Selected Work — **only if approved actual examples exist**; otherwise omit public display and retain reusable component behind publication flag
8. Final CTA and existing contact form

Avoid duplicate blocks of near-identical copy, excessive scrolling, and multiple competing CTAs. Keep Real Estate visibly distinct while preserving cohesive GNZ brand.

## 14. Design, accessibility, performance
- Preserve current green palette and site-wide theme tokens; no unrequested color overhaul.
- Design: modern, clean, high-end, strategic, confident, relationship-driven; avoid generic digital-agency and wholesale-property tropes.
- Use consistent typography, grid rhythm, iconography, contrast and interaction patterns.
- Check widths 375, 390, 430, 768, 1280 and 1440 px; no horizontal overflow, broken dropdowns or unreadable text.
- Accessible mobile menus, focus states, keyboard navigation, semantic heading order, meaningful link labels, WCAG AA contrast, form labels/errors.
- Preserve performance and avoid unnecessary new dependencies or heavy animation.
- Maintain existing language/framework conventions; do not introduce TypeScript if project is JavaScript.

## 15. SEO, analytics and infrastructure
- Update homepage title/meta description to accurately reflect the umbrella positioning and real estate division.
- Keep the production domain `https://gnzmarketingllc.com/` and existing Netlify/Cloudflare DNS, SSL, CI, form secrets and analytics untouched.
- Update internal links, breadcrumbs, Open Graph, sitemap, canonical tags, structured data and robots rules where affected.
- Ensure review deployments are not indexed if the project's preview setup requires it; do not block the production site.
- Never expose secrets or private deal/investor information in client bundles.

## 16. Required validation and delivery
1. Run project lint, tests and production build; report exact commands and results.
2. Smoke-test Home, What We Do and all four capabilities, Real Estate overview and subsections, About, Our Approach, Gabriel, Zay, Insights, Contact and any retained Hub/Jobs routes.
3. Test all dropdowns and mobile navigation with keyboard and pointer.
4. Submit the contact form via safe test method (avoid sending real unsolicited mail) and verify existing submission flow, validation and error handling.
5. Check no invented property listings, selected-work examples, client names, deal results, performance figures or investor promises are published.
6. Compare before/after screenshots at desktop and mobile; inspect console/network errors, broken assets, links and layout shifts.
7. Prepare a concise **change log** (files/routes/content), **QA results**, **redirect map**, and **client-review questions**.
8. Deploy to a Netlify Deploy Preview or nonproduction branch URL only if authorized and supported by the repository. **Do not push a production deploy or modify DNS.**

## 17. Client-review questions / deferred items
List these explicitly in the handoff rather than guessing:
- Confirm whether “GNZ Marketing Group” is branding only or also the legal name.
- Confirm Gabriel's revised bio details and exact credentials; approve the new title.
- Confirm Zay's current title, bio and photo remain approved.
- Confirm Real Estate service scope, relevant licensing and what may legally be described as facilitating transactions, investor relations or capital connections.
- Supply 3–4 approved Selected Work examples, including permitted names, role descriptions, results and images.
- Decide whether Insights will launch with existing Hub material or wait for an editorial plan.
- Confirm whether any real investment opportunities will be published and what approvals/disclosures are needed.
- Confirm preferred public contact inquiry categories and routing.

## Definition of done
The result is a polished, coherent review build: the unchanged hero headline; updated umbrella positioning; four clear What We Do services including standalone Strategic Partnerships; a genuinely distinct Real Estate division with six substantive areas; accessible Behavioral Insight language; revised Why GNZ and five-step Approach; accurate Gabriel and Zay leadership profiles; Gabriel's requested CTA; simplified navigation; and all existing forms, contact information, brand colors and essential functionality intact. No unsupported claims, empty placeholders or accidental production changes.
