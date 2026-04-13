<template>
	<section
		id="video"
		class="relative overflow-hidden bg-stone-950 py-28 md:py-40"
	>
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.03]"
			style="
				background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
			"
		/>

		<div
			class="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-10"
			style="
				background: radial-gradient(
					ellipse,
					#b89a6a 0%,
					transparent 70%
				);
				animation: breathe 6s ease-in-out infinite;
			"
		/>

		<div class="mx-auto max-w-6xl px-6 md:px-12">
			<div class="mb-16 text-center">
				<div class="reveal mb-6 flex items-center justify-center gap-4">
					<div class="line-draw h-px w-10 bg-stone-700" />
					<span
						class="font-sans text-[0.68rem] uppercase tracking-[0.25em] text-stone-300"
					>
						{{ t('video.eyebrow') }}
					</span>
					<div class="line-draw h-px w-10 bg-gold-light" />
				</div>
				<h2 class="reveal d-100">
					<span
						class="block font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-white"
					>
						{{ t('video.headline1') }}
					</span>
					<span
						class="font-serif-italic block text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-gold-light"
					>
						{{ t('video.headline2') }}
					</span>
				</h2>
			</div>

			<div class="reveal-scale d-200 relative">
				<div
					class="pointer-events-none absolute -inset-[1px] rounded-sm"
					style="
						background: linear-gradient(
							135deg,
							rgba(184, 154, 106, 0.6),
							rgba(184, 154, 106, 0.1),
							rgba(184, 154, 106, 0.6)
						);
						padding: 1px;
					"
				>
					<div class="h-full w-full rounded-sm bg-stone-950" />
				</div>

				<div
					class="group relative aspect-video cursor-pointer overflow-hidden rounded-sm bg-stone-900"
					@click="togglePlay"
				>
					<video
						ref="featVid"
						:src="t('video.videoUrl')"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
						muted
						playsinline
						preload="metadata"
					>
						<track kind="captions" src="/captions/featured.vtt" />
					</video>

					<transition name="overlay">
						<div
							v-if="!playing"
							class="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/50"
						>
							<button
								class="group/btn glass relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
								:aria-label="t('video.playAriaLabel')"
							>
								<span class="ml-1 text-2xl">▶</span>
								<span
									class="animate-ping-slow absolute inset-0 rounded-full border border-white/30"
								/>
							</button>

							<div class="mt-6 text-center">
								<p class="font-serif text-xl text-white">
									{{ t('video.propertyName') }}
								</p>
								<p
									class="mt-1 font-sans text-sm font-light tracking-wider text-white/50"
								>
									{{ t('video.propertyPrice') }}
								</p>
							</div>
						</div>
					</transition>

					<div
						v-if="playing"
						class="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10"
					>
						<div
							class="h-full bg-gold-light transition-all duration-300"
							:style="{ width: progressPct + '%' }"
						/>
					</div>
				</div>
			</div>

			<div
				class="reveal d-400 mt-10 flex flex-wrap items-center justify-center gap-4"
			>
				<span
					v-for="tag in tags"
					:key="tag"
					class="cursor-default rounded-full border border-white/10 px-4 py-2 font-sans text-[0.72rem] uppercase tracking-[0.1em] text-white/50 transition-colors duration-300 hover:border-gold-light hover:text-gold-light"
				>
					{{ tag }}
				</span>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t, messages, locale } = useI18n();
	const tags = computed(() => {
		const localeMessages = messages.value[locale.value] as
			| {
					video?: {
						tags?: unknown[];
					};
			  }
			| undefined;

		const count = Array.isArray(localeMessages?.video?.tags)
			? localeMessages.video.tags.length
			: 0;

		return Array.from({ length: count }, (_, i) => t(`video.tags[${i}]`));
	});

	const featVid = ref<HTMLVideoElement | null>(null);
	const playing = ref(false);
	const progressPct = ref(0);

	let progressTimer: ReturnType<typeof setInterval> | null = null;

	function togglePlay() {
		const v = featVid.value;
		if (!v) return;

		if (playing.value) {
			v.pause();
			playing.value = false;
			if (progressTimer) clearInterval(progressTimer);
		} else {
			v.play();
			playing.value = true;
			progressTimer = setInterval(() => {
				if (!v.duration) return;
				progressPct.value = (v.currentTime / v.duration) * 100;
			}, 250);
		}
	}

	onUnmounted(() => {
		if (progressTimer) clearInterval(progressTimer);
	});
</script>

<style scoped>
	@keyframes breathe {
		0%,
		100% {
			opacity: 0.08;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 0.15;
			transform: translate(-50%, -50%) scale(1.15);
		}
	}
	.overlay-enter-active,
	.overlay-leave-active {
		transition: opacity 0.4s ease;
	}
	.overlay-enter-from,
	.overlay-leave-to {
		opacity: 0;
	}
</style>
