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
					<div className="rounded-[1.75rem] border border-nb-line ring-1 ring-nb-white/50 shadow-[0_18px_36px_rgba(61,43,31,0.18)] overflow-hidden aspect-[3/4] -rotate-2 hover:rotate-0 transition-transform duration-500">
						<img
							alt="Yevheniia - Cake Designer in Bern"
							className="w-full h-full object-cover"
							src="/cake_wedding.jpg"
						/>
					</div>
					<div className="absolute -top-4 -right-4 nb-tag bg-nb-yellow text-nb-black shadow-[0_4px_14px_rgba(61,43,31,0.14)]">
						<span aria-hidden="true">&hearts;</span>&nbsp;{t("common.estBern")}
					</div>
				</div>

				<div className="space-y-6 order-1 lg:order-2">
					<div className="nb-tag bg-nb-yellow w-fit">{t("about.subtitle")}</div>
					<h2 className="font-mono text-4xl sm:text-5xl font-semibold leading-[1.15] text-nb-black [text-wrap:balance]">
						{t("about.title")}
					</h2>
					<div className="nb-divider" />
					<p className="font-sans font-light text-base text-nb-black/80 leading-relaxed">
						{t("about.p1")}
					</p>
					<p className="font-sans font-light text-base text-nb-black/80 leading-relaxed">
						{t("about.p2")}
					</p>

					<div className="flex gap-6 pt-4 border-t border-nb-line">
						{STATS.map((stat) => (
							<div
								key={stat.labelKey}
								className={`rounded-2xl border border-nb-line px-5 py-3 ${stat.bg} shadow-[0_4px_14px_rgba(61,43,31,0.14)]`}
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
