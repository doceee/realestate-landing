<template>
	<section
		id="about"
		class="relative overflow-hidden bg-stone-50 py-20 xs:py-24 md:py-40"
	>
		<div
			class="pointer-events-none absolute right-0 top-0 h-96 w-96 opacity-5"
		>
			<svg viewBox="0 0 400 400" fill="none" class="h-full w-full">
				<circle
					cx="200"
					cy="200"
					r="190"
					stroke="#b89a6a"
					stroke-width="1"
				/>
				<circle
					cx="200"
					cy="200"
					r="140"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
				<circle
					cx="200"
					cy="200"
					r="90"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
				<line
					x1="10"
					y1="200"
					x2="390"
					y2="200"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
				<line
					x1="200"
					y1="10"
					x2="200"
					y2="390"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
			</svg>
		</div>

		<div class="mx-auto max-w-7xl px-4 xs:px-5 md:px-12">
			<div class="grid items-center gap-16 md:grid-cols-2 md:gap-24">
				<div class="reveal-scale reveal relative">
					<div
						class="img-zoom relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-200"
					>
						<picture>
							<source
								type="image/avif"
								srcset="
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=70&fm=avif 400w,
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=70&fm=avif 600w,
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=70&fm=avif 800w
								"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<source
								type="image/webp"
								srcset="
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=75&fm=webp 400w,
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=75&fm=webp 600w,
									https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=75&fm=webp 800w
								"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<img
								src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80"
								alt="Luxury interior"
								class="h-full w-full object-cover"
								width="800"
								height="1067"
								loading="lazy"
								decoding="async"
							/>
						</picture>
						<div
							class="pointer-events-none absolute inset-3 rounded-sm border"
						/>
					</div>

					<div
						class="reveal d-300 absolute bottom-16 right-0 max-w-[160px] rounded-sm bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] xs:-right-3 xs:max-w-[180px] xs:p-5 md:-right-6"
					>
						<span
							class="text-gold-DEFAULT block font-serif text-[2.5rem] leading-none"
						>
							16
						</span>
						<span
							class="mt-1 block font-sans text-[0.72rem] uppercase tracking-[0.1em] text-stone-500"
						>
							{{ t('about.yearsLabel') }}
						</span>
					</div>

					<div class="absolute -left-4 top-12 h-24 w-24 opacity-20">
						<svg viewBox="0 0 100 100" class="h-full w-full">
							<pattern
								id="dots"
								x="0"
								y="0"
								width="10"
								height="10"
								patternUnits="userSpaceOnUse"
							>
								<circle cx="2" cy="2" r="1.5" fill="#b89a6a" />
							</pattern>
							<rect width="100" height="100" fill="url(#dots)" />
						</svg>
					</div>
				</div>

				<div>
					<div class="reveal mb-6 flex items-center gap-4">
						<div class="line-draw h-px w-10" />
						<span
							class="font-sans text-[0.68rem] uppercase tracking-[0.25em]"
						>
							{{ t('about.eyebrow') }}
						</span>
					</div>

					<h2 class="reveal d-100 mb-6">
						<span
							class="block font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-stone-900"
						>
							{{ t('about.headline1') }}
						</span>
						<span
							class="font-serif-italic block text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
						>
							{{ t('about.headline2') }}
						</span>
					</h2>

					<div
						class="line-draw reveal d-200 mb-8 h-px bg-stone-200"
					/>

					<p
						class="reveal d-200 mb-6 font-sans text-[1rem] font-light leading-[1.8] text-stone-600"
					>
						{{ t('about.p1') }}
					</p>
					<p
						class="reveal d-300 mb-10 font-sans text-[1rem] font-light leading-[1.8] text-stone-600"
					>
						{{ t('about.p2') }}
					</p>

					<ul class="reveal d-400 flex flex-col gap-4">
						<li
							v-for="val in values"
							:key="val.title"
							class="group flex items-start gap-4"
						>
							<span
								class="mt-[5px] h-[6px] w-[6px] flex-shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
							/>
							<div>
								<span
									class="font-serif text-[1rem] text-stone-900"
								>
									{{ val.title }}
								</span>
								<span class="mx-2 text-stone-600">—</span>
								<span
									class="font-sans text-[0.9rem] font-light text-stone-600"
								>
									{{ val.desc }}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const values = computed(() =>
		Array.from({ length: 3 }, (_, i) => ({
			title: t(`about.values[${i}].title`),
			desc: t(`about.values[${i}].desc`),
		}))
	);
</script>
