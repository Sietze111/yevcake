import { useTranslation } from "react-i18next";
import { CheckIcon } from "@heroicons/react/24/solid";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";
import { useInquiryStore, type OccasionValue } from "../../store/inquiryStore";
import { PriceEstimator } from "./PriceEstimator";

type TierKey = "wedding" | "celebration" | "bento" | "cupcakes";

interface PricingTier {
	key: TierKey;
	bg: string;
	unitKey: "prices.perPortion" | "common.perCake" | "common.perPiece";
	popular: boolean;
	occasion: OccasionValue;
}

const TIERS: Array<PricingTier> = [
	{
		key: "wedding",
		bg: "bg-nb-yellow",
		unitKey: "prices.perPortion",
		popular: true,
		occasion: "wedding",
	},
	{
		key: "celebration",
		bg: "bg-nb-mint",
		unitKey: "prices.perPortion",
		popular: false,
		occasion: "birthday",
	},
	{
		key: "bento",
		bg: "bg-nb-pink",
		unitKey: "common.perCake",
		popular: false,
		occasion: "bento",
	},
	{
		key: "cupcakes",
		bg: "bg-nb-peach",
		unitKey: "common.perPiece",
		popular: false,
		occasion: "other",
	},
];

const FEATURE_SLOTS: Array<"f1" | "f2" | "f3" | "f4"> = [
	"f1",
	"f2",
	"f3",
	"f4",
];

export const PriceGuideSection = (): FunctionComponent => {
	const { t } = useTranslation();
	const preselectOccasion = useInquiryStore((state) => state.preselectOccasion);

	return (
		<ContentSection id="prices">
			<SectionHeading
				tag={t("prices.title")}
				tagClassName="bg-nb-mint"
				title={t("prices.subtitle")}
			/>
			<div className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{TIERS.map((tier) => (
						<div
							key={tier.key}
							className={`border-3 border-nb-black shadow-[5px_5px_0px_0px_#0D0D0D] flex flex-col justify-between text-left relative hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0D0D0D] transition-all duration-150 ${tier.bg}`}
						>
							{tier.popular && (
								<div className="bg-nb-black text-nb-yellow font-mono text-[10px] font-bold uppercase tracking-widest text-center py-1.5 px-3">
									{t("common.mostRequested")}
								</div>
							)}
							<div className="p-6 space-y-5 flex-1">
								<div>
									<h4 className="font-mono text-lg font-bold text-nb-black uppercase">
										{t(`prices.${tier.key}.name`)}
									</h4>
									<p className="font-sans text-xs text-nb-black/70 mt-2 leading-relaxed">
										{t(`prices.${tier.key}.desc`)}
									</p>
								</div>
								<div className="flex items-baseline gap-1 border-y-2 border-nb-black py-3">
									<span className="font-mono text-[10px] text-nb-black/60 uppercase">
										{t("prices.startingFrom")}
									</span>
									<span className="font-mono text-3xl font-bold text-nb-black">
										{t(`prices.${tier.key}.price`)}
									</span>
									<span className="font-mono text-[10px] text-nb-black/60">
										/ {t(tier.unitKey)}
									</span>
								</div>
								<ul className="space-y-2.5">
									{FEATURE_SLOTS.map((slot) => (
										<li
											key={slot}
											className="flex gap-2 items-start text-xs font-sans text-nb-black/80"
										>
											<CheckIcon className="h-4 w-4 text-nb-black flex-shrink-0 mt-0.5" />
											<span>{t(`prices.${tier.key}.${slot}`)}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="p-6 pt-0">
								<a
									className="nb-btn bg-nb-black text-nb-yellow w-full block text-center text-xs"
									href="#inquiry"
									onClick={() => {
										preselectOccasion(tier.occasion);
									}}
								>
									{t("common.inquireNow")}
								</a>
							</div>
						</div>
					))}
				</div>

				<PriceEstimator />

				<p className="font-mono text-xs text-nb-black/60 italic text-center max-w-xl mx-auto">
					{t("prices.note")}
				</p>
			</div>
		</ContentSection>
	);
};
