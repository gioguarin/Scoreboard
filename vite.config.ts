/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub Pages repo path so built asset URLs resolve at
// https://<user>.github.io/<repo>/. GitHub Pages paths are case-sensitive, so
// this must match the repo name's exact casing: /Scoreboard/.
export default defineConfig({
  base: '/Scoreboard/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
