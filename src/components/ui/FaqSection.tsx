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
									className={`flex w-full justify-between items-center gap-4 px-6 py-5 text-left font-mono text-lg font-medium text-chocolate-900 cursor-pointer transition-colors duration-100 ${open ? "bg-raspberry-100/60" : "bg-surface hover:bg-raspberry-100/50"}`}
								>
									<span>{faq.q}</span>
									<span
										className={`rounded-full border p-0.5 shrink-0 transition-transform duration-200 ${open ? "rotate-45 bg-raspberry-800 text-cream-50 border-raspberry-800" : "bg-surface text-chocolate-900 border-chocolate-900"}`}
									>
										{open ? (
											<MinusIcon className="h-4 w-4 text-current" />
										) : (
											<PlusIcon className="h-4 w-4 text-current" />
										)}
									</span>
								</DisclosureButton>
								<DisclosurePanel className="px-6 pb-5 pt-4 font-sans font-light text-sm text-chocolate-900/80 leading-relaxed border-t border-nb-line bg-surface/60">
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
