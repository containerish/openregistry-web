const production = !process.env.ROLLUP_WATCH;
module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	plugins: [
	],
	theme: {
		fontFamily: {
			'sans': ['ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'poppins': ['Poppins'],
			'body': ['"Open Sans"'],
		}
	},
	purge: {
		content: [
			"./src/App.svelte",
		],
		enabled: false // disable purge in dev
	},
};
