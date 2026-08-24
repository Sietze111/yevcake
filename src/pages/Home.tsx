import { Navbar } from "../components/layout/Navbar";
import { BackToTopButton } from "../components/layout/BackToTopButton";
import { Footer } from "../components/layout/Footer";
import { AboutSection } from "../components/ui/AboutSection";
import { FaqSection } from "../components/ui/FaqSection";
import { FlavorsSection } from "../components/ui/FlavorsSection";
import { GallerySection } from "../components/ui/GallerySection";
import { HeroSection } from "../components/ui/HeroSection";
import { OrderSection } from "../components/ui/OrderSection";
import { PriceGuideSection } from "../components/ui/PriceGuideSection";
import { ReviewsSection } from "../components/ui/ReviewsSection";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	return (
		<div className="bg-nb-cream text-nb-black min-h-screen font-sans overflow-x-hidden">
			<Navbar />

			<main>
				<HeroSection />
				<AboutSection />
				<FlavorsSection />
				<GallerySection />
				<PriceGuideSection />
				<ReviewsSection />
				<FaqSection />
				<OrderSection />
			</main>

			<Footer />

			<BackToTopButton />
		</div>
	);
};
