import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "../../common/i18n";
import { BackToTopButton } from "./BackToTopButton";

const setScrollY = (value: number): void => {
	Object.defineProperty(window, "scrollY", {
		configurable: true,
		value,
	});
};

type MockScrollTo = ReturnType<
	typeof vi.fn<(options?: ScrollToOptions) => void>
>;

type MediaQueryMock = {
	addEventListener: ReturnType<typeof vi.fn>;
	dispatchEvent: ReturnType<typeof vi.fn>;
	addListener: ReturnType<typeof vi.fn>;
	matches: boolean;
	media: string;
	removeEventListener: ReturnType<typeof vi.fn>;
	removeListener: ReturnType<typeof vi.fn>;
};

const mockMatchMedia = (matchesReduceMotion: boolean): void => {
	window.matchMedia = vi
		.fn()
		.mockImplementation((query: string): MediaQueryMock => ({
			matches: matchesReduceMotion && query.includes("prefers-reduced-motion"),
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));
};

describe("BackToTopButton", () => {
	let scrollToSpy: MockScrollTo;

	beforeEach(() => {
		mockMatchMedia(false);
		scrollToSpy = vi.fn<(options?: ScrollToOptions) => void>();
		window.scrollTo = scrollToSpy;
		setScrollY(0);
	});

	it("is hidden near the top of the page and becomes visible after scrolling", () => {
		render(<BackToTopButton />);

		const button = screen.getByRole("button");
		expect(button.className).toContain("opacity-0");

		setScrollY(500);
		fireEvent.scroll(window);

		expect(button.className).not.toContain("opacity-0");
		expect(button.className).toContain("opacity-100");
	});

	it("scrolls back to top with smooth behavior on click", () => {
		render(<BackToTopButton />);

		fireEvent.click(screen.getByRole("button"));

		expect(scrollToSpy).toHaveBeenCalledWith({
			top: 0,
			behavior: "smooth",
		});
	});

	it("respects prefers-reduced-motion when scrolling to top", () => {
		mockMatchMedia(true);

		render(<BackToTopButton />);
		fireEvent.click(screen.getByRole("button"));

		expect(scrollToSpy).toHaveBeenCalledWith({
			top: 0,
			behavior: "auto",
		});
	});
});
