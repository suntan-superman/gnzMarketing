"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Approach", "/approach"],
  ["Hub", "/hub"],
  ["Jobs", "/jobs"],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="GNZ Marketing home" onClick={() => setOpen(false)}>
        <span className="brand-mark">G</span>
        <span>GNZ</span>
        <small>Marketing</small>
      </Link>
      <button className="nav-toggle" type="button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>
      <nav className={open ? "open" : ""} aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
