import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const devApiTarget = process.env.VITE_DEV_API_TARGET || 'http://127.0.0.1:5050';

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    // Если в Network видно Server: AirTunes — до Vite запрос не доходит (часто ::1 + порт).
    // Порт 3333 обычно свободен; прокси бьёт в API по IPv4.
    port: 3333,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Отключаем manual chunks для избежания проблем с порядком загрузки
      },
    },
  },
});