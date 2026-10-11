import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";
import { validateManagedRecord } from "@/lib/validation";

const tables = {
  "selected-work": "gnz_selected_work",
  insights: "gnz_insights",
  "investment-opportunities": "gnz_investment_opportunities",
};

function getTable(kind) {
  return tables[kind] || null;
}

function responseForError(error) {
  if (error?.code === "23505") return NextResponse.json({ message: "That slug is already in use." }, { status: 409 });
  return NextResponse.json({ message: "The content could not be saved." }, { status: 500 });
}

export async function POST(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const { kind } = await params;
  const table = getTable(kind);
  if (!table) return NextResponse.json({ message: "Unknown content type." }, { status: 404 });
  const validation = validateManagedRecord(kind, await request.json());
  if (!validation.valid) return NextResponse.json({ message: "Review the content fields.", errors: validation.errors }, { status: 422 });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Content storage is not configured." }, { status: 503 });
  const payload = { ...validation.data, updated_by: auth.user.id, published_at: validation.data.status === "published" ? new Date().toISOString() : null };
  delete payload.id;
  const { data, error } = await client.from(table).insert(payload).select("*").single();
  if (error) return responseForError(error);
  return NextResponse.json({ ok: true, record: data });
}

export async function PUT(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const { kind } = await params;
  const table = getTable(kind);
  if (!table) return NextResponse.json({ message: "Unknown content type." }, { status: 404 });
  const input = await request.json();
  const validation = validateManagedRecord(kind, input);
  if (!validation.valid) return NextResponse.json({ message: "Review the content fields.", errors: validation.errors }, { status: 422 });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Content storage is not configured." }, { status: 503 });
  const id = String(input.id || "").trim();
  if (!id) return NextResponse.json({ message: "A record id is required." }, { status: 400 });
  const payload = { ...validation.data, updated_by: auth.user.id, published_at: validation.data.status === "published" ? new Date().toISOString() : null };
  delete payload.id;
  const { data, error } = await client.from(table).update(payload).eq("id", id).select("*").maybeSingle();
  if (error) return responseForError(error);
  if (!data) return NextResponse.json({ message: "The content record was not found." }, { status: 404 });
  return NextResponse.json({ ok: true, record: data });
}

export async function DELETE(request, { params }) {
  const auth = await authorizeAdminRequest();
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });
  const { kind } = await params;
  const table = getTable(kind);
  if (!table) return NextResponse.json({ message: "Unknown content type." }, { status: 404 });
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "").trim();
  if (!id) return NextResponse.json({ message: "A record id is required." }, { status: 400 });
  const client = createServiceClient();
  if (!client) return NextResponse.json({ message: "Content storage is not configured." }, { status: 503 });
  const { data, error } = await client.from(table).update({ status: "archived", updated_by: auth.user.id, published_at: null }).eq("id", id).select("*").maybeSingle();
  if (error) return responseForError(error);
  if (!data) return NextResponse.json({ message: "The content record was not found." }, { status: 404 });
  return NextResponse.json({ ok: true, record: data });
}
