<template>
	<section
		id="hero"
		class="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-stone-950"
	>
		<img
			src="/images/hero-poster.jpg"
			alt="hero poster"
			aria-hidden="true"
			fetchpriority="high"
			class="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
		/>

		<client-only>
			<video
				ref="videoEl"
				:src="VIDEO_URL"
				poster="/images/hero-poster.jpg"
				class="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
				:style="{ opacity: videoOpacity }"
				muted
				autoplay
				playsinline
				preload="none"
				@canplay="onCanPlay"
				@timeupdate="onTimeUpdate"
				@ended="onEnded"
			>
				<track kind="captions" src="/captions/hero.vtt" />
			</video>
		</client-only>

		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20"
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent"
		/>

		<div
			class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-[80px] xs:px-5 xs:pt-[80px] sm:pt-[100px] md:px-12 md:pb-32"
		>
			<div
				:class="[
					'd-300 mb-8 inline-flex items-center gap-3',
					mounted && 'animate-fade-in',
				]"
			>
				<span class="h-px w-8 bg-stone-50 xs:w-10" />
				<span
					class="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-stone-50 xs:text-[0.7rem] xs:tracking-[0.25em]"
				>
					Est. 2008 · Warsaw
				</span>
			</div>

			<h1 class="mb-6 leading-[1.2] tracking-[-0.01em] text-white">
				<span
					:class="[
						'd-100 block font-serif text-[clamp(2rem,8vw,7.5rem)]',
						mounted && 'animate-slide-up',
					]"
				>
					{{ t('hero.headline1') }}
				</span>
				<span
					:class="[
						'text-gold-gradient d-200 block text-[clamp(2rem,8vw,7.5rem)] italic',
						mounted && 'animate-slide-up',
					]"
				>
					{{ t('hero.headline2') }}
				</span>
			</h1>

			<p
				:class="[
					'd-400 mb-10 max-w-[44ch] font-sans text-[0.95rem] font-light leading-[1.7] text-white/60 xs:text-[1.05rem] md:mb-12',
					mounted && 'animate-fade-up',
				]"
			>
				{{ t('hero.sub') }}
			</p>

			<div
				:class="[
					'd-500 flex flex-wrap items-center gap-4 xs:gap-5',
					mounted && 'animate-fade-up',
				]"
			>
				<a
					href="#services"
					class="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-stone-950 no-underline transition-all duration-300 hover:shadow-[0_8px_32px_rgba(184,154,106,0.45)] xs:px-8 xs:py-4 xs:text-[0.85rem]"
				>
					{{ t('hero.ctaPrimary') }}
					<span
						class="transition-transform duration-300 group-hover:translate-x-1"
					>
						→
					</span>
				</a>
				<a
					href="#about"
					class="group relative inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.08em] text-white/70 no-underline transition-colors duration-300 hover:text-white xs:text-[0.85rem]"
				>
					{{ t('hero.ctaSecondary') }}
					<span
						class="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-white/40 transition-all duration-300 group-hover:w-full"
					/>
				</a>
			</div>

			<div
				:class="[
					'd-600 mt-12 flex flex-wrap gap-6 border-t border-white/10 pt-8 xs:gap-8 md:mt-16 md:gap-10 md:pt-10',
					mounted && 'animate-fade-up',
				]"
			>
				<div
					v-for="stat in stats"
					:key="stat.label"
					class="flex flex-col gap-1"
				>
					<span
						class="font-serif text-[2rem] leading-none text-white"
					>
						{{ stat.value }}
					</span>
					<span
						class="font-sans text-[0.72rem] uppercase tracking-[0.12em] text-white/60"
					>
						{{ stat.label }}
					</span>
				</div>
			</div>
		</div>

		<div
			:class="[
				'd-800 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2',
				mounted && 'animate-fade-in',
			]"
		>
			<div class="relative h-12 w-[1px] overflow-hidden bg-white/20">
				<div
					class="absolute left-0 top-0 h-1/2 w-full animate-[scrollDrop_1.8s_ease-in-out_infinite] bg-white/70"
				/>
			</div>
			<span
				class="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/60"
			>
				{{ t('hero.scroll') }}
			</span>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t, messages, locale } = useI18n();

	const stats = computed(() => {
		const localeMessages = messages.value[locale.value] as
			| {
					hero?: {
						stats?: unknown[];
					};
			  }
			| undefined;

		const count = Array.isArray(localeMessages?.hero?.stats)
			? localeMessages.hero.stats.length
			: 0;

		return Array.from({ length: count }, (_, i) => ({
			value: t(`hero.stats[${i}].value`),
			label: t(`hero.stats[${i}].label`),
		}));
	});

	const VIDEO_URL = computed(() => t('hero.videoUrl'));

	const mounted = ref(false);
	onMounted(() => {
		mounted.value = true;
	});

	const videoEl = ref<HTMLVideoElement | null>(null);
	const videoOpacity = ref(0);

	const FADE_IN_MS = 500;
	const FADE_OUT_MS = 500;
	const FADE_OUT_SEC = 0.55;

	let fadeRaf: number | null = null;

	function cancelFade() {
		if (fadeRaf !== null) {
			cancelAnimationFrame(fadeRaf);
			fadeRaf = null;
		}
	}

	function fadeTo(
		from: number,
		to: number,
		durationMs: number,
		onDone?: () => void
	) {
		cancelFade();
		const start = performance.now();
		const delta = to - from;

		const step = (now: number) => {
			const elapsed = now - start;
			const t = Math.min(elapsed / durationMs, 1);
			const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
			videoOpacity.value = from + delta * ease;

			if (t < 1) {
				fadeRaf = requestAnimationFrame(step);
			} else {
				videoOpacity.value = to;
				fadeRaf = null;
				onDone?.();
			}
		};

		fadeRaf = requestAnimationFrame(step);
	}

	function onCanPlay() {
		fadeTo(0, 1, FADE_IN_MS);
	}

	let fadingOut = false;

	function onTimeUpdate() {
		const vid = videoEl.value;
		if (!vid || fadingOut) return;

		const remaining = vid.duration - vid.currentTime;
		if (remaining <= FADE_OUT_SEC && vid.duration > 0) {
			fadingOut = true;
			fadeTo(videoOpacity.value, 0, FADE_OUT_MS);
		}
	}

	function onEnded() {
		fadingOut = false;
		const vid = videoEl.value;
		if (!vid) return;

		vid.currentTime = 0;
		vid.play().catch(() => {});
	}

	onUnmounted(() => cancelFade());
</script>
