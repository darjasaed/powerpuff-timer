import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './powerpuff-timer/',  // Set this to the repository name
  plugins: [react()],
})