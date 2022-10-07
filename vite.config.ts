import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: path.join(__dirname, "/node_modules/") }],
  },
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "https://gridunlock-org.pages.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
