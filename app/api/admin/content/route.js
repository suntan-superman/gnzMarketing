import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";
import { validateEditableContent } from "@/lib/validation";

export async function PUT(request) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  try {
    const validation = validateEditableContent(await request.json());
    if (!validation.valid) return NextResponse.json({ message: "Review the highlighted content fields.", errors: validation.errors }, { status: 422 });
    const client = createServiceClient();
    const { principals, jobs, hubEntries } = validation.data;
    const [principalsResult, jobsResult, hubResult] = await Promise.all([
      client.from("gnz_principals").upsert(principals.map((item) => ({ ...item, updated_by: auth.user.id }))).select("*").order("sort_order"),
      client.from("gnz_jobs").upsert(jobs.map((item) => ({ ...item, updated_by: auth.user.id }))).select("*").order("sort_order"),
      client.from("gnz_hub_entries").upsert(hubEntries.map((item) => ({ ...item, updated_by: auth.user.id }))).select("*").order("sort_order"),
    ]);
    const error = principalsResult.error || jobsResult.error || hubResult.error;
    if (error) return NextResponse.json({ message: "Site content could not be saved." }, { status: 500 });
    return NextResponse.json({ ok: true, principals: principalsResult.data, jobs: jobsResult.data, hubEntries: hubResult.data });
  } catch {
    return NextResponse.json({ message: "Site content could not be saved." }, { status: 400 });
  }
}
