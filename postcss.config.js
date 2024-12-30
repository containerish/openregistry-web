export default {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		'tailwindcss': {},
		'autoprefixer': {},
		'cssnano': {
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true,
					},
				},
			],
		},
	},
};
