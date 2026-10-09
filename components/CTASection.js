import ContactForm from "./ContactForm";
import Link from "next/link";

export default function CTASection({ title }) {
  return (
    <section className="cta-section">
      <div className="hero-ring cta-ring" aria-hidden="true" />
      <div className="container">
        <h2>{title}</h2>
        <p>Have a business challenge, growth opportunity, property, partnership, or idea worth exploring? Let&apos;s talk.</p>
        <Link className="button cta-link" href="/contact">Let&apos;s Talk</Link>
        <ContactForm compact />
      </div>
    </section>
  );
}
