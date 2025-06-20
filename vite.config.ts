import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      routesDirectory: 'routes',
      generatedRouteTree: 'routes/routeTree.gen.ts',
      target: 'react',
      autoCodeSplitting: true,
      verboseFileRoutes: false,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
