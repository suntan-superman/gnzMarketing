import Link from "next/link";
import { ArrowRight, Brain, Handshake, LineChart, Map, Megaphone } from "lucide-react";

const icons = {
  Marketing: Megaphone,
  "Business Development": Handshake,
  "Real Estate": Map,
  "Behavioral Science": Brain,
  "Data Science": LineChart,
  "Performance Marketing": Megaphone,
};

export default function ServiceCard({ service }) {
  const Icon = icons[service.title] || Brain;

  return (
    <article className="service-card">
      <div className="service-illustration">
        <Icon size={68} strokeWidth={1.7} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.copy}</p>
      <Link className="button" href={service.href}>
        Learn More <ArrowRight size={18} />
      </Link>
    </article>
  );
}
