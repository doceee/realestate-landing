<template>
  <section
    id="hero"
    class="relative min-h-screen overflow-hidden flex flex-col items-center justify-end bg-stone-950"
  >
    <!-- ── VIDEO BACKGROUND ── -->
    <!--
      • translate-y-[calc(17%+100px)]  — shifted down as specified
      • object-cover                    — covers full section
      • opacity starts at 0, fades in via requestAnimationFrame on canplay
      • fades out when 0.55s remain, then resets + replays (custom loop, no loop attr)
    -->
    <video
      ref="videoEl"
      :src="VIDEO_URL"
      class="absolute inset-0 w-full h-full object-cover translate-y-[calc(17%+100px)] pointer-events-none select-none"
      :style="{ opacity: videoOpacity }"
      muted
      autoplay
      playsinline
      preload="auto"
      @canplay="onCanPlay"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    />

    <!-- Gradient overlays for depth -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20 pointer-events-none"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent pointer-events-none"
    />

    <!-- ── HERO CONTENT ── -->
    <div
      class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32"
    >
      <!-- Eyebrow tag -->
      <div class="inline-flex items-center gap-3 mb-8 animate-fade-in d-300">
        <span class="h-px w-10 bg-gold-DEFAULT" />
        <span
          class="text-gold-DEFAULT font-sans text-[0.7rem] tracking-[0.25em] uppercase"
          >Est. 2008 · Warsaw</span
        >
      </div>

      <!-- Main headline — Instrument Serif, mixed italic -->
      <h1 class="text-white mb-6 leading-[1.02] tracking-[-0.01em]">
        <span
          class="block font-serif text-[clamp(3rem,8vw,7.5rem)] animate-slide-up d-100"
          >{{ t('hero.headline1') }}</span
        >
        <span
          class="block font-serif-italic text-[clamp(3rem,8vw,7.5rem)] text-gold-DEFAULT animate-slide-up d-200"
          >{{ t('hero.headline2') }}</span
        >
      </h1>

      <!-- Sub -->
      <p
        class="font-sans font-light text-white/60 text-[1.05rem] leading-[1.7] max-w-[44ch] mb-12 animate-fade-up d-400"
      >
        {{ t('hero.sub') }}
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap items-center gap-5 animate-fade-up d-500">
        <a
          href="#services"
          class="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-DEFAULT text-stone-950 text-[0.85rem] font-medium tracking-[0.08em] uppercase no-underline transition-all duration-300 hover:bg-gold-light hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(184,154,106,0.45)]"
        >
          {{ t('hero.ctaPrimary') }}
          <span
            class="transition-transform duration-300 group-hover:translate-x-1"
            >→</span
          >
        </a>
        <a
          href="#about"
          class="inline-flex items-center gap-2 text-white/70 text-[0.85rem] tracking-[0.08em] uppercase no-underline hover:text-white transition-colors duration-300 relative group"
        >
          {{ t('hero.ctaSecondary') }}
          <span
            class="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-white/40 transition-all duration-300 group-hover:w-full"
          />
        </a>
      </div>

      <!-- Stats row -->
      <div
        class="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/10 animate-fade-up d-600"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col gap-1"
        >
          <span class="font-serif text-white text-[2rem] leading-none">{{
            stat.value
          }}</span>
          <span
            class="text-white/40 text-[0.72rem] tracking-[0.12em] uppercase font-sans"
            >{{ stat.label }}</span
          >
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in d-800 z-10"
    >
      <div class="w-[1px] h-12 bg-white/20 relative overflow-hidden">
        <div
          class="absolute top-0 left-0 w-full h-1/2 bg-gold-DEFAULT animate-[scrollDrop_1.8s_ease-in-out_infinite]"
        />
      </div>
      <span
        class="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase font-sans"
        >{{ t('hero.scroll') }}</span
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const STAT_VALUES = ['320+', '€2.4B', '16', '94%']
const stats = computed(() =>
  STAT_VALUES.map((value, i) => ({
    value,
    label: t(`hero.stats[${i}].label`),
  }))
)

const VIDEO_URL = 'https://assets.mixkit.co/videos/4046/4046-720.mp4';

const videoEl = ref<HTMLVideoElement | null>(null);
const videoOpacity = ref(0);

// ── helpers ────────────────────────────────────────────
const FADE_IN_MS = 500;
const FADE_OUT_MS = 500;
const FADE_OUT_SEC = 0.55; // seconds before end to start fade-out

let fadeRaf: number | null = null;

function cancelFade() {
  if (fadeRaf !== null) {
    cancelAnimationFrame(fadeRaf);
    fadeRaf = null;
  }
}

/**
 * Fades videoOpacity from `from` → `to` over `durationMs` using rAF.
 * Calls `onDone` when complete.
 */
function fadeTo(
  from: number,
  to: number,
  durationMs: number,
  onDone?: () => void,
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

<style scoped>
@keyframes scrollDrop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}
</style>
