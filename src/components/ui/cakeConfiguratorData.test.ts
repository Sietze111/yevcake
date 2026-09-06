import { describe, expect, it } from "vitest";
import {
	CAKE_FLAVORS,
	CAKE_TIERS,
	FLAVOR_ICONS,
	FROSTING_SHELL_COLOR,
	SPONGE_COLORS,
	TIER_BY_ID,
	TOPPER_OPTIONS,
	calculateCakeEstimate,
} from "./cakeConfiguratorData";
import { RATES } from "../../common/pricing";
import type { OccasionValue } from "../../store/inquiryStore";

const VALID_OCCASIONS: Array<OccasionValue> = [
	"wedding",
	"birthday",
	"bento",
	"other",
];

describe("cakeConfiguratorData", () => {
	it("defines tiers with unique ids and valid occasions", () => {
		const ids = CAKE_TIERS.map((tier) => tier.id);
		expect(new Set(ids).size).toBe(CAKE_TIERS.length);
		expect(CAKE_TIERS.length).toBe(3);
		for (const tier of CAKE_TIERS) {
			expect(VALID_OCCASIONS).toContain(tier.occasion);
			expect(tier.minServings).toBeGreaterThan(0);
			expect(tier.maxServings).toBeGreaterThan(tier.minServings);
			expect(tier.defaultServings).toBeGreaterThanOrEqual(tier.minServings);
			expect(tier.defaultServings).toBeLessThanOrEqual(tier.maxServings);
		}
	});

	it("maps every tier id to a tier option", () => {
		for (const tier of CAKE_TIERS) {
			expect(TIER_BY_ID[tier.id]).toBe(tier);
		}
	});

	it("calculates per-serving estimates within the tier range", () => {
		const tier = TIER_BY_ID[2];
		const rate = RATES[tier.key];
		expect(rate.perServing).not.toBeNull();
		const estimate = calculateCakeEstimate(tier, tier.defaultServings);
		expect(estimate).toBe(
			Math.round((rate.perServing ?? 0) * tier.defaultServings)
		);
	});

	it("clamps the estimate to the tier min and max servings", () => {
		const tier = TIER_BY_ID[3];
		const rate = RATES[tier.key];
		expect(calculateCakeEstimate(tier, 0)).toBe(
			Math.round((rate.perServing ?? 0) * tier.minServings)
		);
		expect(calculateCakeEstimate(tier, 99999)).toBe(
			Math.round((rate.perServing ?? 0) * tier.maxServings)
		);
	});

	it("shares its pricing with the global rate table (single source of truth)", () => {
		for (const tier of CAKE_TIERS) {
			const rate = RATES[tier.key];
			expect(rate.perServing).not.toBeNull();
		}
	});

	it("provides a hex shell colour for the frosted preview", () => {
		expect(FROSTING_SHELL_COLOR).toMatch(/^#[0-9A-Fa-f]{6}$/u);
	});

	it("provides sponge colors and icons for every one of the 12 flavors", () => {
		expect(CAKE_FLAVORS.length).toBe(12);
		expect(new Set(CAKE_FLAVORS).size).toBe(CAKE_FLAVORS.length);
		for (const flavor of CAKE_FLAVORS) {
			expect(SPONGE_COLORS[flavor]).toMatch(/^#/u);
			expect(FLAVOR_ICONS[flavor].length).toBeGreaterThan(0);
		}
	});

	it("keeps toppers separate from other selections", () => {
		expect(TOPPER_OPTIONS.length).toBeGreaterThan(1);
		for (const topper of TOPPER_OPTIONS) {
			expect(["none", "flowers", "candles", "berries"]).toContain(topper);
		}
	});
});
