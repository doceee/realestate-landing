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
				/* Entrance */
				'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
				'fade-in': 'fadeIn 0.7s ease both',
				'fade-in-slow': 'fadeIn 1.4s ease both',
				'slide-up': 'slideUp 1s cubic-bezier(0.16,1,0.3,1) both',

				/* Continuous */
				'float-slow': 'floatSlow 7s ease-in-out infinite',
				shimmer: 'shimmer 3s linear infinite',
				'line-grow': 'lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) both',
				'scale-in': 'scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) both',
				'word-reveal':
					'wordReveal 0.8s cubic-bezier(0.16,1,0.3,1) both',

				/* Nav */
				'nav-in': 'navIn 0.6s cubic-bezier(0.16,1,0.3,1) both',

				/* Hover */
				'underline-grow': 'underlineGrow 0.3s ease forwards',

				/* Services card */
				'card-rise': 'cardRise 0.6s cubic-bezier(0.16,1,0.3,1) both',

				/* Number ticker */
				'count-up': 'countUp 0.7s cubic-bezier(0.16,1,0.3,1) both',

				/* Scroll indicator */
				'scroll-drop': 'scrollDrop 1.8s ease-in-out infinite',

				/* Border trace */
				'border-trace': 'borderTrace 1.5s ease both',
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
				scaleIn: {
					from: { opacity: '0', transform: 'scale(0.92)' },
					to: { opacity: '1', transform: 'scale(1)' },
				},
				wordReveal: {
					from: {
						opacity: '0',
						transform: 'translateY(20px) rotate(2deg)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0) rotate(0deg)',
					},
				},
				navIn: {
					from: {
						opacity: '0',
						transform: 'translateY(-16px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				cardRise: {
					from: {
						opacity: '0',
						transform: 'translateY(40px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				countUp: {
					from: {
						opacity: '0',
						transform: 'translateY(14px)',
					},
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				floatSlow: {
					'0%,100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-12px)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '0% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				lineGrow: {
					from: {
						transform: 'scaleX(0)',
						transformOrigin: 'left',
					},
					to: {
						transform: 'scaleX(1)',
						transformOrigin: 'left',
					},
				},
				borderTrace: {
					from: { clipPath: 'inset(0 100% 0 0)' },
					to: { clipPath: 'inset(0 0% 0 0)' },
				},
				underlineGrow: {
					from: {
						transform: 'scaleX(0)',
						transformOrigin: 'left',
					},
					to: {
						transform: 'scaleX(1)',
						transformOrigin: 'left',
					},
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
