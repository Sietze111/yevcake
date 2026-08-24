import { beforeEach, describe, expect, it } from "vitest";
import { useInquiryStore } from "./inquiryStore";

describe("inquiryStore", () => {
	beforeEach(() => {
		useInquiryStore.setState({
			occasion: null,
			servings: null,
			design: null,
			inscription: null,
			version: 0,
		});
	});

	it("starts with no preselected occasion", () => {
		const state = useInquiryStore.getState();
		expect(state.occasion).toBeNull();
		expect(state.servings).toBeNull();
		expect(state.design).toBeNull();
		expect(state.inscription).toBeNull();
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

	it("preselectCake stores the full configuration in one version bump", () => {
		useInquiryStore.getState().preselectCake({
			occasion: "wedding",
			servings: 55,
			design: "3-tier, pistachio, blush pink, sugar flowers",
			inscription: "Anna & Ben",
		});

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("wedding");
		expect(state.servings).toBe(55);
		expect(state.design).toContain("pistachio");
		expect(state.inscription).toBe("Anna & Ben");
		expect(state.version).toBe(1);
	});

	it("preselectCake without inscription clears a previous one", () => {
		useInquiryStore
			.getState()
			.preselectCake({ occasion: "bento", servings: 2, design: "mini" });
		useInquiryStore
			.getState()
			.preselectCake({ occasion: "bento", servings: 3, design: "mini v2" });

		const state = useInquiryStore.getState();
		expect(state.inscription).toBeNull();
		expect(state.version).toBe(2);
	});
});
