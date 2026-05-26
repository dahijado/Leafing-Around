import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

export default defineConfig({
  output: "server",

  adapter: vercel({
    entrypointResolution: "auto",
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
});
