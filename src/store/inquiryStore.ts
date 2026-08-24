import { create } from "zustand";

export type OccasionValue = "wedding" | "birthday" | "bento" | "other";

interface InquiryState {
	occasion: OccasionValue | null;
	servings: number | null;
	version: number;
	preselectOccasion: (occasion: OccasionValue, servings?: number) => void;
}

export const useInquiryStore = create<InquiryState>()((set) => ({
	occasion: null,
	servings: null,
	version: 0,
	preselectOccasion: (occasion, servings): void => {
		set((state) => ({
			occasion,
			servings: servings ?? state.servings,
			version: state.version + 1,
		}));
	},
}));
