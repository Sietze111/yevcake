import { faker } from "@faker-js/faker";

export type GalleryCategory = "wedding" | "birthday" | "bento";
export type GalleryFilter = GalleryCategory | "all";

export interface GalleryItem {
	category: GalleryCategory;
	desc: string;
	id: number;
	image: string;
	title: string;
}

const IMAGES = [
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

const CATEGORIES: Array<GalleryCategory> = ["wedding", "birthday", "bento"];

const FLAVOR_NOTES = [
	"chocolate",
	"vanilla",
	"hazelnut",
	"pistachio",
	"lemon",
	"raspberry",
	"salted caramel",
];

const categoryLabel = (category: GalleryCategory): string => {
	if (category === "bento") return "Bento";
	if (category === "wedding") return "Wedding";
	return "Celebration";
};

export const createGalleryItems = (): Array<GalleryItem> => {
	faker.seed(19101993);

	return Array.from({ length: 9 }).map((_, index) => {
		const category = CATEGORIES[index % CATEGORIES.length]!;

		return {
			id: index,
			category,
			image: IMAGES[index]!,
			title: `${faker.word.adjective()} ${categoryLabel(category)} Cake`,
			desc: `Artisanal creation with fine ${faker.helpers.arrayElement(
				FLAVOR_NOTES
			)} notes.`,
		};
	});
};
