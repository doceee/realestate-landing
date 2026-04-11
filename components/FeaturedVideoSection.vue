<template>
  <section
    id="video"
    class="relative py-28 md:py-40 bg-stone-950 overflow-hidden"
  >
    <!-- Background grain texture -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
      "
    />

    <!-- Gold glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-10"
      style="
        background: radial-gradient(ellipse, #b89a6a 0%, transparent 70%);
        animation: breathe 6s ease-in-out infinite;
      "
    />

    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <!-- Section header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-4 mb-6 reveal">
          <div class="h-px w-10 bg-gold-DEFAULT line-draw" />
          <span
            class="text-gold-DEFAULT text-[0.68rem] tracking-[0.25em] uppercase font-sans"
            >{{ t('video.eyebrow') }}</span
          >
          <div class="h-px w-10 bg-gold-DEFAULT line-draw" />
        </div>
        <h2 class="reveal d-100">
          <span
            class="block font-serif text-[clamp(2rem,5vw,4rem)] text-white leading-[1.1]"
            >{{ t('video.headline1') }}</span
          >
          <span
            class="block font-serif-italic text-[clamp(2rem,5vw,4rem)] text-gold-DEFAULT leading-[1.1]"
            >{{ t('video.headline2') }}</span
          >
        </h2>
      </div>

      <!-- Video frame -->
      <div class="relative reveal-scale d-200">
        <!-- Outer gold border frame (animated) -->
        <div
          class="absolute -inset-[1px] rounded-sm pointer-events-none"
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
          <div class="w-full h-full rounded-sm bg-stone-950" />
        </div>

        <!-- Video container -->
        <div
          class="relative aspect-video rounded-sm overflow-hidden bg-stone-900 cursor-pointer group"
          @click="togglePlay"
        >
          <!-- Poster / video -->
          <video
            ref="featVid"
            src="https://assets.mixkit.co/videos/4198/4198-720.mp4"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            muted
            playsinline
            preload="metadata"
          />

          <!-- Dark overlay (hides when playing) -->
          <Transition name="overlay">
            <div
              v-if="!playing"
              class="absolute inset-0 bg-stone-950/50 flex flex-col items-center justify-center"
            >
              <!-- Play button -->
              <button
                class="relative w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 group/btn"
                :aria-label="t('video.playAriaLabel')"
              >
                <span class="ml-1 text-2xl">▶</span>
                <!-- outer pulse ring -->
                <span
                  class="absolute inset-0 rounded-full border border-white/30 animate-ping-slow"
                />
              </button>

              <!-- Caption below play -->
              <div class="mt-6 text-center">
                <p class="font-serif text-white text-xl">Villa Solaris</p>
                <p
                  class="font-sans font-light text-white/50 text-sm tracking-wider mt-1"
                >
                  Warsaw Wilanów · €4.2M
                </p>
              </div>
            </div>
          </Transition>

          <!-- Progress bar (shown while playing) -->
          <div
            v-if="playing"
            class="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10"
          >
            <div
              class="h-full bg-gold-DEFAULT transition-all duration-300"
              :style="{ width: progressPct + '%' }"
            />
          </div>
        </div>
      </div>

      <!-- Property tags below -->
      <div
        class="flex flex-wrap items-center justify-center gap-4 mt-10 reveal d-400"
      >
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-4 py-2 border border-white/10 rounded-full text-white/50 text-[0.72rem] tracking-[0.1em] uppercase font-sans hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-colors duration-300 cursor-default"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const tags = computed(() =>
  Array.from({ length: 5 }, (_, i) => t(`video.tags[${i}]`))
)

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
