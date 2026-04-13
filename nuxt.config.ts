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
			link: [
				{
					rel: 'preload',
					as: 'font',
					type: 'font/woff2',
					href: '/fonts/dm-sans-v17-latin_latin-ext-regular.woff2',
					crossorigin: 'anonymous',
				},
				{
					rel: 'preload',
					as: 'font',
					type: 'font/woff2',
					href: '/fonts/instrument-serif-v5-latin_latin-ext-regular.woff2',
					crossorigin: 'anonymous',
				},
			],
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
			],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	css: ['~/assets/css/index.css'],
	compatibilityDate: '2024-11-01',
	runtimeConfig: {
		keystaticBasicAuthUser: process.env.KEYSTATIC_BASIC_AUTH_USER ?? '',
		keystaticBasicAuthPassword:
			process.env.KEYSTATIC_BASIC_AUTH_PASSWORD ?? '',
	},

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
