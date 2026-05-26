import { c as createComponent } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { f as fallback, e as attr_class, g as ensure_array_like, h as attr, j as escape_html, k as bind_props, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_B1fbPdfE.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';
import { c as cumpleMesSeleccionado, a as cumpleMes, b as cumpleHora, f as cumpleLocalizacion, g as cumpleClima } from './filtros_wIdxNuV_.mjs';
import { $ as $$MensajeError } from './mensajeError_DAE2xGYu.mjs';
import { g as getTodasCriaturas, c as crearSlug } from './funciones_DXEtCgkg.mjs';

function GridInsectos($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let insectos = fallback($$props['insectos'], () => [], true);
		let soloMesActual = false;
		let soloHoraActual = false;
		let hemisferio = "north";
		let filtroLocalizacion = "all";
		let filtroMes = "all";
		let filtroClima = "all";
		new Date().getMonth() + 1;
		new Date().getHours();

		$$renderer.push(`<div class="insectos-container svelte-1oxz6sy"><aside class="sidebar svelte-1oxz6sy"><div class="sidebar-card svelte-1oxz6sy"><div class="filtro-grupo svelte-1oxz6sy"><label for="select-mes" class="svelte-1oxz6sy">Month</label> `);

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
			'svelte-1oxz6sy'
		);

		$$renderer.push(`</div> <div class="filtro-grupo svelte-1oxz6sy"><span class="label-title svelte-1oxz6sy">Hemisphere</span> <div class="hemisferio svelte-1oxz6sy"><button${attr_class('filter-btn svelte-1oxz6sy', void 0, { 'activo': hemisferio === "north" })}>North</button> <button${attr_class('filter-btn svelte-1oxz6sy', void 0, { 'activo': hemisferio === "south" })}>South</button></div></div> <div class="filtro-grupo svelte-1oxz6sy"><span class="label-title svelte-1oxz6sy">Time Filters</span> <div class="botones-flex svelte-1oxz6sy"><button${attr_class('filter-btn svelte-1oxz6sy', void 0, { 'activo': soloMesActual })}>Current Month</button> <button${attr_class('filter-btn svelte-1oxz6sy', void 0, { 'activo': soloHoraActual })}>Current Time</button></div></div> <div class="filtro-grupo svelte-1oxz6sy"><label for="select-loc" class="svelte-1oxz6sy">Location</label> `);

		$$renderer.select(
			{ id: 'select-loc', value: filtroLocalizacion, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Locations`);
				});

				$$renderer.option({ value: 'Flying' }, ($$renderer) => {
					$$renderer.push(`Flying`);
				});

				$$renderer.option({ value: 'On trees' }, ($$renderer) => {
					$$renderer.push(`On trees`);
				});

				$$renderer.option({ value: 'On the ground' }, ($$renderer) => {
					$$renderer.push(`On the ground`);
				});

				$$renderer.option({ value: 'On flowers' }, ($$renderer) => {
					$$renderer.push(`On flowers`);
				});

				$$renderer.option({ value: 'On tree stumps' }, ($$renderer) => {
					$$renderer.push(`On tree stumps`);
				});

				$$renderer.option({ value: 'On palm trees' }, ($$renderer) => {
					$$renderer.push(`On palm trees`);
				});

				$$renderer.option({ value: 'On rocks' }, ($$renderer) => {
					$$renderer.push(`On rocks`);
				});

				$$renderer.option({ value: 'Underground' }, ($$renderer) => {
					$$renderer.push(`Underground`);
				});
			},
			'svelte-1oxz6sy'
		);

		$$renderer.push(`</div> <div class="filtro-grupo svelte-1oxz6sy"><label for="select-clima" class="svelte-1oxz6sy">Weather</label> `);

		$$renderer.select(
			{ id: 'select-clima', value: filtroClima, class: '' },
			($$renderer) => {
				$$renderer.option({ value: 'all' }, ($$renderer) => {
					$$renderer.push(`All Weathers`);
				});

				$$renderer.option({ value: 'Rain' }, ($$renderer) => {
					$$renderer.push(`Rain`);
				});

				$$renderer.option({ value: 'Any except rain' }, ($$renderer) => {
					$$renderer.push(`Any except rain`);
				});

				$$renderer.option({ value: 'Any' }, ($$renderer) => {
					$$renderer.push(`Any`);
				});
			},
			'svelte-1oxz6sy'
		);

		$$renderer.push(`</div> <button class="reset-btn svelte-1oxz6sy">Reset Filters</button></div></aside> <div class="grid-envoltorio svelte-1oxz6sy"><div class="grid grid-insectos svelte-1oxz6sy"><!--[-->`);

		const each_array = ensure_array_like(insectos);

		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let i = each_array[$$index];
			const ok = cumpleMesSeleccionado() && cumpleMes() && cumpleHora() && cumpleLocalizacion() && cumpleClima();

			$$renderer.push(`<a${attr('href', ok ? `/criatura/${i.slug}` : null)}${attr_class('card svelte-1oxz6sy', void 0, { 'inactive': !ok })}${attr('aria-disabled', !ok)}><img${attr('src', i.image_url)}${attr('alt', i.name)}/> <span class="nombre svelte-1oxz6sy">${escape_html(i.name)}</span></a>`);
		}

		$$renderer.push(`<!--]--></div></div></div>`);
		bind_props($$props, { insectos });
	});
}

const $$Insectos = createComponent(async ($$result, $$props, $$slots) => {
  let error = null;
  let insectos = [];
  try {
    const todas = await getTodasCriaturas().catch(() => []);
    insectos = todas.filter((i) => i.type === "bug").map((i) => ({
      ...i,
      slug: `bug-${crearSlug(i.name)}`
    }));
  } catch (err) {
    error = err;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Insectos" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Nav", $$Nav, {})} ${maybeRenderHead()}<main> <div class="grid-envoltorio"> ${error ? renderTemplate`${renderComponent($$result2, "MensajeError", $$MensajeError, { "error": error })}` : renderTemplate`${renderComponent($$result2, "GridInsectos", GridInsectos, { "client:load": true, "insectos": insectos, "client:component-hydration": "load", "client:component-path": "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/gridInsectos.svelte", "client:component-export": "default" })}`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/insectos.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/insectos.astro";
const $$url = "/insectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Insectos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
