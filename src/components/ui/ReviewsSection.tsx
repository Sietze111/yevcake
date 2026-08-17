import { useTranslation } from "react-i18next";
import { StarIcon } from "@heroicons/react/24/solid";
import type { FunctionComponent } from "../../common/types";

export const ReviewsSection = (): FunctionComponent => {
	const { t } = useTranslation();

	const reviews = [
		{
			name: t("reviews.r1.name"),
			location: t("reviews.r1.location"),
			text: t("reviews.r1.text"),
			rating: 5,
		},
		{
			name: t("reviews.r2.name"),
			location: t("reviews.r2.location"),
			text: t("reviews.r2.text"),
			rating: 5,
		},
		{
			name: t("reviews.r3.name"),
			location: t("reviews.r3.location"),
			text: t("reviews.r3.text"),
			rating: 5,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
			{reviews.map((review, index) => (
				<div
					key={index}
					className="p-8 rounded-3xl border border-brand-gold/15 bg-white/40 glass-panel shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between text-left group"
				>
					<div className="space-y-4">
						{/* Star Rating */}
						<div className="flex gap-1">
							{Array.from({ length: review.rating }).map((_, index_) => (
								<StarIcon key={index_} className="h-5 w-5 text-brand-gold" />
							))}
						</div>
						{/* Review content */}
						<p className="font-serif italic text-base text-brand-dark/85 leading-relaxed group-hover:text-brand-dark transition-colors duration-300">
							"{review.text}"
						</p>
					</div>

					<div className="pt-6 border-t border-brand-gold/10 mt-6 flex items-center gap-3">
						{/* Minimalist decorative avatar */}
						<div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center font-bold text-brand-accent text-sm">
							{review.name.charAt(0)}
						</div>
						<div>
							<h5 className="font-sans font-bold text-sm text-brand-dark">
								{review.name}
							</h5>
							<span className="font-sans text-xs text-brand-dark/60">
								{review.location}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
