import Link from "next/link";
import { getBusinessPhone } from "@/lib/phone";

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
          {phoneDisplay ? <a href={phoneHref}>{phoneDisplay}</a> : null}
          <a href="mailto:contact@gnzmarketingllc.com">contact@gnzmarketingllc.com</a>
          <span>gnzmarketingllc.com</span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/services">What We Do</Link>
          <Link href="/business-development">Business Development</Link>
          <Link href="/real-estate">Real Estate</Link>
          <Link href="/approach">Our Approach</Link>
          <Link href="/hub">Hub</Link>
          <Link href="/jobs">Jobs</Link>
        </div>
      </div>
    </footer>
  );
}
