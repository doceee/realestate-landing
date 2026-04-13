<template>
	<section
		id="hero"
		class="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-stone-950"
	>
		<video
			ref="videoEl"
			:src="VIDEO_URL"
			class="pointer-events-none absolute inset-0 h-full w-full translate-y-[calc(17%+100px)] select-none object-cover"
			:style="{ opacity: videoOpacity }"
			muted
			autoplay
			playsinline
			preload="auto"
			@canplay="onCanPlay"
			@timeupdate="onTimeUpdate"
			@ended="onEnded"
		>
			<track kind="captions" src="/captions/hero.vtt" />
		</video>

		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20"
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent"
		/>

		<div
			class="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:px-12 md:pb-32"
		>
			<div
				class="mb-8 inline-flex animate-fade-in items-center gap-3 d-300"
			>
				<span class="h-px w-10 bg-stone-50" />
				<span
					class="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-stone-50"
				>
					Est. 2008 · Warsaw
				</span>
			</div>

			<h1 class="mb-6 leading-[1.2] tracking-[-0.01em] text-white">
				<span
					class="block animate-slide-up font-serif text-[clamp(3rem,8vw,7.5rem)] d-100"
				>
					{{ t('hero.headline1') }}
				</span>
				<span
					class="block animate-slide-up text-[clamp(3rem,8vw,7.5rem)] italic text-gold-gradient d-200"
				>
					{{ t('hero.headline2') }}
				</span>
			</h1>

			<p
				class="mb-12 max-w-[44ch] animate-fade-up font-sans text-[1.05rem] font-light leading-[1.7] text-white/60 d-400"
			>
				{{ t('hero.sub') }}
			</p>

			<div
				class="flex animate-fade-up flex-wrap items-center gap-5 d-500"
			>
				<a
					href="#services"
					class="group inline-flex items-center gap-3 rounded-full bg-gold-light px-8 py-4 text-[0.85rem] font-medium uppercase tracking-[0.08em] text-stone-950 no-underline transition-all duration-300 hover:shadow-[0_8px_32px_rgba(184,154,106,0.45)]"
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
					class="group relative inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.08em] text-white/70 no-underline transition-colors duration-300 hover:text-white"
				>
					{{ t('hero.ctaSecondary') }}
					<span
						class="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-white/40 transition-all duration-300 group-hover:w-full"
					/>
				</a>
			</div>

			<div
				class="mt-16 flex animate-fade-up flex-wrap gap-10 border-t border-white/10 pt-10 d-600"
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
			class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-fade-in flex-col items-center gap-2 d-800"
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
	const { t } = useI18n();

	const STAT_VALUES = ['320+', '€2.4B', '16', '94%'];
	const stats = computed(() =>
		STAT_VALUES.map((value, i) => ({
			value,
			label: t(`hero.stats[${i}].label`),
		}))
	);

	const VIDEO_URL = 'https://assets.mixkit.co/videos/4046/4046-720.mp4';

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
			// ease in-out quad
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

	// ── event handlers ──────────────────────────────────────
	function onCanPlay() {
		// Fade in from 0 → 1 over 500ms
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
		// Reset + replay (custom crossfade loop — no loop attribute)
		fadingOut = false;
		const vid = videoEl.value;
		if (!vid) return;

		vid.currentTime = 0;
		vid.play().catch(() => {});
		// onCanPlay will fire again → fade-in
	}

	onUnmounted(() => cancelFade());
</script>
