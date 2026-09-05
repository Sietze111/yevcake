import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { useInquiryStore } from "../../store/inquiryStore";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";
import {
	CAKE_SIZES,
	FLAVOR_OPTIONS,
	FROSTING_COLORS,
	INSCRIPTION_MAX_LENGTH,
	TOPPER_OPTIONS,
	calculateCakeEstimate,
	type CakeSizeId,
	type FlavorId,
	type FrostingColorId,
	type TopperId,
} from "./cakeConfiguratorData";
import { CakeVisual } from "./CakeVisual";

const OPTION_BASE_CLASS =
	"border-3 border-nb-black px-4 text-left transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#0D0D0D] cursor-pointer";
const OPTION_SELECTED_CLASS =
	"shadow-[5px_5px_0px_0px_#0D0D0D] translate-x-[-2px] translate-y-[-2px]";

export const CakeConfigurator = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const preselectCake = useInquiryStore((state) => state.preselectCake);

	const [sizeId, setSizeId] = useState<CakeSizeId>("single");
	const [flavorId, setFlavorId] = useState<FlavorId>("medovyk");
	const [colorId, setColorId] = useState<FrostingColorId>("blush");
	const [topper, setTopper] = useState<TopperId>("flowers");
	const [inscription, setInscription] = useState("");

	const size = CAKE_SIZES.find((entry) => entry.id === sizeId) ?? CAKE_SIZES[1];
	if (!size) throw new Error("Cake size options are misconfigured");
	const color =
		FROSTING_COLORS.find((entry) => entry.id === colorId) ?? FROSTING_COLORS[0];
	if (!color) throw new Error("Frosting color options are misconfigured");

	const estimate = useMemo(() => calculateCakeEstimate(size), [size]);

	const formattedEstimate = useMemo(
		() =>
			new Intl.NumberFormat(i18n.language, {
				style: "currency",
				currency: "CHF",
				maximumFractionDigits: 0,
			}).format(estimate),
		[i18n.language, estimate]
	);

	const trimmedInscription = inscription.trim();

	const designSummary = useMemo(() => {
		const parts = [
			t(`configurator.sizes.${size.id}.name`),
			t(`flavors.${flavorId}.name`),
			t(`configurator.colors.${color.id}`),
			topper === "none" ? null : t(`configurator.toppers.${topper}`),
		].filter((part): part is string => part !== null);
		return parts.join(" · ");
	}, [t, size.id, flavorId, color.id, topper]);

	const handleSendToInquiry = (): void => {
		preselectCake({
			occasion: size.occasion,
			servings: size.servings,
			design: designSummary,
			inscription: trimmedInscription !== "" ? trimmedInscription : undefined,
			frostingColor: color.id,
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
				<div className="border-3 border-nb-black bg-nb-white shadow-[6px_6px_0px_0px_#0D0D0D] p-6 lg:sticky lg:top-24">
					<CakeVisual
						flavorId={flavorId}
						frostingColor={color.value}
						inscription={trimmedInscription}
						tiers={size.tiers}
						topper={topper}
					/>
					<div
						aria-live="polite"
						className="mt-4 flex items-end justify-between border-t-3 border-nb-black pt-4"
					>
						<span className="font-mono text-[10px] font-bold uppercase tracking-wider">
							{t("configurator.estimateLabel")}
						</span>
						<span className="font-mono text-2xl font-bold">
							{formattedEstimate}
						</span>
					</div>
					<p className="font-sans text-xs text-nb-black/60 mt-2 leading-relaxed">
						{t("configurator.disclaimer")}
					</p>
					<a
						className="nb-btn bg-nb-pink w-full justify-center mt-4 inline-flex"
						href="#inquiry"
						onClick={handleSendToInquiry}
					>
						{t("configurator.cta")}
					</a>
				</div>

				<div className="space-y-7">
					<fieldset>
						<legend className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
							{t("configurator.sizeLabel")}
						</legend>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{CAKE_SIZES.map((option) => (
								<button
									key={option.id}
									aria-pressed={option.id === sizeId}
									type="button"
									className={`${OPTION_BASE_CLASS} py-3 ${
										option.id === sizeId
											? `bg-nb-yellow ${OPTION_SELECTED_CLASS}`
											: "bg-nb-white"
									}`}
									onClick={() => {
										setSizeId(option.id);
									}}
								>
									<span className="block font-mono font-bold uppercase text-sm">
										{t(`configurator.sizes.${option.id}.name`)}
									</span>
									<span className="block font-sans text-xs text-nb-black/70 mt-1">
										{t(`configurator.sizes.${option.id}.desc`)}
									</span>
								</button>
							))}
						</div>
					</fieldset>

					<fieldset>
						<legend className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
							{t("configurator.flavorLabel")}
						</legend>
						<div className="flex flex-wrap gap-3">
							{FLAVOR_OPTIONS.map((flavor) => (
								<button
									key={flavor.id}
									aria-pressed={flavor.id === flavorId}
									type="button"
									className={`${OPTION_BASE_CLASS} py-2.5 ${
										flavor.id === flavorId
											? `bg-nb-mint ${OPTION_SELECTED_CLASS}`
											: "bg-nb-white"
									} flex items-center gap-2`}
									onClick={() => {
										setFlavorId(flavor.id);
									}}
								>
									<span aria-hidden="true" className="text-lg">
										{flavor.icon}
									</span>
									<span className="font-mono font-bold uppercase text-xs">
										{t(`flavors.${flavor.id}.name`)}
									</span>
								</button>
							))}
						</div>
					</fieldset>

					<fieldset>
						<legend className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
							{`${t("configurator.colorLabel")} – ${t(
								`configurator.colors.${color.id}`
							)}`}
						</legend>
						<div className="flex flex-wrap gap-3">
							{FROSTING_COLORS.map((entry) => (
								<button
									key={entry.id}
									aria-label={t(`configurator.colors.${entry.id}`)}
									aria-pressed={entry.id === colorId}
									style={{ backgroundColor: entry.value }}
									type="button"
									className={`w-11 h-11 rounded-full border-3 border-nb-black cursor-pointer transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-nb-blue ${
										entry.id === colorId ? "scale-110 ring-4 ring-nb-blue" : ""
									}`}
									onClick={() => {
										setColorId(entry.id);
									}}
								/>
							))}
						</div>
					</fieldset>

					<fieldset>
						<legend className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
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
											: "bg-nb-white"
									}`}
									onClick={() => {
										setTopper(id);
									}}
								>
									<span className="font-mono font-bold uppercase text-xs">
										{t(`configurator.toppers.${id}`)}
									</span>
								</button>
							))}
						</div>
					</fieldset>

					<label className="block" htmlFor="configurator-inscription">
						<span className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2 block">
							{t("configurator.messageLabel")}
						</span>
						<input
							className="border-3 border-nb-black bg-nb-white px-4 py-2.5 font-sans text-sm w-full max-w-md shadow-[4px_4px_0px_0px_#0D0D0D] focus-visible:bg-nb-yellow focus-visible:outline-none"
							id="configurator-inscription"
							maxLength={INSCRIPTION_MAX_LENGTH}
							placeholder={t("configurator.messagePlaceholder")}
							type="text"
							value={inscription}
							onChange={(event_) => {
								setInscription(event_.target.value);
							}}
						/>
					</label>
				</div>
			</div>
		</ContentSection>
	);
};
