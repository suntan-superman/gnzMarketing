import { BarChart3, Brain, MessageCircle, Target } from "lucide-react";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Marketing | GNZ Marketing Group",
  description: "Strategic marketing informed by human behavior, customer insight, and measurable objectives.",
};

const capabilities = [
  ["Customer behavior", "Understand the context, motivations, and friction behind customer decisions.", Brain],
  ["Audience understanding", "Turn audience insight into clearer positioning, messaging, and engagement.", MessageCircle],
  ["Data-driven strategy", "Use information and testing to focus decisions on what matters most.", BarChart3],
  ["Performance and conversion", "Connect strategy to execution, measurement, and the next useful action.", Target],
];

export default function MarketingPage() {
  return <>
    <Hero
      eyebrow="Marketing"
      title="Strategic Marketing Built Around How People Think and Decide"
      copy="GNZ combines customer understanding, behavioral insight, data, and practical execution to create marketing that connects with real people and supports measurable growth."
      ctaLabel="Start a Conversation"
      ctaHref="/contact"
      variant="marketing"
    />
    <section className="section">
      <div className="container">
        <div className="section-intro readable">
          <p className="kicker">Why this matters</p>
          <h2>Understand why people make decisions—not simply where to place an ad.</h2>
          <p>GNZ preserves the strongest parts of its behavioral and performance marketing practice while connecting them to a broader growth strategy. The result is a clearer path from customer insight to message, channel, engagement, conversion, and learning.</p>
        </div>
        <div className="theme-grid">
          {capabilities.map(([title, copy, Icon]) => <article className="theme-card" key={title}>
            <Icon size={38} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>)}
        </div>
        <div className="marketing-topic-list">
          <p className="kicker">Capability topics</p>
          <p>Marketing strategy · Positioning · Customer and consumer insight · Campaign strategy · Lead generation · Market development · Customer engagement</p>
        </div>
      </div>
    </section>
    <section className="section band-gray"><div className="container two-col align-center"><div><p className="kicker">Existing expertise</p><h2>Insight, strategy, and campaign support in one operating rhythm.</h2></div><p className="wide-copy">Explore the existing Behavioral Science and Performance Marketing capabilities for more detail on how GNZ applies these disciplines to customer engagement and marketing performance.</p></div></section>
    <CTASection title="Ready to make marketing more useful?" />
  </>;
}
