import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "appcode-technologies",
    project: "biddingkaro-frontend"
  })],

  server: {
    open: true, // Opens the browser on `npm run dev`
    port: 3000,
  },

  build: {
    sourcemap: true
  }
});