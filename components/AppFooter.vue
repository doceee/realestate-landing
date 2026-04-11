<template>
  <footer class="bg-stone-950 text-white/40 py-12 px-6 md:px-12">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-2">
        <span class="font-serif text-white/70 text-lg">Maison</span>
        <span class="font-serif-italic text-gold-DEFAULT text-lg">&</span>
        <span class="font-serif text-white/70 text-lg">Co.</span>
      </div>
      <p class="text-[0.72rem] tracking-[0.1em] text-center">
        {{ t('footer.copyright', { year }) }}
      </p>
      <ul class="flex gap-6 list-none">
        <li v-for="l in links" :key="l">
          <a href="#" class="text-[0.72rem] tracking-wider uppercase hover:text-gold-DEFAULT transition-colors duration-200 no-underline">{{ l }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const year  = new Date().getFullYear()
const links = computed(() =>
  Array.from({ length: 3 }, (_, i) => t(`footer.links[${i}]`))
)
</script>
