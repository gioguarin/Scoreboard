/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub Pages repo path so built asset URLs resolve at
// https://<user>.github.io/<repo>/. This repo deploys under /scoreboard/.
export default defineConfig({
  base: '/scoreboard/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
