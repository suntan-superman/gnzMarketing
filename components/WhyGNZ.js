import { ArrowUpRight, Brain, Handshake, Users, Zap } from "lucide-react";

const differentiators = [
  {
    title: "People First",
    statement: "We start by understanding the people behind the decision.",
    copy:
      "Behavioral insight helps GNZ understand what matters to customers, stakeholders, and the people involved in the opportunity.",
    Icon: Users,
  },
  {
    title: "Opportunity Driven",
    statement: "We look beyond the obvious to identify where value can be created.",
    copy: "GNZ connects market context, customer understanding, and practical strategy to find the next useful opening.",
    Icon: ArrowUpRight,
  },
  {
    title: "Relationship Focused",
    statement: "The right relationship can create opportunities that strategy alone cannot.",
    copy:
      "We build thoughtful connections between the people, businesses, and organizations involved in moving an opportunity forward.",
    Icon: Handshake,
  },
  {
    title: "Built for Action",
    statement: "Ideas only matter when they turn into measurable movement.",
    copy:
      "GNZ turns insight and opportunity into focused next steps, clear objectives, and useful learning.",
    Icon: Zap,
  },
];

export default function WhyGNZ() {
  return (
    <section className="section why-gnz-section" aria-labelledby="why-gnz-title">
      <div className="container">
        <div className="section-intro centered why-gnz-intro">
          <p className="kicker">Why GNZ?</p>
          <h2 id="why-gnz-title">We Connect the Pieces Others Often See Separately.</h2>
          <p>
            GNZ looks at the bigger picture—understanding the people involved, identifying opportunities, building the right
            relationships, and creating a practical path forward.
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
