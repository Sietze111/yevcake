import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";

interface AboutStat {
	value: string;
	labelKey: "common.bornInUkraine" | "common.atelierLocation";
	bg: string;
}

const STATS: Array<AboutStat> = [
	{ value: "1993", labelKey: "common.bornInUkraine", bg: "bg-nb-yellow" },
	{ value: "Bern", labelKey: "common.atelierLocation", bg: "bg-nb-mint" },
];

export const AboutSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection background="bg-nb-lilac" id="about">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="relative max-w-sm mx-auto lg:max-w-none order-2 lg:order-1">
					<div className="border border-cream-300 overflow-hidden aspect-[3/4] -rotate-2 hover:rotate-0 transition-transform duration-700 shadow-[0_20px_60px_rgba(50,23,13,0.08)]">
						<img
							alt="Yevheniia - Cake Designer in Bern"
							className="w-full h-full object-cover"
							src="/cake_wedding.jpg"
						/>
					</div>
					<div className="absolute -top-4 -right-4 nb-tag bg-chocolate-950 text-cream-50 shadow-[0_20px_60px_rgba(50,23,13,0.18)]">
						<span aria-hidden="true">&hearts;</span>&nbsp;{t("common.estBern")}
					</div>
				</div>

				<div className="space-y-6 order-1 lg:order-2">
					<div className="nb-tag bg-raspberry-100 text-raspberry-800 w-fit">
						{t("about.subtitle")}
					</div>
					<h2 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-medium leading-[0.95] tracking-[-0.03em] text-chocolate-900 [text-wrap:balance]">
						{t("about.title")}
					</h2>
					<div className="nb-divider" />
					<p className="font-sans font-light text-base text-chocolate-900/80 leading-relaxed">
						{t("about.p1")}
					</p>
					<p className="font-sans font-light text-base text-chocolate-900/80 leading-relaxed">
						{t("about.p2")}
					</p>

					<div className="flex gap-6 pt-4 border-t border-almond-300">
						{STATS.map((stat) => (
							<div
								key={stat.labelKey}
								className={`rounded-sm border border-nb-line px-5 py-3 ${stat.bg} shadow-[0_20px_60px_rgba(50,23,13,0.06)]`}
							>
								<span className="block font-mono text-3xl font-bold">
									{stat.value}
								</span>
								<span className="block font-sans text-[9px] uppercase tracking-widest mt-0.5">
									{t(stat.labelKey)}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</ContentSection>
	);
};
