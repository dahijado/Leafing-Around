import { c as createComponent } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_B1fbPdfE.mjs';
import { s as supabase } from './supabase_DkXvc3Im.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';

const $$Coleccion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Coleccion;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  const refreshToken = Astro2.cookies.get("sb-refresh-token")?.value;
  if (accessToken && refreshToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login?error=Please log in to access your collection");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - My Collection", "data-astro-cid-cjyqna34": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-cjyqna34": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-cjyqna34": true })} ${maybeRenderHead()}<main class="contenedor" data-astro-cid-cjyqna34> <section class="carta bienvenida" data-astro-cid-cjyqna34> <h1 data-astro-cid-cjyqna34>My Collection</h1> <p data-astro-cid-cjyqna34>Welcome, <strong data-astro-cid-cjyqna34>${user.email}</strong>! This is your personal space to track your captured creatures.</p> </section> <section class="carta" data-astro-cid-cjyqna34> <h2 class="tituloh2" data-astro-cid-cjyqna34>Critter List</h2> <p data-astro-cid-cjyqna34>Lista de favoritos</p> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-cjyqna34": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/coleccion.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/coleccion.astro";
const $$url = "/coleccion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Coleccion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
