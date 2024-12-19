import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Opens the browser on `npm run dev`
    port: 3000,
  },
});
