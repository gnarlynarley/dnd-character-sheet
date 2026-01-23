import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), svelte(), analyzer()],
});
