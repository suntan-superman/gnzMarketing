import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Contact | GNZ Marketing Group",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Let&apos;s talk about what&apos;s next."
        copy="Tell us about the opportunity, relationship, or growth challenge you are exploring."
        variant="contact"
      />
      <ContactForm />
    </>
  );
}
