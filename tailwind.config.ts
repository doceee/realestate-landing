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

				/* Border trace */
				'border-trace': 'borderTrace 1.5s ease both',
			},
			keyframes: {
				fadeUp: {
					from: { opacity: '0', transform: 'translateY(32px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
				slideUp: {
					from: { opacity: '0', transform: 'translateY(60px)' },
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
					from: { opacity: '0', transform: 'translateY(-16px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				cardRise: {
					from: { opacity: '0', transform: 'translateY(40px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				countUp: {
					from: { opacity: '0', transform: 'translateY(14px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				floatSlow: {
					'0%,100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-12px)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				lineGrow: {
					from: { transform: 'scaleX(0)', transformOrigin: 'left' },
					to: { transform: 'scaleX(1)', transformOrigin: 'left' },
				},
				borderTrace: {
					from: { clipPath: 'inset(0 100% 0 0)' },
					to: { clipPath: 'inset(0 0% 0 0)' },
				},
				underlineGrow: {
					from: { transform: 'scaleX(0)', transformOrigin: 'left' },
					to: { transform: 'scaleX(1)', transformOrigin: 'left' },
				},
			},
			transitionTimingFunction: {
				'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},
	plugins: [
		function ({
			addUtilities,
		}: {
			addUtilities: (
				utilities: Record<string, Record<string, string>>
			) => void;
		}) {
			addUtilities({
				/* Liquid glass */
				'.glass': {
					background: 'rgba(255,255,255,0.08)',
					backdropFilter: 'blur(20px) saturate(180%)',
					'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
					border: '1px solid rgba(255,255,255,0.18)',
				},
				'.glass-dark': {
					background: 'rgba(20,18,14,0.55)',
					backdropFilter: 'blur(20px) saturate(160%)',
					'-webkit-backdrop-filter': 'blur(20px) saturate(160%)',
					border: '1px solid rgba(255,255,255,0.08)',
				},
				/* Text utilities */
				'.text-gold-gradient': {
					background:
						'linear-gradient(135deg, #d4b98a 0%, #b89a6a 50%, #8c7248 100%)',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'background-clip': 'text',
				},
				'.font-serif-italic': {
					fontFamily: '"Instrument Serif", Georgia, serif',
					fontStyle: 'italic',
				},
				/* Reveal helpers */
				'.reveal': {
					opacity: '0',
					transform: 'translateY(32px)',
					transition:
						'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
				},
				'.reveal.show': { opacity: '1', transform: 'translateY(0)' },
				'.reveal-fade': {
					opacity: '0',
					transition: 'opacity 0.9s ease',
				},
				'.reveal-fade.show': { opacity: '1' },
				/* Stagger delays */
				'.d-100': { transitionDelay: '100ms', animationDelay: '100ms' },
				'.d-200': { transitionDelay: '200ms', animationDelay: '200ms' },
				'.d-300': { transitionDelay: '300ms', animationDelay: '300ms' },
				'.d-400': { transitionDelay: '400ms', animationDelay: '400ms' },
				'.d-500': { transitionDelay: '500ms', animationDelay: '500ms' },
				'.d-600': { transitionDelay: '600ms', animationDelay: '600ms' },
				'.d-700': { transitionDelay: '700ms', animationDelay: '700ms' },
				'.d-800': { transitionDelay: '800ms', animationDelay: '800ms' },
			});
		},
	],
} satisfies Config;
