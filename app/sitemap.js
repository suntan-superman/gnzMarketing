import { getInvestmentOpportunitiesPublicEnabled, getPublicInsights, getPublicInvestmentOpportunities, getPublicSelectedWork } from "@/lib/managedContent";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";

export const dynamic = "force-dynamic";

const publicRoutes = [
  ["/", "weekly"],
  ["/services", "monthly"],
  ["/marketing", "monthly"],
  ["/business-development", "monthly"],
  ["/strategic-partnerships", "monthly"],
  ["/behavioral-insight", "monthly"],
  ["/data-science", "monthly"],
  ["/performance-marketing", "monthly"],
  ["/real-estate", "monthly"],
  ["/approach", "monthly"],
  ["/about", "monthly"],
  ["/about/gabriel-gonzales", "monthly"],
  ["/about/zay-aaron-julian", "monthly"],
  ["/insights", "weekly"],
  ["/selected-work", "monthly"],
  ["/jobs", "monthly"],
  ["/contact", "monthly"],
];

export default async function sitemap() {
  const [insights, selectedWork, opportunities, investmentEnabled] = await Promise.all([
    getPublicInsights(),
    getPublicSelectedWork(),
    getPublicInvestmentOpportunities(),
    getInvestmentOpportunitiesPublicEnabled(),
  ]);
  const fixedEntries = publicRoutes.map(([path, changeFrequency]) => ({ url: absoluteUrl(path), changeFrequency }));
  const insightEntries = insights.map((item) => ({ url: absoluteUrl(`/insights/${item.slug}`), lastModified: item.updated_at || item.published_at || undefined, changeFrequency: "monthly" }));
  const selectedWorkEntries = selectedWork.map((item) => ({ url: absoluteUrl(`/selected-work/${item.slug}`), lastModified: item.updated_at || item.published_at || undefined, changeFrequency: "monthly" }));
  const opportunityEntries = investmentEnabled ? opportunities.map((item) => ({ url: absoluteUrl(`/real-estate/investment-opportunities/${item.slug}`), lastModified: item.updated_at || item.published_at || undefined, changeFrequency: "monthly" })) : [];
  return [...fixedEntries, ...insightEntries, ...selectedWorkEntries, ...opportunityEntries].map((entry) => ({ ...entry, url: entry.url.replace(SITE_ORIGIN, SITE_ORIGIN) }));
}
