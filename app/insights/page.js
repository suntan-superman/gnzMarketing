import Link from "next/link";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { getPublicInsights } from "@/lib/managedContent";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Insights | GNZ Marketing Group", description: "Practical perspectives from GNZ on people, opportunities, relationships, and growth.", path: "/insights" });

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await getPublicInsights();
  return <>
    <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
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
