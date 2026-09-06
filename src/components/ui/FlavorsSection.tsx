import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { FLAVOR_OPTIONS } from "./cakeConfiguratorData";

const FLAVOR_BG: Array<string> = [
	"bg-nb-yellow",
	"bg-nb-mint",
	"bg-nb-peach",
	"bg-nb-blue",
	"bg-nb-lilac",
	"bg-nb-white",
	"bg-nb-yellow",
	"bg-nb-mint",
	"bg-nb-peach",
	"bg-nb-blue",
	"bg-nb-lilac",
	"bg-nb-white",
];

export const FlavorsSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection id="flavors">
			<SectionHeading tag={t("flavors.title")} title={t("flavors.subtitle")} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{FLAVOR_OPTIONS.map((flavor, index) => (
					<Reveal key={flavor.id} delay={index * 90}>
						<div
							className={`nb-tile p-8 text-left ${
								FLAVOR_BG[index % FLAVOR_BG.length]
							}`}
						>
							<span className="text-4xl block mb-4">{flavor.icon}</span>
							<h3 className="font-mono text-2xl font-semibold text-nb-black mb-2">
								{t(`flavors.${flavor.id}.name`)}
							</h3>
							<p className="font-sans font-light text-sm text-nb-black/75 leading-relaxed">
								{t(`flavors.${flavor.id}.desc`)}
							</p>
						</div>
					</Reveal>
				))}
			</div>

			<p className="font-sans text-[11px] font-light text-nb-black/60 leading-relaxed max-w-2xl mt-8 mx-auto text-center">
				{t("flavors.allergenNote")}
			</p>
		</ContentSection>
	);
};
