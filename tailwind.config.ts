import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

const config = {
	important: true,
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	mode: 'jit',
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		fontFamily: {
			'sans': ['ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'poppins': ['Poppins'],
			'jetbrains-mono': ['Jetbrains Mono'],
			'lato': ['Lato'],
			'body': ['"Open Sans"'],
		},
		extend: {
			colors: {
				'brown-50': '#ddd3cd',
				'brown-100': '#8c6f5f',
				'brown-200': '#E8E3E0',
				'brown-300': '#ddd3cd',
				'brown-400': '#dbd1ca',
				'brown-500': '#baa89d',
				'brown-600': '#59483e',
				'brown-700': '#8d7060',
				'brown-800': '#55443A',
				'brown-900': '#241D19',
				'grad-100': '#DDD3CD',
				'grad-400': '#BAA89D',
				'grad-900': '#8D7060',
				'spec-100': '#E8E3E0',
				'cream-50': '#e5e2e0',

				'primary-800': '#030527',
				'primary-700': '#19195C',
				'primary-600': '#2F2F7D',
				'primary-500': '#4848BC',
				'primary-400': '#6363F1',
				'primary-300': '#7373FF',
				'primary-200': '#A3AEFD',
				'primary-100': '#C2C9FD',
				'primary-50': '#EEEDFF',
				'primary-light': '#F6F5FF',

				'gray-800': '#',
				'gray-700': '#',
				'gray-600': '#',
				'gray-500': '#',
				'gray-400': '#',
				'gray-300': '#',
				'gray-200': '#',
				'gray-100': '#',
			},
			screens: {
				half: { min: '320px', max: '719px' },
				laptop: { min: '720px', max: '1023px' },
				ipad: { min: '1024px', max: '1279px' },
				desktop: { min: '1280px', max: '1600px' },
				apple: { min: '1601px', max: '2560px' },
				uw: { min: '2561px' },
				tall: { raw: '(min-height: 1200px)' },
			},
			animation: {
				type: 'type 2.7s ease-out .8s infinite alternate both',
			},
			keyframes: {
				type: {
					'0%': { transform: 'translateX(0ch)' },
					'5%, 10%': { transform: 'translateX(1ch)' },
					'15%, 20%': { transform: 'translateX(2ch)' },
					'25%, 30%': { transform: 'translateX(3ch)' },
					'35%, 40%': { transform: 'translateX(4ch)' },
					'45%, 50%': { transform: 'translateX(5ch)' },
					'55%, 60%': { transform: 'translateX(6ch)' },
					'65%, 70%': { transform: 'translateX(7ch)' },
					'75%, 80%': { transform: 'translateX(8ch)' },
					'85%, 90%': { transform: 'translateX(9ch)' },
					'95%, 100%': { transform: 'translateX(11ch)' },
				},
			},
			boxShadow: {
				'2xl': '4px 5px 1px rgba(194, 201, 253, 0.47)',
				'3xl': '6px 7px 1px rgba(194, 201, 253, 0.47)',
				'4xl': '15px 16px 1px rgba(194, 201, 253, 0.47)',
			},
		},
	},
	plugins: [
		typography,
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			// Square utility
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value,
					}),
				},
				{ values: theme('spacing') }
			);
		}),
	],
};

module.exports = config;
