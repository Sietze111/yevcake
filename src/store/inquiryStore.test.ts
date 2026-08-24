import { beforeEach, describe, expect, it } from "vitest";
import { useInquiryStore } from "./inquiryStore";

describe("inquiryStore", () => {
	beforeEach(() => {
		useInquiryStore.setState({ occasion: null, version: 0 });
	});

	it("starts with no preselected occasion", () => {
		const state = useInquiryStore.getState();
		expect(state.occasion).toBeNull();
		expect(state.version).toBe(0);
	});

	it("preselectOccasion stores the occasion and bumps the version", () => {
		useInquiryStore.getState().preselectOccasion("wedding");

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("wedding");
		expect(state.version).toBe(1);
	});

	it("repeated preselections keep incrementing the version", () => {
		useInquiryStore.getState().preselectOccasion("bento");
		useInquiryStore.getState().preselectOccasion("birthday");

		const state = useInquiryStore.getState();
		expect(state.occasion).toBe("birthday");
		expect(state.version).toBe(2);
	});
});
