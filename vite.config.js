import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split heavy deps into stable vendor chunks so they cache across
        // app deploys — the app bundle hashes change a lot more often than
        // these libs do. Rolldown (Vite 8) requires the function form.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'vendor-react'
          if (id.match(/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/)) return 'vendor-react'
          if (id.includes('gsap')) return 'vendor-motion'
          if (id.includes('lenis')) return 'vendor-motion'
        },
      },
    },
  },
})
