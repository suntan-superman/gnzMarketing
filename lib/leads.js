import "server-only";
import { randomBytes } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/notifications";

function leadReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `GNZ-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function createLead(data) {
  const client = createServiceClient();
  if (!client) throw new Error("Lead storage is not configured yet.");
  const record = {
    reference: leadReference(),
    submission_token: data.submissionToken,
    source: "contact",
    first_name: data.firstName,
    last_name: data.lastName,
    company_name: data.companyName,
    phone: data.phone,
    email: data.email,
    service: data.service,
    message: data.message,
  };
  const { data: lead, error } = await client.from("gnz_leads").insert(record).select("*").single();
  if (error?.code === "23505") {
    const { data: existing } = await client.from("gnz_leads").select("*").eq("submission_token", data.submissionToken).maybeSingle();
    if (existing) return { lead: existing, duplicate: true, notification: null };
  }
  if (error || !lead) throw new Error("Your request could not be saved.");
  let notification;
  try {
    notification = await sendLeadNotification(lead);
  } catch {
    notification = { sent: false, reason: "notification_failed" };
  }
  return { lead, duplicate: false, notification };
}
