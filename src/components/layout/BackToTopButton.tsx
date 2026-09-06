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
			className={`fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-nb-line bg-nb-yellow text-nb-black shadow-[0_8px_20px_rgba(61,43,31,0.12)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-nb-black hover:text-nb-yellow hover:shadow-[0_14px_30px_rgba(61,43,31,0.24)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(61,43,31,0.2)] ${
				isVisible ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
			onClick={scrollToTop}
		>
			<ArrowUpIcon aria-hidden="true" className="h-6 w-6" />
		</button>
	);
};
