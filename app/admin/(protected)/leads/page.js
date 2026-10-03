import Link from "next/link";
import { getAdminLeads } from "@/lib/siteContent";
import { GNZ_LEAD_STATUSES, GNZ_SERVICE_OPTIONS } from "@/lib/validation";

export default async function LeadsPage({ searchParams }) {
  const query = await searchParams;
  const filters = { search: query.search || "", status: query.status || "", service: query.service || "" };
  const leads = await getAdminLeads(filters);
  const serviceName = (value) => GNZ_SERVICE_OPTIONS.find((item) => item.value === value)?.label || value;
  return <><header className="admin-page-header"><div><p>Contact submissions</p><h1>Leads</h1><span>Search inquiries and manage follow-up status.</span></div></header><form className="lead-filters" method="get"><label>Search<input name="search" defaultValue={filters.search} placeholder="Name, company, phone, email, or reference" /></label><label>Status<select name="status" defaultValue={filters.status}><option value="">All statuses</option>{GNZ_LEAD_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Service<select name="service" defaultValue={filters.service}><option value="">All services</option>{GNZ_SERVICE_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><button className="button" type="submit">Apply filters</button><Link className="button button-secondary" href="/admin/leads">Clear</Link></form><section className="admin-card"><div className="admin-card-heading"><div><h2>{leads.length} lead{leads.length === 1 ? "" : "s"}</h2><p>Newest submissions appear first.</p></div></div>{leads.length ? <div className="admin-lead-list">{leads.map((lead) => <Link href={`/admin/leads/${lead.id}`} key={lead.id}><strong>{lead.first_name} {lead.last_name}</strong><span>{lead.company_name || "No company"} · {serviceName(lead.service)} · {lead.phone}</span><small>{lead.reference} · {lead.status}</small></Link>)}</div> : <div className="admin-empty">No leads match these filters.</div>}</section></>;
}
