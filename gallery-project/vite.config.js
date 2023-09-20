import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://mnmkato.github.io/stage3/",
  css: {
    modules: false,
  },
})
