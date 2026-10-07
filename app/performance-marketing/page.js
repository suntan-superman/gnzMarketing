import { ChartNoAxesCombined, Mail, Megaphone, Search } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Performance Marketing | GNZ Marketing Group",
};

export default function PerformanceMarketingPage() {
  const channels = [
    ["Digital Marketing", "Programmatic, CTV and OTT, social media, SEO, paid search, and maps optimization.", Megaphone],
    ["Direct Marketing", "Direct mail, email, SMS marketing, loyalty, and retention programs.", Mail],
    ["Creative Testing", "Channel-specific pre-testing, message calibration, and creative audits.", Search],
    ["Dashboards", "Custom reporting views that clarify performance and identify next actions.", ChartNoAxesCombined],
  ];

  return (
    <>
      <Hero
        title="Get Performance Marketing Backed by Science"
        copy="Marketing is only as powerful as the people it motivates. We ground campaigns in behavioral and data science to reduce waste and deliver results."
        variant="performance"
      />
      <section className="section">
        <div className="container">
          <h2>Marketing with Your Customers in Mind</h2>
          <p className="wide-copy">
            Once we understand what motivates your customer, our marketing team collaborates across data, behavior, and
            execution to optimize each touchpoint from placement to post-conversion reporting.
          </p>
          <div className="channel-grid">
            {channels.map(([title, copy, Icon]) => (
              <article className="channel-card" key={title}>
                <Icon size={42} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section band-blue">
        <div className="container results-panel">
          <h2>Powerful Impact, Proven Results</h2>
          <div className="result-map">
            <strong>Campaign Development and Execution</strong>
            <span>Behaviorally informed creative design</span>
            <span>Patented psychology matching</span>
            <span>Audience personalization, segmentation and management</span>
            <span>Integrated online and offline response</span>
          </div>
        </div>
      </section>
      <CTASection title="Ready to activate your marketing?" />
    </>
  );
}
