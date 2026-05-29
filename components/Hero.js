import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero({ eyebrow, title, copy, ctaLabel, ctaHref, variant = "default" }) {
  return (
    <section className={`hero hero-${variant}`}>
      <div className="hero-bg" />
      <div className="hero-ring" aria-hidden="true" />
      <div className="container hero-content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{copy}</p>
        {ctaLabel && ctaHref ? (
          <Link className="button" href={ctaHref}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
      <ChevronDown className="hero-down" size={42} aria-hidden="true" />
    </section>
  );
}
