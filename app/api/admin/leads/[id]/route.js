import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";
import { validateLeadUpdate } from "@/lib/validation";

export async function PUT(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const validation = validateLeadUpdate(await request.json());
  if (!validation.valid) return NextResponse.json({ message: validation.error }, { status: 422 });
  const client = createServiceClient();
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
