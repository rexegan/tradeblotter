import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Serve from /tradeblotter/ so assets resolve on GitHub Pages
  base: "/tradeblotter/",
  plugins: [react()],
});
