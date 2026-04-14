<template>
	<section
		id="contact"
		class="relative overflow-hidden bg-stone-950 py-20 xs:py-24 md:py-40"
	>
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.03]"
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 800 600"
				fill="none"
				class="h-full w-full"
				preserveAspectRatio="xMidYMid slice"
			>
				<circle
					cx="700"
					cy="100"
					r="300"
					stroke="#b89a6a"
					stroke-width="1"
				/>
				<circle
					cx="700"
					cy="100"
					r="200"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
				<circle
					cx="700"
					cy="100"
					r="100"
					stroke="#b89a6a"
					stroke-width="0.5"
				/>
			</svg>
		</div>

		<div class="relative mx-auto max-w-7xl px-4 xs:px-5 md:px-12">
			<div class="grid gap-16 md:grid-cols-2 md:gap-24">
				<div>
					<div class="reveal mb-6 flex items-center gap-4">
						<div class="line-draw h-px w-10 bg-gold-light/40" />
						<span
							class="font-sans text-[0.68rem] uppercase tracking-[0.25em] text-white/60"
						>
							{{ t('contact.eyebrow') }}
						</span>
					</div>

					<h2 class="reveal d-100 mb-6">
						<span
							class="block font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white"
						>
							{{ t('contact.headline1') }}
						</span>
						<span
							class="text-gold-gradient font-serif-italic block text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
						>
							{{ t('contact.headline2') }}
						</span>
					</h2>

					<div class="line-draw reveal d-200 mb-8 h-px bg-white/10" />

					<p
						class="reveal d-200 font-sans text-[1rem] font-light leading-[1.8] text-white/50"
					>
						{{ t('contact.sub') }}
					</p>
				</div>

				<div class="reveal d-200">
					<transition name="fade" mode="out-in">
						<form
							v-if="!sent"
							key="form"
							class="flex flex-col gap-5"
							@submit.prevent="handleSubmit"
						>
							<label for="contact-name" class="sr-only">
								{{ t('contact.namePlaceholder') }}
							</label>
							<input
								id="contact-name"
								v-model="form.name"
								type="text"
								required
								:placeholder="t('contact.namePlaceholder')"
								:aria-label="t('contact.namePlaceholder')"
								class="w-full rounded-sm border border-white/10 bg-white/5 px-5 py-4 font-sans text-[0.9rem] text-white placeholder-white/50 outline-none transition-colors duration-200 focus:border-gold-light/50 focus:bg-white/10"
							/>
							<label for="contact-email" class="sr-only">
								{{ t('contact.emailPlaceholder') }}
							</label>
							<input
								id="contact-email"
								v-model="form.email"
								type="email"
								required
								:placeholder="t('contact.emailPlaceholder')"
								:aria-label="t('contact.emailPlaceholder')"
								class="w-full rounded-sm border border-white/10 bg-white/5 px-5 py-4 font-sans text-[0.9rem] text-white placeholder-white/50 outline-none transition-colors duration-200 focus:border-gold-light/50 focus:bg-white/10"
							/>
							<label for="contact-message" class="sr-only">
								{{ t('contact.messagePlaceholder') }}
							</label>
							<textarea
								id="contact-message"
								v-model="form.message"
								rows="5"
								required
								:placeholder="t('contact.messagePlaceholder')"
								:aria-label="t('contact.messagePlaceholder')"
								class="w-full resize-none rounded-sm border border-white/10 bg-white/5 px-5 py-4 font-sans text-[0.9rem] text-white placeholder-white/50 outline-none transition-colors duration-200 focus:border-gold-light/50 focus:bg-white/10"
							/>
							<button
								type="submit"
								class="group inline-flex items-center gap-3 self-start rounded-full bg-gold-dark px-8 py-4 font-sans text-[0.85rem] font-medium uppercase tracking-[0.08em] text-stone-950 transition-all duration-300 hover:shadow-[0_6px_24px_rgba(184,154,106,0.4)]"
							>
								{{ t('contact.submit') }}
								<span
									class="transition-transform duration-300 group-hover:translate-x-1"
								>
									→
								</span>
							</button>
						</form>

						<div
							v-else
							key="success"
							class="flex flex-col justify-center gap-4 py-12"
						>
							<span class="font-serif text-[1.5rem] text-white">
								{{ t('contact.successTitle') }}
							</span>
							<p
								class="font-sans text-[0.9rem] font-light text-white/50"
							>
								{{ t('contact.successSub') }}
							</p>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n();

	const form = reactive({ name: '', email: '', message: '' });
	const sent = ref(false);

	function handleSubmit() {
		const subject = encodeURIComponent(`Inquiry from ${form.name}`);
		const body = encodeURIComponent(
			`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
		);
		window.location.href = `mailto:${form.email}?subject=${subject}&body=${body}`;
		sent.value = true;
	}
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
