import { c as createComponent } from './_astro_assets_X2pNmPd1.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_hyDUavzg.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_CdDQKt6J.mjs';
import { s as supabase } from './supabase_DkXvc3Im.mjs';

const $$Registro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Registro;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();
      if (email && password) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          errorMessage = error.message;
        } else if (data.session) {
          const { access_token, refresh_token } = data.session;
          Astro2.cookies.set("sb-access-token", access_token, { path: "/", httpOnly: true, secure: true });
          Astro2.cookies.set("sb-refresh-token", refresh_token, { path: "/", httpOnly: true, secure: true });
          return Astro2.redirect("/coleccion");
        } else {
          return Astro2.redirect("/login");
        }
      }
    } catch (e) {
      console.error("Error en registro:", e);
      errorMessage = "An unexpected error occurred.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Register", "data-astro-cid-ohowjl3i": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-ohowjl3i": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-ohowjl3i": true })} ${maybeRenderHead()}<main class="contenedor-centrado" data-astro-cid-ohowjl3i> <section class="carta contenedor-formulario" data-astro-cid-ohowjl3i> <h1 class="bienvenida" data-astro-cid-ohowjl3i>Create your Account</h1> <p class="subtitulo" data-astro-cid-ohowjl3i>Sign up to start tracking your personal museum collection!</p> ${errorMessage && renderTemplate`<div class="caja-error" data-astro-cid-ohowjl3i> <p data-astro-cid-ohowjl3i>${errorMessage}</p> </div>`} <form method="POST" class="formulario-autenticacion" data-astro-cid-ohowjl3i> <div class="grupo-formulario" data-astro-cid-ohowjl3i> <label for="email" data-astro-cid-ohowjl3i>Email Address</label> <input type="email" id="email" name="email" placeholder="mail@example.com" required data-astro-cid-ohowjl3i> </div> <div class="grupo-formulario" data-astro-cid-ohowjl3i> <label for="password" data-astro-cid-ohowjl3i>Password</label> <input type="password" id="password" name="password" placeholder="Password" required data-astro-cid-ohowjl3i> </div> <button type="submit" class="boton-envio" data-astro-cid-ohowjl3i>Register Account</button> </form> <div class="enlace-login" data-astro-cid-ohowjl3i> <p data-astro-cid-ohowjl3i>Already have an account? <a href="/login" data-astro-cid-ohowjl3i>Log in here</a></p> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-ohowjl3i": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/registro.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/registro.astro";
const $$url = "/registro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Registro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
