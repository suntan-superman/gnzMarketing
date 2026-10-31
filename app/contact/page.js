import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Contact GNZ Marketing Group", description: "Tell GNZ about the opportunity, relationship, or growth challenge you are exploring.", path: "/contact" });

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
