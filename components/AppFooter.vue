<template>
	<footer
		class="bg-stone-950 px-4 py-10 text-white/60 xs:px-5 xs:py-12 md:px-12"
	>
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row"
		>
			<div class="flex items-center gap-2">
				<span class="font-serif text-lg text-white/70">Maison</span>
				<span class="text-gold-DEFAULT font-serif-italic text-lg">
					&
				</span>
				<span class="font-serif text-lg text-white/70">Co.</span>
			</div>
			<p class="text-center text-[0.72rem] tracking-[0.1em]">
				{{ t('footer.copyright', { year }) }}
			</p>
			<ul class="flex list-none flex-wrap justify-center gap-4 xs:gap-6">
				<li v-for="l in links" :key="l">
					<a
						href="#"
						class="hover:text-gold-DEFAULT text-[0.72rem] uppercase tracking-wider no-underline transition-colors duration-200"
					>
						{{ l }}
					</a>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script setup lang="ts">
	const { t, locale, messages } = useI18n();
	const year = new Date().getFullYear();
	const links = computed(() => {
		const localeMessages = messages.value[locale.value] as
			| {
					footer?: {
						links?: unknown[];
					};
			  }
			| undefined;

		const count = Array.isArray(localeMessages?.footer?.links)
			? localeMessages.footer.links.length
			: 0;

		return Array.from({ length: count }, (_, index) =>
			t(`footer.links[${index}]`)
		);
	});
</script>
