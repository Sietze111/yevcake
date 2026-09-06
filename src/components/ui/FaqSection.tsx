import { useTranslation } from "react-i18next";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";

export const FaqSection = (): FunctionComponent => {
	const { t } = useTranslation();

	const faqs = [
		{ q: t("faq.q1"), a: t("faq.a1") },
		{ q: t("faq.q2"), a: t("faq.a2") },
		{ q: t("faq.q3"), a: t("faq.a3") },
		{ q: t("faq.q4"), a: t("faq.a4") },
	];

	return (
		<ContentSection id="faq">
			<SectionHeading tag={t("faq.title")} title={t("faq.subtitle")} />
			<div className="w-full max-w-3xl space-y-3">
				{faqs.map((faq, index) => (
					<Disclosure key={index} as="div" className="nb-card overflow-hidden">
						{({ open }) => (
							<>
								<DisclosureButton
									className={`flex w-full justify-between items-center gap-4 px-6 py-5 text-left font-mono text-sm font-semibold text-nb-black cursor-pointer transition-colors duration-100 ${open ? "bg-nb-yellow/30" : "bg-nb-white hover:bg-nb-yellow/20"}`}
								>
									<span>{faq.q}</span>
									<span
										className={`rounded-full border border-nb-black p-0.5 shrink-0 transition-transform duration-200 ${open ? "rotate-45 bg-nb-yellow" : "bg-nb-white"}`}
									>
										{open ? (
											<MinusIcon className="h-4 w-4 text-nb-black" />
										) : (
											<PlusIcon className="h-4 w-4 text-nb-black" />
										)}
									</span>
								</DisclosureButton>
								<DisclosurePanel className="px-6 pb-5 pt-4 font-sans font-light text-sm text-nb-black/80 leading-relaxed border-t border-nb-line bg-nb-cream/50">
									{faq.a}
								</DisclosurePanel>
							</>
						)}
					</Disclosure>
				))}
			</div>
		</ContentSection>
	);
};
