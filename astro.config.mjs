// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      POSTHOG_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      POSTHOG_HOST: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      WEB3_ACCESS_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },

  integrations: [react(), tailwind()],
});
