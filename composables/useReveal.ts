import { onUnmounted } from 'vue';

export function useReveal() {
	let obs: IntersectionObserver | null = null;

	const revealAll = () => {
		const els = document.querySelectorAll(
			'.reveal, .reveal-fade, .reveal-scale, .line-draw'
		);
		obs?.disconnect();
		obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('show');
						obs!.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08 }
		);
		els.forEach((el) => obs!.observe(el));
	};

	onUnmounted(() => obs?.disconnect());

	return { revealAll };
}
