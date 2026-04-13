<template>
	<div class="bg-stone-50">
		<app-nav />

		<main>
			<hero-section />

			<about-section />

			<featured-video-section />

			<philosophy-section />

			<services-section />

			<contact-section />
		</main>

		<app-footer />
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

	useSectionObserver(['hero', 'about', 'video', 'philosophy', 'services', 'contact']);

	onMounted(() => revealAll());
</script>
