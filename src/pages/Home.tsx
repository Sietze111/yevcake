import { Navbar } from "../components/layout/Navbar";
import { BackToTopButton } from "../components/layout/BackToTopButton";
import { WhatsAppButton } from "../components/layout/WhatsAppButton";
import { Footer } from "../components/layout/Footer";
import { AboutSection } from "../components/ui/AboutSection";
import { CakeConfigurator } from "../components/ui/CakeConfigurator";
import { FaqSection } from "../components/ui/FaqSection";
import { FlavorsSection } from "../components/ui/FlavorsSection";
import { GallerySection } from "../components/ui/GallerySection";
import { HeroSection } from "../components/ui/HeroSection";
import { OrderSection } from "../components/ui/OrderSection";
import { ReviewsSection } from "../components/ui/ReviewsSection";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	return (
		<div className="bg-nb-cream text-nb-black min-h-screen font-sans overflow-x-hidden">
			<Navbar />

			<main id="main-content">
				<HeroSection />
				<AboutSection />
				<FlavorsSection />
				<GallerySection />
				<CakeConfigurator />
				<ReviewsSection />
				<FaqSection />
				<OrderSection />
			</main>

			<Footer />

			<WhatsAppButton />
			<BackToTopButton />
		</div>
	);
};
