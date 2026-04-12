<template>
	<section
		id="services"
		class="relative overflow-hidden bg-stone-50 py-28 md:py-40"
	>
		<div class="mx-auto max-w-7xl px-6 md:px-12">
			<div class="mb-20 grid items-end gap-12 md:grid-cols-2 md:gap-24">
				<div>
					<div class="mb-6 flex items-center gap-4 reveal">
						<div class="line-draw h-px w-10" />
						<span
							class="font-sans text-[0.68rem] uppercase tracking-[0.25em]"
						>
							{{ t('services.eyebrow') }}
						</span>
					</div>
					<h2 class="reveal d-100">
						<span
							class="block font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-stone-900"
						>
							{{ t('services.headline1') }}
						</span>
						<span
							class="block text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-serif-italic"
						>
							{{ t('services.headline2') }}
						</span>
					</h2>
				</div>
				<p
					class="font-sans text-[1rem] font-light leading-[1.8] text-stone-500 reveal d-200 md:pb-3"
				>
					{{ t('services.subtext') }}
				</p>
			</div>

			<div class="grid gap-1 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="(service, i) in services"
					:key="service.title"
					class="group relative cursor-default overflow-hidden bg-stone-50 p-8 transition-colors duration-500 reveal hover:bg-stone-900 md:p-10"
					:class="`d-${Math.min((i + 1) * 100, 600)}`"
				>
					<div
						class="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
					/>

					<span
						class="mb-6 block select-none text-[5rem] leading-none text-stone-200 transition-colors duration-500 font-serif-italic group-hover:text-stone-800"
					>
						{{ String(i + 1).padStart(2, '0') }}
					</span>

					<div
						class="mb-5 h-px w-8 transition-all duration-500 group-hover:w-14"
					/>

					<h3
						class="mb-3 font-serif text-[1.25rem] leading-snug text-stone-900 transition-colors duration-500 group-hover:text-white"
					>
						{{ service.title }}
					</h3>
					<p
						class="font-sans text-[0.88rem] font-light leading-[1.7] text-stone-500 transition-colors duration-500 group-hover:text-stone-300"
					>
						{{ service.desc }}
					</p>

					<div
						class="mt-8 flex translate-y-2 items-center gap-2 font-sans text-[0.75rem] uppercase tracking-[0.1em] text-stone-50 opacity-0 transition-all duration-500 hover:cursor-pointer group-hover:translate-y-0 group-hover:opacity-100"
					>
						{{ t('services.learnMore') }}
						<span
							class="transition-transform duration-300 group-hover:translate-x-1"
						>
							→
						</span>
					</div>
				</div>
			</div>

			<div
				class="mt-20 flex flex-col items-center justify-between gap-8 border-t border-stone-200 pt-12 reveal d-400 md:flex-row"
			>
				<div>
					<p
						class="font-serif text-[1.5rem] leading-snug text-stone-900"
					>
						{{ t('services.ctaTitle') }}
						<span class="font-serif-italic">
							{{ t('services.ctaHighlight') }}
						</span>
					</p>
					<p
						class="mt-2 font-sans text-[0.9rem] font-light text-stone-500"
					>
						{{ t('services.ctaSub') }}
					</p>
				</div>
				<a
					href="#contact"
					class="hover: group inline-flex flex-shrink-0 items-center gap-3 rounded-full border px-8 py-4 text-[0.85rem] font-medium uppercase tracking-[0.08em] no-underline transition-all duration-300 hover:text-stone-950 hover:shadow-[0_6px_24px_rgba(184,154,106,0.3)]"
				>
					{{ t('services.ctaBtn') }}
					<span
						class="transition-transform duration-300 group-hover:translate-x-1"
					>
						→
					</span>
				</a>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const services = computed(() =>
		Array.from({ length: 6 }, (_, i) => ({
			title: t(`services.items[${i}].title`),
			desc: t(`services.items[${i}].desc`),
		}))
	);
</script>
