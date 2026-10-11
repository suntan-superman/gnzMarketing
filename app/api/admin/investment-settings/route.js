import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";

export async function PUT(request) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const input = await request.json();
  if (typeof input.enabled !== "boolean") return NextResponse.json({ message: "A boolean enabled value is required." }, { status: 422 });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Content storage is not configured." }, { status: 503 });
  const { data, error } = await client.from("gnz_content_settings").upsert({ key: "investment_opportunities_public_enabled", boolean_value: input.enabled, updated_by: auth.user.id }).select("key, boolean_value, updated_at, updated_by").single();
  if (error) return NextResponse.json({ message: "The investment visibility setting could not be saved." }, { status: 500 });
  return NextResponse.json({ ok: true, setting: data });
}
