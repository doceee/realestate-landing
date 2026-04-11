<template>
  <div class="bg-stone-50">
    <!-- Fixed liquid-glass navbar -->
    <AppNav />

    <main>
      <!-- 1. Hero — full-screen video background -->
      <HeroSection />

      <!-- 2. About — split layout -->
      <AboutSection />

      <!-- 3. Featured Video — dark bg, elegant player -->
      <FeaturedVideoSection />

      <!-- 4. Philosophy — editorial quote + three pillars -->
      <PhilosophySection />

      <!-- 5. Services — hover grid -->
      <ServicesSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title:         () => t('seo.title'),
  description:   () => t('seo.description'),
  ogTitle:       () => t('seo.title'),
  ogDescription: () => t('seo.description'),
})

const { revealAll } = useReveal()

onMounted(() => revealAll())
</script>
