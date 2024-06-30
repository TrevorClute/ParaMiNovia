import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: {}, // Not needed for Vite 5+
  build: {
    rollupOptions: {
      input: {
        index: "/index.html",
        oneMonth: "/1month<3.html",
      },
    },
  },
});
