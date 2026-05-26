import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return redirect("/login?error=Missing email or password", 302);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?error=${encodeURIComponent(error.message)}`, 302);
    }

    if (data.session) {
      const { access_token, refresh_token } = data.session;
      cookies.set("sb-access-token", access_token, {
        path: "/",
        httpOnly: true,
        secure: true,
      });
      cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return redirect("/coleccion", 302);
    }

    return redirect("/login?error=Authentication failed", 302);
  } catch (e) {
    console.error("Error en la API de login:", e);
    return redirect("/login?error=Unexpected error", 302);
  }
};
