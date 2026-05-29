import Hero from "@/components/Hero";
import { posts } from "@/lib/content";

export const metadata = {
  title: "The Hub | GNZ Marketing, LLC",
};

export default function HubPage() {
  return (
    <>
      <Hero
        title="The Hub"
        copy="Short, practical reads from the team responsible for turning insights into action."
        variant="hub"
      />
      <section className="section">
        <div className="container post-list">
          {posts.map((post) => (
            <article key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href="/contact">Read more &rarr;</a>
              <small>{post.author}</small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
