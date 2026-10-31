import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { getPublicInsightBySlug } from "@/lib/managedContent";
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const insight = await getPublicInsightBySlug(slug);
  if (!insight) return createPageMetadata({ title: "Insight not found | GNZ Marketing Group", description: "The requested GNZ insight is not available.", path: `/insights/${slug}`, noIndex: true });
  return createPageMetadata({ title: `${insight.title} | GNZ Marketing Group`, description: insight.excerpt, path: `/insights/${insight.slug}`, image: insight.cover_image || undefined });
}

export default async function InsightDetailPage({ params }) {
  const insight = await getPublicInsightBySlug((await params).slug);
  if (!insight) notFound();
  const path = `/insights/${insight.slug}`;
  return <>
    <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: insight.title, path }])} />
    <StructuredData data={articleJsonLd({ title: insight.title, description: insight.excerpt, path, publishedAt: insight.original_published_at || insight.published_at, updatedAt: insight.updated_at, image: insight.cover_image || undefined })} />
    <Hero eyebrow={insight.category || "GNZ Insights"} title={insight.title} copy={insight.excerpt} variant="hub" />
    <article className="section"><div className="container readable">
      {insight.attribution ? <p className="kicker">{insight.attribution}</p> : null}
      {insight.body ? <div className="copy-stack"><p>{insight.body}</p></div> : <p>This insight does not have published detail yet.</p>}
      {insight.source_url ? <p><a className="text-link" href={insight.source_url} rel="noreferrer">View source</a></p> : null}
      <p>Explore related <Link href="/services">GNZ capabilities</Link> or <Link href="/contact">start a conversation</Link>.</p>
      <Link className="text-link" href="/insights">← All insights</Link>
    </div></article>
  </>;
}
