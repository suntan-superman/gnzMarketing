import ContactForm from "./ContactForm";

export default function CTASection({ title }) {
  return (
    <section className="cta-section">
      <div className="hero-ring cta-ring" aria-hidden="true" />
      <div className="container">
        <h2>{title}</h2>
        <p>Tell us what you are working toward and where a clearer strategy, stronger relationship, or new opportunity could help.</p>
        <ContactForm compact />
      </div>
    </section>
  );
}
