import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";

export const HeroSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<section
			className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-nb-line overflow-hidden"
			id="home"
		>
			<div
				aria-hidden="true"
				className="hidden md:block absolute -top-24 -right-24 w-80 h-80 rounded-full border border-nb-yellow/40"
			/>
			<div
				aria-hidden="true"
				className="hidden md:block absolute top-40 right-10 w-5 h-5 rounded-full bg-nb-pink/70"
			/>
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8 animate-fade-in-up">
						<div className="nb-tag bg-nb-pink w-fit">
							<span aria-hidden="true" className="text-nb-yellow mr-2">
								&hearts;
							</span>
							&middot; {t("common.handmadeInBern")}
						</div>
						<h1 className="font-mono text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] text-nb-black [text-wrap:balance]">
							{t("hero.title")}
						</h1>
						<p className="font-sans font-light text-base text-nb-black/75 max-w-lg leading-relaxed">
							{t("hero.subtitle")}
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								className="nb-btn bg-nb-yellow text-nb-black text-sm"
								href="#inquiry"
							>
								{t("hero.cta")}
							</a>
							<a
								className="nb-btn bg-nb-white text-nb-black text-sm"
								href="#configurator"
							>
								{t("nav.designer")}
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="rounded-[1.75rem] border border-nb-line ring-1 ring-nb-yellow/30 shadow-[0_24px_48px_rgba(61,43,31,0.18)] overflow-hidden aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-500">
							<img
								alt="Bespoke handmade cake by Yevheniia in Bern"
								className="w-full h-full object-cover"
								fetchPriority="high"
								src="/cake_mouse.jpg"
							/>
						</div>
						<div className="absolute -bottom-4 -left-4 nb-tag bg-nb-mint text-nb-black shadow-[0_8px_20px_rgba(61,43,31,0.2)]">
							{t("common.handmadeInBern")}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
