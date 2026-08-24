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
			className={`fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center border-3 border-nb-black bg-nb-yellow text-nb-black shadow-[4px_4px_0px_0px_#0D0D0D] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-nb-black hover:text-nb-yellow hover:shadow-[6px_6px_0px_0px_#0D0D0D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0D0D0D] ${
				isVisible ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
			onClick={scrollToTop}
		>
			<ArrowUpIcon aria-hidden="true" className="h-6 w-6" />
		</button>
	);
};
