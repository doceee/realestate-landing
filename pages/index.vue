<template>
	<div class="bg-stone-50">
		<app-nav />

		<main>
			<hero-section />

			<lazy-about-section />

			<lazy-featured-video-section />

			<lazy-philosophy-section />

			<lazy-services-section />

			<lazy-contact-section />
		</main>

		<lazy-app-footer />
	</div>
</template>

<script setup lang="ts">
	const { t } = useI18n();

	useSeoMeta({
		title: () => t('seo.title'),
		description: () => t('seo.description'),
		ogTitle: () => t('seo.title'),
		ogDescription: () => t('seo.description'),
	});

	const { revealAll } = useReveal();

	useSectionObserver([
		'hero',
		'about',
		'video',
		'philosophy',
		'services',
		'contact',
	]);

	onMounted(() => revealAll());
</script>
