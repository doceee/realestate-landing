<template>
  <section id="services" class="relative py-28 md:py-40 bg-stone-50 overflow-hidden">

    <div class="max-w-7xl mx-auto px-6 md:px-12">

      <!-- Header -->
      <div class="grid md:grid-cols-2 gap-12 md:gap-24 items-end mb-20">
        <div>
          <div class="flex items-center gap-4 mb-6 reveal">
            <div class="h-px w-10 bg-gold-DEFAULT line-draw" />
            <span class="text-gold-DEFAULT text-[0.68rem] tracking-[0.25em] uppercase font-sans">{{ t('services.eyebrow') }}</span>
          </div>
          <h2 class="reveal d-100">
            <span class="block font-serif text-[clamp(2rem,4vw,3.5rem)] text-stone-900 leading-[1.1]">{{ t('services.headline1') }}</span>
            <span class="block font-serif-italic text-[clamp(2rem,4vw,3.5rem)] text-gold-DEFAULT leading-[1.1]">{{ t('services.headline2') }}</span>
          </h2>
        </div>
        <p class="font-sans font-light text-stone-500 text-[1rem] leading-[1.8] md:pb-3 reveal d-200">
          {{ t('services.subtext') }}
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-stone-200">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="group relative bg-stone-50 p-8 md:p-10 overflow-hidden cursor-default transition-colors duration-500 hover:bg-stone-900 reveal"
          :class="`d-${Math.min((i + 1) * 100, 600)}`"
        >
          <!-- Hover gold line top -->
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-DEFAULT scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          <!-- Number -->
          <span class="block font-serif-italic text-stone-200 text-[5rem] leading-none mb-6 select-none transition-colors duration-500 group-hover:text-stone-800">
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <!-- Icon line -->
          <div class="w-8 h-px bg-gold-DEFAULT mb-5 transition-all duration-500 group-hover:w-14" />

          <h3 class="font-serif text-stone-900 text-[1.25rem] mb-3 leading-snug transition-colors duration-500 group-hover:text-white">
            {{ service.title }}
          </h3>
          <p class="font-sans font-light text-stone-500 text-[0.88rem] leading-[1.7] transition-colors duration-500 group-hover:text-stone-300">
            {{ service.desc }}
          </p>

          <!-- Learn more arrow -->
          <div class="mt-8 flex items-center gap-2 text-gold-DEFAULT text-[0.75rem] tracking-[0.1em] uppercase font-sans opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {{ t('services.learnMore') }}
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-stone-200 reveal d-400">
        <div>
          <p class="font-serif text-stone-900 text-[1.5rem] leading-snug">
            {{ t('services.ctaTitle') }} <span class="font-serif-italic text-gold-DEFAULT">{{ t('services.ctaHighlight') }}</span>
          </p>
          <p class="font-sans font-light text-stone-500 text-[0.9rem] mt-2">
            {{ t('services.ctaSub') }}
          </p>
        </div>
        <a
          href="#contact"
          class="flex-shrink-0 group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold-DEFAULT text-gold-DEFAULT text-[0.85rem] font-medium tracking-[0.08em] uppercase no-underline transition-all duration-300 hover:bg-gold-DEFAULT hover:text-stone-950 hover:shadow-[0_6px_24px_rgba(184,154,106,0.3)]"
        >
          {{ t('services.ctaBtn') }}
          <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const services = computed(() => tm('services.items') as Array<{ title: string; desc: string }>)
</script>
