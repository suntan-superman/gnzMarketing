import { BarChart3, Brain, Handshake, TrendingUp } from "lucide-react";

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
    title: "Relationship-Driven Growth",
    statement: "Connect opportunities with the people who can move them forward.",
    copy:
      "GNZ brings relationship development, business insight, and strategic partnerships together to create useful connections.",
    Icon: Handshake,
  },
  {
    title: "Strategic Execution",
    statement: "Turn insight and opportunity into measurable action.",
    copy:
      "We connect clear objectives, practical strategy, and focused execution so the next decision is easier to make.",
    Icon: TrendingUp,
  },
];

export default function WhyGNZ() {
  return (
    <section className="section why-gnz-section" aria-labelledby="why-gnz-title">
      <div className="container">
        <div className="section-intro centered why-gnz-intro">
          <p className="kicker">Why GNZ?</p>
          <h2 id="why-gnz-title">Insight that moves people, relationships, and opportunities.</h2>
          <p>
            We combine behavioral insight, data, relationships, and practical strategy to help organizations identify
            opportunities and turn them into measurable growth.
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
