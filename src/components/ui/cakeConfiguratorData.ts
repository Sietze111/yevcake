import { RATES } from "../../common/pricing";
import type { OccasionValue } from "../../store/inquiryStore";

export type CakeSizeId = "bento" | "single" | "duo" | "wedding";
export type FlavorId = "medovyk" | "pistachio" | "caramel" | "mango";
export type FrostingColorId =
	"cream" | "blush" | "mint" | "sky" | "lilac" | "choco";
export type TopperId = "none" | "flowers" | "candles" | "berries";

export interface CakeSizeOption {
	id: CakeSizeId;
	key: "bento" | "celebration" | "wedding";
	occasion: OccasionValue;
	servings: number;
	perServing: number | null;
	flat: number | null;
	tiers: 1 | 2 | 3;
}

const CELEBRATION_RATE = RATES.celebration;
const WEDDING_RATE = RATES.wedding;
const BENTO_RATE = RATES.bento;

export const CAKE_SIZES: Array<CakeSizeOption> = [
	{
		id: "bento",
		key: "bento",
		occasion: BENTO_RATE.occasion,
		servings: BENTO_RATE.servingsMin ?? 2,
		perServing: BENTO_RATE.perServing,
		flat: BENTO_RATE.flat,
		tiers: 1,
	},
	{
		id: "single",
		key: "celebration",
		occasion: CELEBRATION_RATE.occasion,
		servings: 15,
		perServing: CELEBRATION_RATE.perServing,
		flat: CELEBRATION_RATE.flat,
		tiers: 1,
	},
	{
		id: "duo",
		key: "celebration",
		occasion: CELEBRATION_RATE.occasion,
		servings: 30,
		perServing: CELEBRATION_RATE.perServing,
		flat: CELEBRATION_RATE.flat,
		tiers: 2,
	},
	{
		id: "wedding",
		key: "wedding",
		occasion: WEDDING_RATE.occasion,
		servings: 55,
		perServing: WEDDING_RATE.perServing,
		flat: WEDDING_RATE.flat,
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

export interface FlavorOption {
	id: FlavorId;
	icon: string;
}

export const FLAVOR_OPTIONS: Array<FlavorOption> = CAKE_FLAVORS.map((id) => ({
	id,
	icon: FLAVOR_ICONS[id],
}));

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
