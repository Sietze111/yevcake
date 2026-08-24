import { create } from "zustand";

export type OccasionValue = "wedding" | "birthday" | "bento" | "other";

interface InquiryState {
	occasion: OccasionValue | null;
	version: number;
	preselectOccasion: (occasion: OccasionValue) => void;
}

export const useInquiryStore = create<InquiryState>()((set) => ({
	occasion: null,
	version: 0,
	preselectOccasion: (occasion): void => {
		set((state) => ({ occasion, version: state.version + 1 }));
	},
}));
