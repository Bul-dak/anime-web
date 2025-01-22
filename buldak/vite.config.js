// vite.config.js
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        register: resolve(__dirname, "register/register.html"),
        login: resolve(__dirname, "login/login.html"),
        genreList: resolve(__dirname, "genre-list/genre.html"),
        watchlist: resolve(__dirname, "watchlist/watchlist.html"),
      },
    },
  },
});
