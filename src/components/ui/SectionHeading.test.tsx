import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
	it("renders the tag and the title", () => {
		render(<SectionHeading tag="The Cakes" title="Our Flavors" />);

		expect(screen.getByText("The Cakes")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { level: 2, name: "Our Flavors" })
		).toBeInTheDocument();
	});

	it("applies a custom tag class name when provided", () => {
		const { container } = render(
			<SectionHeading
				tag="Gallery"
				tagClassName="bg-nb-black"
				title="Creations"
			/>
		);

		expect(container.firstChild).toContainHTML("bg-nb-black");
	});
});
