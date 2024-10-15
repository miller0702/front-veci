import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    brotliSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  css: {
    devSourcemap: false,
  },
  optimizeDeps: {
    include: ['axios', 'react', 'react-dom'],
  },
  server: {
    port: 3000,
    host: true 
  },
  preview: {
    port: 8080,
    host: true
  }
})
