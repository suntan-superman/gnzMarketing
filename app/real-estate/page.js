import { ArrowRight, Building2, Compass, Map, Users } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import { realEstateAreas } from "@/lib/content";

export const metadata = {
  title: "Real Estate | GNZ Marketing Group",
  description: "GNZ identifies real estate opportunities and builds relationships between buyers, sellers, and investors.",
};

const icons = [Building2, Compass, Users, Map];

export default function RealEstatePage() {
  return <>
    <Hero
      eyebrow="Real Estate"
      title="Acquisitions | Opportunities | Investor Network | Dispositions"
      copy="GNZ identifies real estate opportunities, builds relationships between buyers, sellers, and investors, and supports transactions from opportunity identification through disposition."
      ctaLabel="Connect With GNZ"
      ctaHref="/contact"
      variant="real-estate"
    />
    <section className="section">
      <div className="container">
        <div className="section-intro readable"><p className="kicker">A relationship-driven focus</p><h2>Connect the right people to the right opportunity.</h2><p>GNZ&apos;s real-estate work is presented conservatively for this review build. The focus is on sourcing, relationships, and clear communication around opportunities—not on unsupported claims about returns, licensing, or transaction history.</p></div>
        <div className="real-estate-detail-grid">
          {realEstateAreas.map((area, index) => { const Icon = icons[index]; return <article className="real-estate-detail" id={area.id} key={area.id}><Icon size={40} aria-hidden="true" /><h2>{area.title}</h2><p>{area.copy}</p><p className="detail-note">GNZ can provide more detail on this area as the service direction develops.</p><Link className="text-link" href="/contact">Connect With GNZ <ArrowRight size={18} /></Link></article>; })}
        </div>
      </div>
    </section>
    <CTASection title="Have a real-estate opportunity to discuss?" />
  </>;
}
