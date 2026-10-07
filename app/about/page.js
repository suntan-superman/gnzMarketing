import { Play, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import { getPublicPrincipals } from "@/lib/siteContent";

export const metadata = {
  title: "About GNZ | GNZ Marketing Group",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const principals = await getPublicPrincipals();
  return (
    <>
      <Hero
        eyebrow="About GNZ"
        title="Marketing, relationships, and opportunities connected by strategy."
        copy="GNZ Marketing Group brings together marketing strategy, behavioral insight, business development, real estate, and strategic relationships to identify opportunities and help organizations grow."
        ctaLabel="Our Approach"
        ctaHref="/approach"
        variant="about"
      />

      <section className="section split-section">
        <div className="container two-col">
          <div>
            <h2>Who We Are</h2>
            <a className="button" href="/approach">Learn More About Our Approach</a>
          </div>
          <div className="copy-stack">
            <p>
              GNZ Marketing Group brings together marketing strategy, behavioral insight, business development, real estate,
              and strategic relationships to identify opportunities and help organizations grow.
            </p>
            <p>
              We connect customer understanding, market insight, and practical execution so organizations can focus on the
              decisions that matter.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-gray">
        <div className="container two-col align-center">
          <div>
            <SectionIntro
              kicker="The GNZ perspective"
              copy="Better growth starts with understanding the opportunity and the people involved."
            />
            <p>
              We apply curiosity, evidence, behavioral understanding, and clear reporting to connect strategy with useful
              action across marketing, business development, real estate, and strategic partnerships.
            </p>
          </div>
          <div className="video-placeholder">
            <Play size={54} fill="white" />
            <span>Founder perspective</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro title="Principals" copy="Meet the people helping GNZ connect insight, relationships, and opportunity." centered />
          <div className="principal-grid">
            {principals.map((principal) => (
              <article className="principal-card" key={principal.name}>
                <div className="avatar"><Sparkles size={30} /></div>
                <h3>{principal.name}</h3>
                <p>{principal.role}</p>
                <p>{principal.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
