import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/adminAuthorization";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }) {
  const [session, query] = await Promise.all([getAdminSession(), searchParams]);
  if (session.user) redirect("/admin");
  return <main className="admin-login-page"><div className="admin-login-card"><Link href="/" className="admin-login-brand"><span className="admin-brand-mark">G</span><span><strong>GNZ</strong><small>Admin panel</small></span></Link><h1>Welcome back.</h1><p>Sign in to manage leads, principal bios, job listings, and Hub content.</p><LoginForm setupRequired={query?.setup === "required" || !session.configured} /><Link href="/" className="back-to-site">← Return to website</Link></div></main>;
}
