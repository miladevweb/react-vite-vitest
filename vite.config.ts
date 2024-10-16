/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  /* Testing */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    alias: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },

  /* Aliases */
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
