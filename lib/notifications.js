import "server-only";
import { Resend } from "resend";

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function recipients(value) {
  return String(value ?? "").split(/[;,]/).map((item) => item.trim()).filter((item) => /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(item));
}

export async function sendLeadNotification(lead) {
  const to = [...new Set(recipients(process.env.LEAD_NOTIFICATION_EMAIL))];
  const from = process.env.EMAIL_FROM?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!to.length || !from || !apiKey) return { sent: false, reason: "not_configured" };

  const adminUrl = new URL(`/admin/leads/${lead.id}`, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").toString();
  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from,
      ...(process.env.EMAIL_REPLY_TO?.trim() ? { replyTo: process.env.EMAIL_REPLY_TO.trim() } : {}),
      to: to.length === 1 ? to[0] : to,
      subject: `New GNZ Marketing inquiry ${lead.reference}`,
      html: `<h1>New GNZ Marketing inquiry</h1><p><strong>Reference:</strong> ${escapeHtml(lead.reference)}</p><p><strong>Name:</strong> ${escapeHtml(`${lead.first_name} ${lead.last_name}`.trim())}</p><p><strong>Company:</strong> ${escapeHtml(lead.company_name)}</p><p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p><p><strong>Email:</strong> ${escapeHtml(lead.email)}</p><p><strong>Service:</strong> ${escapeHtml(lead.service)}</p><p><strong>Comments:</strong><br>${escapeHtml(lead.message).replaceAll("\n", "<br>")}</p><p><a href="${escapeHtml(adminUrl)}">Open this lead in the GNZ admin panel</a></p>`,
    });
    return result?.error ? { sent: false, reason: "provider_rejected" } : { sent: true };
  } catch {
    return { sent: false, reason: "provider_unavailable" };
  }
}
