import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Reemplaza 'nombre-de-tu-repositorio' por el nombre exacto que le diste o le darás en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/nombre-de-tu-repositorio/', 
})