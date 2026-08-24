import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AvailabilityCalendar } from "./AvailabilityCalendar";

const MIN_ISO = "2030-01-08";
const MAX_ISO = "2030-12-31";

describe("AvailabilityCalendar", () => {
	it("renders the month header and weekday row", () => {
		render(
			<AvailabilityCalendar
				maxISO={MAX_ISO}
				minISO={MIN_ISO}
				value=""
				onChange={() => {}}
			/>
		);

		expect(screen.getByRole("group")).toBeInTheDocument();
	});

	it("disables days before the minimum date and Sundays", () => {
		render(
			<AvailabilityCalendar
				maxISO={MAX_ISO}
				minISO={MIN_ISO}
				value=""
				onChange={() => {}}
			/>
		);

		const earlyDay = screen.getByTestId("day-2030-01-05");
		expect(earlyDay).toBeDisabled();

		const sunday = screen.getByTestId("day-2030-01-06");
		expect(sunday).toBeDisabled();

		const firstBookable = screen.getByTestId("day-2030-01-08");
		expect(firstBookable).toBeEnabled();
	});

	it("emits the selected ISO date when a bookable day is clicked", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(
			<AvailabilityCalendar
				maxISO={MAX_ISO}
				minISO={MIN_ISO}
				value=""
				onChange={handleChange}
			/>
		);

		await user.click(screen.getByTestId("day-2030-01-15"));

		expect(handleChange).toHaveBeenCalledWith("2030-01-15");
	});

	it("marks the current value as selected", () => {
		render(
			<AvailabilityCalendar
				maxISO={MAX_ISO}
				minISO={MIN_ISO}
				value="2030-03-20"
				onChange={() => {}}
			/>
		);

		expect(screen.getByTestId("day-2030-03-20")).toHaveAttribute(
			"aria-pressed",
			"true"
		);
	});

	it("blocks navigation beyond the one-year horizon", () => {
		render(
			<AvailabilityCalendar
				maxISO={MAX_ISO}
				minISO={MIN_ISO}
				value="2030-12-10"
				onChange={() => {}}
			/>
		);

		const nextMonthButton = screen.getByTestId("calendar-next");
		expect(nextMonthButton).toBeDisabled();
	});
});
