import {
  ArrowRight,
  BarChart3,
  Brain,
  LineChart,
  MessageCircle,
  Microscope,
  MousePointerClick,
  Target,
  Users,
  Zap,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import ServiceCard from "@/components/ServiceCard";
import { industries, outcomes, services } from "@/lib/content";

export default function Home() {
  const outcomeIcons = [LineChart, Zap, Users, MessageCircle, Target, BarChart3, MousePointerClick, Brain];

  return (
    <>
      <Hero
        eyebrow="GNZ Marketing, LLC"
        title="Better Marketing. Less Guesswork."
        copy="We help organizations connect smarter strategy, data-driven insight, and performance marketing so teams can make decisions they can rely on."
        ctaLabel="Learn More"
        ctaHref="/about"
        variant="home"
      />

      <section className="band band-blue">
        <div className="container readable">
          <h2>Stop Marketing on Assumptions. Start Using Science to Understand Your Audience.</h2>
          <p>
            You have seconds to make a meaningful impression with each new interaction. GNZ Marketing helps teams find the
            why behind customer decisions, then turn that understanding into focused campaigns, clearer messaging, and better
            use of budget.
          </p>
          <p>
            Our placeholder positioning mirrors the LimeTree service mix for now: behavioral science, data science, and
            performance marketing working together from insight to execution.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="How It Works"
            title="Improving marketing outcomes with a proven approach that unites data and behavioral science."
          />
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container">
          <h2 className="center-title">Strategic Partners and Certifications</h2>
          <div className="partner-row" aria-label="Placeholder partner badges">
            <span>NMSDC</span>
            <span>Inc. 5000</span>
            <span>Best Workplaces</span>
            <span>Stanford LEI</span>
          </div>
        </div>
      </section>

      <section className="section visual-band">
        <div className="container">
          <SectionIntro
            title="Actionable Customer Insights for Growing Business"
            copy="GNZ works hand-in-hand with clients who want to improve performance, maximize budgets, gain audience clarity, and increase engagement."
            centered
          />
          <div className="outcome-grid">
            {outcomes.map((outcome, index) => {
              const Icon = outcomeIcons[index];
              return (
                <div className="outcome" key={outcome}>
                  <Icon size={34} strokeWidth={2.2} />
                  <strong>{outcome}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="Deep Industry Expertise"
            copy="We have significant experience applying behavioral science services across a wide range of industries, and the results speak for themselves."
          />
          <div className="industry-list compact">
            {industries.slice(0, 3).map((industry) => (
              <article className="industry-item" key={industry.name}>
                <div className="industry-image" style={{ backgroundImage: industry.gradient }}>
                  <Microscope size={42} />
                </div>
                <div>
                  <h3>{industry.name}</h3>
                  <ul>
                    {industry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <a className="text-link" href="/services">
            Explore services <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <CTASection title="Ready to Impact Customer Behavior and Improve ROI?" />
    </>
  );
}
