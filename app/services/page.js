import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/content";

export const metadata = {
  title: "What We Do | GNZ Marketing Group",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="What We Do"
        title="Capabilities built around opportunity and growth."
        copy="GNZ connects business development, strategic marketing, real estate, behavioral insight, and relationships to help organizations move forward."
        variant="services"
      />
      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="Our capabilities"
            title="The right mix of insight, relationships, and execution."
            copy="Explore the areas that form GNZ Marketing Group's broader positioning. Existing specialist pages remain available where they add useful detail."
          />
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to find the smarter path to growth?" />
    </>
  );
}
