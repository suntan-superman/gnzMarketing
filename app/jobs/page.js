import Hero from "@/components/Hero";
import { getPublicJobs } from "@/lib/siteContent";

export const metadata = {
  title: "Jobs | GNZ Marketing, LLC",
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getPublicJobs();
  return (
    <>
      <Hero title="Join our team." copy="We are building a science-driven marketing company focused on growth, execution, and useful insight." variant="jobs" />
      <section className="section">
        <div className="container readable">
          <p>
            GNZ Marketing is preparing for future growth. We are not listing specific roles yet, but we are interested in
            people who care about strategy, behavior, data, creative execution, and measurable client outcomes.
          </p>
          <h2>Current opportunities:</h2>
          {jobs.length ? <div className="job-list">{jobs.map((job) => <article className="job-card" key={job.id}><h3>{job.name}</h3><p>{job.description}</p></article>)}</div> : <p>No open roles are posted at this time. Please check back soon.</p>}
        </div>
      </section>
    </>
  );
}
