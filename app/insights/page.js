import Link from "next/link";
import Hero from "@/components/Hero";
import { getPublicInsights } from "@/lib/managedContent";

export const metadata = {
  title: "Insights | GNZ Marketing Group",
  description: "Practical perspectives from GNZ on people, opportunities, relationships, and growth.",
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await getPublicInsights();
  return <>
    <Hero title="Insights" copy="Practical perspectives from GNZ on people, opportunities, relationships, and growth." variant="hub" />
    <section className="section"><div className="container post-list">
      {insights.map((insight) => <article key={insight.id}>
        {insight.category ? <p className="kicker">{insight.category}</p> : null}
        <h2>{insight.title}</h2>
        <p>{insight.excerpt}</p>
        <Link href={`/insights/${insight.slug}`}>Read more →</Link>
        {insight.attribution ? <small>{insight.attribution}</small> : null}
      </article>)}
      {!insights.length ? <p>Insights are being prepared. Please check back soon.</p> : null}
    </div></section>
  </>;
}
