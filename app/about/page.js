import { Play, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import { getPublicPrincipals } from "@/lib/siteContent";

export const metadata = {
  title: "About | GNZ Marketing, LLC",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const principals = await getPublicPrincipals();
  return (
    <>
      <Hero
        title="Empowering Smart Marketing Decisions"
        copy="Partnering with GNZ Marketing is a path to better, smarter, and faster marketing decisions based on real customer decision trends."
        variant="about"
      />

      <section className="section split-section">
        <div className="container two-col">
          <div>
            <h2>Making Marketing Decisions Easier Than Ever</h2>
            <a className="button" href="/approach">Learn More About Our Approach</a>
          </div>
          <div className="copy-stack">
            <p>
              GNZ Marketing is a behavioral marketing company dedicated to making marketing smarter and more effective by
              uniting data, behavioral science, and practical campaign execution.
            </p>
            <p>
              Through a combination of proven processes, qualified professionals, and thoughtful technology, we help clients
              reduce waste, maximize performance, and focus on the decisions that matter.
            </p>
            <p>
              This is placeholder company copy until final qualifications and background details are available.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-gray">
        <div className="container two-col align-center">
          <div>
            <SectionIntro
              kicker="The Next Step in Marketing Evolution"
              copy="GNZ began with a simple, holistic purpose: make marketing smarter and more impactful."
            />
            <p>
              We apply curiosity, testing, and clear reporting to uncover the why behind customer behavior and validate the
              best way to improve process, message, and campaign results.
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
          <SectionIntro title="Principals" copy="Meet the people behind GNZ's behavioral, data, and performance marketing work." centered />
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
