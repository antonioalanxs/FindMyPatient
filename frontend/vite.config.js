import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import envCompatible from "vite-plugin-env-compatible";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      envPrefix: "VITE_",
      envFile: path.resolve(__dirname, "../env/.env"),
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setUpTests.js",
    css: true,
  },
});
