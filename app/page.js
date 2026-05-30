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
        title="Marketing Powered by Data. Growth Driven by Results."
        copy="GNZ Marketing helps organizations transform data into actionable insights, smarter campaigns, and measurable business growth."
        ctaLabel="Learn More"
        ctaHref="/about"
        variant="home"
      />

      <section className="band band-blue">
        <div className="container readable">
          <h2>Understand Why Customers Buy.</h2>
          <p>
            GNZ Marketing combines behavioral science, market intelligence, and performance marketing to help organizations
            create more effective campaigns, stronger messaging, and measurable growth.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="How It Works"
            title="Understand What Drives Customers. Grow What Drives Revenue."
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
            title="Turn Customer Insights Into Measurable Growth"
            copy="GNZ Marketing helps organizations uncover what drives customer decisions and transform those insights into strategies that increase engagement, improve marketing performance, and accelerate growth."
            centered
          />
          <div className="outcome-grid">
            {outcomes.map((outcome, index) => {
              const Icon = outcomeIcons[index];
              return (
                <div className="outcome" key={outcome.title}>
                  <Icon size={34} strokeWidth={2.2} />
                  <strong>{outcome.title}</strong>
                  <p>{outcome.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="Industries We Serve"
            copy="We help organizations understand customer behavior, improve decision-making, and drive measurable business outcomes across complex and highly regulated industries."
          />
          <div className="industry-list compact">
            {industries.slice(0, 3).map((industry) => (
              <article className="industry-item" key={industry.name}>
                <div className="industry-image" style={{ backgroundImage: industry.gradient }}>
                  <Microscope size={42} />
                </div>
                <div>
                  <h3>{industry.name}</h3>
                  <p>{industry.description}</p>
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
