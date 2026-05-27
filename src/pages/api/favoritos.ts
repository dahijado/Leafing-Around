import type { APIRoute } from "astro";
import { createServerSupabase } from "../../lib/supabase-server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createServerSupabase(cookies);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  const { action, slug, nombre, imagen, tipo } = await request.json();

  if (action === "insert") {
    const { error } = await supabase.from("favoritos").insert({
      user_id: user.id,
      criatura_slug: slug,
      nombre,
      imagen_url: imagen,
      tipo,
    });

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
  } else {
    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.id)
      .eq("criatura_slug", slug);

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
  }

  return new Response(JSON.stringify({ success: true }));
};
