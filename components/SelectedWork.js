import Link from "next/link";
import Image from "next/image";

export default function SelectedWork({ items = [] }) {
  const publishedItems = items.filter((item) => item.approved && item.isPublished);
  if (!publishedItems.length) return null;

  return <section className="section selected-work" aria-labelledby="selected-work-title">
    <div className="container">
      <div className="section-intro"><p className="kicker">Selected Work</p><h2 id="selected-work-title">Examples of opportunity in action.</h2></div>
      <div className="selected-work-grid">
        {publishedItems.map((item) => <article className="selected-work-card" key={item.id || item.title}>
          {item.image ? <div className="selected-work-image"><Image src={item.image} alt="" fill sizes="(max-width: 900px) 50vw, 33vw" /></div> : null}
          <p className="kicker">{item.category}</p>
          <h3>{item.title}</h3>
          <p>{item.context}</p>
          <p><strong>GNZ&apos;s role:</strong> {item.role}</p>
          {item.outcome ? <p><strong>Outcome:</strong> {item.outcome}</p> : null}
          {item.href ? <Link className="text-link" href={item.href}>Read more</Link> : null}
        </article>)}
      </div>
    </div>
  </section>;
}
