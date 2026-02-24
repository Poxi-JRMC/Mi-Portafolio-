import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si despliegas en subruta (ej: GitHub Pages /miportafolio/), cambia base
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
})
