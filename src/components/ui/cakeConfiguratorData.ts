import { RATES } from "../../common/pricing";
import type { OccasionValue } from "../../store/inquiryStore";

export type TierId = 1 | 2 | 3;

export type FlavorId =
	| "medovyk"
	| "pistachio"
	| "caramel"
	| "mango"
	| "vanilla"
	| "redvelvet"
	| "lemon"
	| "coffee"
	| "chocolate"
	| "coconut"
	| "matcha"
	| "blueberry";
export type TopperId = "none" | "flowers" | "candles" | "berries";

export interface CakeTierOption {
	id: TierId;
	key: "celebration" | "wedding";
	occasion: OccasionValue;
	minServings: number;
	maxServings: number;
	defaultServings: number;
}

const CELEBRATION_RATE = RATES.celebration;
const WEDDING_RATE = RATES.wedding;

export const CAKE_TIERS: Array<CakeTierOption> = [
	{
		id: 1,
		key: "celebration",
		occasion: CELEBRATION_RATE.occasion,
		minServings: 5,
		maxServings: 30,
		defaultServings: 15,
	},
	{
		id: 2,
		key: "celebration",
		occasion: CELEBRATION_RATE.occasion,
		minServings: 20,
		maxServings: 60,
		defaultServings: 30,
	},
	{
		id: 3,
		key: "wedding",
		occasion: WEDDING_RATE.occasion,
		minServings: 40,
		maxServings: 150,
		defaultServings: 55,
	},
];

export const TIER_BY_ID: Record<TierId, CakeTierOption> = CAKE_TIERS.reduce(
	(accumulator, tier) => {
		accumulator[tier.id] = tier;
		return accumulator;
	},
	{} as Record<TierId, CakeTierOption>
);

export const SPONGE_COLORS: Record<FlavorId, string> = {
	medovyk: "#E0A83E",
	pistachio: "#9DBE72",
	caramel: "#B0713B",
	mango: "#FFB347",
	vanilla: "#F4E7CD",
	redvelvet: "#A8546B",
	lemon: "#F7D44B",
	coffee: "#7A5230",
	chocolate: "#5B3A24",
	coconut: "#EED2A3",
	matcha: "#A3C37E",
	blueberry: "#7E6AA0",
};

export const FLAVOR_ICONS: Record<FlavorId, string> = {
	medovyk: "🍯",
	pistachio: "🌱",
	caramel: "🍫",
	mango: "🥭",
	vanilla: "🍦",
	redvelvet: "🍰",
	lemon: "🍋",
	coffee: "☕",
	chocolate: "🟤",
	coconut: "🥥",
	matcha: "🍵",
	blueberry: "🫐",
};

export const CAKE_FLAVORS: Array<FlavorId> = [
	"medovyk",
	"pistachio",
	"caramel",
	"mango",
	"vanilla",
	"redvelvet",
	"lemon",
	"coffee",
	"chocolate",
	"coconut",
	"matcha",
	"blueberry",
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

export const FROSTING_SHELL_COLOR = "#FFE9B8";

export const calculateCakeEstimate = (
	tier: CakeTierOption,
	servings: number
): number => {
	const effectiveServings = Math.min(
		Math.max(servings, tier.minServings),
		tier.maxServings
	);
	const rate = RATES[tier.key];
	if (rate.perServing === null) return 0;
	return Math.round(rate.perServing * effectiveServings);
};
