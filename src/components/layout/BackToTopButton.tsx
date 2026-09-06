import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

import type { FunctionComponent } from "../../common/types";

const SCROLL_THRESHOLD_PX = 400;

export const BackToTopButton = (): FunctionComponent => {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = (): void => {
			setIsVisible(window.scrollY > SCROLL_THRESHOLD_PX);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return (): void => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToTop = (): void => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? "auto" : "smooth",
		});
	};

	return (
		<button
			aria-label={t("backToTop.label")}
			tabIndex={isVisible ? 0 : -1}
			type="button"
			className={`fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-chocolate-950 bg-chocolate-950 text-cream-50 shadow-[0_20px_60px_rgba(50,23,13,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-raspberry-800 hover:border-raspberry-800 ${
				isVisible ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
			onClick={scrollToTop}
		>
			<ArrowUpIcon aria-hidden="true" className="h-6 w-6" />
		</button>
	);
};
