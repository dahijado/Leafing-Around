import { c as createComponent } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './entrypoint_B1fbPdfE.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';
import { o as obtenerDatos } from './filtros_wIdxNuV_.mjs';
import { g as getTodasCriaturas } from './funciones_DXEtCgkg.mjs';

// Devuelve una lista de todas las criaturas disponibles este mes
function disponiblesMes(items, mes, hemisferio = "north") {
  return items.filter((item) => {
    const data = obtenerDatos(item, hemisferio);
    const meses = data?.months_array || [];

    return meses.includes(mes);
  });
}

// Devuelve las criaturas más valiosas del mes (por precio)
function topValiosas(items, mes, hemisferio = "north", limit = 4) {
  const disponibles = disponiblesMes(items, mes, hemisferio);

  return disponibles
    .sort((a, b) => {
      const valorA = b.sell_nook ?? b.sell ?? 0;
      const valorB = a.sell_nook ?? a.sell ?? 0;

      return valorA - valorB;
    })
    .slice(0, limit);
}

// Devuelve las criaturas más raras del mes (por tasa de aparición)
function calcularRarezasDelMes(
  peces,
  insectos,
  marinas,
  mes,
  hemisferio = "north",
) {
  return [
    ...topValiosas(peces, mes, hemisferio, 2),
    ...topValiosas(insectos, mes, hemisferio, 1),
    ...topValiosas(marinas, mes, hemisferio, 1),
  ].slice(0, 4);
}

// Devuelve el número de criaturas que hay ese mes en un hemisferio
function numeroCriaturasMes(
  peces,
  insectos,
  marinas,
  mes,
  hemisferio = "north",
) {
  return {
    peces: disponiblesMes(peces, mes, hemisferio).length,
    insectos: disponiblesMes(insectos, mes, hemisferio).length,
    marinas: disponiblesMes(marinas, mes, hemisferio).length,
  };
}

