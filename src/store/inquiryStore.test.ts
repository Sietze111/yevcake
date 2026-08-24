import { beforeEach, describe, expect, it } from "vitest";
import { useInquiryStore } from "./inquiryStore";

describe("inquiryStore", () => {
	beforeEach(() => {
		useInquiryStore.setState({ occasion: null, servings: null, version: 0 });
	});

	it("starts with no preselected occasion", () => {
		const state = useInquiryStore.getState();
		expect(state.occasion).toBeNull();
		expect(state.servings).toBeNull();
		expect(state.version).toBe(0);
	});

	it("preselectOccasion stores the occasion and bumps the version", () => {
		useInquiryStore.getState().preselectOccasion("wedding");

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("wedding");
		expect(state.servings).toBeNull();
		expect(state.version).toBe(1);
	});

	it("preselectOccasion stores servings when provided", () => {
		useInquiryStore.getState().preselectOccasion("birthday", 42);

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("birthday");
		expect(state.servings).toBe(42);
	});

	it("repeated preselections keep incrementing the version and keep prior servings", () => {
		useInquiryStore.getState().preselectOccasion("bento");
		useInquiryStore.getState().preselectOccasion("other", 12);
		useInquiryStore.getState().preselectOccasion("bento");

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("bento");
		expect(state.servings).toBe(12);
		expect(state.version).toBe(3);
	});
});
