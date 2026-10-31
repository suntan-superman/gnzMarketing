import ContactForm from "./ContactForm";
import TrackedLink from "@/components/TrackedLink";

export default function CTASection({ title }) {
  return (
    <section className="cta-section">
      <div className="hero-ring cta-ring" aria-hidden="true" />
      <div className="container">
        <h2>{title}</h2>
        <p>Have a business challenge, growth opportunity, property, partnership, or idea worth exploring? Let&apos;s talk.</p>
        <TrackedLink className="button cta-link" href="/contact" eventName="contact_cta_click" eventParams={{ location: "cta_section" }}>Let&apos;s Talk</TrackedLink>
        <ContactForm compact />
      </div>
    </section>
  );
}
