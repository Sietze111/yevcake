import { useTranslation } from "react-i18next";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
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
		<div className="w-full max-w-3xl space-y-3">
			{faqs.map((faq, index) => (
				<Disclosure
					key={index}
					as="div"
					className="border-3 border-nb-black shadow-[4px_4px_0px_0px_#0D0D0D]"
				>
					{({ open }) => (
						<>
							<DisclosureButton className={`flex w-full justify-between items-center px-6 py-5 text-left font-mono text-sm font-bold text-nb-black uppercase tracking-wide cursor-pointer transition-colors duration-100 ${open ? "bg-nb-yellow" : "bg-nb-white hover:bg-nb-yellow"}`}>
								<span>{faq.q}</span>
								{open ? (
									<MinusIcon className="h-5 w-5 text-nb-black flex-shrink-0" />
								) : (
									<PlusIcon className="h-5 w-5 text-nb-black flex-shrink-0" />
								)}
							</DisclosureButton>
							<DisclosurePanel className="px-6 pb-5 pt-4 font-sans text-sm text-nb-black/80 leading-relaxed border-t-2 border-nb-black bg-nb-cream">
								{faq.a}
							</DisclosurePanel>
						</>
					)}
				</Disclosure>
			))}
		</div>
	);
};
