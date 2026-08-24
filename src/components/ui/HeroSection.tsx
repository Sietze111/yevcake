import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";

interface HeroSprinkle {
	left: string;
	top: string;
	background: string;
	rotate: number;
	delay: number;
}

const HERO_SPRINKLES: Array<HeroSprinkle> = [
	{ left: "6%", top: "18%", background: "#FF9EB5", rotate: -24, delay: 0 },
	{ left: "92%", top: "12%", background: "#A8F0C6", rotate: 30, delay: 0.8 },
	{ left: "10%", top: "72%", background: "#B8DCFF", rotate: 48, delay: 1.6 },
	{ left: "88%", top: "64%", background: "#FFE566", rotate: -40, delay: 2.4 },
	{ left: "50%", top: "6%", background: "#D4B8F0", rotate: 12, delay: 3.2 },
	{ left: "46%", top: "90%", background: "#FFD4B8", rotate: -8, delay: 4 },
];

const sprinkleStyle = (sprinkle: HeroSprinkle): CSSProperties =>
	({
		animationDelay: `${String(sprinkle.delay)}s`,
		background: sprinkle.background,
		"--sprinkle-rotate": `${String(sprinkle.rotate)}deg`,
		left: sprinkle.left,
		top: sprinkle.top,
	}) as CSSProperties;

export const HeroSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<section
			className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b-4 border-nb-black overflow-hidden"
			id="home"
		>
			<div aria-hidden="true" className="hidden md:block absolute inset-0">
				{HERO_SPRINKLES.map((sprinkle) => (
					<span
						key={`${sprinkle.left}-${sprinkle.top}`}
						className="hero-sprinkle"
						style={sprinkleStyle(sprinkle)}
					/>
				))}
			</div>
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
