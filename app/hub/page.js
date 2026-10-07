import Hero from "@/components/Hero";
import { getPublicHubEntries } from "@/lib/siteContent";

export const metadata = {
  title: "The Hub | GNZ Marketing Group",
};

export const dynamic = "force-dynamic";

export default async function HubPage() {
  const entries = await getPublicHubEntries();
  return (
    <>
      <Hero
        title="The Hub"
        copy="Short, practical reads from the team responsible for turning insights into action."
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
          {!entries.length ? <p>No Hub entries are available yet. Please check back soon.</p> : null}
        </div>
      </section>
    </>
  );
}
