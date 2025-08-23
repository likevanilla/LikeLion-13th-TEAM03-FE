import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.json"],
  json: {
    stringify: true,
  },
  server: {
    historyApiFallback: true, // 모든 경로를 index.html로 리디렉션
  },
});
