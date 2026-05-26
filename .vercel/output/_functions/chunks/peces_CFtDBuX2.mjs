import { c as createComponent } from './_astro_assets_X2pNmPd1.mjs';
import 'piccolore';
import { f as fallback, e as attr_class, g as ensure_array_like, h as attr, j as escape_html, k as bind_props, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_hyDUavzg.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_CdDQKt6J.mjs';
import { c as cumpleMesSeleccionado, a as cumpleMes, b as cumpleHora, f as cumpleLocalizacion } from './filtros_wIdxNuV_.mjs';
import { $ as $$MensajeError } from './mensajeError_BW4QSqIc.mjs';
import { g as getTodasCriaturas, c as crearSlug } from './funciones_DXEtCgkg.mjs';

function GridPeces($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let peces = fallback($$props['peces'], () => [], true);
		let soloMesActual = false;
		let soloHoraActual = false;
		let hemisferio = "north";
		let filtroLocalizacion = "all";
		let filtroMes = "all";
		new Date().getMonth() + 1;
		new Date().getHours();

		$$renderer.push(`<div class="peces-container svelte-imi04k"><aside class="sidebar svelte-imi04k"><div class="sidebar-card svelte-imi04k"><div class="filtro-grupo svelte-imi04k"><label for="select-mes" class="svelte-imi04k">Month</label> `);

		$$renderer.select(
			{ id: 'select-mes', value: filtroMes, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Months`);
				});

				$$renderer.option({ value: '1' }, ($$renderer) => {
					$$renderer.push(`January`);
				});

				$$renderer.option({ value: '2' }, ($$renderer) => {
					$$renderer.push(`February`);
				});

				$$renderer.option({ value: '3' }, ($$renderer) => {
					$$renderer.push(`March`);
				});

				$$renderer.option({ value: '4' }, ($$renderer) => {
					$$renderer.push(`April`);
				});

				$$renderer.option({ value: '5' }, ($$renderer) => {
					$$renderer.push(`May`);
				});

				$$renderer.option({ value: '6' }, ($$renderer) => {
					$$renderer.push(`June`);
				});

				$$renderer.option({ value: '7' }, ($$renderer) => {
					$$renderer.push(`July`);
				});

				$$renderer.option({ value: '8' }, ($$renderer) => {
					$$renderer.push(`August`);
				});

				$$renderer.option({ value: '9' }, ($$renderer) => {
					$$renderer.push(`September`);
				});

				$$renderer.option({ value: '10' }, ($$renderer) => {
					$$renderer.push(`October`);
				});

				$$renderer.option({ value: '11' }, ($$renderer) => {
					$$renderer.push(`November`);
				});

				$$renderer.option({ value: '12' }, ($$renderer) => {
					$$renderer.push(`December`);
				});
			},
			'svelte-imi04k'
		);

		$$renderer.push(`</div> <div class="filtro-grupo svelte-imi04k"><span class="label-title svelte-imi04k">Hemisphere</span> <div class="hemisferio svelte-imi04k"><button${attr_class('filter-btn svelte-imi04k', void 0, { 'activo': hemisferio === "north" })}>North</button> <button${attr_class('filter-btn svelte-imi04k', void 0, { 'activo': hemisferio === "south" })}>South</button></div></div> <div class="filtro-grupo svelte-imi04k"><span class="label-title svelte-imi04k">Time Filters</span> <div class="botones-flex svelte-imi04k"><button${attr_class('filter-btn svelte-imi04k', void 0, { 'activo': soloMesActual })}>Current Month</button> <button${attr_class('filter-btn svelte-imi04k', void 0, { 'activo': soloHoraActual })}>Current Time</button></div></div> <div class="filtro-grupo svelte-imi04k"><label for="select-loc" class="svelte-imi04k">Location</label> `);

		$$renderer.select(
			{ id: 'select-loc', value: filtroLocalizacion, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Locations`);
				});

				$$renderer.option({ value: 'River' }, ($$renderer) => {
					$$renderer.push(`River`);
				});

				$$renderer.option({ value: 'River (clifftop)' }, ($$renderer) => {
					$$renderer.push(`River (clifftop)`);
				});

				$$renderer.option({ value: 'Pond' }, ($$renderer) => {
					$$renderer.push(`Pond`);
				});

				$$renderer.option({ value: 'Sea' }, ($$renderer) => {
					$$renderer.push(`Sea`);
				});

				$$renderer.option({ value: 'Pier' }, ($$renderer) => {
					$$renderer.push(`Pier`);
				});
			},
			'svelte-imi04k'
		);

		$$renderer.push(`</div> <button class="reset-btn svelte-imi04k">Reset Filters</button></div></aside> <div class="grid-envoltorio svelte-imi04k"><div class="grid grid-peces svelte-imi04k"><!--[-->`);

		const each_array = ensure_array_like(peces);

		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let p = each_array[$$index];
			const ok = cumpleMesSeleccionado() && cumpleMes() && cumpleHora() && cumpleLocalizacion();

			$$renderer.push(`<a${attr('href', ok ? `/criatura/${p.slug}` : null)}${attr_class('card svelte-imi04k', void 0, { 'inactive': !ok })}${attr('aria-disabled', !ok)}><img${attr('src', p.image_url)}${attr('alt', p.name)}/> <span class="nombre svelte-imi04k">${escape_html(p.name)}</span></a>`);
		}

		$$renderer.push(`<!--]--></div></div></div>`);
		bind_props($$props, { peces });
	});
}

const $$Peces = createComponent(async ($$result, $$props, $$slots) => {
  let error = null;
  let peces = [];
  try {
    const todas = await getTodasCriaturas().catch(() => []);
    peces = todas.filter((p) => p.type === "fish").map((p) => ({
      ...p,
      slug: `fish-${crearSlug(p.name)}`
    }));
  } catch (err) {
    error = err;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Peces" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Nav", $$Nav, {})} ${maybeRenderHead()}<main> <div class="grid-envoltorio"> ${error ? renderTemplate`${renderComponent($$result2, "MensajeError", $$MensajeError, { "error": error })}` : renderTemplate`${renderComponent($$result2, "GridPeces", GridPeces, { "client:load": true, "peces": peces, "client:component-hydration": "load", "client:component-path": "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/gridPeces.svelte", "client:component-export": "default" })}`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/peces.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/peces.astro";
const $$url = "/peces";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Peces,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
