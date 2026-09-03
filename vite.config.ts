import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        'avas-room': resolve(__dirname, 'avas_room.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
})
