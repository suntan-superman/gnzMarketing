import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import { getPublicPrincipals } from "@/lib/siteContent";

export const metadata = {
  title: "Zay Aaron-Julian | GNZ Marketing Group",
};

export const dynamic = "force-dynamic";

export default async function ZayPage() {
  const principals = await getPublicPrincipals();
  const principal = principals.find((item) => item.name?.toLowerCase().includes("zay")) || principals[1];
  return <>
    <Hero eyebrow="About GNZ" title={principal?.name || "Zay Aaron-Julian"} copy={principal?.role || "Principal"} variant="about" />
    <section className="section"><div className="container two-col align-center"><div className="avatar"><Sparkles size={34} /></div><div><p className="kicker">Zay Aaron-Julian</p><h2>Strategic leadership with a practical focus.</h2><p className="wide-copy">{principal?.bio}</p><Link className="text-link" href="/about"><ArrowLeft size={18} /> Back to About GNZ</Link></div></div></section>
  </>;
}
