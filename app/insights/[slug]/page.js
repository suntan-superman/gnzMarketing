import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { getPublicInsightBySlug } from "@/lib/managedContent";

export const dynamic = "force-dynamic";

export default async function InsightDetailPage({ params }) {
  const insight = await getPublicInsightBySlug((await params).slug);
  if (!insight) notFound();
  return <>
    <Hero eyebrow={insight.category || "GNZ Insights"} title={insight.title} copy={insight.excerpt} variant="hub" />
    <article className="section"><div className="container readable">
      {insight.attribution ? <p className="kicker">{insight.attribution}</p> : null}
      {insight.body ? <div className="copy-stack"><p>{insight.body}</p></div> : <p>This insight does not have published detail yet.</p>}
      {insight.source_url ? <p><a className="text-link" href={insight.source_url} rel="noreferrer">View source</a></p> : null}
      <Link className="text-link" href="/insights">← All insights</Link>
    </div></article>
  </>;
}
