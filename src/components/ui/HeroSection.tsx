import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";

export const HeroSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<section
			className="relative pt-32 pb-16 md:pt-44 md:pb-28 lg:pt-52 lg:pb-32 border-b border-nb-line overflow-hidden"
			id="home"
		>
			<div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div className="space-y-8 animate-fade-in-up">
						<div className="nb-tag bg-raspberry-100 text-raspberry-800 w-fit border-raspberry-800/20">
							<span aria-hidden="true" className="text-raspberry-800">
								{"\u2661"}
							</span>
							{t("common.handmadeInBern")}
						</div>
						<div aria-hidden="true" className="flex items-center gap-6">
							<span className="h-px w-16 bg-raspberry-800/50" />
							<span className="font-mono text-2xl leading-none text-raspberry-800">
								{"\u2661"}
							</span>
							<span className="h-px w-16 bg-raspberry-800/50" />
						</div>
						<h1 className="font-mono font-medium text-5xl sm:text-6xl lg:text-8xl leading-[0.9] tracking-[-0.03em] text-chocolate-900 [text-wrap:balance]">
							{t("hero.title")}
						</h1>
						<p className="font-sans font-light text-base sm:text-lg text-cocoa-700 max-w-xl leading-relaxed">
							{t("hero.subtitle")}
						</p>
						<div className="flex flex-wrap gap-4 pt-2">
							<a className="nb-btn nb-btn-primary text-sm" href="#inquiry">
								{t("hero.cta")}
							</a>
							<a className="nb-btn nb-btn-outline text-sm" href="#configurator">
								{t("nav.designer")}
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="border border-cream-300 overflow-hidden aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-700">
							<img
								alt="Bespoke handmade cake by Yevheniia in Bern"
								className="w-full h-full object-cover"
								fetchPriority="high"
								src={`${import.meta.env.BASE_URL}cake_mouse.jpg`}
							/>
						</div>
						<div className="absolute -bottom-4 -left-4 nb-tag bg-chocolate-950 text-cream-50 border-chocolate-950 shadow-[0_20px_60px_rgba(50,23,13,0.2)]">
							<span aria-hidden="true" className="text-raspberry-300">
								{"\u2661"}
							</span>
							{t("common.collectionByAppointment")}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
