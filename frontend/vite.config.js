import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import path from "path";
import fs from "fs";

const environmentPath = fs.existsSync(path.resolve(__dirname, "../env/.env"))
  ? path.resolve(__dirname, "../env/.env")
  : path.resolve(__dirname, "../env/.env.local");

export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      envPrefix: "VITE_",
      envFile: environmentPath,
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
