# GNZ Marketing Group — Codex Implementation Specification
**Date:** October 9, 2026  
**Scope:** Admin-managed Selected Work, Insights, and future Investment Opportunities; leadership copy updates; safe public publishing controls.

## Operating instructions for Codex
Work in the existing GNZ Marketing repository. **Inspect the actual Next.js app, Supabase schema/migrations, admin authentication and authorization, route structure, Netlify configuration, and existing content before editing.** Do not assume names or schema from this specification. Preserve the existing green visual identity, contact forms, Gabriel and Zay pages, analytics, working admin tools, production domain, and approved homepage messaging. Use JavaScript, not TypeScript. Do not introduce an additional CMS or rewrite the admin portal. Avoid unrelated refactoring.

Current site: https://gnzmarketingllc.com/  
The user has requested these capabilities for GNZ's existing Admin panel. Treat Gabriel's notes below as client-approved direction; anything not substantiated by existing source material must not be invented.

## 1. Approved positioning and copy
- Umbrella brand remains **GNZ Marketing Group**; Real Estate is one division, not the entire company. Maintain room for future divisions without advertising unlaunched services.
- Real Estate language: **acquisitions, due diligence, investor relations, dispositions, and strategic partnerships**. Avoid claims that GNZ is a licensed brokerage, acts as an agent, guarantees returns, manages investor funds, or offers securities. Review existing public copy, metadata, cards, and CTAs for inconsistent wording; preserve factual descriptions.
- Gabriel title (exact): **Principal, Strategy & Business Development**.
- Gabriel biography: emphasize verified background in **sales, marketing, business development, and real estate**, especially relationships and identifying opportunities. Keep existing accurate biographical details; do not fabricate accomplishments, credentials, deal counts, or dates. Suggested short intro: “Gabriel brings experience across sales, marketing, business development, and real estate, with a focus on building relationships, identifying opportunities, and finding practical paths to growth.”
- Zay: retain her existing leadership profile and image. Include **master’s degree in Behavioral Science from Arizona State University**, as supplied by Gabriel. Explain that her knowledge of human behavior and decision-making complements GNZ's marketing, relationship, and opportunity-focused approach. Do not infer graduation year, thesis, certifications, or job title.
- Maintain leadership presentation as a focused strategic team, not a large agency.

## 2. Content inventory before implementation
1. Identify current public routes and data sources for Selected Work, Hub/Insights, and Real Estate/Investment Opportunities.
2. Identify the existing admin authentication, role checks, API patterns, Supabase client/server usage, storage buckets, and migration conventions.
3. Inspect any prior October 8 migrations for Insights cleanup/review positioning. Avoid duplicate tables or conflicting migrations.
4. Create a short content inventory in `docs/` mapping existing Hub items and existing Selected Work entries to their sources, public URLs, and proposed disposition (migrate, retain privately, archive, or omit).
5. Preserve published URLs where possible; add redirects if replacing existing routes. Do not import every Hub article automatically.

## 3. Admin: Selected Work CRUD
Add a **Selected Work** section to the existing admin navigation with a searchable/listable index and create/edit/preview/publish/unpublish/archive actions. Persist records in Supabase, following the repository's existing schema and admin API conventions.

Suggested fields (adapt to actual schema):
- id (UUID), title (required), slug (unique), category (Marketing / Business Development / Strategic Partnerships / Real Estate; extensible), summary (required), body/details (rich text or safe Markdown), cover image optional, image alt text, optional outcomes/metrics **only when verified**, optional client/partner display name **only when approved**, optional date, sort order, featured flag, status (`draft`, `published`, `archived`), published_at, created_at, updated_at.
- Optional internal-only fields: source/reference, approval status or approval notes. These must never appear in public responses.
- Avoid a required client name, logo, metric, or project date; confidential engagements may need anonymous descriptions.

**Critical truthfulness requirement:** A completed-project case study may only be published if the underlying work actually occurred. Clearly distinguish completed engagements, ongoing work, and illustrative capabilities; do not turn proposals or pipeline opportunities into “Selected Work.” No seeded fictional projects, fake logos, invented quotes, or unverified performance claims. If no approved examples exist, use an elegant empty-state or omit the public section until at least one entry is published. Admin may show drafts.

