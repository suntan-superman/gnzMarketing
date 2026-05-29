import { Beaker, ChartSpline, Compass, Lightbulb } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Approach | GNZ Marketing, LLC",
};

export default function ApproachPage() {
  const steps = [
    ["Discover", "Frame the business problem, audience, data sources, and decisions that matter.", Compass],
    ["Diagnose", "Find behavioral drivers, friction points, and performance indicators.", Lightbulb],
    ["Design", "Build campaigns, messages, journeys, and tests around the strongest insights.", Beaker],
    ["Optimize", "Measure performance, learn quickly, and improve the next round of decisions.", ChartSpline],
  ];

  return (
    <>
      <Hero
        title="A Practical Approach to Better Marketing Decisions"
        copy="We connect customer understanding, data, creative strategy, and measurement into one clear operating rhythm."
        variant="approach"
      />
      <section className="section">
        <div className="container timeline">
          {steps.map(([title, copy, Icon], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={38} />
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection title="Let's build a smarter marketing system." />
    </>
  );
}
