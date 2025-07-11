// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      WEB3_ACCESS_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  site: "https://dmitrii.online",
  trailingSlash: "never",
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
