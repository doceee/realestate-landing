<template>
	<section
		id="philosophy"
		class="relative overflow-hidden bg-stone-100 py-28 md:py-44"
	>
		<div
			class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none pr-8 font-serif text-[28rem] leading-none text-stone-900 opacity-[0.04]"
		>
			M
		</div>

		<div class="mx-auto max-w-6xl px-6 md:px-12">
			<div class="mb-20 flex items-center gap-6 reveal">
				<div class="line-draw h-px flex-1 bg-stone-300" />
				<span
					class="flex-shrink-0 font-sans text-[0.68rem] uppercase tracking-[0.3em] text-stone-600"
				>
					{{ t('philosophy.eyebrow') }}
				</span>
				<div class="line-draw h-px flex-1 bg-stone-300" />
			</div>

			<div class="mx-auto max-w-4xl text-center">
				<p
					class="text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.25] tracking-[-0.01em] text-stone-800 font-serif-italic reveal d-100"
				>
					"{{ t('philosophy.quoteBody') }}
					<span class="text-gold-light">
						{{ t('philosophy.quoteHighlight') }}
					</span>
					"
				</p>

				<div
					class="mt-10 flex items-center justify-center gap-6 reveal d-300"
				>
					<div class="line-draw h-px w-16" />
					<div class="flex flex-col items-center gap-1">
						<span class="font-serif text-[1rem] text-stone-700">
							Aleksandra Wierzbicka
						</span>
						<span
							class="font-sans text-[0.75rem] font-light uppercase tracking-[0.1em] text-stone-700"
						>
							{{ t('philosophy.authorTitle') }}
						</span>
					</div>
					<div class="line-draw h-px w-16" />
				</div>
			</div>

			<div
				class="mt-28 grid gap-12 border-t border-stone-200 pt-16 md:grid-cols-3 md:gap-8"
			>
				<div
					v-for="(pillar, i) in pillars"
					:key="pillar.title"
					class="reveal"
					:class="`d-${(i + 1) * 100}`"
				>
					<span
						class="mb-4 block select-none text-[4rem] leading-none font-serif-italic"
					>
						{{ pillar.roman }}
					</span>
					<h3
						class="mb-3 font-serif text-[1.4rem] leading-snug text-stone-900"
					>
						{{ pillar.title }}
					</h3>
					<div class="line-draw mb-4 h-px w-8" />
					<p
						class="font-sans text-[0.9rem] font-light leading-[1.8] text-stone-700"
					>
						{{ pillar.desc }}
					</p>
				</div>
			</div>

			<div class="line-draw mt-20 h-px bg-stone-200 reveal d-400" />
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const ROMANS = ['I.', 'II.', 'III.'];
	const pillars = computed(() =>
		ROMANS.map((roman, i) => ({
			roman,
			title: t(`philosophy.pillars[${i}].title`),
			desc: t(`philosophy.pillars[${i}].desc`),
		}))
	);
</script>
