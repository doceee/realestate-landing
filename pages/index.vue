<template>
  <div class="bg-stone-50">
    <AppNav />

    <main>
      <HeroSection />

      <AboutSection />

      <FeaturedVideoSection />

      <PhilosophySection />

      <ServicesSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
});

const { revealAll } = useReveal();

onMounted(() => revealAll());
</script>
