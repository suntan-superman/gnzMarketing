import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { getPublicSelectedWorkBySlug } from "@/lib/managedContent";

export const dynamic = "force-dynamic";

export default async function SelectedWorkDetailPage({ params }) {
  const record = await getPublicSelectedWorkBySlug((await params).slug);
  if (!record) notFound();
  return <>
    <Hero eyebrow={record.category || "Selected Work"} title={record.title} copy={record.summary} variant="about" />
    <article className="section"><div className="container readable">
      {record.client_name ? <p className="kicker">{record.client_name}</p> : null}
      {record.body ? <p className="wide-copy">{record.body}</p> : null}
      {record.outcome ? <p><strong>Outcome:</strong> {record.outcome}</p> : null}
      <Link className="text-link" href="/selected-work">← All selected work</Link>
    </div></article>
  </>;
}
