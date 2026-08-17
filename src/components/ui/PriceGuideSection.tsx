import { useTranslation } from "react-i18next";
import { CheckIcon } from "@heroicons/react/24/solid";
import type { FunctionComponent } from "../../common/types";

export const PriceGuideSection = (): FunctionComponent => {
	const { t } = useTranslation();

	const pricingTiers = [
		{
			name: t("prices.wedding.name"),
			desc: t("prices.wedding.desc"),
			price: t("prices.wedding.price"),
			unit: t("prices.perPortion"),
			bg: "bg-nb-yellow",
			features: [
				"Personal consultation & design sketch",
				"Cake tasting box included",
				"Delivery & setup at wedding venue in Bern",
				"Handmade sugar florals & custom toppers",
			],
			popular: true,
		},
		{
			name: t("prices.celebration.name"),
			desc: t("prices.celebration.desc"),
			price: t("prices.celebration.price"),
			unit: t("prices.perPortion"),
			bg: "bg-nb-mint",
			features: [
				"Custom themed designs & toppers",
				"All signature flavor selections",
				"Pickup or delivery options",
				"Optional gluten-free/lactose-free adaptation",
			],
			popular: false,
		},
		{
			name: t("prices.bento.name"),
			desc: t("prices.bento.desc"),
			price: t("prices.bento.price"),
			unit: "per cake",
			bg: "bg-nb-pink",
			features: [
				"Perfect 2-3 portions mini cake",
				"Custom frosting message or lettering",
				"Eco-friendly bento box packaging",
				"Includes candle & wooden spoon",
			],
			popular: false,
		},
		{
			name: t("prices.cupcakes.name"),
			desc: t("prices.cupcakes.desc"),
			price: t("prices.cupcakes.price"),
			unit: "per piece",
			bg: "bg-nb-peach",
			features: [
				"Minimum order: 6 pieces",
				"Decorated to match your event theme",
				"Premium fillings inside",
				"Stunning gift box packaging",
			],
			popular: false,
		},
	];

	return (
		<div className="space-y-8 max-w-7xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{pricingTiers.map((tier, index) => (
					<div
						key={index}
						className={`border-3 border-nb-black shadow-[5px_5px_0px_0px_#0D0D0D] flex flex-col justify-between text-left relative hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0D0D0D] transition-all duration-150 ${tier.bg}`}
					>
						{tier.popular && (
							<div className="bg-nb-black text-nb-yellow font-mono text-[10px] font-bold uppercase tracking-widest text-center py-1.5 px-3">
								★ Most Requested
							</div>
						)}
						<div className="p-6 space-y-5 flex-1">
							<div>
								<h4 className="font-mono text-lg font-bold text-nb-black uppercase">
									{tier.name}
								</h4>
								<p className="font-sans text-xs text-nb-black/70 mt-2 leading-relaxed">
									{tier.desc}
								</p>
							</div>
							<div className="flex items-baseline gap-1 border-y-2 border-nb-black py-3">
								<span className="font-mono text-[10px] text-nb-black/60 uppercase">
									{t("prices.startingFrom")}
								</span>
								<span className="font-mono text-3xl font-bold text-nb-black">
									{tier.price}
								</span>
								<span className="font-mono text-[10px] text-nb-black/60">
									/ {tier.unit}
								</span>
							</div>
							<ul className="space-y-2.5">
								{tier.features.map((feature, index_) => (
									<li
										key={index_}
										className="flex gap-2 items-start text-xs font-sans text-nb-black/80"
									>
										<CheckIcon className="h-4 w-4 text-nb-black flex-shrink-0 mt-0.5" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="p-6 pt-0">
							<a
								className="nb-btn bg-nb-black text-nb-yellow w-full block text-center text-xs"
								href="#inquiry"
							>
								Inquire Now
							</a>
						</div>
					</div>
				))}
			</div>
			<p className="font-mono text-xs text-nb-black/60 italic text-center max-w-xl mx-auto">
				{t("prices.note")}
			</p>
		</div>
	);
};
