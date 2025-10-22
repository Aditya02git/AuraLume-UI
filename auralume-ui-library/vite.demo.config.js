import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Root of your demo app
  root: resolve(__dirname, 'demo'),

  // 🔑 Set base to relative paths for correct deployment
  base: './',

  server: {
    port: 3001,
    open: true
  },

  build: {
    // Output folder for production build
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true, // Clean previous build
    rollupOptions: {
      input: resolve(__dirname, 'demo', 'index.html'),
    },
  },
})
