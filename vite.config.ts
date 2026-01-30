import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { analyzer } from 'vite-bundle-analyzer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [ViteImageOptimizer(), tsconfigPaths(), svelte(), analyzer()],
});
