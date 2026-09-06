import { Fragment, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
} from "@headlessui/react";
import {
	XMarkIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";
import { ContentSection } from "./ContentSection";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { createGalleryItems, type GalleryFilter } from "./galleryData";

const FILTER_TAB_IDS: Array<GalleryFilter> = [
	"all",
	"wedding",
	"birthday",
	"bento",
];

const largeImage = (source: string): string =>
	source.replace("w=600&h=600", "w=1200&h=900");

export const GallerySection = (): FunctionComponent => {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<GalleryFilter>("all");
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const galleryItems = useMemo(() => createGalleryItems(), []);

	const filteredGallery = useMemo(() => {
		if (activeCategory === "all") return galleryItems;
		return galleryItems.filter((item) => item.category === activeCategory);
	}, [activeCategory, galleryItems]);

	const filterTabs = FILTER_TAB_IDS.map((id) => ({
		id,
		label: id === "all" ? t("common.allCreations") : t(`gallery.${id}`),
	}));

	const closeLightbox = useCallback((): void => {
		setSelectedId(null);
	}, []);

	const stepLightbox = useCallback(
		(direction: 1 | -1): void => {
			setSelectedId((current) => {
				if (current === null) return current;
				return (
					(current + direction + galleryItems.length) % galleryItems.length
				);
			});
		},
		[galleryItems.length]
	);

	const selectedItem =
		selectedId === null
			? null
			: (galleryItems.find((item) => item.id === selectedId) ?? null);

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
				{filteredGallery.map((item, index) => (
					<Reveal key={item.id} delay={(index % 3) * 90}>
						<button
							className="nb-card group overflow-hidden cursor-pointer text-left p-0 w-full"
							type="button"
							onClick={() => {
								setSelectedId(item.id);
							}}
						>
							<div className="overflow-hidden aspect-square">
								<img
									alt={item.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
									src={item.image}
								/>
							</div>
							<div className="p-5 bg-nb-cream">
								<h4 className="font-mono text-sm font-semibold text-nb-black">
									{item.title}
								</h4>
								<p className="font-sans font-light text-xs text-nb-black/60 mt-1 leading-relaxed">
									{item.desc}
								</p>
							</div>
						</button>
					</Reveal>
				))}
			</div>

			<Transition as={Fragment} show={selectedItem !== null}>
				<Dialog
					as="div"
					className="relative z-[70]"
					onClose={closeLightbox}
					onKeyDown={(event_: React.KeyboardEvent<HTMLDivElement>) => {
						if (event_.key === "ArrowLeft") {
							stepLightbox(-1);
						} else if (event_.key === "ArrowRight") {
							stepLightbox(1);
						}
					}}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-150"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div
							className="fixed inset-0 bg-nb-black/80"
							onClick={closeLightbox}
						/>
					</Transition.Child>

					<div className="fixed inset-0 flex items-center justify-center p-4 sm:p-8">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0 translate-y-4 scale-95"
							enterTo="opacity-100 translate-y-0 scale-100"
							leave="ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0 scale-100"
							leaveTo="opacity-0 translate-y-4 scale-95"
						>
							<DialogPanel className="max-w-3xl w-full rounded-3xl border border-nb-line bg-nb-cream shadow-[0_24px_48px_rgba(61,43,31,0.2)] overflow-hidden">
								{selectedItem && (
									<>
										<DialogTitle as="h3" className="sr-only">
											{selectedItem.title}
										</DialogTitle>
										<img
											alt={selectedItem.title}
											className="w-full aspect-[4/3] object-cover"
											src={largeImage(selectedItem.image)}
										/>
										<div className="p-6 flex items-start justify-between gap-4">
											<div>
												<h4 className="font-mono text-base font-semibold text-nb-black">
													{selectedItem.title}
												</h4>
												<p className="font-sans font-light text-xs text-nb-black/60 mt-1 leading-relaxed">
													{t("lightbox.counter", {
														current:
															galleryItems.findIndex(
																(item) => item.id === selectedItem.id
															) + 1,
														total: galleryItems.length,
													})}
												</p>
											</div>
											<button
												aria-label={t("lightbox.close")}
												className="rounded-full border border-nb-line bg-nb-pink p-2 cursor-pointer hover:bg-nb-black hover:text-nb-cream transition-colors shrink-0"
												type="button"
												onClick={closeLightbox}
											>
												<XMarkIcon aria-hidden="true" className="h-5 w-5" />
											</button>
										</div>
									</>
								)}
							</DialogPanel>
						</Transition.Child>
					</div>

					{selectedItem !== null && (
						<div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center gap-3">
							<button
								aria-label={t("lightbox.prev")}
								className="pointer-events-auto nb-btn bg-nb-yellow text-nb-black !px-4 !py-2"
								type="button"
								onClick={() => {
									stepLightbox(-1);
								}}
							>
								<ArrowLeftIcon aria-hidden="true" className="h-5 w-5" />
							</button>
							<button
								aria-label={t("lightbox.next")}
								className="pointer-events-auto nb-btn bg-nb-yellow text-nb-black !px-4 !py-2"
								type="button"
								onClick={() => {
									stepLightbox(1);
								}}
							>
								<ArrowRightIcon aria-hidden="true" className="h-5 w-5" />
							</button>
						</div>
					)}
				</Dialog>
			</Transition>
		</ContentSection>
	);
};
