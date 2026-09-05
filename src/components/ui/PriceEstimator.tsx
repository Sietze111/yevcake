import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import {
	RATES,
	RATE_KEYS,
	OCCASION_LABEL_KEYS,
	type RateKey,
} from "../../common/pricing";
import { useInquiryStore } from "../../store/inquiryStore";

export const PriceEstimator = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const preselectOccasion = useInquiryStore((state) => state.preselectOccasion);
	const [occasion, setOccasion] = useState<RateKey>("celebration");
	const [servings, setServings] = useState(RATES.celebration.defaultServings);

	const rate = RATES[occasion];
	const isFlat = rate.flat !== null;

	const estimate = ((): number => {
		if (rate.flat !== null) return rate.flat;
		const perServing = rate.perServing ?? 0;
		const effectiveServings = Math.max(servings, rate.servingsMin ?? 1);
		return Math.round(perServing * effectiveServings);
	})();

	const formattedEstimate = new Intl.NumberFormat(i18n.language, {
		style: "currency",
		currency: "CHF",
		maximumFractionDigits: 0,
	}).format(estimate);

	return (
		<div className="border-3 border-nb-black bg-nb-white shadow-[6px_6px_0px_0px_#0D0D0D] p-6 sm:p-8">
			<div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
				<div className="space-y-1">
					<span className="nb-tag bg-nb-blue inline-block">
						{t("estimator.title")}
					</span>
					<p className="font-sans text-xs text-nb-black/60 max-w-md leading-relaxed">
						{t("estimator.note")}
					</p>
				</div>

				<div className="flex flex-wrap gap-4 items-end">
					<label className="flex flex-col gap-1.5" htmlFor="estimator-occasion">
						<span className="font-mono text-[10px] font-bold uppercase tracking-wider">
							{t("estimator.occasion")}
						</span>
						<select
							className="border-2 border-nb-black bg-nb-cream px-3 py-2 font-mono text-xs font-bold uppercase cursor-pointer focus-visible:bg-nb-yellow"
							id="estimator-occasion"
							value={occasion}
							onChange={(event_) => {
								setOccasion(event_.target.value as RateKey);
							}}
						>
							{RATE_KEYS.map((key) => (
								<option key={key} value={key}>
									{t(OCCASION_LABEL_KEYS[key])}
								</option>
							))}
						</select>
					</label>

					<label
						aria-disabled={isFlat}
						className={`flex flex-col gap-1.5 ${isFlat ? "opacity-40" : ""}`}
						htmlFor="estimator-servings"
					>
						<span className="font-mono text-[10px] font-bold uppercase tracking-wider">
							{t("estimator.servings")}
						</span>
						<input
							className="border-2 border-nb-black bg-nb-cream px-3 py-2 font-mono text-xs font-bold w-28 focus-visible:bg-nb-yellow disabled:cursor-not-allowed"
							disabled={isFlat}
							id="estimator-servings"
							max={500}
							min={1}
							type="number"
							value={servings}
							onChange={(event_) => {
								const parsed = Number.parseInt(event_.target.value, 10);
								setServings(Number.isNaN(parsed) || parsed < 1 ? 1 : parsed);
							}}
						/>
					</label>

					<div aria-live="polite" className="flex flex-col gap-1.5">
						<span className="font-mono text-[10px] font-bold uppercase tracking-wider">
							{t("estimator.resultPrefix")}
						</span>
						<span className="font-mono text-3xl font-bold text-nb-black border-y-2 border-nb-black py-1">
							{formattedEstimate}
						</span>
					</div>

					<a
						className="nb-btn bg-nb-pink text-nb-black text-xs whitespace-nowrap"
						href="#inquiry"
						onClick={() => {
							preselectOccasion(
								rate.occasion,
								isFlat ? undefined : Math.max(servings, rate.servingsMin ?? 1)
							);
						}}
					>
						{t("estimator.cta")}
					</a>
				</div>
			</div>
		</div>
	);
};
