import { c as createComponent } from './_astro_assets_X2pNmPd1.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_hyDUavzg.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_CdDQKt6J.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const msg = Astro2.url.searchParams.get("msg");
  const errorParam = Astro2.url.searchParams.get("error");
  let errorMessage = errorParam ? decodeURIComponent(errorParam) : "";
  let successMessage = msg ? decodeURIComponent(msg) : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Login", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-sgpqyurt": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-sgpqyurt": true })} ${maybeRenderHead()}<main class="contenedor-centrado" data-astro-cid-sgpqyurt> <section class="carta contenedor-formulario" data-astro-cid-sgpqyurt> <h1 class="titulo-bienvenida" data-astro-cid-sgpqyurt>Sign In</h1> <p class="subtitulo-texto" data-astro-cid-sgpqyurt>Welcome! Sign in to access your museum collection.</p> ${successMessage && renderTemplate`<div class="caja-exito" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>${successMessage}</p> </div>`} ${errorMessage && renderTemplate`<div class="caja-error" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>${errorMessage}</p> </div>`} <form action="/api/login" method="POST" class="formulario-autenticacion" data-astro-cid-sgpqyurt> <div class="grupo-formulario" data-astro-cid-sgpqyurt> <label for="email" data-astro-cid-sgpqyurt>Email Address</label> <input type="email" id="email" name="email" placeholder="mail@example.com" required data-astro-cid-sgpqyurt> </div> <div class="grupo-formulario" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Password</label> <input type="password" id="password" name="password" placeholder="Password" required data-astro-cid-sgpqyurt> </div> <button type="submit" class="boton-envio" data-astro-cid-sgpqyurt>Log In</button> </form> <div class="enlace-registro" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>Don't have an account yet? <a href="/registro" data-astro-cid-sgpqyurt>Register here</a></p> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-sgpqyurt": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/login.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
