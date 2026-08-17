import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Navbar } from "../components/layout/Navbar";
import { CakeInquiryForm } from "../components/forms/CakeInquiryForm";
import { PriceGuideSection } from "../components/ui/PriceGuideSection";
import { FaqSection } from "../components/ui/FaqSection";
import { ReviewsSection } from "../components/ui/ReviewsSection";
import {
	MapPinIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";

faker.seed(19101993);

export const Home = (): FunctionComponent => {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<string>("all");

	const galleryItems = useMemo(() => {
		const categories = ["wedding", "birthday", "bento"];

		const images = [
			"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&h=600&q=80",
			"https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&h=600&q=80",
		];

		return Array.from({ length: 9 }).map((_, index) => {
			const category = categories[index % categories.length];

			return {
				id: index,
				category,
				image: images[index],
				title: `${faker.word.adjective()} ${
					category === "bento"
						? "Bento"
						: category === "wedding"
							? "Wedding"
							: "Celebration"
				} Cake`,
				desc: `Artisanal creation with fine ${faker.helpers.arrayElement([
					"chocolate",
					"vanilla",
					"hazelnut",
					"pistachio",
					"lemon",
					"raspberry",
					"salted caramel",
				])} notes.`,
			};
		});
	}, []);

	const filteredGallery = useMemo(() => {
		if (activeCategory === "all") return galleryItems;
		return galleryItems.filter((item) => item.category === activeCategory);
	}, [activeCategory, galleryItems]);

	return (
		<div className="bg-nb-cream text-nb-black min-h-screen font-sans overflow-x-hidden">
			<Navbar />

			{/* ── HERO ── */}
			<section
				className="pt-28 pb-16 md:pt-36 md:pb-24 border-b-4 border-nb-black"
				id="home"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left text */}
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

						{/* Right image */}
						<div className="relative">
							<div className="border-4 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] overflow-hidden aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-300">
								<img
									alt="Bespoke handmade cake by Yevheniia in Bern"
									className="w-full h-full object-cover"
									src="/cake_hero.jpg"
								/>
							</div>
							<div className="absolute -bottom-4 -left-4 nb-tag bg-nb-mint text-nb-black">
								✨ Handmade in Bern
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── ABOUT ── */}
			<section
				className="py-20 md:py-28 bg-nb-lilac border-b-4 border-nb-black"
				id="about"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Image */}
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

						{/* Text */}
						<div className="space-y-6 order-1 lg:order-2">
							<div className="nb-tag bg-nb-yellow w-fit">
								{t("about.subtitle")}
							</div>
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
							{/* Stats row */}
							<div className="flex gap-6 pt-4 border-t-3 border-nb-black">
								<div className="border-3 border-nb-black px-4 py-3 bg-nb-yellow shadow-[3px_3px_0px_0px_#0D0D0D]">
									<span className="block font-mono text-3xl font-bold">
										1993
									</span>
									<span className="block font-mono text-[9px] uppercase tracking-widest mt-0.5">
										Born in Ukraine
									</span>
								</div>
								<div className="border-3 border-nb-black px-4 py-3 bg-nb-mint shadow-[3px_3px_0px_0px_#0D0D0D]">
									<span className="block font-mono text-3xl font-bold">
										Bern
									</span>
									<span className="block font-mono text-[9px] uppercase tracking-widest mt-0.5">
										Atelier Location
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── FLAVORS ── */}
			<section
				className="py-20 md:py-28 border-b-4 border-nb-black"
				id="flavors"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-12">
						<div className="nb-tag bg-nb-yellow w-fit mb-4">
							{t("flavors.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("flavors.subtitle")}
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[
							{ key: "medovyk" as const, icon: "🍯", bg: "bg-nb-yellow" },
							{ key: "pistachio" as const, icon: "🌱", bg: "bg-nb-mint" },
							{ key: "caramel" as const, icon: "🍫", bg: "bg-nb-peach" },
							{ key: "mango" as const, icon: "🥭", bg: "bg-nb-pink" },
						].map((flavor) => (
							<div
								key={flavor.key}
								className={`p-8 border-3 border-nb-black shadow-[5px_5px_0px_0px_#0D0D0D] text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0D0D0D] transition-all duration-150 ${flavor.bg}`}
							>
								<span className="text-4xl block mb-4">{flavor.icon}</span>
								<h3 className="font-mono text-xl font-bold text-nb-black uppercase mb-2">
									{t(`flavors.${flavor.key}.name`)}
								</h3>
								<p className="font-sans text-sm text-nb-black/75 leading-relaxed">
									{t(`flavors.${flavor.key}.desc`)}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── GALLERY ── */}
			<section
				className="py-20 md:py-28 bg-nb-blue border-b-4 border-nb-black"
				id="gallery"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-10">
						<div className="nb-tag bg-nb-black text-nb-yellow w-fit mb-4">
							{t("gallery.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("gallery.subtitle")}
						</h2>
					</div>

					{/* Filter tabs */}
					<div className="flex flex-wrap gap-2 mb-10">
						{[
							{ id: "all", label: "All Creations" },
							{ id: "wedding", label: t("gallery.wedding") },
							{ id: "birthday", label: t("gallery.birthday") },
							{ id: "bento", label: t("gallery.bento") },
						].map((tab) => (
							<button
								key={tab.id}
								className={`nb-tag cursor-pointer transition-colors duration-100 ${
									activeCategory === tab.id
										? "bg-nb-black text-nb-yellow"
										: "bg-nb-white text-nb-black hover:bg-nb-yellow"
								}`}
								onClick={() => {
									setActiveCategory(tab.id);
								}}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredGallery.map((item) => (
							<div
								key={item.id}
								className="nb-card group overflow-hidden animate-fade-in"
							>
								<div className="overflow-hidden aspect-square border-b-3 border-nb-black">
									<img
										alt={item.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
										src={item.image}
									/>
								</div>
								<div className="p-5 bg-nb-cream">
									<h4 className="font-mono text-sm font-bold text-nb-black uppercase">
										{item.title}
									</h4>
									<p className="font-sans text-xs text-nb-black/60 mt-1 leading-relaxed">
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── PRICES ── */}
			<section
				className="py-20 md:py-28 border-b-4 border-nb-black"
				id="prices"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-12">
						<div className="nb-tag bg-nb-mint w-fit mb-4">
							{t("prices.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("prices.subtitle")}
						</h2>
					</div>
					<PriceGuideSection />
				</div>
			</section>

			{/* ── REVIEWS ── */}
			<section
				className="py-20 md:py-28 bg-nb-pink border-b-4 border-nb-black"
				id="reviews"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-12">
						<div className="nb-tag bg-nb-black text-nb-yellow w-fit mb-4">
							{t("reviews.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("reviews.subtitle")}
						</h2>
					</div>
					<ReviewsSection />
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="py-20 md:py-28 border-b-4 border-nb-black" id="faq">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-12">
						<div className="nb-tag bg-nb-yellow w-fit mb-4">
							{t("faq.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("faq.subtitle")}
						</h2>
					</div>
					<FaqSection />
				</div>
			</section>

			{/* ── ORDER FORM ── */}
			<section
				className="py-20 md:py-28 bg-nb-lilac border-b-4 border-nb-black"
				id="inquiry"
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-12">
						<div className="nb-tag bg-nb-black text-nb-yellow w-fit mb-4">
							{t("order.title")}
						</div>
						<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
							{t("order.subtitle")}
						</h2>
					</div>
					<CakeInquiryForm />
				</div>
			</section>

			{/* ── FOOTER ── */}
			<footer className="bg-nb-black text-nb-cream pt-16 pb-8">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
						{/* Brand */}
						<div className="space-y-3">
							<span className="block font-mono text-2xl font-bold text-nb-yellow uppercase">
								YEVHENIIA&#39;S
							</span>
							<span className="block font-mono text-[10px] tracking-[0.2em] text-nb-yellow/70 uppercase">
								Cake Atelier · Bern
							</span>
							<p className="font-sans text-sm text-nb-cream/60 leading-relaxed max-w-sm">
								{t("footer.tagline")}
							</p>
						</div>

						{/* Contact */}
						<div className="space-y-4">
							<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
								{t("nav.contact")}
							</h4>
							<ul className="space-y-3 font-sans text-sm text-nb-cream/70">
								<li className="flex items-center gap-3">
									<MapPinIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
									<span>Bern, Switzerland</span>
								</li>
								<li className="flex items-center gap-3">
									<EnvelopeIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
									<a
										className="hover:text-nb-yellow transition-colors"
										href="mailto:yevheniia@cakeatelier.ch"
									>
										yevheniia@cakeatelier.ch
									</a>
								</li>
								<li className="flex items-center gap-3">
									<PhoneIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
									<a
										className="hover:text-nb-yellow transition-colors"
										href="tel:+41790000000"
									>
										+41 79 000 00 00
									</a>
								</li>
							</ul>
						</div>

						{/* Map placeholder */}
						<div className="space-y-4">
							<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
								Location
							</h4>
							<div className="border-3 border-nb-yellow bg-nb-black/50 p-6 flex flex-col items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE566]">
								<MapPinIcon className="h-10 w-10 text-nb-yellow animate-bounce" />
								<span className="font-mono text-xs font-bold text-nb-yellow uppercase tracking-wider">
									Atelier in Bern
								</span>
								<span className="font-mono text-[10px] text-nb-cream/50">
									Collection by appointment
								</span>
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div className="pt-8 border-t-2 border-nb-cream/20 text-center font-mono text-xs text-nb-cream/40 uppercase">
						<p>
							&copy; {new Date().getFullYear()} Yevheniia&#39;s Cake Atelier.{" "}
							{t("footer.rights")}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};
