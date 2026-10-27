import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { getPublicInvestmentOpportunityBySlug } from "@/lib/managedContent";

export const dynamic = "force-dynamic";

export default async function InvestmentOpportunityDetailPage({ params }) {
  const opportunity = await getPublicInvestmentOpportunityBySlug((await params).slug);
  if (!opportunity) notFound();
  return <>
    <Hero eyebrow={opportunity.asset_type || "Real Estate"} title={opportunity.title} copy={opportunity.summary} variant="real-estate" />
    <article className="section"><div className="container readable">
      {opportunity.location ? <p className="kicker">{opportunity.location}</p> : null}
      {opportunity.body ? <p className="wide-copy">{opportunity.body}</p> : null}
      <p className="detail-note">Information is provided for discussion purposes only. No returns, yields, financing terms, or investment projections are stated here.</p>
      <Link className="text-link" href="/real-estate/investment-opportunities">← All investment opportunities</Link>
    </div></article>
  </>;
}
