import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test.spec}.{ts,js}'],
	},
	assetsInclude: ['**/*.png', '**/*.webp', '**/*.avif', '**/*.svg'],
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
};

export default config;
