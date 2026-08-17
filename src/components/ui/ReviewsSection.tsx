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
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
			{reviews.map((review, index) => (
				<div
					key={index}
					className={`border-3 border-nb-black shadow-[5px_5px_0px_0px_#0D0D0D] p-6 flex flex-col justify-between text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0D0D0D] transition-all duration-150 ${review.bg}`}
				>
					<div className="space-y-4">
						{/* Stars */}
						<div className="flex gap-0.5">
							{Array.from({ length: review.rating }).map((_, index_) => (
								<StarIcon key={index_} className="h-5 w-5 text-nb-black" />
							))}
						</div>
						{/* Quote */}
						<p className="font-sans text-sm text-nb-black/85 leading-relaxed">
							&ldquo;{review.text}&rdquo;
						</p>
					</div>

					<div className="pt-5 border-t-2 border-nb-black mt-5 flex items-center gap-3">
						{/* Avatar initial */}
						<div className="w-10 h-10 border-2 border-nb-black bg-nb-black text-nb-yellow flex items-center justify-center font-mono font-bold text-lg shadow-[2px_2px_0px_0px_#0D0D0D]">
							{review.name.charAt(0)}
						</div>
						<div>
							<h5 className="font-mono font-bold text-sm text-nb-black uppercase">{review.name}</h5>
							<span className="font-mono text-xs text-nb-black/60">{review.location}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
