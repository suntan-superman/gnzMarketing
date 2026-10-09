import { Handshake, Network, Scale, Users } from "lucide-react";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Strategic Partnerships | GNZ Marketing Group",
  description: "GNZ connects people, businesses, and opportunities where shared interests create value.",
};

const partnershipThemes = [
  ["Shared opportunity", "Start with the opportunity, the people involved, and the value that could be created together.", Handshake],
  ["Cross-industry collaboration", "Bring different perspectives, capabilities, and relationships into the same conversation.", Network],
  ["Relationship development", "Build trust and clarity between organizations with aligned interests.", Users],
  ["Practical alignment", "Turn a promising connection into clear next steps without overpromising the outcome.", Scale],
];

export default function StrategicPartnershipsPage() {
  return <>
    <Hero
      eyebrow="Strategic Partnerships"
      title="Connecting people, organizations, and opportunities where shared interests create value."
      copy="GNZ helps create strategic connections that support business development, market expansion, real estate opportunities, and measurable growth."
      ctaLabel="Connect With GNZ"
      ctaHref="/contact"
      variant="strategic-partnerships"
    />
    <section className="section">
      <div className="container">
        <div className="section-intro readable"><p className="kicker">A distinct capability</p><h2>Partnership creation is more than generic sales outreach.</h2><p>GNZ approaches partnerships by looking for shared interests, complementary relationships, and a practical reason to move the conversation forward. The right connection can create opportunities that strategy alone cannot.</p></div>
        <div className="theme-grid">{partnershipThemes.map(([title, copy, Icon]) => <article className="theme-card" key={title}><Icon size={38} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>
    <section className="section band-gray"><div className="container two-col align-center"><div><p className="kicker">Connected to growth</p><h2>Cross-linking relationships, business development, marketing, and real estate.</h2></div><p className="wide-copy">Strategic Partnerships is a standalone GNZ capability, while remaining connected to the broader opportunities GNZ is helping businesses, investors, and organizations explore.</p></div></section>
    <CTASection title="Let’s talk about the right connection." />
  </>;
}
