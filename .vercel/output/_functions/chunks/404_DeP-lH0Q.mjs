import { c as createComponent, $ as $$Image } from './_astro_assets_59PtkQ2R.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, c as renderSlot, m as maybeRenderHead } from './entrypoint_B1fbPdfE.mjs';
import { $ as $$Layout, a as $$Header, b as $$Nav, c as $$Footer } from './footer_BwlP6asw.mjs';
import { tv } from 'tailwind-variants';
import { b as blathersError } from './Blathers-error_Srq597jP.mjs';

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "transition-all outline-none focus-visible:ring-3",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40"
  ],
  variants: {
    variant: {
      default: "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-outline/50",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/50",
      outline: "dark:border-input focus-visible:ring-outline/50 bg-background dark:bg-input/30 focus-visible:border-outline hover:bg-muted dark:hover:bg-input/50 hover:text-foreground border shadow-xs",
      ghost: "hover:bg-muted hover:text-foreground focus-visible:ring-outline/50",
      info: "bg-info text-info-foreground hover:bg-info/90 focus-visible:ring-info/50",
      success: "bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/50",
      warning: "bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning/50",
      error: "bg-error text-error-foreground hover:bg-error/90 focus-visible:ring-error/50"
    },
    size: {
      sm: "h-9 px-4 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-11 px-5 text-base has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-4.5",
      lg: "h-12 px-8 text-lg has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
      "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-11 [&_svg:not([class*='size-'])]:size-4.5",
      "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5"
    }
  },
  defaultVariants: { variant: "default", size: "md" }
});
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Button;
  const { variant, size, class: className, ...rest } = Astro2.props;
  const Tag = Astro2.props.href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": button({ variant, size, class: className }), "data-slot": "button", ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/components/starwind/button/Button.astro", void 0);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Leafing Around - Not Found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-zetdm5md": true })} ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-zetdm5md": true })} ${maybeRenderHead()}<div class="fondo-404" data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>404 - Not Found</h1> ${renderComponent($$result2, "Image", $$Image, { "class": "img-error", "src": blathersError, "alt": "blathersError", "quality": 100, "format": "png", "data-astro-cid-zetdm5md": true })} <p class="p-error" data-astro-cid-zetdm5md>¡Uhu! It can't be... the page cannot be found!</p> ${renderComponent($$result2, "Button", $$Button, { "class": "boton  bg-taupe-700 hover:bg-taupe-800", "href": "/", "variant": "info", "size": "md", "data-astro-cid-zetdm5md": true }, { "default": ($$result3) => renderTemplate`Go back to Home` })} </div> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-zetdm5md": true })} ` })}`;
}, "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/404.astro", void 0);

const $$file = "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
