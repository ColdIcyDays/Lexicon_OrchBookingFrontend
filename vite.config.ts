import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()]})
  ],
  server: {
    proxy: {
      '/WeatherForecast': {
        target: 'http://localhost:5294',
        changeOrigin: true,
        secure: false
      },
      '/Account/Auth/Login': {
        target: 'http://localhost:5294',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
