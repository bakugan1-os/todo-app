import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base so the build also works from a GitHub Pages subpath
  base: './',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Opt out of the deprecated legacy Sass JS API
      scss: { api: 'modern-compiler' },
    },
  },
});
