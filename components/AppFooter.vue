<template>
	<footer class="bg-stone-950 px-6 py-12 text-white/60 md:px-12">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row"
		>
			<div class="flex items-center gap-2">
				<span class="font-serif text-lg text-white/70">Maison</span>
				<span class="text-gold-DEFAULT text-lg font-serif-italic">
					&
				</span>
				<span class="font-serif text-lg text-white/70">Co.</span>
			</div>
			<p class="text-center text-[0.72rem] tracking-[0.1em]">
				{{ t('footer.copyright', { year }) }}
			</p>
			<ul class="flex list-none gap-6">
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
	const { t } = useI18n();
	const year = new Date().getFullYear();
	const links = computed(() =>
		Array.from({ length: 3 }, (_, i) => t(`footer.links[${i}]`))
	);
</script>
