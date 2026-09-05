import type { OccasionValue } from "../store/inquiryStore";

export type RateKey = "wedding" | "celebration" | "bento" | "cupcakes";

export interface Rate {
	perServing: number | null;
	flat: number | null;
	servingsMin: number | null;
	defaultServings: number;
	occasion: OccasionValue;
}

export const RATES: Record<RateKey, Rate> = {
	wedding: {
		perServing: 12,
		flat: null,
		servingsMin: null,
		defaultServings: 55,
		occasion: "wedding",
	},
	celebration: {
		perServing: 9.5,
		flat: null,
		servingsMin: null,
		defaultServings: 15,
		occasion: "birthday",
	},
	bento: {
		perServing: null,
		flat: 35,
		servingsMin: 2,
		defaultServings: 2,
		occasion: "bento",
	},
	cupcakes: {
		perServing: 4.5,
		flat: null,
		servingsMin: 6,
		defaultServings: 6,
		occasion: "other",
	},
};

export const RATE_KEYS: Array<RateKey> = [
	"wedding",
	"celebration",
	"bento",
	"cupcakes",
];

// Canonical orderable servings band (must match the inquiry form's zod schema).
export const SERVINGS_MIN = 5;
export const SERVINGS_MAX = 200;

export type OccasionLabelKey =
	| "gallery.wedding"
	| "gallery.birthday"
	| "gallery.bento"
	| "prices.cupcakes.name";

export const OCCASION_LABEL_KEYS: Record<RateKey, OccasionLabelKey> = {
	wedding: "gallery.wedding",
	celebration: "gallery.birthday",
	bento: "gallery.bento",
	cupcakes: "prices.cupcakes.name",
};
