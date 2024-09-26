// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    imagemin({
      // Optimize JPEG images
      mozjpeg: {
        quality: 75,
      },
      // Optimize PNG images
      pngquant: {
        quality: [0.65, 0.9],
      },
    }),
  ],
  server: {
    host: true, // Allows localhost to work properly
    port: 3000, // Default Vite port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
