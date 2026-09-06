import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";
import { CONTACT } from "../../common/constants";

const SCROLL_THRESHOLD_PX = 200;

export const WhatsAppButton = (): FunctionComponent => {
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

	return (
		<a
			aria-label={t("contact.whatsapp")}
			href={CONTACT.whatsappHref}
			rel="noreferrer"
			tabIndex={isVisible ? 0 : -1}
			target="_blank"
			className={`fixed left-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-raspberry-800 bg-raspberry-800 text-cream-50 shadow-[0_20px_60px_rgba(50,23,13,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-chocolate-950 hover:border-chocolate-950 ${
				isVisible ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
		>
			<ChatBubbleLeftRightIcon aria-hidden="true" className="h-6 w-6" />
		</a>
	);
};