Public: render only published entries, with responsive cards and optional detail pages, accessible headings/images, SEO metadata, and existing green styling. Draft/archived entries must not appear in public APIs, search indexes, sitemaps, related-content widgets, or previews without authorized admin access.

## 4. Admin: Insights CRUD and selective Hub migration
Add **Insights** to the admin navigation, with list/search/filter, create/edit/preview/publish/unpublish/archive, optional featured/sort ordering, and safe content rendering. Reuse the same admin UX primitives and server authorization model as Selected Work.

Suggested fields: id, title, unique slug, excerpt, body, category/tags, optional cover image/alt, optional attribution/source URL, optional original publication date, status, featured, sort order, published_at, timestamps.

**Migration:** Review existing Hub material. Import only relevant, high-quality, accurate content aligned with GNZ's umbrella positioning (marketing, behavioral insight, business development, relationships, strategic partnerships, real estate where appropriate). Preserve author credit, dates, and original links when available. Do not silently rewrite factual claims, republish licensed third-party text without rights, or auto-publish stale content. Import as **draft** unless already clearly approved and published and migration can preserve that approval. Record mapping of old-to-new slugs and redirects; avoid duplicate indexing.

Public: replace or de-emphasize “Hub” in navigation in favor of **Insights**. Provide listing and detail views; hide draft and archived material. Keep existing URLs functional with redirects where necessary.

## 5. Admin: Investment Opportunities (future capability, private by default)
Implement a Real Estate admin area named **Investment Opportunities**, but **do not publish any investment opportunities at launch**.

### Global publishing gate
Persist a single authoritative server-side setting, e.g. `investment_opportunities_public_enabled = false` by default. It must be editable only by authorized admin users via a clearly labeled toggle in the Admin panel. Show a confirmation explaining that enabling it makes individually published opportunities publicly visible. Store who changed it and when, if audit conventions exist.

### Per-opportunity records
Admin users can create/edit/preview/archive/delete (prefer soft delete) records with:
- id, title/header (required), slug (unique), summary (optional), details/body (required for publication), status (`draft`, `published`, `archived`), sort order, optional hero image/alt, optional location/asset type **only if supplied**, optional internal notes (private), timestamps.
- Provide validation and a preview; use sanitized rich text or Markdown, no arbitrary HTML/script injection.
- Never require investment amount, expected ROI, yield, financing terms, or return projections. If such fields are proposed later, treat them as a separate compliance-reviewed scope.

### Public visibility rule — enforce on the server
An opportunity is publicly accessible **only if BOTH**:
1. Global `investment_opportunities_public_enabled` is true; AND
2. That opportunity's status is `published`.

When the global gate is false:
- Remove Investment Opportunities from public navigation, public listings, homepage promotions, sitemaps, feeds, and internal search.
- Direct requests to opportunity list/detail URLs should return **404** (or an existing equivalent unavailable response), not a blank listing containing metadata.
- Public APIs must not expose draft or hidden opportunities or their internal notes, even if someone guesses an ID or slug.
- Disable public indexing and caching of hidden data. Use server-side checks and appropriate cache invalidation on publication changes; do not rely on client-side conditional rendering alone.

**Important distinction:** Gabriel's notes say to hold off on publishing opportunities. Creating the admin editor does **not** authorize enabling the global toggle or publishing listings. Initial migration must leave the gate OFF and all new opportunity records in DRAFT. Do not seed real or fictional investment offerings.

### Regulatory review gate
Before any future public activation, flag for owner/legal review of brokerage licensing, solicitation/securities issues, offering language, confidentiality, and investor suitability as applicable. A CMS toggle is a technical control, not legal approval. Do not automatically claim that an opportunity is “qualified,” guaranteed, verified, or approved by regulators.

## 6. Security and authorization
- Follow existing GNZ admin authentication and session pattern; **server-side authorization for every read/write admin operation**.
- Use Supabase RLS where appropriate: public/anon can read only published Selected Work and Insights, and opportunities only when both visibility conditions are met. Private notes/approval fields should be in a separate admin-only table or omitted from public projections.
- Do not expose Supabase service-role keys, secrets, or admin-only data in browser bundles. Protect uploads with file validation, type/size limits, appropriate bucket policies, and cleanup.
- Validate all writes server-side; sanitize user-authored markup, guard against XSS and unsafe links; use CSRF protections where required by the existing session architecture.
- Provide clear errors, loading/empty states, success feedback, and confirmation for destructive actions. Preserve audit fields where supported.

