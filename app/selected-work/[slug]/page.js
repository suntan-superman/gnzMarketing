import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { getPublicSelectedWorkBySlug } from "@/lib/managedContent";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const record = await getPublicSelectedWorkBySlug(slug);
  if (!record) return createPageMetadata({ title: "Selected Work not found | GNZ Marketing Group", description: "The requested GNZ selected work entry is not available.", path: `/selected-work/${slug}`, noIndex: true });
  return createPageMetadata({ title: `${record.title} | GNZ Marketing Group`, description: record.summary, path: `/selected-work/${record.slug}`, image: record.cover_image || undefined });
}

export default async function SelectedWorkDetailPage({ params }) {
  const record = await getPublicSelectedWorkBySlug((await params).slug);
  if (!record) notFound();
  const path = `/selected-work/${record.slug}`;
  return <>
    <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Selected Work", path: "/selected-work" }, { name: record.title, path }])} />
    <Hero eyebrow={record.category || "Selected Work"} title={record.title} copy={record.summary} variant="about" />
    <article className="section"><div className="container readable">
      {record.client_name ? <p className="kicker">{record.client_name}</p> : null}
      {record.body ? <p className="wide-copy">{record.body}</p> : null}
      {record.outcome ? <p><strong>Outcome:</strong> {record.outcome}</p> : null}
      <p>Explore <Link href="/services">GNZ capabilities</Link> or <Link href="/contact">start a conversation</Link>.</p>
      <Link className="text-link" href="/selected-work">← All selected work</Link>
    </div></article>
  </>;
}
