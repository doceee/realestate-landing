import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxtjs/i18n',
	],

	app: {
		head: {
			title: 'Maison — Luxury Real Estate',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					name: 'description',
					content:
						'Exceptional properties for discerning clients. Luxury real estate redefined.',
				},
			],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	css: ['~/assets/css/index.css'],
	compatibilityDate: '2024-11-01',

	nitro: {
		externals: {
			inline: ['@nuxtjs/i18n/dist/runtime'],
		},
	},

	hooks: {
		'nitro:config'(nitroConfig) {
			nitroConfig.virtual = nitroConfig.virtual ?? {};
			nitroConfig.virtual['#internal/i18n-route-resources.mjs'] = () => {
				const filePath = resolve('.nuxt/i18n-route-resources.mjs');
				return existsSync(filePath)
					? readFileSync(filePath, 'utf-8')
					: 'export const pathToI18nConfig = {};\nexport const i18nPathToPath = {};';
			};
		},
	},

	routeRules: {
		'/': { redirect: '/en' },
	},

	i18n: {
		locales: [
			{
				code: 'en',
				name: 'English',
				language: 'en-GB',
				file: 'en.json',
			},
			{
				code: 'pl',
				name: 'Polski',
				language: 'pl-PL',
				file: 'pl.json',
			},
		],
		langDir: 'locales',
		defaultLocale: 'en',
		strategy: 'prefix',
		detectBrowserLanguage: false,
		baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
	},
});
