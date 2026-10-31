# Google Search Console Setup — GNZ Marketing Group

Search Console ownership and submission are manual account/DNS actions. They are not performed by this code change, and no verification token is stored in the repository.

1. Sign in to the authorized Google account at Google Search Console.
2. Create a **Domain property** for `gnzmarketingllc.com` (not only the `https://www` or `https://` URL-prefix variant).
3. Google will provide a TXT verification record. Add that TXT record to the authoritative DNS zone in Cloudflare for `gnzmarketingllc.com`.
4. Wait for DNS propagation, then select **Verify** in Search Console.
5. After verification, submit `https://gnzmarketingllc.com/sitemap.xml` under **Sitemaps**.
6. Inspect the homepage, `/marketing`, `/business-development`, `/real-estate`, `/about`, `/insights`, and `/contact` with URL Inspection.
7. Confirm that the inspected canonical URL is the `gnzmarketingllc.com` URL, that public pages are indexable, and that admin/private routes are not indexable.

Do not change Netlify custom-domain settings, Cloudflare SSL, or DNS records other than the Google-provided TXT verification record. Record the verified property and submission date in the project handoff notes once completed.
