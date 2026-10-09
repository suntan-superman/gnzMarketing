import { Blend, ClipboardCheck, FileSearch, Microscope } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { behavioralIndustries } from "@/lib/content";

export const metadata = {
  title: "Behavioral Insight | GNZ Marketing Group",
};

export default function BehavioralSciencePage() {
  const process = [
    ["In-Depth Behavioral Analysis", "We uncover the psychology, biases, and context behind customer decisions.", Microscope],
    ["Materials and Market Evaluation", "We audit your materials against the market to uncover opportunities.", FileSearch],
    ["Strategy and Creative Development", "We design solutions that leverage behavioral insights.", ClipboardCheck],
    ["Impact Measurement", "We track results to ensure our solutions generate impact.", Blend],
  ];

  return (
    <>
      <Hero
        eyebrow="Behavioral Insight"
        title="Understand What Drives People to Decide, Act, and Buy."
        copy="GNZ applies behavioral principles and customer insight to help businesses communicate more effectively, build stronger relationships, and make better marketing and business decisions."
        variant="behavioral"
      />
      <section className="section">
        <div className="container">
          <h2>Practical insight into decisions, communication, and action.</h2>
          <p className="wide-copy">
            GNZ uses practical behavioral insight to understand the context, friction points, and motivations that influence
            people. Existing Behavioral Science methodology remains available where it helps explain the work.
          </p>
          <div className="process-list">
            {process.map(([title, copy, Icon], index) => (
              <article className={`process-card tone-${index}`} key={title}>
                <div className="process-icon"><Icon size={46} /></div>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section band-gray">
        <div className="container">
          <h2>Deep Industry Expertise</h2>
          <div className="industry-list single-industry-list">
            {behavioralIndustries.map((industry) => (
              <article className="industry-item single-industry-item" key={industry.name}>
                <div className="industry-image" style={{ backgroundImage: industry.gradient }} />
                <div>
                  <h3>{industry.name}</h3>
                  {industry.description ? (
                    <p>{industry.description}</p>
                  ) : (
                    <ul>
                      {industry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to uncover what moves your customers?" />
    </>
  );
}
