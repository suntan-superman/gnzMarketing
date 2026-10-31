import Link from "next/link";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { getPublicSelectedWork } from "@/lib/managedContent";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Selected Work | GNZ Marketing Group", description: "Approved examples of how GNZ Marketing Group connects insight, relationships, and opportunity.", path: "/selected-work" });

export const dynamic = "force-dynamic";

export default async function SelectedWorkPage() {
  const records = await getPublicSelectedWork();
  return <>
    <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Selected Work", path: "/selected-work" }])} />
    <Hero title="Selected Work" copy="Approved examples of how GNZ connects insight, relationships, and opportunity." variant="about" />
    <section className="section"><div className="container selected-work-grid">
      {records.map((record) => <article className="selected-work-card" key={record.id}>
        {record.category ? <p className="kicker">{record.category}</p> : null}
        <h2>{record.title}</h2>
        <p>{record.summary}</p>
        {record.outcome ? <p><strong>Outcome:</strong> {record.outcome}</p> : null}
        <Link className="text-link" href={`/selected-work/${record.slug}`}>View work →</Link>
      </article>)}
      {!records.length ? <p>Selected work examples are being prepared. Please check back soon.</p> : null}
    </div></section>
  </>;
}
