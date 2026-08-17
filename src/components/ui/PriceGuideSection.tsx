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
		<div className="space-y-12 max-w-7xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{pricingTiers.map((tier, index) => (
					<div
						key={index}
						className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 relative border ${
							tier.popular
								? "bg-white shadow-xl border-brand-gold ring-1 ring-brand-gold/30 scale-[1.03] z-10"
								: "bg-white/40 glass-panel shadow-sm hover:shadow-md border-brand-gold/10 hover:border-brand-gold/25"
						}`}
					>
						{tier.popular && (
							<span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-dark text-[10px] tracking-widest font-bold uppercase py-1 px-3 rounded-full">
								Most Requested
							</span>
						)}
						<div className="space-y-6">
							<div>
								<h4 className="font-serif text-lg sm:text-xl font-bold text-brand-dark">
									{tier.name}
								</h4>
								<p className="font-sans text-xs text-brand-dark/70 mt-2 leading-relaxed h-16 overflow-hidden">
									{tier.desc}
								</p>
							</div>
							<div className="flex items-baseline gap-1 py-4 border-y border-brand-gold/10">
								<span className="font-sans text-xs text-brand-dark/50 uppercase tracking-wider">
									{t("prices.startingFrom")}
								</span>
								<span className="font-serif text-3xl font-extrabold text-brand-dark">
									{tier.price}
								</span>
								<span className="font-sans text-[10px] text-brand-dark/60 tracking-wider">
									/ {tier.unit}
								</span>
							</div>
							<ul className="space-y-3">
								{tier.features.map((feature, index_) => (
									<li
										key={index_}
										className="flex gap-2 items-start text-xs font-sans text-brand-dark/80"
									>
										<CheckIcon className="h-4.5 w-4.5 text-brand-gold flex-shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="mt-8">
							<a
								href="#inquiry"
								className={`w-full block text-center py-2.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
									tier.popular
										? "bg-brand-dark text-brand-cream hover:bg-brand-gold"
										: "border border-brand-dark/20 text-brand-dark hover:bg-brand-champagne/45"
								}`}
							>
								Inquire Now
							</a>
						</div>
					</div>
				))}
			</div>
			<p className="font-sans text-xs text-brand-dark/65 italic text-center max-w-xl mx-auto">
				{t("prices.note")}
			</p>
		</div>
	);
};
