<template>
  <section id="about" class="relative py-28 md:py-40 bg-stone-50 overflow-hidden">

    <!-- Background texture mark -->
    <div class="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
      <svg viewBox="0 0 400 400" fill="none" class="w-full h-full">
        <circle cx="200" cy="200" r="190" stroke="#b89a6a" stroke-width="1"/>
        <circle cx="200" cy="200" r="140" stroke="#b89a6a" stroke-width="0.5"/>
        <circle cx="200" cy="200" r="90"  stroke="#b89a6a" stroke-width="0.5"/>
        <line x1="10"  y1="200" x2="390" y2="200" stroke="#b89a6a" stroke-width="0.5"/>
        <line x1="200" y1="10"  x2="200" y2="390" stroke="#b89a6a" stroke-width="0.5"/>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        <!-- Left: image collage -->
        <div class="relative reveal reveal-scale">
          <!-- Main image placeholder with elegant frame -->
          <div class="relative aspect-[3/4] rounded-sm overflow-hidden img-zoom bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80"
              alt="Luxury interior"
              class="w-full h-full object-cover"
            />
            <!-- Gold frame accent -->
            <div class="absolute inset-3 border border-gold-DEFAULT/30 rounded-sm pointer-events-none" />
          </div>

          <!-- Floating accent card -->
          <div
            class="absolute -right-6 bottom-16 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] rounded-sm p-5 max-w-[180px] reveal d-300"
          >
            <span class="block font-serif text-[2.5rem] text-gold-DEFAULT leading-none">16</span>
            <span class="block text-stone-500 text-[0.72rem] tracking-[0.1em] uppercase mt-1 font-sans">{{ t('about.yearsLabel') }}</span>
          </div>

          <!-- Dot accent -->
          <div class="absolute -left-4 top-12 w-24 h-24 opacity-20">
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#b89a6a"/>
              </pattern>
              <rect width="100" height="100" fill="url(#dots)"/>
            </svg>
          </div>
        </div>

        <!-- Right: text -->
        <div>
          <!-- Eyebrow -->
          <div class="flex items-center gap-4 mb-6 reveal">
            <div class="h-px w-10 bg-gold-DEFAULT line-draw" />
            <span class="text-gold-DEFAULT text-[0.68rem] tracking-[0.25em] uppercase font-sans">{{ t('about.eyebrow') }}</span>
          </div>

          <h2 class="mb-6 reveal d-100">
            <span class="block font-serif text-[clamp(2rem,4vw,3.5rem)] text-stone-900 leading-[1.1]">{{ t('about.headline1') }}</span>
            <span class="block font-serif-italic text-[clamp(2rem,4vw,3.5rem)] text-gold-DEFAULT leading-[1.1]">{{ t('about.headline2') }}</span>
          </h2>

          <div class="h-px bg-stone-200 line-draw mb-8 reveal d-200" />

          <p class="font-sans font-light text-stone-600 text-[1rem] leading-[1.8] mb-6 reveal d-200">
            {{ t('about.p1') }}
          </p>
          <p class="font-sans font-light text-stone-600 text-[1rem] leading-[1.8] mb-10 reveal d-300">
            {{ t('about.p2') }}
          </p>

          <!-- Values list -->
          <ul class="flex flex-col gap-4 reveal d-400">
            <li v-for="val in values" :key="val.title"
                class="flex items-start gap-4 group">
              <span class="mt-[5px] w-[6px] h-[6px] rounded-full bg-gold-DEFAULT flex-shrink-0 transition-transform duration-300 group-hover:scale-150" />
              <div>
                <span class="font-serif text-stone-900 text-[1rem]">{{ val.title }}</span>
                <span class="text-stone-400 mx-2">—</span>
                <span class="font-sans font-light text-stone-500 text-[0.9rem]">{{ val.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const values = computed(() =>
  Array.from({ length: 3 }, (_, i) => ({
    title: t(`about.values[${i}].title`),
    desc:  t(`about.values[${i}].desc`),
  }))
)
</script>
