import { config, fields, singleton } from '@keystatic/core';

const statItem = fields.object(
	{
		value: fields.text({
			label: 'Value',
			validation: { isRequired: true },
		}),
		label: fields.text({
			label: 'Label',
			validation: { isRequired: true },
		}),
	},
	{ label: 'Statistic' }
);

const valueItem = fields.object(
	{
		title: fields.text({
			label: 'Title',
			validation: { isRequired: true },
		}),
		desc: fields.text({
			label: 'Description',
			multiline: true,
			validation: { isRequired: true },
		}),
	},
	{ label: 'Item' }
);

const serviceItem = fields.object(
	{
		title: fields.text({
			label: 'Title',
			validation: { isRequired: true },
		}),
		desc: fields.text({
			label: 'Description',
			multiline: true,
			validation: { isRequired: true },
		}),
	},
	{ label: 'Service' }
);

const localeSchema = {
	nav: fields.object(
		{
			about: fields.text({
				label: 'About label',
				validation: { isRequired: true },
			}),
			properties: fields.text({
				label: 'Properties label',
				validation: { isRequired: true },
			}),
			philosophy: fields.text({
				label: 'Philosophy label',
				validation: { isRequired: true },
			}),
			services: fields.text({
				label: 'Services label',
				validation: { isRequired: true },
			}),
			cta: fields.text({
				label: 'CTA label',
				validation: { isRequired: true },
			}),
			menuAriaLabel: fields.text({
				label: 'Menu aria label',
				validation: { isRequired: true },
			}),
		},
		{ label: 'Navigation' }
	),
	hero: fields.object(
		{
			headline1: fields.text({
				label: 'Headline line 1',
				validation: { isRequired: true },
			}),
			headline2: fields.text({
				label: 'Headline line 2',
				validation: { isRequired: true },
			}),
			sub: fields.text({
				label: 'Subheading',
				multiline: true,
				validation: { isRequired: true },
			}),
			ctaPrimary: fields.text({
				label: 'Primary CTA',
				validation: { isRequired: true },
			}),
			ctaSecondary: fields.text({
				label: 'Secondary CTA',
				validation: { isRequired: true },
			}),
			scroll: fields.text({
				label: 'Scroll label',
				validation: { isRequired: true },
			}),
			videoUrl: fields.url({
				label: 'Hero video URL',
				validation: { isRequired: true },
			}),
			stats: fields.array(statItem, {
				label: 'Stats',
				itemLabel: (props) => props.fields.label.value || 'Statistic',
			}),
		},
		{ label: 'Hero' }
	),
	about: fields.object(
		{
			eyebrow: fields.text({
				label: 'Eyebrow',
				validation: { isRequired: true },
			}),
			headline1: fields.text({
				label: 'Headline line 1',
				validation: { isRequired: true },
			}),
			headline2: fields.text({
				label: 'Headline line 2',
				validation: { isRequired: true },
			}),
			p1: fields.text({
				label: 'Paragraph 1',
				multiline: true,
				validation: { isRequired: true },
			}),
			p2: fields.text({
				label: 'Paragraph 2',
				multiline: true,
				validation: { isRequired: true },
			}),
			yearsLabel: fields.text({
				label: 'Years label',
				validation: { isRequired: true },
			}),
			values: fields.array(valueItem, {
				label: 'Values',
				itemLabel: (props) => props.fields.title.value || 'Value',
			}),
		},
		{ label: 'About' }
	),
	video: fields.object(
		{
			eyebrow: fields.text({
				label: 'Eyebrow',
				validation: { isRequired: true },
			}),
			headline1: fields.text({
				label: 'Headline line 1',
				validation: { isRequired: true },
			}),
			headline2: fields.text({
				label: 'Headline line 2',
				validation: { isRequired: true },
			}),
			videoUrl: fields.url({
				label: 'Featured video URL',
				validation: { isRequired: true },
			}),
			propertyName: fields.text({
				label: 'Property name',
				validation: { isRequired: true },
			}),
			propertyPrice: fields.text({
				label: 'Property location & price',
				validation: { isRequired: true },
			}),
			tags: fields.array(
				fields.text({
					label: 'Tag',
					validation: { isRequired: true },
				}),
				{
					label: 'Tags',
					itemLabel: (props) => props.value || 'Tag',
				}
			),
			playAriaLabel: fields.text({
				label: 'Play aria label',
				validation: { isRequired: true },
			}),
		},
		{ label: 'Featured Video' }
	),
	philosophy: fields.object(
		{
			eyebrow: fields.text({
				label: 'Eyebrow',
				validation: { isRequired: true },
			}),
			quoteBody: fields.text({
				label: 'Quote body',
				multiline: true,
				validation: { isRequired: true },
			}),
			quoteHighlight: fields.text({
				label: 'Quote highlight',
				validation: { isRequired: true },
			}),
			authorTitle: fields.text({
				label: 'Author title',
				validation: { isRequired: true },
			}),
			pillars: fields.array(valueItem, {
				label: 'Pillars',
				itemLabel: (props) => props.fields.title.value || 'Pillar',
			}),
		},
		{ label: 'Philosophy' }
	),
	services: fields.object(
		{
			eyebrow: fields.text({
				label: 'Eyebrow',
				validation: { isRequired: true },
			}),
			headline1: fields.text({
				label: 'Headline line 1',
				validation: { isRequired: true },
			}),
			headline2: fields.text({
				label: 'Headline line 2',
				validation: { isRequired: true },
			}),
			subtext: fields.text({
				label: 'Subtext',
				multiline: true,
				validation: { isRequired: true },
			}),
			learnMore: fields.text({
				label: 'Learn more label',
				validation: { isRequired: true },
			}),
			ctaTitle: fields.text({
				label: 'CTA title',
				validation: { isRequired: true },
			}),
			ctaHighlight: fields.text({
				label: 'CTA highlight',
				validation: { isRequired: true },
			}),
			ctaSub: fields.text({
				label: 'CTA subtext',
				multiline: true,
				validation: { isRequired: true },
			}),
			ctaBtn: fields.text({
				label: 'CTA button',
				validation: { isRequired: true },
			}),
			items: fields.array(serviceItem, {
				label: 'Services',
				itemLabel: (props) => props.fields.title.value || 'Service',
			}),
		},
		{ label: 'Services' }
	),
	contact: fields.object(
		{
			eyebrow: fields.text({
				label: 'Eyebrow',
				validation: { isRequired: true },
			}),
			headline1: fields.text({
				label: 'Headline line 1',
				validation: { isRequired: true },
			}),
			headline2: fields.text({
				label: 'Headline line 2',
				validation: { isRequired: true },
			}),
			sub: fields.text({
				label: 'Subheading',
				multiline: true,
				validation: { isRequired: true },
			}),
			namePlaceholder: fields.text({
				label: 'Name placeholder',
				validation: { isRequired: true },
			}),
			emailPlaceholder: fields.text({
				label: 'Email placeholder',
				validation: { isRequired: true },
			}),
			messagePlaceholder: fields.text({
				label: 'Message placeholder',
				multiline: true,
				validation: { isRequired: true },
			}),
			submit: fields.text({
				label: 'Submit label',
				validation: { isRequired: true },
			}),
			successTitle: fields.text({
				label: 'Success title',
				validation: { isRequired: true },
			}),
			successSub: fields.text({
				label: 'Success subtext',
				multiline: true,
				validation: { isRequired: true },
			}),
		},
		{ label: 'Contact' }
	),
	footer: fields.object(
		{
			copyright: fields.text({
				label: 'Copyright text',
				validation: { isRequired: true },
			}),
			links: fields.array(
				fields.text({
					label: 'Footer link',
					validation: { isRequired: true },
				}),
				{
					label: 'Footer links',
					itemLabel: (props) => props.value || 'Link',
				}
			),
		},
		{ label: 'Footer' }
	),
	seo: fields.object(
		{
			title: fields.text({
				label: 'SEO title',
				validation: { isRequired: true },
			}),
			description: fields.text({
				label: 'SEO description',
				multiline: true,
				validation: { isRequired: true },
			}),
		},
		{ label: 'SEO' }
	),
};

export default config({
	storage: {
		kind: 'cloud',
	},
	cloud: {
		project: import.meta.env.VITE_KEYSTATIC_CLOUD_PROJECT ?? '',
	},
	ui: {
		brand: {
			name: 'Maison & Co.',
		},
		navigation: ['localeEn', 'localePl'],
	},
	singletons: {
		localeEn: singleton({
			label: 'Homepage Copy (EN)',
			path: 'i18n/locales/en',
			format: { data: 'json' },
			schema: localeSchema,
		}),
		localePl: singleton({
			label: 'Homepage Copy (PL)',
			path: 'i18n/locales/pl',
			format: { data: 'json' },
			schema: localeSchema,
		}),
	},
});
