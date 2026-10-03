import { BarChart3, Brain, TrendingUp, Users } from "lucide-react";

const differentiators = [
  {
    title: "Behavioral Intelligence",
    statement: "Understand the forces behind customer decisions.",
    copy:
      "GNZ applies behavioral science to uncover the motivations, biases, context, and decision drivers that influence customer behavior.",
    Icon: Brain,
  },
  {
    title: "Data-Driven Strategy",
    statement: "Turn information into decisions you can act on.",
    copy: "We transform data and customer insight into focused strategies designed to improve marketing performance.",
    Icon: BarChart3,
  },
  {
    title: "Performance Marketing",
    statement: "Connect strategy to measurable business outcomes.",
    copy:
      "Strategy matters when it produces results. GNZ connects insight and execution to measurable marketing and business performance.",
    Icon: TrendingUp,
  },
  {
    title: "Human-Centered Growth",
    statement: "Build marketing around people—not just metrics.",
    copy:
      "Data tells us what is happening. Understanding people helps explain why. GNZ combines both to create marketing that connects with real customers.",
    Icon: Users,
  },
];

export default function WhyGNZ() {
  return (
    <section className="section why-gnz-section" aria-labelledby="why-gnz-title">
      <div className="container">
        <div className="section-intro centered why-gnz-intro">
          <p className="kicker">Why GNZ?</p>
          <h2 id="why-gnz-title">Insight that moves people and performance.</h2>
          <p>
            We combine behavioral insight, data, and performance strategy to help organizations understand their customers
            and turn that understanding into measurable growth.
          </p>
        </div>
        <div className="why-gnz-grid">
          {differentiators.map(({ title, statement, copy, Icon }) => (
            <article className="why-gnz-card" key={title}>
              <div className="why-gnz-icon" aria-hidden="true">
                <Icon size={30} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p className="why-gnz-statement">{statement}</p>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
