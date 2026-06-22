import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    proxy: {
      '/uploads': 'http://localhost:5050'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
