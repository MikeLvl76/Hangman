import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import app from './server.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    listen: app.listen.bind(app)
  }
})
