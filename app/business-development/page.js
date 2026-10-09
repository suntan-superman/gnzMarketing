import { Handshake, Lightbulb, Network, Target } from "lucide-react";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Business Development | GNZ Marketing Group",
  description: "GNZ Marketing Group identifies opportunities and builds relationships that create growth.",
};

const themes = [
  ["Opportunity identification", "Find the openings, needs, and connections that can move an organization forward.", Lightbulb],
  ["Strategic relationships", "Build thoughtful relationships with the people and organizations involved in the opportunity.", Handshake],
  ["Market connections", "Bring together market insight, shared interests, and practical next steps.", Network],
  ["Growth strategy", "Connect strategy and execution around clear objectives and measurable action.", Target],
];

export default function BusinessDevelopmentPage() {
  return <>
    <Hero
      eyebrow="Business Development"
      title="Connecting the Right People, Businesses, and Opportunities."
      copy="GNZ helps identify new opportunities, develop relationships, and create strategic connections that can lead to measurable growth."
      ctaLabel="Connect With GNZ"
      ctaHref="/contact"
      variant="business-development"
    />
    <section className="section">
      <div className="container">
        <div className="section-intro readable">
          <p className="kicker">A practical growth focus</p>
          <h2>Make the right connections at the right time.</h2>
          <p>Business development at GNZ is intentionally relationship-driven. We bring a clear view of the opportunity together with the people, organizations, and strategic partnerships that can help move it forward.</p>
        </div>
        <div className="theme-grid">
          {themes.map(([title, copy, Icon]) => <article className="theme-card" key={title}>
            <Icon size={38} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>)}
        </div>
        <div className="business-topic-list">
          <p className="kicker">Focus areas</p>
          <p>New business development · Relationship development · Strategic partnerships · Market expansion · Account development · Cross-industry collaboration · Opportunity identification</p>
        </div>
      </div>
    </section>
    <section className="section band-gray">
      <div className="container two-col align-center">
        <div><p className="kicker">Strategic Partnerships</p><h2>Connecting people, organizations, and opportunities where shared interests create value.</h2></div>
        <p className="wide-copy">Strategic partnerships are part of GNZ&apos;s broader positioning. We keep the work grounded in the specific opportunity and the relationships needed to make progress, without assuming a one-size-fits-all model.</p>
      </div>
    </section>
    <CTASection title="Have an opportunity worth exploring?" />
  </>;
}
