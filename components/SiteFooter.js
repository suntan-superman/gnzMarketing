import Link from "next/link";
import { getBusinessPhone } from "@/lib/phone";
import TrackedAnchor from "@/components/TrackedAnchor";

const { phoneDisplay, phoneHref } = getBusinessPhone(process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY);

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" href="/">GNZ Marketing Group</Link>
          <p>Business development, marketing, real estate, and strategic partnerships informed by human behavior and useful insight.</p>
        </div>
        <div>
          <h2>Contact</h2>
          {phoneDisplay ? <TrackedAnchor href={phoneHref} eventName="phone_click" eventParams={{ location: "footer" }}>{phoneDisplay}</TrackedAnchor> : null}
          <TrackedAnchor href="mailto:contact@gnzmarketingllc.com" eventName="email_click" eventParams={{ location: "footer" }}>contact@gnzmarketingllc.com</TrackedAnchor>
          <span>gnzmarketingllc.com</span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/services">What We Do</Link>
          <Link href="/marketing">Marketing</Link>
          <Link href="/business-development">Business Development</Link>
          <Link href="/strategic-partnerships">Strategic Partnerships</Link>
          <Link href="/behavioral-insight">Behavioral Insight</Link>
          <Link href="/real-estate">Real Estate</Link>
          <Link href="/approach">Our Approach</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/jobs">Jobs</Link>
        </div>
      </div>
    </footer>
  );
}
