// const colors = require('tailwindcss/colors');

const config = {
	important: true,
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	mode: "jit",
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		enabled: true // disable purge in dev
	},
	theme: {
		fontFamily: {
			'sans': ['ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'poppins': ['Poppins'],
			'lato': ['Lato'],
			'body': ['"Open Sans"'],
		},
		extend: {
			colors: {
				"brown-100": "#8c6f5f",
				"brown-200": "#E8E3E0",
				"brown-300": "#ddd3cd",
				"brown-400": "#DDD3CD",
				"brown-600": "#927463",
				"brown-800": "#55443A",
				"brown-900": "#241D19",
			},
			screens: {
				'desktop': {'min': '1280px', 'max': '1600px'},
				'apple': {'min': '1601px', 'max': '2560px'},
				'uw': {'min': '2561px'},
			},
		},
	},
	plugins: []
};

module.exports = config;
