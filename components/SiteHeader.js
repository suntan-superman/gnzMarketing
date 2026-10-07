"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const groups = [
  {
    label: "What We Do",
    items: [["Marketing", "/marketing"], ["Business Development", "/business-development"], ["Real Estate", "/real-estate"], ["Behavioral Science", "/behavioral-sciences"]],
  },
  {
    label: "Real Estate",
    items: [["Overview", "/real-estate"], ["Acquisitions", "/real-estate#acquisitions"], ["Opportunities", "/real-estate#opportunities"], ["Investor Network", "/real-estate#investor-network"], ["Dispositions", "/real-estate#dispositions"]],
  },
  {
    label: "About GNZ",
    items: [["Who We Are", "/about"], ["Our Approach", "/approach"], ["Gabriel Gonzales", "/about/gabriel-gonzales"]],
  },
];

function pathMatches(pathname, href) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  function closeNavigation() {
    setOpen(false);
    setOpenGroup(null);
  }

  return <header className="site-header">
    <Link className="brand" href="/" aria-label="GNZ Marketing Group home" onClick={closeNavigation}>
      <span className="brand-mark">G</span><span>GNZ</span><small>Marketing Group</small>
    </Link>
    <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => { setOpen((value) => !value); setOpenGroup(null); }}>
      {open ? <X size={26} /> : <Menu size={26} />}
    </button>
    <nav className={open ? "open" : ""} aria-label="Main navigation">
      <Link href="/" className={pathname === "/" ? "active" : ""} onClick={closeNavigation}>Home</Link>
      {groups.map((group) => <details className="nav-group" key={group.label} open={openGroup === group.label} onToggle={(event) => setOpenGroup(event.currentTarget.open ? group.label : null)}>
        <summary className={group.items.some(([, href]) => pathMatches(pathname, href)) ? "active" : ""}>{group.label}<ChevronDown size={16} aria-hidden="true" /></summary>
        <div className="nav-group-menu">
          {group.items.map(([label, href]) => <Link key={href} href={href} className={pathMatches(pathname, href) ? "active" : ""} onClick={closeNavigation}>{label}</Link>)}
        </div>
      </details>)}
      <Link href="/hub" className={pathMatches(pathname, "/hub") ? "active" : ""} onClick={closeNavigation}>Hub</Link>
      <Link className="nav-cta" href="/contact" onClick={closeNavigation}>Contact</Link>
    </nav>
  </header>;
}
