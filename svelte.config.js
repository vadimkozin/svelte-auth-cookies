import adapter from '@sveltejs/adapter-auto'
import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@import './src/styles/variables.scss';`
		},

		postcss: {
			plugins: [autoprefixer()]
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$root: resolve("src"),
			$comp: resolve("src/lib/components"),
			$icons: resolve("src/lib/icons"),
		}
	}
}

export default config
