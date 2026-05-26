import { c as createComponent } from './_astro_assets_X2pNmPd1.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_hyDUavzg.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_CdDQKt6J.mjs';

const $$AvisoLegal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Aviso Legal", "data-astro-cid-d6xfh23y": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-d6xfh23y": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-d6xfh23y": true })} ${maybeRenderHead()}<div class="contenedor" data-astro-cid-d6xfh23y> <section class="carta" data-astro-cid-d6xfh23y> <h2 class="avisoh2" data-astro-cid-d6xfh23y>Sobre este proyecto:</h2> <p data-astro-cid-d6xfh23y>
Este sitio no tiene ningún fin comercial. Es un sitio web educativo creado con fines de aprendizaje de desarrollo web.
</p> <h2 class="avisoh2" data-astro-cid-d6xfh23y>Datos y contenido:</h2> <p data-astro-cid-d6xfh23y>
Los datos de criaturas, peces e insectos han sido obtenidos a través de la API de Nookipedia.
</p> <h2 class="avisoh2" data-astro-cid-d6xfh23y>Propiedad intelectual:</h2> <p data-astro-cid-d6xfh23y>
Todos los personajes, nombres, criaturas y elementos pertenecen a Nintendo.
</p> <h2 class="avisoh2" data-astro-cid-d6xfh23y>Créditos:</h2> <p data-astro-cid-d6xfh23y>
Propiedad intelectual: Nintendo<br data-astro-cid-d6xfh23y>
Datos: Nookipedia<br data-astro-cid-d6xfh23y>
Iconos: Manuel Campos Dominguez
</p> </section> </div> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-d6xfh23y": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/avisoLegal.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/avisoLegal.astro";
const $$url = "/avisoLegal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AvisoLegal,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
