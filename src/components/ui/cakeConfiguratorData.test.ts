import { describe, expect, it } from "vitest";
import {
	CAKE_FLAVORS,
	CAKE_SIZES,
	FLAVOR_ICONS,
	FROSTING_COLORS,
	INSCRIPTION_MAX_LENGTH,
	SPONGE_COLORS,
	TOPPER_OPTIONS,
	calculateCakeEstimate,
} from "./cakeConfiguratorData";
import type { OccasionValue } from "../../store/inquiryStore";

const VALID_OCCASIONS: Array<OccasionValue> = [
	"wedding",
	"birthday",
	"bento",
	"other",
];

describe("cakeConfiguratorData", () => {
	it("defines unique size ids with valid occasions", () => {
		const ids = CAKE_SIZES.map((size) => size.id);
		expect(new Set(ids).size).toBe(CAKE_SIZES.length);
		for (const size of CAKE_SIZES) {
			expect(VALID_OCCASIONS).toContain(size.occasion);
			expect(size.servings).toBeGreaterThan(0);
		}
	});

	it("calculates estimates with flat pricing for bento", () => {
		const bento = CAKE_SIZES.find((size) => size.id === "bento");
		expect(bento).toBeDefined();
		expect(calculateCakeEstimate(bento as NonNullable<typeof bento>)).toBe(35);
	});

	it("calculates per-serving estimates for tiered cakes", () => {
		const wedding = CAKE_SIZES.find((size) => size.id === "wedding");
		expect(wedding).toBeDefined();
		expect(calculateCakeEstimate(wedding as NonNullable<typeof wedding>)).toBe(
			660
		);
	});

	it("provides a hex value for every frosting color", () => {
		expect(FROSTING_COLORS.length).toBeGreaterThan(3);
		for (const color of FROSTING_COLORS) {
			expect(color.value).toMatch(/^#[0-9A-Fa-f]{6}$/u);
		}
	});

	it("maps sponge colors and icons for every flavor option", () => {
		for (const flavor of CAKE_FLAVORS) {
			expect(SPONGE_COLORS[flavor]).toMatch(/^#/u);
			expect(FLAVOR_ICONS[flavor].length).toBeGreaterThan(0);
		}
	});

	it("keeps toppers and the inscription as separate concerns", () => {
		expect(TOPPER_OPTIONS).not.toContain("message");
		expect(INSCRIPTION_MAX_LENGTH).toBeGreaterThan(4);
	});
});
