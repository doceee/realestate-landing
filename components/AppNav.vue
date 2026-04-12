<template>
	<header
		class="pointer-events-none fixed left-0 right-0 top-0 z-30 flex justify-center px-4 pt-5"
	>
		<nav
			class="pointer-events-auto flex w-full max-w-5xl animate-nav-in items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
			:class="scrolled ? 'glass-dark' : 'glass'"
		>
			<nuxt-link
				:to="localePath('/')"
				class="group flex items-center gap-2 no-underline"
			>
				<span
					class="font-serif text-lg leading-none tracking-wide text-white"
				>
					Maison
				</span>
				<span class="text-lg leading-none font-serif-italic">&</span>
				<span
					class="font-serif text-lg leading-none tracking-wide text-white"
				>
					Co.
				</span>
			</nuxt-link>

			<ul class="hidden list-none items-center gap-8 md:flex">
				<li v-for="link in links" :key="link.href">
					<nuxt-link
						:to="link.href"
						class="group relative text-[0.8rem] uppercase tracking-[0.08em] text-white/70 no-underline transition-colors duration-300 hover:text-white"
					>
						{{ link.label }}
						<span
							class="absolute -bottom-[2px] left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
						/>
					</nuxt-link>
				</li>
			</ul>

			<div class="hidden items-center gap-4 md:flex">
				<div ref="langDropdownEl" class="relative">
					<button
						class="flex cursor-pointer items-center gap-1 border-none bg-transparent text-[0.78rem] uppercase tracking-[0.1em] text-white/70 transition-colors duration-300 hover:text-white"
						:aria-expanded="langOpen"
						aria-haspopup="listbox"
						@click="langOpen = !langOpen"
					>
						{{ locale.toUpperCase() }}
						<span
							class="text-[0.6rem] transition-transform duration-200"
							:class="langOpen ? 'rotate-180' : ''"
						>
							▾
						</span>
					</button>
					<transition name="dropdown">
						<div
							v-if="langOpen"
							class="absolute right-0 top-full mt-3 min-w-[130px] rounded-xl border border-white/10 bg-stone-900/95 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md"
						>
							<nuxt-link
								v-for="loc in locales"
								:key="loc.code"
								:to="switchLocalePath(loc.code)"
								class="flex items-center justify-between px-4 py-2 text-[0.78rem] uppercase tracking-[0.08em] no-underline transition-colors duration-200"
								:class="
									loc.code === locale
										? 'text-gold-light'
										: 'text-white/60 hover:text-white'
								"
								@click="langOpen = false"
							>
								{{ loc.name }}
								<span
									v-if="loc.code === locale"
									class="text-[0.6rem]"
								>
									✓
								</span>
							</nuxt-link>
						</div>
					</transition>
				</div>

				<a
					href="#"
					class="inline-flex items-center gap-2 rounded-full bg-gold-light px-5 py-[9px] text-[0.78rem] font-medium uppercase tracking-[0.1em] text-stone-950 no-underline transition-all duration-300 hover:shadow-[0_4px_20px_rgba(184,154,106,0.4)]"
				>
					{{ t('nav.cta') }}
				</a>
			</div>

			<button
				class="flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1 md:hidden"
				:aria-label="t('nav.menuAriaLabel')"
				@click="open = !open"
			>
				<span
					v-for="i in 3"
					:key="i"
					class="block h-[1px] w-5 origin-center bg-white/80 transition-all duration-300"
					:class="{
						'translate-y-[6px] rotate-45': open && i === 1,
						'opacity-0': open && i === 2,
						'-translate-y-[6px] -rotate-45': open && i === 3,
					}"
				/>
			</button>
		</nav>
	</header>

	<transition name="drawer">
		<div
			v-if="open"
			class="fixed inset-0 z-20 flex flex-col items-center justify-center gap-10 glass-dark md:hidden"
		>
			<nuxt-link
				v-for="link in links"
				:key="link.href"
				:to="link.href"
				class="font-serif text-3xl text-white no-underline transition-colors duration-300"
				@click="open = false"
			>
				{{ link.label }}
			</nuxt-link>

			<div class="mt-2 flex items-center gap-3">
				<nuxt-link
					v-for="loc in locales"
					:key="loc.code"
					:to="switchLocalePath(loc.code)"
					class="rounded-full px-4 py-2 text-[0.78rem] uppercase tracking-[0.1em] text-white/60 no-underline transition-all duration-300"
					:class="
						loc.code === locale
							? 'font-medium'
							: 'border border-white/20'
					"
					@click="
						loc.code === locale
							? () => {}
							: () => {
									open = false;
								}
					"
				>
					{{ loc.name }}
				</nuxt-link>
			</div>

			<a
				href="#"
				class="inline-flex items-center gap-2 rounded-full bg-gold-light px-5 py-[9px] text-[0.78rem] font-medium uppercase tracking-[0.1em] text-stone-950 no-underline transition-all duration-300 hover:shadow-[0_4px_20px_rgba(184,154,106,0.4)]"
				@click="open = false"
			>
				{{ t('nav.cta') }}
			</a>
		</div>
	</transition>
</template>

<script setup lang="ts">
	const { t, locale, locales } = useI18n();
	const switchLocalePath = useSwitchLocalePath();
	const localePath = useLocalePath();

	const links = computed(() => [
		{ label: t('nav.about'), href: '#about' },
		{ label: t('nav.properties'), href: '#video' },
		{ label: t('nav.philosophy'), href: '#philosophy' },
		{ label: t('nav.services'), href: '#services' },
	]);

	const open = ref(false);

	const scrolled = ref(false);
	onMounted(() => {
		scrolled.value = window.scrollY > 60;
	});
	useEventListener(
		'scroll',
		() => {
			scrolled.value = window.scrollY > 60;
		},
		{ passive: true }
	);

	const langOpen = ref(false);
	const langDropdownEl = ref<HTMLElement | null>(null);

	onClickOutside(langDropdownEl, () => {
		langOpen.value = false;
	});

	const route = useRoute();
	watch(
		() => route.fullPath,
		() => {
			langOpen.value = false;
		}
	);

	useEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === 'Escape') langOpen.value = false;
	});
</script>

<style scoped>
	.drawer-enter-active,
	.drawer-leave-active {
		transition: opacity 0.3s ease;
	}
	.drawer-enter-from,
	.drawer-leave-to {
		opacity: 0;
	}

	.dropdown-enter-active,
	.dropdown-leave-active {
		transition:
			opacity 0.15s ease,
			transform 0.15s ease;
	}
	.dropdown-enter-from,
	.dropdown-leave-to {
		opacity: 0;
		transform: translateY(-6px);
	}
</style>
