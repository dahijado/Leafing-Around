import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error("Error al cerrar sesión en Supabase:", e);
  }

  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });

  return redirect("/login", 302);
};
