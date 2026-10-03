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
  const { data, error } = await client.from("gnz_leads").update(validation.data).eq("id", (await params).id).select("*").maybeSingle();
  if (error || !data) return NextResponse.json({ message: "Lead could not be updated." }, { status: 500 });
  return NextResponse.json({ ok: true, lead: data });
}
