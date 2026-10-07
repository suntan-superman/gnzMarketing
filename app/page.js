import { ArrowRight, Building2, Compass, Map, Users } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import ServiceCard from "@/components/ServiceCard";
import WhyGNZ from "@/components/WhyGNZ";
import { approachSteps, realEstateAreas, services } from "@/lib/content";
import { getPublicPrincipals } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

const areaIcons = [Building2, Compass, Users, Map];

export default async function Home() {
  const principals = await getPublicPrincipals();

  return (
    <>
      <Hero
        eyebrow="GNZ Marketing Group"
        title="Strategy. Relationships. Opportunities. Growth."
        copy="GNZ Marketing Group brings together business development, strategic marketing, real estate, behavioral insight, and partnerships to identify opportunities and turn them into measurable growth."
        capability="Business Development | Marketing | Real Estate | Strategic Partnerships"
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
        secondaryCtaLabel="Explore What We Do"
        secondaryCtaHref="/services"
        variant="home"
      />

      <section className="section" id="what-we-do">
        <div className="container">
          <SectionIntro
            kicker="What We Do"
            title="Capabilities built around opportunity and growth."
            copy="GNZ connects insight, strategy, relationships, and execution across the areas that help organizations move forward."
          />
          <div className="service-grid service-grid-four">
            {services.map((service) => <ServiceCard key={service.title} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section band-gray" id="real-estate-preview">
        <div className="container">
          <SectionIntro
            kicker="Real Estate"
            title="Relationships that connect opportunities, buyers, and investors."
            copy="GNZ identifies real estate opportunities, builds relationships between buyers, sellers, and investors, and supports transactions from opportunity identification through disposition."
          />
          <div className="real-estate-grid">
            {realEstateAreas.map((area, index) => {
              const Icon = areaIcons[index];
              return <article className="real-estate-card" key={area.id}>
                <Icon size={34} aria-hidden="true" />
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
                <a className="text-link" href={`/real-estate#${area.id}`}>Explore {area.title} <ArrowRight size={18} /></a>
              </article>;
            })}
          </div>
        </div>
      </section>

      <WhyGNZ />

      <section className="section" id="approach-preview">
        <div className="container two-col align-center">
          <SectionIntro
            kicker="Our Approach"
            title="Understand the opportunity. Build the right path forward."
            copy="Our approach connects customer understanding, data, relationships, and practical execution without losing sight of the decisions that matter."
          />
          <ol className="approach-list">
            {approachSteps.map(([title, copy], index) => <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{title}</strong><p>{copy}</p></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section className="section band-blue" id="about-preview">
        <div className="container two-col align-center">
          <div>
            <p className="kicker">About GNZ</p>
            <h2>Marketing, relationships, and opportunities connected by strategy.</h2>
            <p className="wide-copy">GNZ Marketing Group brings together marketing strategy, behavioral insight, business development, real estate, and strategic relationships to identify opportunities and help organizations grow.</p>
            <Link className="button" href="/about">Who We Are <ArrowRight size={18} /></Link>
          </div>
          <div className="principal-preview-grid">
            {principals.map((principal) => <article className="principal-preview" key={principal.id || principal.name}>
              <p className="kicker">Principal</p>
              <h3>{principal.name}</h3>
              <p>{principal.role}</p>
              <Link className="text-link" href={principal.name?.toLowerCase().includes("gabriel") ? "/about/gabriel-gonzales" : "/about"}>View profile <ArrowRight size={18} /></Link>
            </article>)}
          </div>
        </div>
      </section>

      <CTASection title="Start a conversation about what’s next." />
    </>
  );
}
