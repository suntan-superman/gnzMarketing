import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Contact | GNZ Marketing, LLC",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Ready to Impact Customer Behavior and Improve ROI?"
        copy="Contact us to find out how smarter marketing can improve performance and give you a competitive edge."
        variant="contact"
      />
      <ContactForm />
    </>
  );
}