## 7. Admin experience
- Maintain the current admin styling and navigation; add **Selected Work**, **Insights**, and **Investment Opportunities** without breaking existing dashboard tools.
- Show clear Draft / Published / Archived labels, last-edited date, preview, and actions.
- Show a prominent **“Public section disabled”** indication in Investment Opportunities while the global switch is off. Individual `published` status must not override the global gate.
- Support mobile/tablet editing at practical widths, keyboard accessibility, and clear unsaved-change behavior.
- Prefer reusable form/list/status components, without introducing a heavy CMS dependency.

## 8. Routes, navigation, and SEO
Preserve Gabe's desired public navigation:
**Home | What We Do | Real Estate | About | Insights | Contact**.
Within What We Do: Marketing, Business Development, Strategic Partnerships, Behavioral Insight.
Within Real Estate: Overview, Acquisitions, Investment Opportunities (only if global gate ON), Investor Network, Dispositions; retain Due Diligence and real-estate Strategic Partnerships as appropriate landing-page sections.
Do not expose future investment pages or links while the global switch is OFF. Keep navigation consistent on mobile.
Update metadata, structured data, sitemap, robots/canonical URLs as appropriate. Do not change DNS, Netlify, or the production domain.

## 9. Database migration and deployment safety
- Add idempotent, ordered Supabase migrations compatible with the existing production schema. Use the project's established migration naming and deployment process.
- Define safe defaults: all new content draft, opportunity global toggle false. No destructive drops of Hub content until migrated, verified, and backed up.
- Include rollback guidance and a simple content migration/seed script only for genuine existing records. Do not overwrite admin edits on repeated deployments.
- Explicitly identify any manual migration or environment steps required before production deploy; fail safely if a table or configuration is absent.

## 10. Testing / QA acceptance criteria
Automated tests should cover:
1. Non-admin users cannot create/edit/delete content or change global visibility.
2. Admin can create, edit, preview, publish, unpublish, and archive Selected Work and Insights.
3. Public lists and detail routes show published records only; drafts/archived records return 404.
4. Hub migration retains attribution and links and does not create duplicates.
5. Investment global gate OFF + item published = **not public**.
6. Investment global gate ON + item draft = **not public**.
7. Investment global gate ON + item published = **public**.
8. Turning global gate OFF immediately hides previously published items and removes public links/search/sitemap exposure.
9. Internal notes and secrets never appear in public API payloads or page source.
10. Form validation, malicious HTML sanitization, unauthorized API requests, image upload limits, and slug conflicts are handled.
11. Existing contact forms, admin features, leadership pages, responsive navigation, and existing production routes remain functional.
12. Gabriel's exact title appears correctly; Zay's master's degree attribution is accurate; site does not imply licensed brokerage activity.

Run existing lint, tests, and production build. Manually verify desktop/mobile public and admin pages. Report failures honestly; do not mark unchecked tests as passed.

## 11. Deliverables and execution order
1. Audit current repo and produce brief plan and route/schema inventory.
2. Implement migrations and secured server data layer.
3. Implement admin CRUD and publishing controls.
4. Implement public views, route redirects, and gated investment pages.
5. Update Gabriel/Zay bios and real-estate wording.
6. Curate/import suitable Hub content as drafts for approval; do not fabricate Selected Work examples.
7. Add tests, run QA, and document deployment/migration steps.
8. Provide a final report listing changed files, migrations, new admin URLs, public URLs, security decisions, remaining content approvals, and results of lint/test/build.

**Stop before automatically activating investment listings.** Preserve the global switch OFF. Do not deploy to production or merge to `main` without explicit authorization for this change set.

## 12. Questions to flag for Gabriel (do not block technical implementation)
- Which real engagements may be shown in Selected Work, and may client names/results be disclosed?
- Which Hub articles are approved for republication and under what author attribution?
- Is the investment-opportunity publication workflow subject to a required legal/compliance sign-off?
- Is there an approved final version of Gabriel's full bio and Zay's full bio beyond the supplied updates?

These are content/approval decisions; the admin tools should be ready without inventing answers.
