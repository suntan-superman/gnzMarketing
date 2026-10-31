import { getInvestmentOpportunitiesPublicEnabled } from "@/lib/managedContent";
import { SITE_ORIGIN } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots() {
  const investmentOpportunitiesEnabled = await getInvestmentOpportunitiesPublicEnabled();
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", ...(investmentOpportunitiesEnabled ? [] : ["/real-estate/investment-opportunities"])],
    }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
