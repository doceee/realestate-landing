export function useSectionObserver(sectionIds: string[]) {
	let obs: IntersectionObserver | null = null;

	onMounted(() => {
		obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const id = entry.target.id;
					const base = window.location.pathname;
					const next = id === 'hero' ? base : `${base}#${id}`;
					history.replaceState(null, '', next);
				});
			},
			{ rootMargin: '-50% 0px -50% 0px', threshold: 0 }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) obs!.observe(el);
		});
	});

	onUnmounted(() => obs?.disconnect());
}
