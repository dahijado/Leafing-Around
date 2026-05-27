import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return new Response(JSON.stringify({ error: "No usuario" }), {
      status: 401,
    });

  const { action, slug, nombre, imagen, tipo } = await request.json();

  if (action === "insert") {
    await supabase
      .from("favoritos")
      .insert({
        user_id: user.id,
        criatura_slug: slug,
        nombre,
        imagen_url: imagen,
        tipo,
      });
  } else {
    await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.id)
      .eq("criatura_slug", slug);
  }

  return new Response(JSON.stringify({ success: true }));
};
