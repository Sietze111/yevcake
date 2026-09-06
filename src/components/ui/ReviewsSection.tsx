import { useTranslation } from "react-i18next";
import { StarIcon } from "@heroicons/react/24/solid";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";

export const ReviewsSection = (): FunctionComponent => {
	const { t } = useTranslation();

	const reviews = [
		{
			name: t("reviews.r1.name"),
			location: t("reviews.r1.location"),
			text: t("reviews.r1.text"),
			rating: 5,
			bg: "bg-nb-yellow",
		},
		{
			name: t("reviews.r2.name"),
			location: t("reviews.r2.location"),
			text: t("reviews.r2.text"),
			rating: 5,
			bg: "bg-nb-mint",
		},
		{
			name: t("reviews.r3.name"),
			location: t("reviews.r3.location"),
			text: t("reviews.r3.text"),
			rating: 5,
			bg: "bg-nb-peach",
		},
	];

	return (
		<ContentSection background="bg-nb-pink" id="reviews">
			<SectionHeading
				tag={t("reviews.title")}
				tagClassName="bg-nb-black text-nb-cream"
				title={t("reviews.subtitle")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{reviews.map((review, index) => (
					<div
						key={index}
						className={`nb-tile p-6 flex flex-col justify-between text-left ${review.bg}`}
					>
						<div className="space-y-4">
							<div className="flex gap-0.5">
								{Array.from({ length: review.rating }).map((_, index_) => (
									<StarIcon key={index_} className="h-5 w-5 text-nb-pink" />
								))}
							</div>
							<p className="font-sans font-light text-sm text-nb-black/85 leading-relaxed">
								&ldquo;{review.text}&rdquo;
							</p>
						</div>

						<div className="pt-5 border-t border-nb-line mt-5 flex items-center gap-3">
							<div className="w-10 h-10 rounded-full border border-nb-line bg-nb-white text-nb-pink flex items-center justify-center font-mono font-semibold text-lg shadow-[0_4px_12px_rgba(61,43,31,0.12)]">
								{review.name.charAt(0)}
							</div>
							<div>
								<h5 className="font-mono font-semibold text-sm text-nb-black">
									{review.name}
								</h5>
								<span className="font-sans text-xs text-nb-black/60">
									{review.location}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</ContentSection>
	);
};
