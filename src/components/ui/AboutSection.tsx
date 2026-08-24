import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";

const STATS = [
	{ value: "1993", label: "Born in Ukraine", bg: "bg-nb-yellow" },
	{ value: "Bern", label: "Atelier Location", bg: "bg-nb-mint" },
];

export const AboutSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection background="bg-nb-lilac" id="about">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="relative max-w-sm mx-auto lg:max-w-none order-2 lg:order-1">
					<div className="border-4 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] overflow-hidden aspect-[3/4] -rotate-2 hover:rotate-0 transition-transform duration-300">
						<img
							alt="Yevheniia - Cake Designer in Bern"
							className="w-full h-full object-cover"
							src="/cake_wedding.jpg"
						/>
					</div>
					<div className="absolute -top-4 -right-4 bg-nb-yellow border-3 border-nb-black px-3 py-1 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_#0D0D0D]">
						Est. 2020 · Bern
					</div>
				</div>

				<div className="space-y-6 order-1 lg:order-2">
					<div className="nb-tag bg-nb-yellow w-fit">{t("about.subtitle")}</div>
					<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase leading-tight">
						{t("about.title")}
					</h2>
					<div className="nb-divider" />
					<p className="font-sans text-base text-nb-black/80 leading-relaxed">
						{t("about.p1")}
					</p>
					<p className="font-sans text-base text-nb-black/80 leading-relaxed">
						{t("about.p2")}
					</p>

					<div className="flex gap-6 pt-4 border-t-3 border-nb-black">
						{STATS.map((stat) => (
							<div
								key={stat.label}
								className={`border-3 border-nb-black px-4 py-3 ${stat.bg} shadow-[3px_3px_0px_0px_#0D0D0D]`}
							>
								<span className="block font-mono text-3xl font-bold">
									{stat.value}
								</span>
								<span className="block font-mono text-[9px] uppercase tracking-widest mt-0.5">
									{stat.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</ContentSection>
	);
};
