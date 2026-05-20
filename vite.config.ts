import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "ha-dhe-connect-card.js",
    },
    rollupOptions: {
      output: {
        entryFileNames: "ha-dhe-connect-card.js",
      },
    },
  },
});
