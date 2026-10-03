"use client";

import { usePathname } from "next/navigation";
import FloatingContact from "@/components/FloatingContact";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const adminRoute = pathname?.startsWith("/admin");
  if (adminRoute) return <main>{children}</main>;
  return (
    <>
      <aside className="site-notice" aria-label="Website status">
        <span className="site-notice-label">Website in progress</span>
        <span>We&apos;re putting the finishing touches on our new site. Thanks for visiting early.</span>
      </aside>
      <SiteHeader />
      <main>{children}</main>
      <FloatingContact />
      <SiteFooter />
    </>
  );
}
