<template>
	<div class="min-h-screen bg-white">
		<keystatic-admin />
	</div>
</template>

<script setup lang="ts">
	defineI18nRoute(false);

	definePageMeta({
		layout: false,
		pageTransition: false,
	});

	useHead({
		title: 'Keystatic',
	});
</script>
