import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 51740,
		host: '0.0.0.0',
		allowedHosts: true
	},
	preview: {
		port: 51740
	}
});