// Devuelve las criaturas que están este mes, pero no el siguiente (es decir, que no aparecen)
function calcularSeVanEsteMes(
  peces,
  insectos,
  marinas,
  mesActual,
  mesSiguiente,
  hemisferio = "north",
) {
  const filtrar = (items) =>
    items.filter((item) => {
      const data = obtenerDatos(item, hemisferio);
      const meses = data?.months_array || [];

      return meses.includes(mesActual) && !meses.includes(mesSiguiente);
    });

  return [...filtrar(peces), ...filtrar(insectos), ...filtrar(marinas)].slice(
    0,
    6,
  );
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const mesActual = (/* @__PURE__ */ new Date()).getMonth() + 1;
  const mesSiguiente = mesActual === 12 ? 1 : mesActual + 1;
  const todas = await getTodasCriaturas().catch(() => []);
  const rarezasNorte = calcularRarezasDelMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    "north"
  );
  const rarezasSur = calcularRarezasDelMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    "south"
  );
  const statsNorte = numeroCriaturasMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    "north"
  );
  const statsSur = numeroCriaturasMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    "south"
  );
  const seVanNorte = calcularSeVanEsteMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    mesSiguiente,
    "north"
  );
  const seVanSur = calcularSeVanEsteMes(
    todas.filter((c) => c.type === "fish"),
    todas.filter((c) => c.type === "bug"),
    todas.filter((c) => c.type === "sea_creature"),
    mesActual,
    mesSiguiente,
    "south"
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Home", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="contenedor" data-astro-cid-j7pv25f6> <!-- BIENVENIDA --> <section class="carta bienvenida" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Welcome to Leafing Around</h1> <p data-astro-cid-j7pv25f6>
The website where you can find everything you need to know about fish, sea creatures, and bugs from Animal Crossing: New Horizons.
</p> </section> <!-- RAREZAS --> <section class="carta" data-astro-cid-j7pv25f6> <h2 class="tituloh2" data-astro-cid-j7pv25f6>This Month's Rarities</h2> <!-- HEMISFERIO NORTE --> <div class="hemisferio" data-astro-cid-j7pv25f6> <h3 class="titulo-hemisferio" data-astro-cid-j7pv25f6>Northern Hemisphere</h3> <div class="rarezas-linea" data-astro-cid-j7pv25f6> ${rarezasNorte.map((c) => renderTemplate`<a${addAttribute(`/criatura/${c.slug}`, "href")} class="mini-card" data-astro-cid-j7pv25f6> <img${addAttribute(c.image_url, "src")}${addAttribute(c.name, "alt")} data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>${c.name}</span> </a>`)} </div> <div class="stats" data-astro-cid-j7pv25f6> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsNorte.peces}</span> <span class="label" data-astro-cid-j7pv25f6>Fish</span> </div> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsNorte.insectos}</span> <span class="label" data-astro-cid-j7pv25f6>Bugs</span> </div> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsNorte.marinas}</span> <span class="label" data-astro-cid-j7pv25f6>Sea Creatures</span> </div> </div> </div> <!-- HEMISFERIO SUR --> <div class="hemisferio" data-astro-cid-j7pv25f6> <h3 class="titulo-hemisferio" data-astro-cid-j7pv25f6>Southern Hemisphere</h3> <div class="rarezas-linea" data-astro-cid-j7pv25f6> ${rarezasSur.map((c) => renderTemplate`<a${addAttribute(`/criatura/${c.slug}`, "href")} class="mini-card" data-astro-cid-j7pv25f6> <img${addAttribute(c.image_url, "src")}${addAttribute(c.name, "alt")} data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>${c.name}</span> </a>`)} </div> <div class="stats" data-astro-cid-j7pv25f6> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsSur.peces}</span> <span class="label" data-astro-cid-j7pv25f6>Fish</span> </div> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsSur.insectos}</span> <span class="label" data-astro-cid-j7pv25f6>Bugs</span> </div> <div class="stat" data-astro-cid-j7pv25f6> <span class="numero" data-astro-cid-j7pv25f6>${statsSur.marinas}</span> <span class="label" data-astro-cid-j7pv25f6>Sea Creatures</span> </div> </div> </div> </section> <!-- SE VAN --> <section class="carta compacta" data-astro-cid-j7pv25f6> <h3 class="tituloh2" data-astro-cid-j7pv25f6>They'll be gone when the month ends, so catch them while you can!</h3> <h2 class="titulo-hemisferio" data-astro-cid-j7pv25f6>Northern Hemisphere </h2> <div class="seVan" data-astro-cid-j7pv25f6> ${seVanNorte.map((c) => renderTemplate`<a${addAttribute(`/criatura/${c.slug}`, "href")} class="seVan-card" data-astro-cid-j7pv25f6> <img${addAttribute(c.image_url, "src")}${addAttribute(c.name, "alt")} data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>${c.name}</span> </a>`)} </div> <h2 class="titulo-hemisferio" data-astro-cid-j7pv25f6>Southern Hemisphere </h2> <div class="seVan" data-astro-cid-j7pv25f6> ${seVanSur.map((c) => renderTemplate`<a${addAttribute(`/criatura/${c.slug}`, "href")} class="seVan-card" data-astro-cid-j7pv25f6> <img${addAttribute(c.image_url, "src")}${addAttribute(c.name, "alt")} data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>${c.name}</span> </a>`)} </div> </section> <!-- EXPLORAR --> <section class="carta" data-astro-cid-j7pv25f6> <h2 class="tituloh2" data-astro-cid-j7pv25f6>Explore Collection</h2> <div class="explorar" data-astro-cid-j7pv25f6> <a href="/peces" class="portal" data-astro-cid-j7pv25f6>Fish</a> <a href="/insectos" class="portal" data-astro-cid-j7pv25f6>Bugs</a> <a href="/criaturasMarinas" class="portal" data-astro-cid-j7pv25f6>Sea Creatures</a> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/index.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
