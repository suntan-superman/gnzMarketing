import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";
import { validateLeadUpdate } from "@/lib/validation";

export async function PUT(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Lead storage is not configured." }, { status: 503 });
  const validation = validateLeadUpdate(await request.json());
  if (!validation.valid) return NextResponse.json({ message: validation.error }, { status: 422 });
<<<<<<< HEAD
  const client = createServiceClient();
=======
>>>>>>> feature/gnz-admin-content-oct-2026
  if (validation.data.assigned_to) {
    const { data: assignee } = await client.from("admin_users").select("user_id").eq("user_id", validation.data.assigned_to).maybeSingle();
    if (!assignee) return NextResponse.json({ message: "Choose an authorized GNZ administrator." }, { status: 422 });
  }
  const { data, error } = await client.rpc("smkh_admin_update_lead", {
    p_lead_id: (await params).id,
    p_status: validation.data.status,
    p_internal_notes: validation.data.internal_notes,
    p_assigned_to: validation.data.assigned_to,
    p_actor_id: auth.user.id,
  }).maybeSingle();
  if (error || !data) return NextResponse.json({ message: "Lead could not be updated." }, { status: 500 });
  return NextResponse.json({ ok: true, lead: data });
}

export async function PATCH(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Lead storage is not configured." }, { status: 503 });
  const { action } = await request.json().catch(() => ({}));
  if (action !== "archive" && action !== "restore") return NextResponse.json({ message: "Choose archive or restore." }, { status: 422 });
  const update = action === "archive"
    ? { archived_at: new Date().toISOString(), archived_by: auth.user.id }
    : { archived_at: null, archived_by: null };
  const { data, error } = await client.from("gnz_leads").update(update).eq("id", (await params).id).select("*").maybeSingle();
  if (error || !data) return NextResponse.json({ message: "Lead could not be updated." }, { status: error ? 500 : 404 });
  return NextResponse.json({ ok: true, lead: data });
}

export async function DELETE(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Lead storage is not configured." }, { status: 503 });
  const id = (await params).id;
  const { data: lead, error: lookupError } = await client.from("gnz_leads").select("id, archived_at").eq("id", id).maybeSingle();
  if (lookupError) return NextResponse.json({ message: "Lead could not be found." }, { status: 500 });
  if (!lead) return NextResponse.json({ message: "Lead could not be found." }, { status: 404 });
  if (!lead.archived_at) return NextResponse.json({ message: "Archive the lead before permanently deleting it." }, { status: 409 });

  const { error: notificationError } = await client.from("smkh_notification_logs").delete().eq("lead_id", id);
  if (notificationError) return NextResponse.json({ message: "Related notification history could not be removed, so the lead was not deleted." }, { status: 500 });
  const { error } = await client.from("gnz_leads").delete().eq("id", id);
  if (error) return NextResponse.json({ message: "Lead could not be permanently deleted." }, { status: 500 });
  return NextResponse.json({ ok: true, deletedBy: auth.user.id });
}
