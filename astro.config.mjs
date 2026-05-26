import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

export default defineConfig({
  output: "server",

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
});
