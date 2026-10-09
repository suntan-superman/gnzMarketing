import Hero from "@/components/Hero";
import { getPublicHubEntries } from "@/lib/siteContent";

export const metadata = {
  title: "Insights | GNZ Marketing Group",
};

export const dynamic = "force-dynamic";

export default async function HubPage() {
  const entries = await getPublicHubEntries();
  return (
    <>
      <Hero
        title="Insights"
        copy="Practical perspectives from GNZ on people, opportunities, relationships, and growth."
        variant="hub"
      />
      <section className="section">
        <div className="container post-list">
          {entries.map((entry) => (
            <article key={entry.id}>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              <a href="/contact">Read more &rarr;</a>
              {entry.author ? <small>{entry.author}</small> : null}
            </article>
          ))}
          {!entries.length ? <p>Insights are being prepared. Please check back soon.</p> : null}
        </div>
      </section>
    </>
  );
}
