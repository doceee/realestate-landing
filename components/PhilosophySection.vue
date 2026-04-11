<template>
  <section id="philosophy" class="relative py-28 md:py-44 bg-stone-100 overflow-hidden">

    <!-- Large decorative serif letter -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] font-serif text-[28rem] leading-none text-stone-900 pointer-events-none select-none pr-8">
      M
    </div>

    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <!-- Top rule + label -->
      <div class="flex items-center gap-6 mb-20 reveal">
        <div class="h-px flex-1 bg-stone-300 line-draw" />
        <span class="text-stone-400 text-[0.68rem] tracking-[0.3em] uppercase font-sans flex-shrink-0">
          {{ t('philosophy.eyebrow') }}
        </span>
        <div class="h-px flex-1 bg-stone-300 line-draw" />
      </div>

      <!-- Central quote block -->
      <div class="max-w-4xl mx-auto text-center">
        <p class="font-serif-italic text-[clamp(1.8rem,4vw,3.2rem)] text-stone-800 leading-[1.25] tracking-[-0.01em] reveal d-100">
          "{{ t('philosophy.quoteBody') }}
          <span class="text-gold-DEFAULT">{{ t('philosophy.quoteHighlight') }}</span>"
        </p>

        <div class="flex items-center justify-center gap-6 mt-10 reveal d-300">
          <div class="h-px w-16 bg-gold-DEFAULT line-draw" />
          <div class="flex flex-col items-center gap-1">
            <span class="font-serif text-stone-700 text-[1rem]">Aleksandra Wierzbicka</span>
            <span class="font-sans font-light text-stone-400 text-[0.75rem] tracking-[0.1em] uppercase">{{ t('philosophy.authorTitle') }}</span>
          </div>
          <div class="h-px w-16 bg-gold-DEFAULT line-draw" />
        </div>
      </div>

      <!-- Three pillars -->
      <div class="grid md:grid-cols-3 gap-12 md:gap-8 mt-28 border-t border-stone-200 pt-16">
        <div
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          class="reveal"
          :class="`d-${(i + 1) * 100}`"
        >
          <!-- Roman numeral -->
          <span class="block font-serif-italic text-gold-DEFAULT/40 text-[4rem] leading-none mb-4 select-none">
            {{ pillar.roman }}
          </span>
          <h3 class="font-serif text-stone-900 text-[1.4rem] mb-3 leading-snug">{{ pillar.title }}</h3>
          <div class="h-px w-8 bg-gold-DEFAULT mb-4 line-draw" />
          <p class="font-sans font-light text-stone-500 text-[0.9rem] leading-[1.8]">{{ pillar.desc }}</p>
        </div>
      </div>

      <!-- Bottom rule -->
      <div class="h-px bg-stone-200 mt-20 line-draw reveal d-400" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const ROMANS = ['I.', 'II.', 'III.']
const pillars = computed(() =>
  ((tm('philosophy.pillars') as Array<{ title: string; desc: string }>) ?? []).map((p, i) => ({
    ...p,
    roman: ROMANS[i],
  }))
)
</script>
