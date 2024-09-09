import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/"],
    },
    setupFiles: "./vitest.setup.mjs",
  },
});
