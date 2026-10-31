import TrackedLink from "@/components/TrackedLink";
import { ChevronDown } from "lucide-react";

export default function Hero({
  eyebrow,
  title,
  copy,
  capability,
  signals,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  variant = "default",
}) {
  return (
    <section className={`hero hero-${variant}`}>
      <div className="hero-bg" />
      <div className="hero-ring" aria-hidden="true" />
      <div className="container hero-content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{copy}</p>
        {capability ? <p className="hero-capability">{capability}</p> : null}
        {signals?.length ? <div className="hero-signals">
          {signals.map(([title, signalCopy]) => <div className="hero-signal" key={title}><strong>{title}</strong><span>{signalCopy}</span></div>)}
        </div> : null}
        {ctaLabel && ctaHref ? <div className="hero-actions">
          <TrackedLink className="button" href={ctaHref} eventName={ctaHref === "/contact" ? "contact_cta_click" : "primary_cta_click"} eventParams={{ location: variant, destination: ctaHref }}>{ctaLabel}</TrackedLink>
          {secondaryCtaLabel && secondaryCtaHref ? <TrackedLink className="button button-secondary" href={secondaryCtaHref} eventName="secondary_cta_click" eventParams={{ location: variant, destination: secondaryCtaHref }}>{secondaryCtaLabel}</TrackedLink> : null}
        </div> : null}
      </div>
      <ChevronDown className="hero-down" size={42} aria-hidden="true" />
    </section>
  );
}
