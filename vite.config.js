import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor libraries (changes infrequently - good for caching)
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // ReactFlow library (separate for better caching)
          'reactflow': ['reactflow'],
          // UI libraries (icons, animations)
          'ui': ['lucide-react', 'framer-motion', 'zustand'],
          // Syntax highlighting (now much smaller with Light build)
          'syntax-highlighter': ['react-syntax-highlighter']
        }
      }
    },
    // Increase chunk size warning limit to avoid noise
    chunkSizeWarningLimit: 600
  }
})
