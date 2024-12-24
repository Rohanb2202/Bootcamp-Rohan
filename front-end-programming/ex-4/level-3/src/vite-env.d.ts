/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    eslint(),
  ],
  build: {
    // Enable minification and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Configure code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-grid': ['ag-grid-community'],
          'vendor-papa': ['papaparse'],
        }
      }
    },
    // Generate source maps for debugging
    sourcemap: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Configure chunk size warnings
    chunkSizeWarningLimit: 500
  },
  optimizeDeps: {
    include: ['ag-grid-community', 'papaparse']
  }
});