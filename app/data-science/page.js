import { Database, ScanSearch, Waypoints } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Data Science | GNZ Marketing, LLC",
};

export default function DataSciencePage() {
  return (
    <>
      <Hero
        title="Go from Information to Insight"
        copy="Staying a step ahead requires a deep understanding of customer data and the know-how to find what matters most."
        variant="data"
      />
      <section className="section">
        <div className="container">
          <h2>Revealing the Truth Behind the Numbers</h2>
          <p className="wide-copy">
            Data is important, but the real advantage comes from identifying the critical factors in your customers'
            decision-making and turning them into practical marketing action.
          </p>
          <div className="data-steps">
            <article>
              <Database size={42} />
              <h3>Collecting</h3>
              <p>Compile data from your company, public sources, and trusted providers to ensure accuracy and relevance.</p>
            </article>
            <article>
              <Waypoints size={42} />
              <h3>Modeling</h3>
              <p>Extract meaningful insights and analyze which factors are most important to your KPIs.</p>
            </article>
            <article>
              <ScanSearch size={42} />
              <h3>Activating</h3>
              <p>Translate findings into audience segments, channel decisions, messaging tests, and performance reporting.</p>
            </article>
          </div>
          <div className="matrix" aria-label="Example data model">
            {["Internal Data", "Name", "Address", "Age", "Product Usage", "Demographic Data", "Ethnicity", "Household Size", "Preferred Language", "Number of Children", "Financial Data", "Credit Utilization", "Home Ownership", "Home Value", "Rent Prices", "Psychographic Data", "Marketing Receptiveness", "Preferred Channels", "Optimal Messaging", "Pathos"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to convert customer data into action?" />
    </>
  );
}
