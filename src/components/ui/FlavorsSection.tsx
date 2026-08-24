import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FLAVORS = [
	{ key: "medovyk", icon: "🍯", bg: "bg-nb-yellow" },
	{ key: "pistachio", icon: "🌱", bg: "bg-nb-mint" },
	{ key: "caramel", icon: "🍫", bg: "bg-nb-peach" },
	{ key: "mango", icon: "🥭", bg: "bg-nb-pink" },
] as const;

export const FlavorsSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection id="flavors">
			<SectionHeading tag={t("flavors.title")} title={t("flavors.subtitle")} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{FLAVORS.map((flavor, index) => (
					<Reveal key={flavor.key} delay={index * 90}>
						<div
							className={`p-8 border-3 border-nb-black shadow-[5px_5px_0px_0px_#0D0D0D] text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0D0D0D] transition-all duration-150 ${flavor.bg}`}
						>
							<span className="text-4xl block mb-4">{flavor.icon}</span>
							<h3 className="font-mono text-xl font-bold text-nb-black uppercase mb-2">
								{t(`flavors.${flavor.key}.name`)}
							</h3>
							<p className="font-sans text-sm text-nb-black/75 leading-relaxed">
								{t(`flavors.${flavor.key}.desc`)}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</ContentSection>
	);
};
