import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { getPublicInvestmentOpportunityBySlug } from "@/lib/managedContent";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const opportunity = await getPublicInvestmentOpportunityBySlug(slug);
  if (!opportunity) return createPageMetadata({ title: "Investment Opportunity not found | GNZ Marketing Group", description: "The requested GNZ investment opportunity is not available.", path: `/real-estate/investment-opportunities/${slug}`, noIndex: true });
  return createPageMetadata({ title: `${opportunity.title} | GNZ Marketing Group`, description: opportunity.summary, path: `/real-estate/investment-opportunities/${opportunity.slug}`, image: opportunity.cover_image || undefined });
}

export default async function InvestmentOpportunityDetailPage({ params }) {
  const opportunity = await getPublicInvestmentOpportunityBySlug((await params).slug);
  if (!opportunity) notFound();
  const path = `/real-estate/investment-opportunities/${opportunity.slug}`;
  return <>
    <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Real Estate", path: "/real-estate" }, { name: "Investment Opportunities", path: "/real-estate/investment-opportunities" }, { name: opportunity.title, path }])} />
    <Hero eyebrow={opportunity.asset_type || "Real Estate"} title={opportunity.title} copy={opportunity.summary} variant="real-estate" />
    <article className="section"><div className="container readable">
      {opportunity.location ? <p className="kicker">{opportunity.location}</p> : null}
      {opportunity.body ? <p className="wide-copy">{opportunity.body}</p> : null}
      <p className="detail-note">Information is provided for discussion purposes only. No returns, yields, financing terms, or investment projections are stated here.</p>
      <Link className="text-link" href="/real-estate/investment-opportunities">← All investment opportunities</Link>
    </div></article>
  </>;
}
