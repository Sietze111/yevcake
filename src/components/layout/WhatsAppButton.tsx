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
			className={`fixed left-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-nb-line bg-nb-mint text-nb-black shadow-[0_8px_20px_rgba(61,43,31,0.12)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(61,43,31,0.24)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(61,43,31,0.2)] ${
				isVisible ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
		>
			<ChatBubbleLeftRightIcon aria-hidden="true" className="h-6 w-6" />
		</a>
	);
};
