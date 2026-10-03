import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/supabase/server";

export async function POST() {
  const client = await createSessionClient();
  if (client) await client.auth.signOut();
  return new NextResponse(null, { status: 303, headers: { Location: "/admin/login" } });
}
