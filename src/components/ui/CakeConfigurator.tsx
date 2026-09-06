import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { useInquiryStore } from "../../store/inquiryStore";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";
import {
	CAKE_FLAVORS,
	CAKE_TIERS,
	FLAVOR_ICONS,
	FROSTING_SHELL_COLOR,
	TIER_BY_ID,
	TOPPER_OPTIONS,
	calculateCakeEstimate,
	type FlavorId,
	type TierId,
	type TopperId,
} from "./cakeConfiguratorData";
import { CakeVisual } from "./CakeVisual";

const OPTION_BASE_CLASS =
	"rounded-xl border border-nb-line px-4 text-left transition-all duration-150 cursor-pointer";
const OPTION_SELECTED_CLASS = "shadow-[0_10px_22px_rgba(61,43,31,0.14)]";

export const CakeConfigurator = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const preselectCake = useInquiryStore((state) => state.preselectCake);

	const [tierId, setTierId] = useState<TierId>(1);
	const [servings, setServings] = useState(15);
	const [flavorId, setFlavorId] = useState<FlavorId>("medovyk");
	const [topper, setTopper] = useState<TopperId>("flowers");

	const tier = TIER_BY_ID[tierId];

	const estimate = useMemo(
		() => calculateCakeEstimate(tier, servings),
		[tier, servings]
	);

	const formattedEstimate = useMemo(
		() =>
			new Intl.NumberFormat(i18n.language, {
				style: "currency",
				currency: "CHF",
				maximumFractionDigits: 0,
			}).format(estimate),
		[i18n.language, estimate]
	);

	const designSummary = useMemo(() => {
		const parts = [
			t(`configurator.tiers.${tier.id}.name`),
			t(`flavors.${flavorId}.name`),
			topper === "none" ? null : t(`configurator.toppers.${topper}`),
		].filter((part): part is string => part !== null);
		return parts.join(" · ");
	}, [t, tier.id, flavorId, topper]);

	const handleSendToInquiry = (): void => {
		preselectCake({
			occasion: tier.occasion,
			servings,
			design: designSummary,
			flavor: flavorId,
			topper,
		});
	};

	return (
		<ContentSection id="configurator">
			<SectionHeading
				tag={t("configurator.title")}
				title={t("configurator.subtitle")}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
				<div className="rounded-3xl border border-nb-line bg-nb-white shadow-[0_12px_26px_rgba(61,43,31,0.14)] p-6 lg:sticky lg:top-24">
					<CakeVisual
						flavor={flavorId}
						frostingColor={FROSTING_SHELL_COLOR}
						tier={tierId}
						topper={topper}
					/>
					<div
						aria-live="polite"
						className="mt-4 flex items-end justify-between border-t border-nb-line pt-4"
					>
						<div className="space-y-0.5">
							<span className="font-sans text-[10px] font-medium uppercase tracking-wider text-nb-black/60 block">
								{t("configurator.estimateLabel")}
							</span>
							<span className="font-sans font-light text-[11px] text-nb-black/60 block">
								{t("configurator.estimateContext", { servings })}
							</span>
						</div>
						<span className="font-mono text-2xl font-bold">
							{formattedEstimate}
						</span>
					</div>
					<p className="font-sans font-light text-xs text-nb-black/60 mt-2 leading-relaxed">
						{t("configurator.disclaimer")}
					</p>
					<p className="font-sans font-light text-xs text-nb-black/60 mt-1 leading-relaxed">
						{t("configurator.included")}
					</p>
					<a
						className="nb-btn bg-nb-pink text-nb-cream w-full justify-center mt-4 inline-flex"
						href="#inquiry"
						onClick={handleSendToInquiry}
					>
						{t("configurator.cta")}
					</a>
				</div>

				<div className="space-y-8">
					<fieldset>
						<legend className="font-sans text-[10px] font-semibold uppercase tracking-widest text-nb-black/60 mb-2">
							{t("configurator.tierLabel")}
						</legend>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{CAKE_TIERS.map((option) => (
								<button
									key={option.id}
									aria-pressed={option.id === tierId}
									type="button"
									className={`${OPTION_BASE_CLASS} py-3 ${
										option.id === tierId
											? `bg-nb-yellow ${OPTION_SELECTED_CLASS}`
											: "bg-nb-white hover:bg-nb-yellow/30"
									}`}
									onClick={() => {
										setTierId(option.id);
										setServings(option.defaultServings);
									}}
								>
									<span className="block font-mono font-semibold text-sm text-nb-black">
										{t(`configurator.tiers.${option.id}.name`)}
									</span>
									<span className="block font-sans font-light text-xs text-nb-black/70 mt-1">
										{t(`configurator.tiers.${option.id}.desc`, {
											min: option.minServings,
											max: option.maxServings,
										})}
									</span>
								</button>
							))}
						</div>
					</fieldset>

					<fieldset>
						<legend className="font-sans text-[10px] font-semibold uppercase tracking-widest text-nb-black/60 mb-2">
							{`${t("configurator.servingsLabel")} *`}
						</legend>
						<p className="font-sans font-light text-xs text-nb-black/55 mb-3 leading-relaxed">
							{t("configurator.servingsHint", {
								min: tier.minServings,
								max: tier.maxServings,
							})}
						</p>
						<input
							aria-label={t("configurator.servingsLabel")}
							className="nb-input max-w-md"
							id="configurator-servings"
							max={tier.maxServings}
							min={tier.minServings}
							step="1"
							type="number"
							value={servings}
							onChange={(event_) => {
								const parsed = Number.parseInt(event_.target.value, 10);
								setServings(Number.isNaN(parsed) ? tier.minServings : parsed);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend className="font-sans text-[10px] font-semibold uppercase tracking-widest text-nb-black/60 mb-2">
							{t("configurator.flavorLabel")}
						</legend>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{CAKE_FLAVORS.map((id) => (
								<button
									key={id}
									aria-pressed={id === flavorId}
									type="button"
									className={`${OPTION_BASE_CLASS} py-3 ${
										id === flavorId
											? `bg-nb-mint ${OPTION_SELECTED_CLASS}`
											: "bg-nb-white hover:bg-nb-mint/30"
									}`}
									onClick={() => {
										setFlavorId(id);
									}}
								>
									<span className="block font-mono font-semibold text-sm text-nb-black">
										{FLAVOR_ICONS[id]} {t(`flavors.${id}.name`)}
									</span>
								</button>
							))}
						</div>
					</fieldset>

					<fieldset>
						<legend className="font-sans text-[10px] font-semibold uppercase tracking-widest text-nb-black/60 mb-2">
							{t("configurator.topperLabel")}
						</legend>
						<div className="flex flex-wrap gap-3">
							{TOPPER_OPTIONS.map((id) => (
								<button
									key={id}
									aria-pressed={id === topper}
									type="button"
									className={`${OPTION_BASE_CLASS} py-2 ${
										id === topper
											? `bg-nb-peach ${OPTION_SELECTED_CLASS}`
											: "bg-nb-white hover:bg-nb-peach/40"
									}`}
									onClick={() => {
										setTopper(id);
									}}
								>
									<span className="block font-mono font-semibold text-xs text-nb-black">
										{t(`configurator.toppers.${id}`)}
									</span>
								</button>
							))}
						</div>
					</fieldset>
				</div>
			</div>
		</ContentSection>
	);
};
