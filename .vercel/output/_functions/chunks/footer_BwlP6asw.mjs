import { c as createComponent, $ as $$Image } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { l as createRenderInstruction, d as addAttribute, b as renderTemplate, r as renderComponent, n as renderHead, c as renderSlot, m as maybeRenderHead, F as Fragment } from './entrypoint_B1fbPdfE.mjs';
import 'clsx';
import { s as supabase } from './supabase_DkXvc3Im.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width">${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Tipografías --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fredoka&family=Nunito&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/layouts/Layout.astro", void 0);

const fondoHeader = new Proxy({"src":"/_astro/fondo_header.Cy87G0vV.png","width":1920,"height":1080,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/assets/fondo_header.png";
							}
							
							return target[name];
						}
					});

const logo = new Proxy({"src":"/_astro/Logo-banner.CNXgbBkI.png","width":1204,"height":340,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/assets/Logo-banner.png";
							}
							
							return target[name];
						}
					});

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="header" data-astro-cid-hpnw4vwy> ${renderComponent($$result, "Image", $$Image, { "class": "fondo-header", "src": fondoHeader, "alt": "background", "format": "png", "quality": 100, "data-astro-cid-hpnw4vwy": true })} <a href="/" data-astro-cid-hpnw4vwy>${renderComponent($$result, "Image", $$Image, { "class": "titulo", "src": logo, "alt": "titulo", "format": "png", "quality": 100, "data-astro-cid-hpnw4vwy": true })}</a> </div>`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/header.astro", void 0);

const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Nav;
  const currentPath = Astro2.url.pathname;
  const path = currentPath.replace(/\/$/, "");
  const esPez = path.startsWith("/peces") || path.startsWith("/criatura/fish-");
  const esCriaturaMarina = path.startsWith("/criaturasMarinas") || path.startsWith("/criatura/sea-");
  const esInsecto = path.startsWith("/insectos") || path.startsWith("/criatura/bug-");
  const esLogin = path === "/login";
  const esColeccion = path === "/coleccion";
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  const refreshToken = Astro2.cookies.get("sb-refresh-token")?.value;
  if (accessToken && refreshToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }
  const { data: { user } } = await supabase.auth.getUser();
  return renderTemplate`${maybeRenderHead()}<div class="nav" data-astro-cid-d6vcou2g> <nav class="header-nav" data-astro-cid-d6vcou2g> <ul class="nav-links" data-astro-cid-d6vcou2g> <li data-astro-cid-d6vcou2g> <a href="/peces"${addAttribute(esPez ? "activo" : "", "class")} data-astro-cid-d6vcou2g>Fish</a> </li> <li data-astro-cid-d6vcou2g> <a href="/criaturasMarinas"${addAttribute(esCriaturaMarina ? "activo" : "", "class")} data-astro-cid-d6vcou2g>Sea Creatures</a> </li> <li data-astro-cid-d6vcou2g> <a href="/insectos"${addAttribute(esInsecto ? "activo" : "", "class")} data-astro-cid-d6vcou2g>Bugs</a> </li> </ul> <ul class="links-usuario" data-astro-cid-d6vcou2g> ${!user && renderTemplate`<li data-astro-cid-d6vcou2g> <a href="/login"${addAttribute(esLogin ? "activo" : "", "class")} data-astro-cid-d6vcou2g>
Login
</a> </li>`} ${user && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-d6vcou2g": true }, { "default": async ($$result2) => renderTemplate` <li data-astro-cid-d6vcou2g> <a href="/coleccion"${addAttribute(esColeccion ? "activo" : "", "class")} data-astro-cid-d6vcou2g>
My Collection
</a> </li> <li data-astro-cid-d6vcou2g> <form action="/api/logout" method="POST" class="logout-form" data-astro-cid-d6vcou2g> <button type="submit" class="logout-btn" data-astro-cid-d6vcou2g>
Logout
</button> </form> </li> ` })}`} </ul> </nav> </div>  ${renderScript($$result, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="footer" data-astro-cid-k2f5zb5c> <a href="/avisoLegal" data-astro-cid-k2f5zb5c><h2 data-astro-cid-k2f5zb5c>Aviso Legal</h2></a> </div>`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$Nav as b, $$Footer as c };
