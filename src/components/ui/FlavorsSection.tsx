import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { FLAVOR_OPTIONS } from "./cakeConfiguratorData";

const FLAVOR_BG: Record<string, string> = {
	medovyk: "bg-nb-yellow",
	pistachio: "bg-nb-mint",
	caramel: "bg-nb-peach",
	mango: "bg-nb-pink",
};

export const FlavorsSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection id="flavors">
			<SectionHeading tag={t("flavors.title")} title={t("flavors.subtitle")} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{FLAVOR_OPTIONS.map((flavor, index) => (
					<Reveal key={flavor.id} delay={index * 90}>
						<div className={`nb-tile p-8 text-left ${FLAVOR_BG[flavor.id]}`}>
							<span className="text-4xl block mb-4">{flavor.icon}</span>
							<h3 className="font-mono text-xl font-bold text-nb-black uppercase mb-2">
								{t(`flavors.${flavor.id}.name`)}
							</h3>
							<p className="font-sans text-sm text-nb-black/75 leading-relaxed">
								{t(`flavors.${flavor.id}.desc`)}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</ContentSection>
	);
};
