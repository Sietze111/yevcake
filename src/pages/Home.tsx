import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Navbar } from "../components/layout/Navbar";
import { CakeInquiryForm } from "../components/forms/CakeInquiryForm";
import { PriceGuideSection } from "../components/ui/PriceGuideSection";
import { FaqSection } from "../components/ui/FaqSection";
import { ReviewsSection } from "../components/ui/ReviewsSection";
import { SparklesIcon, MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";

// Seed faker to ensure stable, realistic images
faker.seed(19101993);

export const Home = (): FunctionComponent => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Generate 9 dynamic premium-looking cake listings using faker
  const galleryItems = useMemo(() => {
    const categories = ["wedding", "birthday", "bento"];
    const keywords = ["wedding cake", "fancy birthday cake", "bento cupcake"];
    return Array.from({ length: 9 }).map((_, index) => {
      const catIndex = index % categories.length;
      const category = categories[catIndex];
      const keyword = keywords[catIndex];
      return {
        id: index,
        category,
        image: faker.image.urlLoremFlickr({ width: 600, height: 600, category: `${keyword}` }),
        title: `${faker.word.adjective()} ${category === "bento" ? "Bento" : category === "wedding" ? "Wedding" : "Celebration"} Cake`,
        desc: `Artisanal creation featuring fine ${faker.helpers.arrayElement([
          "chocolate", "vanilla", "hazelnut", "pistachio", "lemon", "raspberry", "salted caramel"
        ])} notes and premium decorations.`,
      };
    });
  }, []);

  const filteredGallery = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  return (
    <div className="bg-brand-linen text-brand-dark min-h-screen relative overflow-x-hidden selection:bg-brand-clay/30 selection:text-brand-dark font-sans">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-36 flex items-center min-h-[95vh] bg-gradient-to-b from-brand-apricot/30 via-brand-linen to-brand-linen" id="home">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blush/40 text-brand-terracotta border border-brand-clay/20 text-[10px] font-bold tracking-widest uppercase">
                <SparklesIcon className="h-3.5 w-3.5 text-brand-terracotta" />
                Bespoke Zuckeratelier
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.08] text-brand-dark tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="font-sans text-sm sm:text-base text-brand-dark/75 max-w-lg leading-relaxed font-light">
                {t("hero.subtitle")}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  className="px-9 py-4 rounded-full bg-brand-terracotta text-white hover:bg-brand-dark transition-all duration-300 font-sans text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg cursor-pointer"
                  href="#inquiry"
                >
                  {t("hero.cta")}
                </a>
                <a
                  className="px-9 py-4 rounded-full border border-brand-dark/15 text-brand-dark hover:bg-brand-apricot/40 transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
                  href="#flavors"
                >
                  {t("nav.flavors")}
                </a>
              </div>
            </div>

            {/* Right image column */}
            <div className="lg:col-span-5 relative animate-scale-in">
              <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                <div className="absolute inset-0 bg-brand-clay/25 rounded-full filter blur-3xl opacity-20 transform -translate-x-6 -translate-y-6"></div>
                <div className="relative rounded-[2rem] overflow-hidden border border-brand-gold/15 bg-white p-2.5 shadow-xl transform hover:scale-[1.01] transition-transform duration-500 aspect-[3/2]">
                  <img
                    alt="Bespoke handmade cake by Yevheniia in Bern"
                    className="w-full h-full object-cover rounded-[1.75rem]"
                    src="/cake_hero.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-brand-apricot/20 border-y border-brand-gold/10" id="about">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Polaroid-style image box */}
            <div className="lg:col-span-5 relative max-w-[360px] lg:max-w-none mx-auto w-full order-2 lg:order-1">
              <div className="absolute inset-0 bg-brand-blush/40 rounded-[2.5rem] transform rotate-2"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-brand-gold/25 bg-white p-3 shadow-lg aspect-[3/4]">
                <img
                  alt="Yevheniia - Cake Designer in Bern"
                  className="w-full h-full object-cover rounded-[2rem]"
                  src="/cake_wedding.jpg"
                />
              </div>
            </div>

            {/* Text description */}
            <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
                {t("about.subtitle")}
              </h2>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
                {t("about.title")}
              </h3>
              <div className="w-12 h-px bg-brand-terracotta/40"></div>
              <p className="font-sans text-sm sm:text-base text-brand-dark/75 leading-relaxed font-light">
                {t("about.p1")}
              </p>
              <p className="font-sans text-sm sm:text-base text-brand-dark/75 leading-relaxed font-light">
                {t("about.p2")}
              </p>

              {/* Designer signature badge */}
              <div className="pt-4 flex items-center justify-between border-t border-brand-gold/10">
                <div className="flex gap-8">
                  <div>
                    <span className="block font-serif text-3xl font-light text-brand-dark">1993</span>
                    <span className="block font-sans text-[9px] tracking-widest text-brand-dark/50 uppercase mt-1">
                      Born in Ukraine
                    </span>
                  </div>
                  <div className="border-l border-brand-gold/15 pl-8">
                    <span className="block font-serif text-3xl font-light text-brand-dark">Bern</span>
                    <span className="block font-sans text-[9px] tracking-widest text-brand-dark/50 uppercase mt-1">
                      Bespoke Atelier
                    </span>
                  </div>
                </div>
                {/* Cute cursive styled signature representing bespoke business */}
                <div className="text-right">
                  <span className="font-serif italic text-3xl text-brand-terracotta block select-none">
                    Yevheniia
                  </span>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-brand-dark/40 block mt-0.5">
                    Cake Atelier Owner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section className="py-24 md:py-32" id="flavors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("flavors.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("flavors.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flavor Cards */}
            {[
              { key: "medovyk" as const, icon: "🍯", bg: "bg-white/40" },
              { key: "pistachio" as const, icon: "🌱", bg: "bg-white/40" },
              { key: "caramel" as const, icon: "🍫", bg: "bg-white/40" },
              { key: "mango" as const, icon: "🥭", bg: "bg-white/40" },
            ].map((flavor) => (
              <div
                key={flavor.key}
                className={`p-8 rounded-[1.75rem] border border-brand-gold/15 shadow-sm hover:shadow-md transition-all duration-300 text-left ${flavor.bg} group flex flex-col justify-between`}
              >
                <div>
                  <span className="text-3xl mb-4 block group-hover:scale-105 transition-transform duration-300 w-fit">
                    {flavor.icon}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-brand-dark mb-2">
                    {t(`flavors.${flavor.key}.name`)}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-dark/70 leading-relaxed font-light">
                    {t(`flavors.${flavor.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-brand-apricot/20 border-y border-brand-gold/10" id="gallery">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("gallery.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("gallery.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          {/* Gallery Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", label: "All Creations" },
              { id: "wedding", label: t("gallery.wedding") },
              { id: "birthday", label: t("gallery.birthday") },
              { id: "bento", label: t("gallery.bento") },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-2 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-brand-terracotta text-white shadow-sm"
                    : "border border-brand-dark/10 text-brand-dark/70 hover:bg-brand-apricot/40"
                }`}
                onClick={() => { setActiveCategory(tab.id); }}
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
                className="group relative overflow-hidden rounded-[1.75rem] border border-brand-gold/15 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col animate-fade-in"
              >
                <div className="overflow-hidden aspect-square relative bg-brand-apricot/20">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-left flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-brand-dark">{item.title}</h4>
                    <p className="font-sans text-xs text-brand-dark/65 mt-1 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 md:py-32" id="prices">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("prices.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("prices.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          <PriceGuideSection />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 md:py-32 bg-brand-apricot/20 border-y border-brand-gold/10" id="reviews">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("reviews.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("reviews.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          <ReviewsSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32" id="faq">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("faq.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("faq.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          <FaqSection />
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 md:py-32 bg-brand-apricot/20 border-t border-brand-gold/10" id="inquiry">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-brand-terracotta">
              {t("order.title")}
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {t("order.subtitle")}
            </h3>
            <div className="w-12 h-px bg-brand-terracotta/40 mx-auto"></div>
          </div>

          <CakeInquiryForm />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-brand-dark text-brand-linen pt-20 pb-8 border-t border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left">
            {/* Brand column */}
            <div className="space-y-4">
              <span className="font-serif text-2xl tracking-widest text-brand-linen font-semibold">
                YEVHENIIA'S
              </span>
              <p className="font-sans text-[10px] tracking-[0.2em] text-brand-gold uppercase -mt-2 font-bold">
                Cake Atelier • Bern
              </p>
              <p className="font-sans text-xs text-brand-linen/60 leading-relaxed max-w-sm font-light">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-light tracking-wider text-brand-linen">
                {t("nav.contact")}
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-brand-linen/70 font-light">
                <li className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
                  <span>Bern, Switzerland</span>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
                  <a className="hover:text-brand-gold transition-colors" href="mailto:yevheniia@cakeatelier.ch">
                    yevheniia@cakeatelier.ch
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
                  <a className="hover:text-brand-gold transition-colors" href="tel:+41790000000">
                    +41 79 000 00 00
                  </a>
                </li>
              </ul>
            </div>

            {/* Custom styled map placeholder representing the premium brand */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-light tracking-wider text-brand-linen">
                Location
              </h4>
              <div className="w-full h-36 bg-white/5 rounded-[1.25rem] border border-brand-gold/10 overflow-hidden relative group">
                {/* Clean minimalist abstract map background */}
                <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
                  {/* Decorative map lines */}
                  <div className="absolute inset-0 opacity-15">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                      <line stroke="white" strokeWidth="1" x1="0" x2="300" y1="30" y2="30" />
                      <line stroke="white" strokeWidth="1" x1="50" x2="50" y1="0" y2="150" />
                      <line stroke="white" strokeWidth="1" x1="120" x2="120" y1="0" y2="150" />
                      <line stroke="white" strokeWidth="1" x1="0" x2="300" y1="100" y2="100" />
                      <circle cx="120" cy="100" fill="none" r="40" stroke="white" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="relative text-center p-4">
                    <MapPinIcon className="h-8 w-8 text-brand-gold mx-auto mb-1 animate-bounce" />
                    <span className="block font-sans text-xs font-semibold text-brand-linen/80 tracking-wider">
                      Atelier in Bern
                    </span>
                    <span className="block font-sans text-[10px] text-brand-linen/50 mt-0.5">
                      Collection by appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-brand-gold/10 text-center font-sans text-xs text-brand-linen/40">
            <p>
              &copy; {new Date().getFullYear()} Yevheniia's Cake Atelier. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
