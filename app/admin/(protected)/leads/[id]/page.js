import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminAssignees, getAdminLead, getLeadNotificationLog } from "@/lib/siteContent";
import { GNZ_SERVICE_OPTIONS } from "@/lib/validation";
import LeadStatusEditor from "@/components/admin/LeadStatusEditor";

export default async function LeadDetailPage({ params }) {
  const id = (await params).id;
  const [lead, assignees, notifications] = await Promise.all([getAdminLead(id), getAdminAssignees(), getLeadNotificationLog(id)]);
  if (!lead) notFound();
  const service = GNZ_SERVICE_OPTIONS.find((item) => item.value === lead.service)?.label || lead.service;
  return <><header className="admin-page-header"><div><Link className="admin-back" href="/admin/leads">← All leads</Link><h1>{lead.first_name} {lead.last_name}</h1><span>{lead.lead_type === "seller" ? "Seller" : "Investor"} · {lead.reference} · {service}</span></div></header><div className="lead-detail-grid"><section className="admin-card"><h2>Contact details</h2><dl className="detail-list"><div><dt>Source</dt><dd>{lead.source_site || lead.source}</dd></div>{lead.lead_type === "seller" ? <><div><dt>Property</dt><dd>{lead.property_address}, {lead.property_city}, {lead.property_zip}</dd></div><div><dt>Property details</dt><dd>{[lead.property_type, lead.property_condition, lead.occupancy, lead.desired_timing].filter(Boolean).join(" · ") || "Not provided"}</dd></div><div><dt>Preferred contact</dt><dd>{lead.preferred_contact || "Not provided"}</dd></div></> : <div><dt>Company</dt><dd>{lead.company_name || "Not provided"}</dd></div>}<div><dt>Phone</dt><dd>{lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "Not provided"}</dd></div><div><dt>Email</dt><dd>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "Not provided"}</dd></div><div><dt>Service</dt><dd>{service}</dd></div></dl><h2>Comments</h2><p className="lead-message">{lead.message}</p>{lead.lead_type === "seller" ? <><h2>Notification delivery</h2>{notifications.length ? <dl className="detail-list">{notifications.map((item) => <div key={item.id}><dt>{new Date(item.attempted_at).toLocaleString()}</dt><dd>{item.channel} · {item.status}{item.error_code ? ` · ${item.error_code}` : ""}</dd></div>)}</dl> : <p>No notification attempts recorded.</p>}</> : null}</section><LeadStatusEditor lead={lead} assignees={assignees} /></div></>;
}
