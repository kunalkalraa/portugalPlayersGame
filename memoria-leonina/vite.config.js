import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 8080,
    open: true,
  },
  base: '/memoria-leonina/',
})
