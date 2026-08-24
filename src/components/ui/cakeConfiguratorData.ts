import type { OccasionValue } from "../../store/inquiryStore";

export type CakeSizeId = "bento" | "single" | "duo" | "wedding";
export type FlavorId = "medovyk" | "pistachio" | "caramel" | "mango";
export type FrostingColorId =
	"cream" | "blush" | "mint" | "sky" | "lilac" | "choco";
export type TopperId = "none" | "flowers" | "candles" | "berries";

export interface CakeSizeOption {
	id: CakeSizeId;
	occasion: OccasionValue;
	servings: number;
	perServing: number | null;
	flat: number | null;
	tiers: 1 | 2 | 3;
}

export const CAKE_SIZES: Array<CakeSizeOption> = [
	{
		id: "bento",
		occasion: "bento",
		servings: 2,
		perServing: null,
		flat: 35,
		tiers: 1,
	},
	{
		id: "single",
		occasion: "birthday",
		servings: 15,
		perServing: 9.5,
		flat: null,
		tiers: 1,
	},
	{
		id: "duo",
		occasion: "birthday",
		servings: 30,
		perServing: 9.5,
		flat: null,
		tiers: 2,
	},
	{
		id: "wedding",
		occasion: "wedding",
		servings: 55,
		perServing: 12,
		flat: null,
		tiers: 3,
	},
];

export interface FrostingColor {
	id: FrostingColorId;
	value: string;
}

export const FROSTING_COLORS: Array<FrostingColor> = [
	{ id: "cream", value: "#FFE9B8" },
	{ id: "blush", value: "#FFC7DE" },
	{ id: "mint", value: "#A9E8C4" },
	{ id: "sky", value: "#AFCFFF" },
	{ id: "lilac", value: "#DCC7FF" },
	{ id: "choco", value: "#7A4B2E" },
];

export const SPONGE_COLORS: Record<FlavorId, string> = {
	medovyk: "#E0A83E",
	pistachio: "#9DBE72",
	caramel: "#B0713B",
	mango: "#FFB347",
};

export const FLAVOR_ICONS: Record<FlavorId, string> = {
	medovyk: "🍯",
	pistachio: "🌱",
	caramel: "🍫",
	mango: "🥭",
};

export const CAKE_FLAVORS: Array<FlavorId> = [
	"medovyk",
	"pistachio",
	"caramel",
	"mango",
];

export const TOPPER_OPTIONS: Array<TopperId> = [
	"none",
	"flowers",
	"candles",
	"berries",
];

export const INSCRIPTION_MAX_LENGTH = 24;

export const calculateCakeEstimate = (size: CakeSizeOption): number => {
	if (size.flat !== null) return size.flat;
	return Math.round((size.perServing ?? 0) * size.servings);
};
