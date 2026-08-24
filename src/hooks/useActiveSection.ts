import { useEffect, useState } from "react";

export const useActiveSection = (sectionIds: Array<string>): string => {
	const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b): number => b.intersectionRatio - a.intersectionRatio)[0];

				if (visible) {
					setActiveId(visible.target.id);
				}
			},
			{ rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
		);

		for (const id of sectionIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return (): void => {
			observer.disconnect();
		};
	}, [sectionIds]);

	return activeId;
};
