import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PWA (manifest + iconos) se añade en el Chunk 6.
export default defineConfig({
  plugins: [react()],
})
