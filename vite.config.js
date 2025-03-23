import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [mkcert()],
  server: {
    hmr: {
      overlay: false,
    },
    https: true,
  }, // Not needed for Vite 5+
  build: {
    rollupOptions: {
      input: {
        index: "/index.html",
        oneMonth: "/1month<3.html",
        sorry: "/will_you_be_mine_again?.html",
      },
    },
  },
});
