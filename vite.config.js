import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        login: "./login.html",
        register: "./register.html",
        profile: "./profile.html",
        details: "./details.html",
        create: "./create-listing.html",
        edit: "./edit-profile.html",
      },
    },
  },
});
