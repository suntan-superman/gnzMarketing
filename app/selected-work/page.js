import Link from "next/link";
import Hero from "@/components/Hero";
import { getPublicSelectedWork } from "@/lib/managedContent";

export const metadata = {
  title: "Selected Work | GNZ Marketing Group",
  description: "Approved examples of GNZ Marketing Group work and outcomes.",
};

export const dynamic = "force-dynamic";

export default async function SelectedWorkPage() {
  const records = await getPublicSelectedWork();
  return <>
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
