import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { getSupabaseConfig, hasPublicSupabaseConfig } from "@/lib/supabase/config";
import { getSessionCookieOptions } from "@/lib/supabase/sessionCookies";

export async function proxy(request) {
  let response = NextResponse.next({ request });
  if (hasPublicSupabaseConfig()) {
    const { url, publishableKey } = getSupabaseConfig();
    const client = createServerClient(url, publishableKey, {
      cookieOptions: getSessionCookieOptions(request.headers),
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(values) {
          values.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    await client.auth.getUser();
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
