import { create } from "zustand";

export type OccasionValue = "wedding" | "birthday" | "bento" | "other";

export interface CakePreselection {
	occasion: OccasionValue;
	servings: number;
	design: string;
	inscription?: string;
}

interface InquiryState {
	occasion: OccasionValue | null;
	servings: number | null;
	design: string | null;
	inscription: string | null;
	version: number;
	preselectOccasion: (occasion: OccasionValue, servings?: number) => void;
	preselectCake: (cake: CakePreselection) => void;
}

interface InquiryPatch {
	occasion: OccasionValue;
	servings?: number | null;
	design?: string | null;
	inscription?: string | null;
}

export const useInquiryStore = create<InquiryState>()((set) => ({
	occasion: null,
	servings: null,
	design: null,
	inscription: null,
	version: 0,
	preselectOccasion: (occasion, servings): void => {
		set((state) => ({
			occasion,
			servings: servings ?? state.servings,
			version: state.version + 1,
		}));
	},
	preselectCake: (cake): void => {
		const patch: InquiryPatch = {
			occasion: cake.occasion,
			servings: cake.servings,
			design: cake.design,
			inscription: cake.inscription ?? null,
		};
		set((state) => ({ ...patch, version: state.version + 1 }));
	},
}));
