<template>
  <!-- Fixed wrapper — full width, z-20 -->
  <header class="fixed top-0 left-0 right-0 z-20 flex justify-center pt-5 px-4 pointer-events-none">

    <!-- Liquid-glass pill -->
    <nav
      class="pointer-events-auto w-full max-w-5xl px-6 py-3 rounded-full glass flex items-center justify-between animate-nav-in"
    >
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 no-underline group">
        <span class="font-serif text-white text-lg tracking-wide leading-none">Maison</span>
        <span class="font-serif-italic text-gold-DEFAULT text-lg leading-none">&</span>
        <span class="font-serif text-white text-lg tracking-wide leading-none">Co.</span>
      </NuxtLink>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8 list-none">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="relative text-[0.8rem] text-white/70 no-underline tracking-[0.08em] uppercase hover:text-white transition-colors duration-300 group"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-gold-DEFAULT transition-all duration-300 group-hover:w-full"
            />
          </a>
        </li>
      </ul>

      <!-- Desktop right: language switcher + CTA -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Language switcher -->
        <div ref="langDropdownEl" class="relative">
          <button
            class="flex items-center gap-1 text-[0.78rem] text-white/70 tracking-[0.1em] uppercase hover:text-white transition-colors duration-300 cursor-pointer bg-transparent border-none"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            @click="langOpen = !langOpen"
          >
            {{ locale.toUpperCase() }}
            <span class="text-[0.6rem] transition-transform duration-200" :class="langOpen ? 'rotate-180' : ''">▾</span>
          </button>
          <Transition name="dropdown">
            <div
              v-if="langOpen"
              class="absolute top-full right-0 mt-3 bg-stone-900/95 backdrop-blur-md rounded-xl py-1 min-w-[130px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10"
            >
              <NuxtLink
                v-for="loc in locales"
                :key="loc.code"
                :to="switchLocalePath(loc.code)"
                class="flex items-center justify-between px-4 py-2 text-[0.78rem] tracking-[0.08em] uppercase no-underline transition-colors duration-200"
                :class="loc.code === locale ? 'text-gold-DEFAULT' : 'text-white/60 hover:text-white'"
                @click="langOpen = false"
              >
                {{ loc.name }}
                <span v-if="loc.code === locale" class="text-gold-DEFAULT text-[0.6rem]">✓</span>
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- CTA -->
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-5 py-[9px] rounded-full text-[0.78rem] tracking-[0.1em] uppercase text-stone-950 bg-gold-DEFAULT font-medium no-underline transition-all duration-300 hover:bg-gold-light hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(184,154,106,0.4)]"
        >
          {{ t('nav.cta') }}
        </a>
      </div>

      <!-- Mobile burger -->
      <button
        class="md:hidden flex flex-col gap-[5px] p-1 border-none bg-transparent cursor-pointer"
        :aria-label="t('nav.menuAriaLabel')"
        @click="open = !open"
      >
        <span v-for="i in 3" :key="i"
              class="block w-5 h-[1px] bg-white/80 transition-all duration-300"
              :class="open && i === 2 ? 'opacity-0' : ''"
        />
      </button>
    </nav>
  </header>

  <!-- Mobile drawer -->
  <Transition name="drawer">
    <div
      v-if="open"
      class="fixed inset-0 z-10 glass-dark flex flex-col items-center justify-center gap-10 md:hidden"
    >
      <a
        v-for="link in links" :key="link.href"
        :href="link.href"
        class="font-serif text-3xl text-white no-underline hover:text-gold-DEFAULT transition-colors duration-300"
        @click="open = false"
      >
        {{ link.label }}
      </a>

      <!-- Mobile language switcher -->
      <div class="flex items-center gap-3 mt-2">
        <NuxtLink
          v-for="loc in locales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          class="px-4 py-2 rounded-full text-[0.78rem] tracking-[0.1em] uppercase no-underline transition-all duration-300"
          :class="loc.code === locale
            ? 'bg-gold-DEFAULT text-stone-950 font-medium'
            : 'border border-white/20 text-white/60 hover:border-gold-DEFAULT hover:text-gold-DEFAULT'"
          @click="open = false"
        >
          {{ loc.name }}
        </NuxtLink>
      </div>

      <a
        href="#contact"
        class="mt-4 px-8 py-3 rounded-full bg-gold-DEFAULT text-stone-950 text-sm font-medium no-underline uppercase tracking-wider"
        @click="open = false"
      >
        {{ t('nav.cta') }}
      </a>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const links = computed(() => [
  { label: t('nav.about'),       href: '#about' },
  { label: t('nav.properties'),  href: '#video' },
  { label: t('nav.philosophy'),  href: '#philosophy' },
  { label: t('nav.services'),    href: '#services' },
])

const open = ref(false)

// Language dropdown
const langOpen = ref(false)
const langDropdownEl = ref<HTMLElement | null>(null)

onClickOutside(langDropdownEl, () => { langOpen.value = false })

const route = useRoute()
watch(() => route.fullPath, () => { langOpen.value = false })

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') langOpen.value = false
})
</script>

<style scoped>
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s ease; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
