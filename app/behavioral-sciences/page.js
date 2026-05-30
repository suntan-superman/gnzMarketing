import { Blend, ClipboardCheck, FileSearch, Microscope } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { industries } from "@/lib/content";

export const metadata = {
  title: "Behavioral Science | GNZ Marketing, LLC",
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
        title="Turn Human Insights into Marketing Intelligence"
        copy="Behavioral science is a shortcut to strategy that actually works. We uncover what drives real-world judgment and decision-making so your marketing connects, converts, and sticks."
        variant="behavioral"
      />
      <section className="section">
        <div className="container">
          <h2>The Psychology Behind Every Click, Scroll, and Choice</h2>
          <p className="wide-copy">
            Led by research-minded marketers and industry experts, our Behavioral Science practice zeroes in on the biases,
            friction points, hidden drivers, and context cues that influence your audience.
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
          <div className="industry-list">
            {industries.map((industry) => (
              <article className="industry-item" key={industry.name}>
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
