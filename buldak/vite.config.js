import { defineConfig } from "vite";
import { resolve } from "path"; // This helps resolve the paths
import { register } from "module";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        genre: resolve(__dirname, "genre-list/genre.html"),
        login: resolve(__dirname, "login/login.html"),
        register: resolve(__dirname, "register/register.html"),
        watchlist: resolve(__dirname, "watchlist/watchlist.html"),
      },
    },
  },
  // Keep the forward slashes / / around your repo name
  base: "/anime-web/",
});
