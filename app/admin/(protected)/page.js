import Link from "next/link";
import { getDashboardData } from "@/lib/siteContent";
import { GNZ_LEAD_STATUSES } from "@/lib/validation";

export default async function AdminDashboard() {
  const data = await getDashboardData();
  return <><header className="admin-page-header"><div><p>GNZ Marketing</p><h1>Dashboard</h1><span>Review new inquiries and keep public site content current.</span></div><Link className="button" href="/admin/content">Edit site content</Link></header><section className="admin-stat-grid">{GNZ_LEAD_STATUSES.map((status) => <div className="admin-stat" key={status.value}><span>{status.label}</span><strong>{data.counts[status.value] || 0}</strong></div>)}</section><section className="admin-card"><div className="admin-card-heading"><div><h2>Recent leads</h2><p>Newest inquiries appear first.</p></div><Link href="/admin/leads">View all leads</Link></div>{data.leads.length ? <div className="admin-lead-list">{data.leads.map((lead) => <Link href={`/admin/leads/${lead.id}`} key={lead.id}><strong>{lead.first_name} {lead.last_name}</strong><span>{lead.company_name || "No company"} · {lead.service}</span><small>{lead.reference}</small></Link>)}</div> : <div className="admin-empty">No leads have been received yet.</div>}</section></>;
}
