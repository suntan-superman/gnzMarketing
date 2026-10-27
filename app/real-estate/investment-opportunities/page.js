import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { getInvestmentOpportunitiesPublicEnabled, getPublicInvestmentOpportunities } from "@/lib/managedContent";

export const dynamic = "force-dynamic";

export default async function InvestmentOpportunitiesPage() {
  if (!await getInvestmentOpportunitiesPublicEnabled()) notFound();
  const opportunities = await getPublicInvestmentOpportunities();
  return <>
    <Hero eyebrow="Real Estate" title="Investment Opportunities" copy="Qualified opportunities are shared here only after separate content, owner, and legal review." variant="real-estate" />
    <section className="section"><div className="container selected-work-grid">
      {opportunities.map((opportunity) => <article className="selected-work-card" key={opportunity.id}>
        {opportunity.asset_type ? <p className="kicker">{opportunity.asset_type}</p> : null}
        <h2>{opportunity.title}</h2>
        <p>{opportunity.summary}</p>
        {opportunity.location ? <p>{opportunity.location}</p> : null}
        <Link className="text-link" href={`/real-estate/investment-opportunities/${opportunity.slug}`}>View opportunity →</Link>
      </article>)}
      {!opportunities.length ? <p>No investment opportunities are currently available.</p> : null}
    </div></section>
  </>;
}
