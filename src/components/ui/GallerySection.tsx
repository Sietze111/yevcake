import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";
import { createGalleryItems, type GalleryFilter } from "./galleryData";

const FILTER_TAB_IDS: Array<GalleryFilter> = [
	"all",
	"wedding",
	"birthday",
	"bento",
];

export const GallerySection = (): FunctionComponent => {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<GalleryFilter>("all");

	const galleryItems = useMemo(() => createGalleryItems(), []);

	const filteredGallery = useMemo(() => {
		if (activeCategory === "all") return galleryItems;
		return galleryItems.filter((item) => item.category === activeCategory);
	}, [activeCategory, galleryItems]);

	const filterTabs = FILTER_TAB_IDS.map((id) => ({
		id,
		label: id === "all" ? "All Creations" : t(`gallery.${id}`),
	}));

	return (
		<ContentSection background="bg-nb-blue" id="gallery">
			<SectionHeading
				tag={t("gallery.title")}
				tagClassName="bg-nb-black text-nb-yellow"
				title={t("gallery.subtitle")}
			/>

			<div className="flex flex-wrap gap-2 mb-10">
				{filterTabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
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
		</ContentSection>
	);
};
