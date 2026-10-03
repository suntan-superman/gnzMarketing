"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/content", label: "Site content" },
];

export default function AdminShell({ profile, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <Link className="admin-brand" href="/admin" onClick={() => setOpen(false)}>
          <span className="admin-brand-mark">G</span>
          <span><strong>GNZ</strong><small>Admin panel</small></span>
        </Link>
        <nav aria-label="Admin navigation">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</Link>;
          })}
        </nav>
        <div className="admin-user">
          <span>Signed in as</span>
          <strong>{profile?.display_name || "GNZ admin"}</strong>
          <form action="/api/admin/auth/logout" method="post"><button type="submit">Sign out</button></form>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-mobile-header">
          <button type="button" aria-expanded={open} aria-label={open ? "Close admin menu" : "Open admin menu"} onClick={() => setOpen((value) => !value)}>☰</button>
          <strong>GNZ admin panel</strong>
          <Link href="/" target="_blank">View site</Link>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
