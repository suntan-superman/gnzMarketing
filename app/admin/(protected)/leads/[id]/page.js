import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminLead } from "@/lib/siteContent";
import { GNZ_SERVICE_OPTIONS } from "@/lib/validation";
import LeadStatusEditor from "@/components/admin/LeadStatusEditor";

export default async function LeadDetailPage({ params }) {
  const lead = await getAdminLead((await params).id);
  if (!lead) notFound();
  const service = GNZ_SERVICE_OPTIONS.find((item) => item.value === lead.service)?.label || lead.service;
  return <><header className="admin-page-header"><div><Link className="admin-back" href="/admin/leads">← All leads</Link><h1>{lead.first_name} {lead.last_name}</h1><span>{lead.reference} · {service}</span></div></header><div className="lead-detail-grid"><section className="admin-card"><h2>Contact details</h2><dl className="detail-list"><div><dt>Company</dt><dd>{lead.company_name || "Not provided"}</dd></div><div><dt>Phone</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></div><div><dt>Email</dt><dd>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "Not provided"}</dd></div><div><dt>Service</dt><dd>{service}</dd></div></dl><h2>Comments</h2><p className="lead-message">{lead.message}</p></section><LeadStatusEditor lead={lead} /></div></>;
}
