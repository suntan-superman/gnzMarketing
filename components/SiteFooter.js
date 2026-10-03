import Link from "next/link";
import { getBusinessPhone } from "@/lib/phone";

const { phoneDisplay, phoneHref } = getBusinessPhone(process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY);

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" href="/">GNZ Marketing, LLC</Link>
          <p>Behavioral marketing, data science, and performance marketing for clearer growth decisions.</p>
        </div>
        <div>
          <h2>Contact</h2>
          {phoneDisplay ? <a href={phoneHref}>{phoneDisplay}</a> : null}
          <a href="mailto:contact@gnzmarketingllc.com">contact@gnzmarketingllc.com</a>
          <span>gnzmarketingllc.com</span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/behavioral-sciences">Behavioral Science</Link>
          <Link href="/data-science">Data Science</Link>
          <Link href="/performance-marketing">Performance Marketing</Link>
        </div>
      </div>
    </footer>
  );
}
