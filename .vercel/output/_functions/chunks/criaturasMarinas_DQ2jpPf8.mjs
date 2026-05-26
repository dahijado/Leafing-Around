import { c as createComponent } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { f as fallback, e as attr_class, g as ensure_array_like, h as attr, j as escape_html, k as bind_props, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_B1fbPdfE.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';
import { c as cumpleMesSeleccionado, a as cumpleMes, b as cumpleHora, d as cumpleSombra, e as cumpleMovimiento } from './filtros_wIdxNuV_.mjs';
import { $ as $$MensajeError } from './mensajeError_DAE2xGYu.mjs';
import { g as getTodasCriaturas, c as crearSlug } from './funciones_DXEtCgkg.mjs';

function GridCriaturas($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let criaturas = fallback($$props['criaturas'], () => [], true);
		let soloMesActual = false;
		let soloHoraActual = false;
		let hemisferio = "north";
		let filtroMes = "all";
		let filtroSombra = "all";
		let filtroMovimiento = "all";
		new Date().getMonth() + 1;
		new Date().getHours();

		$$renderer.push(`<div class="criaturas-container svelte-e72oiy"><aside class="sidebar svelte-e72oiy"><div class="sidebar-card svelte-e72oiy"><div class="filtro-grupo svelte-e72oiy"><label for="select-mes" class="svelte-e72oiy">Month</label> `);

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
			'svelte-e72oiy'
		);

		$$renderer.push(`</div> <div class="filtro-grupo svelte-e72oiy"><span class="label-title svelte-e72oiy">Hemisphere</span> <div class="hemisferio svelte-e72oiy"><button${attr_class('filter-btn svelte-e72oiy', void 0, { 'activo': hemisferio === "north" })}>North</button> <button${attr_class('filter-btn svelte-e72oiy', void 0, { 'activo': hemisferio === "south" })}>South</button></div></div> <div class="filtro-grupo svelte-e72oiy"><span class="label-title svelte-e72oiy">Time Filters</span> <div class="botones-flex svelte-e72oiy"><button${attr_class('filter-btn svelte-e72oiy', void 0, { 'activo': soloMesActual })}>Current Month</button> <button${attr_class('filter-btn svelte-e72oiy', void 0, { 'activo': soloHoraActual })}>Current Time</button></div></div> <div class="filtro-grupo svelte-e72oiy"><label for="select-sombra" class="svelte-e72oiy">Shadow size</label> `);

		$$renderer.select(
			{ id: 'select-sombra', value: filtroSombra, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Shadows`);
				});

				$$renderer.option({ value: 'Small' }, ($$renderer) => {
					$$renderer.push(`Small`);
				});

				$$renderer.option({ value: 'Medium' }, ($$renderer) => {
					$$renderer.push(`Medium`);
				});

				$$renderer.option({ value: 'Large' }, ($$renderer) => {
					$$renderer.push(`Large`);
				});

				$$renderer.option({ value: 'Very large' }, ($$renderer) => {
					$$renderer.push(`Very large`);
				});
			},
			'svelte-e72oiy'
		);

		$$renderer.push(`</div> <div class="filtro-grupo svelte-e72oiy"><label for="select-mov" class="svelte-e72oiy">Speed</label> `);

		$$renderer.select(
			{ id: 'select-mov', value: filtroMovimiento, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Speeds`);
				});

				$$renderer.option({ value: 'Stationary' }, ($$renderer) => {
					$$renderer.push(`Stationary`);
				});

				$$renderer.option({ value: 'Slow' }, ($$renderer) => {
					$$renderer.push(`Slow`);
				});

				$$renderer.option({ value: 'Medium' }, ($$renderer) => {
					$$renderer.push(`Medium`);
				});

				$$renderer.option({ value: 'Fast' }, ($$renderer) => {
					$$renderer.push(`Fast`);
				});

				$$renderer.option({ value: 'Very fast' }, ($$renderer) => {
					$$renderer.push(`Very fast`);
				});
			},
			'svelte-e72oiy'
		);

		$$renderer.push(`</div> <button class="reset-btn svelte-e72oiy">Reset Filters</button></div></aside> <div class="grid-envoltorio svelte-e72oiy"><div class="grid grid-criaturas svelte-e72oiy"><!--[-->`);

		const each_array = ensure_array_like(criaturas);

		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let c = each_array[$$index];
			const ok = cumpleMesSeleccionado() && cumpleMes() && cumpleHora() && cumpleSombra() && cumpleMovimiento();

			$$renderer.push(`<a${attr('href', ok ? `/criatura/${c.slug}` : null)}${attr_class('card svelte-e72oiy', void 0, { 'inactive': !ok })}><img${attr('src', c.image_url)}${attr('alt', c.name)}/> <span class="nombre svelte-e72oiy">${escape_html(c.name)}</span></a>`);
		}

		$$renderer.push(`<!--]--></div></div></div>`);
		bind_props($$props, { criaturas });
	});
}

const $$CriaturasMarinas = createComponent(async ($$result, $$props, $$slots) => {
  let error = null;
  let criaturas = [];
  try {
    const todas = await getTodasCriaturas().catch(() => []);
    criaturas = todas.filter((c) => c.type === "sea_creature").map((c) => ({
      ...c,
      slug: `sea-${crearSlug(c.name)}`
    }));
  } catch (err) {
    error = err;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Peces" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Nav", $$Nav, {})} ${maybeRenderHead()}<main> <div class="grid-envoltorio"> ${error ? renderTemplate`${renderComponent($$result2, "MensajeError", $$MensajeError, { "error": error })}` : renderTemplate`${renderComponent($$result2, "GridCriaturas", GridCriaturas, { "client:load": true, "criaturas": criaturas, "client:component-hydration": "load", "client:component-path": "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/gridCriaturas.svelte", "client:component-export": "default" })}`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/criaturasMarinas.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/criaturasMarinas.astro";
const $$url = "/criaturasMarinas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CriaturasMarinas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
