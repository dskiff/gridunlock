import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: path.join(__dirname, "/node_modules/") }],
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://gridunlockapp.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
