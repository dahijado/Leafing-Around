import type { APIRoute } from "astro";
import { createServerSupabase } from "../../lib/supabase-server";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return redirect("/login?error=Invalid_credentials", 302);
    }

    const supabase = createServerSupabase(cookies);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?error=${encodeURIComponent(error.message)}`, 302);
    }

    return redirect("/coleccion", 302);
  } catch (e) {
    return redirect("/login?error=Server_error", 302);
  }
};
