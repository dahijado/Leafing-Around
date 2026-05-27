import type { APIRoute } from "astro";
import { createServerSupabase } from "../../lib/supabase-server";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createServerSupabase(cookies);

  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error("Error al cerrar sesión en Supabase:", e);
  }

  return redirect("/login", 302);
};
