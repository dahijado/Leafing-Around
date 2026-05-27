import { createServerClient } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export function createServerSupabase(cookies: AstroCookies) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        name: "sb-auth-token",
        path: "/",
        sameSite: "lax",
        secure: import.meta.env.PROD,
      },
      cookies: {
        getAll() {
          const cookie = cookies.get("sb-auth-token");
          return cookie ? [{ name: "sb-auth-token", value: cookie.value }] : [];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              ...options,
              path: "/",
              sameSite: "lax",
              secure: import.meta.env.PROD,
            });
          });
        },
      },
    },
  );
}
