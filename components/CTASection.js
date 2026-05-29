import ContactForm from "./ContactForm";

export default function CTASection({ title }) {
  return (
    <section className="cta-section">
      <div className="hero-ring cta-ring" aria-hidden="true" />
      <div className="container">
        <h2>{title}</h2>
        <p>Contact us to find out how science can improve marketing performance and give you a competitive edge.</p>
        <ContactForm compact />
      </div>
    </section>
  );
}
