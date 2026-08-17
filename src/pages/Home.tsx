import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Navbar } from "../components/layout/Navbar";
import { CakeInquiryForm } from "../components/forms/CakeInquiryForm";
import { PriceGuideSection } from "../components/ui/PriceGuideSection";
import { FaqSection } from "../components/ui/FaqSection";
import { ReviewsSection } from "../components/ui/ReviewsSection";
import {
	SparklesIcon,
	MapPinIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";

// Seed faker to ensure stable images for the session
faker.seed(19101993);

export const Home = (): FunctionComponent => {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState("all");
	const cakeImages = [
		"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1588195538326-c5b1e8f80a1b?auto=format&fit=crop&w=600&h=600&q=80",
		"https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&h=600&q=80",
	];
	const galleryItems = useMemo(() => {
		const categories = ["wedding", "birthday", "bento"];
		return Array.from({ length: 9 }).map((_, index) => {
			const catIndex = index % categories.length;
			const category = categories[catIndex];
			return {
				id: index,
				category,
				image: cakeImages[index],
				title: `${faker.word.adjective()} ${category === "bento" ? "Bento" : category === "wedding" ? "Wedding" : "Celebration"} Cake`,
				desc: `Artisanal creation featuring fine ${faker.helpers.arrayElement(["chocolate", "vanilla", "hazelnut", "pistachio", "lemon", "raspberry", "salted caramel"])} notes and premium decorations.`,
			};
		});
	}, []);
	const filteredGallery = useMemo(() => {
		if (activeCategory === "all") return galleryItems;
		return galleryItems.filter((item) => item.category === activeCategory);
	}, [activeCategory, galleryItems]);

	return (
		<div className="bg-gradient-premium text-brand-dark min-h-screen relative overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-dark">
			{/* Navigation Header */}
			<Navbar />

			{/* Hero Section */}
			<section
				className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[90vh]"
				id="home"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						{/* Left text column */}
						<div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-accent border border-brand-gold/20 text-xs font-semibold tracking-widest uppercase">
								<SparklesIcon className="h-4 w-4 text-brand-gold" />
								Artisan Cake Atelier
							</div>
							<h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] text-brand-dark tracking-tight">
								{t("hero.title")}
							</h1>
							<p className="font-sans text-base sm:text-lg text-brand-dark/80 max-w-xl leading-relaxed">
								{t("hero.subtitle")}
							</p>
							<div className="pt-4 flex flex-wrap gap-4">
								<a
									className="px-8 py-3.5 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-gold transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-dark/10 cursor-pointer"
									href="#inquiry"
								>
									{t("hero.cta")}
								</a>
								<a
									className="px-8 py-3.5 rounded-full border border-brand-dark/20 text-brand-dark hover:bg-brand-champagne/40 transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
									href="#flavors"
								>
									{t("nav.flavors")}
								</a>
							</div>
						</div>

						{/* Right image column */}
						<div className="lg:col-span-5 relative animate-fade-in">
							<div className="relative mx-auto max-w-[400px] lg:max-w-none">
								<div className="absolute inset-0 bg-gradient-gold-rose rounded-full filter blur-3xl opacity-30 transform -translate-x-4 -translate-y-4"></div>
								<div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 aspect-[3/2]">
									<img
										alt="Elegant bespoke cake with gold leaf and flowers"
										className="w-full h-full object-cover"
										src="/cake_hero.jpg"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section
				className="py-20 md:py-28 bg-white/40 border-y border-brand-gold/10"
				id="about"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						{/* Image display */}
						<div className="relative order-2 lg:order-1 max-w-[400px] lg:max-w-none mx-auto w-full">
							<div className="absolute inset-0 bg-brand-gold/10 rounded-[3rem] transform rotate-3"></div>
							<div className="relative rounded-[3rem] overflow-hidden border-2 border-brand-gold/20 shadow-xl aspect-[3/4]">
								<img
									alt="Yevheniia - Cake Designer"
									className="w-full h-full object-cover"
									src="/cake_wedding.jpg"
								/>
							</div>
						</div>

						{/* Text description */}
						<div className="space-y-6 text-left order-1 lg:order-2">
							<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
								{t("about.subtitle")}
							</h2>
							<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
								{t("about.title")}
							</h3>
							<div className="w-12 h-0.5 bg-brand-gold"></div>
							<p className="font-sans text-sm sm:text-base text-brand-dark/75 leading-relaxed">
								{t("about.p1")}
							</p>
							<p className="font-sans text-sm sm:text-base text-brand-dark/75 leading-relaxed">
								{t("about.p2")}
							</p>

							{/* Statistics/Fun Facts */}
							<div className="grid grid-cols-2 gap-6 pt-6">
								<div className="border-l-2 border-brand-gold pl-4">
									<span className="block font-serif text-3xl font-bold text-brand-dark">
										1993
									</span>
									<span className="block font-sans text-xs tracking-wider text-brand-dark/65 uppercase mt-1">
										Born in Ukraine
									</span>
								</div>
								<div className="border-l-2 border-brand-gold pl-4">
									<span className="block font-serif text-3xl font-bold text-brand-dark">
										Bern
									</span>
									<span className="block font-sans text-xs tracking-wider text-brand-dark/65 uppercase mt-1">
										Local Atelier
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Flavors Section */}
			<section className="py-20 md:py-28" id="flavors">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("flavors.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("flavors.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Flavor Cards */}
						{[
							{ key: "medovyk" as const, icon: "🍯", bg: "bg-amber-50/50" },
							{ key: "pistachio" as const, icon: "🌱", bg: "bg-emerald-50/50" },
							{ key: "caramel" as const, icon: "🍫", bg: "bg-stone-50/50" },
							{ key: "mango" as const, icon: "🥭", bg: "bg-orange-50/50" },
						].map((flavor) => (
							<div
								key={flavor.key}
								className={`p-8 rounded-3xl border border-brand-gold/10 hover:border-brand-gold/30 shadow-sm hover:shadow-md transition-all duration-300 text-left ${flavor.bg} group flex flex-col justify-between`}
							>
								<div>
									<span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300 w-fit">
										{flavor.icon}
									</span>
									<h4 className="font-serif text-xl font-bold text-brand-dark mb-2">
										{t(`flavors.${flavor.key}.name`)}
									</h4>
									<p className="font-sans text-sm text-brand-dark/70 leading-relaxed">
										{t(`flavors.${flavor.key}.desc`)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section
				className="py-20 md:py-28 bg-white/40 border-y border-brand-gold/10"
				id="gallery"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("gallery.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("gallery.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto animate-fade-in"></div>
					</div>

					{/* Gallery Filter Buttons */}
					<div className="flex flex-wrap justify-center gap-3 mb-12">
						{[
							{ id: "all", label: "All Creations" },
							{ id: "wedding", label: t("gallery.wedding") },
							{ id: "birthday", label: t("gallery.birthday") },
							{ id: "bento", label: t("gallery.bento") },
						].map((tab) => (
							<button
								key={tab.id}
								className={`px-5 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
									activeCategory === tab.id
										? "bg-brand-dark text-brand-cream"
										: "border border-brand-dark/10 text-brand-dark/75 hover:bg-brand-champagne/45"
								}`}
								onClick={() => {
									setActiveCategory(tab.id);
								}}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Gallery Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredGallery.map((item) => (
							<div
								key={item.id}
								className="group relative overflow-hidden rounded-3xl border border-brand-gold/15 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col animate-fade-in"
							>
								<div className="overflow-hidden aspect-square relative bg-brand-champagne/30">
									<img
										alt={item.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
										src={item.image}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
								<div className="p-6 text-left flex-grow flex flex-col justify-between">
									<div>
										<h4 className="font-serif text-lg font-bold text-brand-dark">
											{item.title}
										</h4>
										<p className="font-sans text-xs text-brand-dark/65 mt-1 leading-relaxed">
											{item.desc}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-20 md:py-28" id="prices">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("prices.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("prices.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
					</div>

					<PriceGuideSection />
				</div>
			</section>

			{/* Reviews Section */}
			<section
				className="py-20 md:py-28 bg-white/40 border-y border-brand-gold/10"
				id="reviews"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("reviews.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("reviews.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
					</div>

					<ReviewsSection />
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20 md:py-28" id="faq">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("faq.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("faq.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
					</div>

					<FaqSection />
				</div>
			</section>

			{/* Inquiry Form Section */}
			<section
				className="py-20 md:py-28 bg-white/40 border-t border-brand-gold/10"
				id="inquiry"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
						<h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
							{t("order.title")}
						</h2>
						<h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
							{t("order.subtitle")}
						</h3>
						<div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
					</div>

					<CakeInquiryForm />
				</div>
			</section>

			{/* Footer Section */}
			<footer className="bg-brand-dark text-brand-cream pt-16 pb-8 border-t border-brand-gold/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">
						{/* Brand column */}
						<div className="space-y-4">
							<span className="font-serif text-2xl tracking-widest text-brand-cream font-semibold">
								YEVHENIIA'S
							</span>
							<p className="font-sans text-[11px] tracking-[0.2em] text-brand-accent uppercase -mt-2 font-bold">
								Cake Atelier • Bern
							</p>
							<p className="font-sans text-sm text-brand-cream/60 leading-relaxed max-w-sm">
								{t("footer.tagline")}
							</p>
						</div>

						{/* Contact details */}
						<div className="space-y-4">
							<h4 className="font-serif text-lg font-semibold tracking-wider text-brand-cream">
								{t("nav.contact")}
							</h4>
							<ul className="space-y-3 font-sans text-sm text-brand-cream/70">
								<li className="flex items-center gap-3">
									<MapPinIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
									<span>Bern, Switzerland</span>
								</li>
								<li className="flex items-center gap-3">
									<EnvelopeIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
									<a
										className="hover:text-brand-gold transition-colors"
										href="mailto:yevheniia@cakeatelier.ch"
									>
										yevheniia@cakeatelier.ch
									</a>
								</li>
								<li className="flex items-center gap-3">
									<PhoneIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
									<a
										className="hover:text-brand-gold transition-colors"
										href="tel:+41790000000"
									>
										+41 79 000 00 00
									</a>
								</li>
							</ul>
						</div>

						{/* Custom styled map placeholder representing the premium brand */}
						<div className="space-y-4">
							<h4 className="font-serif text-lg font-semibold tracking-wider text-brand-cream">
								Location
							</h4>
							<div className="w-full h-36 bg-white/5 rounded-2xl border border-brand-gold/10 overflow-hidden relative group">
								{/* Clean minimalist abstract map background */}
								<div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
									{/* Decorative map lines */}
									<div className="absolute inset-0 opacity-15">
										<svg
											height="100%"
											width="100%"
											xmlns="http://www.w3.org/2000/svg"
										>
											<line
												stroke="white"
												strokeWidth="1"
												x1="0"
												x2="300"
												y1="30"
												y2="30"
											/>
											<line
												stroke="white"
												strokeWidth="1"
												x1="50"
												x2="50"
												y1="0"
												y2="150"
											/>
											<line
												stroke="white"
												strokeWidth="1"
												x1="120"
												x2="120"
												y1="0"
												y2="150"
											/>
											<line
												stroke="white"
												strokeWidth="1"
												x1="0"
												x2="300"
												y1="100"
												y2="100"
											/>
											<circle
												cx="120"
												cy="100"
												fill="none"
												r="40"
												stroke="white"
												strokeWidth="1"
											/>
										</svg>
									</div>
									<div className="relative text-center p-4">
										<MapPinIcon className="h-8 w-8 text-brand-gold mx-auto mb-1 animate-bounce" />
										<span className="block font-sans text-xs font-semibold text-brand-cream/80 tracking-wider">
											Atelier in Bern
										</span>
										<span className="block font-sans text-[10px] text-brand-cream/50 mt-0.5">
											Collection by appointment
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Copyright */}
					<div className="pt-8 border-t border-brand-gold/10 text-center font-sans text-xs text-brand-cream/45">
						<p>
							&copy; {new Date().getFullYear()} Yevheniia's Cake Atelier.{" "}
							{t("footer.rights")}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};
