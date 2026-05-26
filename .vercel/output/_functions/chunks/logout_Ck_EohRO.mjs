import { s as supabase } from './supabase_DkXvc3Im.mjs';

const POST = async ({ cookies, redirect }) => {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error("Error al cerrar sesión en Supabase:", e);
  }
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/login", 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
