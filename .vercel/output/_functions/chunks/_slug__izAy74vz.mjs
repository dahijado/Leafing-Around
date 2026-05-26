import { c as createComponent } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './entrypoint_B1fbPdfE.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';
import { o as ordenarCriaturas, g as getTodasCriaturas } from './funciones_DXEtCgkg.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const todas = ordenarCriaturas(await getTodasCriaturas());
  const criatura = todas.find((c) => c.slug === slug);
  if (!criatura) {
    return Astro2.redirect("/404");
  }
  const mismoTipo = todas.filter((c) => c.type === criatura.type);
  const index = mismoTipo.findIndex((c) => c.slug === criatura.slug);
  const anterior = mismoTipo[index - 1] ?? null;
  const siguiente = mismoTipo[index + 1] ?? null;
  const meses = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  const volverHref = criatura.type === "fish" ? "/peces" : criatura.type === "bug" ? "/insectos" : "/criaturasMarinas";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Leafing Around - ${criatura.name}`, "data-astro-cid-bcmnsekn": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-bcmnsekn": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-bcmnsekn": true })} ${maybeRenderHead()}<main class="detalle-container" data-astro-cid-bcmnsekn> <div class="detalle-card" data-astro-cid-bcmnsekn> <div class="top-bar" data-astro-cid-bcmnsekn> <div class="nav-izquierda" data-astro-cid-bcmnsekn> ${anterior ? renderTemplate`<a class="nav-link"${addAttribute(`/criatura/${anterior.slug}`, "href")} data-astro-cid-bcmnsekn> <span class="flecha" data-astro-cid-bcmnsekn>←</span> <img${addAttribute(anterior.image_url, "src")} class="nav-icono"${addAttribute(anterior.name, "alt")} data-astro-cid-bcmnsekn> ${anterior.name} </a>` : renderTemplate`<span data-astro-cid-bcmnsekn></span>`} </div> <div class="nav-centro" data-astro-cid-bcmnsekn> <a class="volver"${addAttribute(volverHref, "href")} data-astro-cid-bcmnsekn>
Back to ${criatura.type === "fish" ? "Fish" : criatura.type === "bug" ? "Bugs" : "Sea Creatures"} </a> </div> <div class="nav-derecha" data-astro-cid-bcmnsekn> ${siguiente ? renderTemplate`<a class="nav-link"${addAttribute(`/criatura/${siguiente.slug}`, "href")} data-astro-cid-bcmnsekn> ${siguiente.name} <img${addAttribute(siguiente.image_url, "src")} class="nav-icono"${addAttribute(siguiente.name, "alt")} data-astro-cid-bcmnsekn> <span class="flecha" data-astro-cid-bcmnsekn>→</span> </a>` : renderTemplate`<span data-astro-cid-bcmnsekn></span>`} </div> </div> <img${addAttribute(criatura.render_url, "src")}${addAttribute(criatura.name, "alt")} class="imagen" data-astro-cid-bcmnsekn> <h1 data-astro-cid-bcmnsekn>${criatura.name}</h1> <p class="tipo" data-astro-cid-bcmnsekn> ${criatura.type === "fish" && "Fish"} ${criatura.type === "bug" && "Bug"} ${criatura.type === "sea_creature" && "Sea Creature"} </p> <div class="stats-grid" data-astro-cid-bcmnsekn> <div class="dato" data-astro-cid-bcmnsekn> <span class="label" data-astro-cid-bcmnsekn>Price</span> <span class="valor" data-astro-cid-bcmnsekn>${criatura.sell_nook}</span> </div> ${criatura.rarity && renderTemplate`<div class="dato" data-astro-cid-bcmnsekn> <span class="label" data-astro-cid-bcmnsekn>Rarity</span> <span class="valor" data-astro-cid-bcmnsekn>${criatura.rarity}</span> </div>`} ${criatura.location && renderTemplate`<div class="dato" data-astro-cid-bcmnsekn> <span class="label" data-astro-cid-bcmnsekn>Location</span> <span class="valor" data-astro-cid-bcmnsekn>${criatura.location}</span> </div>`} ${criatura.shadow_size && renderTemplate`<div class="dato" data-astro-cid-bcmnsekn> <span class="label" data-astro-cid-bcmnsekn>Shadow</span> <span class="valor" data-astro-cid-bcmnsekn>${criatura.shadow_size}</span> </div>`} </div> ${criatura.north && renderTemplate`<section class="meses-section" data-astro-cid-bcmnsekn> <h2 data-astro-cid-bcmnsekn>Northern Hemisphere</h2> <div class="mes-grid" data-astro-cid-bcmnsekn> ${meses.map((mes, index2) => {
    const disponible = criatura.north.months_array.includes(index2 + 1);
    return renderTemplate`<div${addAttribute(`mes ${disponible ? "activo" : ""}`, "class")} data-astro-cid-bcmnsekn> ${mes} </div>`;
  })} </div> </section>`} ${criatura.south && renderTemplate`<section class="meses-section" data-astro-cid-bcmnsekn> <h2 data-astro-cid-bcmnsekn>Southern Hemisphere</h2> <div class="mes-grid" data-astro-cid-bcmnsekn> ${meses.map((mes, index2) => {
    const disponible = criatura.south.months_array.includes(index2 + 1);
    return renderTemplate`<div${addAttribute(`mes ${disponible ? "activo" : ""}`, "class")} data-astro-cid-bcmnsekn> ${mes} </div>`;
  })} </div> </section>`} ${criatura.catchphrases?.[0] && renderTemplate`<blockquote class="frase" data-astro-cid-bcmnsekn>
"${criatura.catchphrases[0]}"
</blockquote>`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-bcmnsekn": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/criatura/[slug].astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/criatura/[slug].astro";
const $$url = "/criatura/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
