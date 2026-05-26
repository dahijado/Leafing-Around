import { c as createComponent, $ as $$Image } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderComponent, b as renderTemplate } from './entrypoint_B1fbPdfE.mjs';
import { b as blathersError } from './Blathers-error_Srq597jP.mjs';

const $$MensajeError = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MensajeError;
  const { error = null } = Astro2.props;
  const mensaje = error?.message || error || "¡Uhu! Something went wrong... Please try again later";
  return renderTemplate`${maybeRenderHead()}<div class="fondo-error" data-astro-cid-xbql4wkp> <h1 data-astro-cid-xbql4wkp>¡UHU!</h1> ${renderComponent($$result, "Image", $$Image, { "class": "img-error", "src": blathersError, "alt": "blathersError", "quality": 100, "format": "png", "data-astro-cid-xbql4wkp": true })} <p class="p-error" data-astro-cid-xbql4wkp>${mensaje}</p> </div>`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/mensajeError.astro", void 0);

export { $$MensajeError as $ };
