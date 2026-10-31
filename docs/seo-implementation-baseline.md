# GNZ Technical SEO Implementation Baseline

**Audit date:** October 31, 2026  
**Repository branch:** `main`  
**Repository commit at audit start:** `297fbac529ac3d7df50834258662f8e16701fa0e` (`initial commit`)  
**Production origin:** `https://gnzmarketingllc.com`  
**Remote:** `https://github.com/suntan-superman/gnzMarketing.git`

## Existing application baseline

- Next.js App Router application deployed through Netlify with `npm run build`.
- Supabase-backed contact forms and Admin panel are already in place.
- Public content routes include Home, What We Do, Marketing, Business Development, Strategic Partnerships, Behavioral Insight, Real Estate, About, principal profiles, Jobs, Contact, Insights, and Selected Work.
- Legacy `/hub` routes redirect to `/insights`.
- Admin login and protected Admin routes already provide `noindex` metadata.
- Investment Opportunities are server-gated and return 404 while the global setting is disabled.
- No Supabase schema, credentials, RLS, or Admin authorization changes are part of this SEO implementation.

## SEO baseline before this change

Already present:

- Basic route-level titles on most public pages.
- A global `metadataBase` using `https://gnzmarketingllc.com`.
- Server-rendered headings and content.
- Public content queries that exclude unpublished managed records.

Not present before this change:

- Dynamic `sitemap.xml` and `robots.txt` routes.
- Route-level canonical URLs.
- Consistent Open Graph and Twitter metadata.
- Organization, WebSite, BreadcrumbList, and Article JSON-LD.
- Configurable GA4 integration and conversion events.
- Search Console verification instructions in repository documentation.
- A keyword-to-page strategy document.

## Analytics and forms

The contact form submits to `/api/contact`, validates server-side, and displays a success state containing the generated reference. No analytics provider or Search Console verification token was found in the repository at audit time. The implementation adds consent-gated, configurable GA4 events without sending form names, email addresses, phone numbers, property addresses, or comments.

## Deployment and verification notes

The production deployment commit was not independently available from the repository checkout or Netlify configuration during this audit. Confirm the deployed commit in Netlify before release. This change set is prepared on `main` and is not deployed automatically by this implementation.
