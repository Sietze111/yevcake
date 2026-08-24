import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";

export const HeroSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<section
			className="pt-28 pb-16 md:pt-36 md:pb-24 border-b-4 border-nb-black"
			id="home"
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8 animate-fade-in-up">
						<div className="nb-tag bg-nb-pink w-fit">
							🍰 Bespoke Cake Atelier · Bern
						</div>
						<h1 className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-nb-black uppercase">
							{t("hero.title")}
						</h1>
						<p className="font-sans text-base text-nb-black/70 max-w-lg leading-relaxed">
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
								href="#flavors"
							>
								{t("nav.flavors")}
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="border-4 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] overflow-hidden aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-300">
							<img
								alt="Bespoke handmade cake by Yevheniia in Bern"
								className="w-full h-full object-cover"
								fetchPriority="high"
								src="/cake_mouse.jpg"
							/>
						</div>
						<div className="absolute -bottom-4 -left-4 nb-tag bg-nb-mint text-nb-black">
							{t("common.handmadeInBern")}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
