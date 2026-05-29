import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/content";

export const metadata = {
  title: "Services | GNZ Marketing, LLC",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Services Built for Smarter Growth"
        copy="Keep the LimeTree service structure for now: behavioral science, data science, and performance marketing, adapted for GNZ."
        variant="services"
      />
      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="Our Services"
            title="End-to-end insight, strategy, and campaign support."
            copy="Each service page is available as a static route and ready for final copy, case studies, and lead capture integrations later."
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
