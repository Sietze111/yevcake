import { describe, expect, it } from "vitest";
import { createGalleryItems, type GalleryCategory } from "./galleryData";

const EXPECTED_CATEGORIES: Array<GalleryCategory> = [
	"wedding",
	"birthday",
	"bento",
];

describe("createGalleryItems", () => {
	const items = createGalleryItems();

	it("creates a non-empty list with unique ids", () => {
		expect(items.length).toBeGreaterThan(0);
		const ids = items.map((item) => item.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("only uses known categories and covers each of them", () => {
		const categories = new Set(items.map((item) => item.category));
		expect([...categories].sort()).toEqual([...EXPECTED_CATEGORIES].sort());
	});

	it("provides remote images and non-empty titles", () => {
		for (const item of items) {
			expect(item.image.startsWith("https://")).toBe(true);
			expect(item.title.length).toBeGreaterThan(0);
		}
	});
});
