import { Beaker, ChartSpline, Compass, Handshake, Lightbulb } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { approachSteps } from "@/lib/content";

export const metadata = {
  title: "Our Approach | GNZ Marketing Group",
};

export default function ApproachPage() {
  const icons = [Compass, Lightbulb, Beaker, Handshake, ChartSpline];

  return (
    <>
      <Hero
        eyebrow="Our Approach"
        title="Understand the opportunity. Build the right path forward."
        copy="We connect customer understanding, data, relationships, strategy, and execution into one clear operating rhythm."
        variant="approach"
      />
      <section className="section">
        <div className="container timeline timeline-five">
          {approachSteps.map(([title, copy], index) => {
            const Icon = icons[index];
            return (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={38} />
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
            );
          })}
        </div>
      </section>
      <CTASection title="Let's build a smarter marketing system." />
    </>
  );
}
