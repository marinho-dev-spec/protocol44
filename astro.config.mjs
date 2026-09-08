import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://protocol44.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
