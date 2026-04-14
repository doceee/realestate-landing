import type { Config } from 'tailwindcss';

export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./app.vue',
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Instrument Serif"', 'Georgia', 'serif'],
				sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			colors: {
				stone: {
					50: '#faf9f7',
					100: '#f3f1ec',
					200: '#e8e3da',
					300: '#d5cdc0',
					400: '#bfb49f',
					500: '#a89880',
					600: '#8c7c65',
					700: '#73644f',
					800: '#5c5040',
					900: '#3d3528',
					950: '#211d15',
				},
				gold: {
					DEFAULT: '#b89a6a',
					light: '#d4b98a',
					dark: '#8c7248',
				},
			},
			animation: {
				'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
				'fade-in': 'fadeIn 0.7s ease both',
				'slide-up': 'slideUp 1s cubic-bezier(0.16,1,0.3,1) both',

				'nav-in': 'navIn 0.6s cubic-bezier(0.16,1,0.3,1) both',

				'scroll-drop': 'scrollDrop 1.8s ease-in-out infinite',
			},
			keyframes: {
				fadeUp: {
					from: {
						opacity: '0',
						transform: 'translateY(32px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				slideUp: {
					from: {
						opacity: '0',
						transform: 'translateY(60px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				navIn: {
					from: {
						opacity: '0',
						transform: 'translateY(-16px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				scrollDrop: {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0',
					},
					'20%': { opacity: '1' },
					'80%': { opacity: '1' },
					'100%': {
						transform: 'translateY(200%)',
						opacity: '0',
					},
				},
			},
			transitionTimingFunction: {
				'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},
} satisfies Config;
