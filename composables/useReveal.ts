export function useReveal() {
	const revealAll = () => {
		const els = document.querySelectorAll(
			'.reveal, .reveal-fade, .reveal-scale, .line-draw'
		);
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('show');
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08 }
		);
		els.forEach((el) => obs.observe(el));
		return obs;
	};
	return { revealAll };
}
