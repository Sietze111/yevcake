import { useTranslation } from "react-i18next";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";

export const FaqSection = (): FunctionComponent => {
	const { t } = useTranslation();

	const faqs = [
		{ q: t("faq.q1"), a: t("faq.a1") },
		{ q: t("faq.q2"), a: t("faq.a2") },
		{ q: t("faq.q3"), a: t("faq.a3") },
		{ q: t("faq.q4"), a: t("faq.a4") },
	];

	return (
		<div className="w-full max-w-3xl mx-auto space-y-4">
			{faqs.map((faq, index) => (
				<Disclosure
					key={index}
					as="div"
					className="glass-panel rounded-2xl border border-brand-gold/15 overflow-hidden transition-all duration-200"
				>
					{({ open }) => (
						<>
							<DisclosureButton className="flex w-full justify-between items-center px-6 py-5 text-left font-serif text-base sm:text-lg font-semibold text-brand-dark hover:bg-brand-champagne/20 transition-all duration-300 cursor-pointer">
								<span>{faq.q}</span>
								<ChevronDownIcon
									className={`h-5 w-5 text-brand-accent transition-transform duration-300 ${
										open ? "transform rotate-180" : ""
									}`}
								/>
							</DisclosureButton>
							<DisclosurePanel className="px-6 pb-5 pt-1 font-sans text-sm text-brand-dark/75 leading-relaxed border-t border-brand-gold/5">
								{faq.a}
							</DisclosurePanel>
						</>
					)}
				</Disclosure>
			))}
		</div>
	);
};
