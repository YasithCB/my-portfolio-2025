import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use './' if you want to serve the app locally by just opening the index.html file
  build: {
    outDir: 'dist', // Change this to your desired output directory
  },
})
