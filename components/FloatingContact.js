import TrackedLink from "@/components/TrackedLink";

export default function FloatingContact() {
  return (
    <TrackedLink className="floating-contact" href="/contact" aria-label="Contact GNZ Marketing" eventName="contact_cta_click" eventParams={{ location: "floating_contact" }}>
      Let&apos;s Talk
    </TrackedLink>
  );
}
