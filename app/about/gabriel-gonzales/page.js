import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import { getPublicPrincipals } from "@/lib/siteContent";

export const metadata = {
  title: "Gabriel Gonzales | GNZ Marketing Group",
};

export const dynamic = "force-dynamic";

export default async function GabrielPage() {
  const principals = await getPublicPrincipals();
  const principal = principals.find((item) => item.name?.toLowerCase().includes("gabriel")) || principals[0];
  return <>
    <Hero eyebrow="About GNZ" title={principal?.name || "Gabriel Gonzales"} copy={principal?.role || "Principal, Strategy & Business Development"} variant="about" />
    <section className="section"><div className="container two-col align-center"><div className="avatar"><Sparkles size={34} /></div><div><p className="kicker">Gabriel Gonzales</p><h2>Strategy, relationships, and client growth.</h2><p className="wide-copy">{principal?.bio}</p><Link className="text-link" href="/about"><ArrowLeft size={18} /> Back to About GNZ</Link></div></div></section>
  </>;
}
