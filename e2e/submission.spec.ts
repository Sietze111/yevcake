import { expect, test } from "@playwright/test";

const futureDate = (): string => {
	const date = new Date();
	date.setDate(date.getDate() + 10);
	return date.toISOString().slice(0, 10);
};

test("full inquiry flow submits and shows the success message", async ({
	page,
}) => {
	// Safety net: never let a test submission reach a real backend
	await page.route("**/api.web3forms.com/**", (route) =>
		route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({ success: true }),
		})
	);

	await page.goto("/");

	const servings = page.locator("#inquiry-servings");
	await servings.fill("");
	await servings.fill("20");
	await page.locator("#inquiry-occasion").selectOption({ label: "Birthday" });
	await page
		.locator("#inquiry-flavor")
		.selectOption({ label: "Pistachio & Raspberry" });
	await page
		.locator("#inquiry-design-theme")
		.fill("Pastel colors with flowers");

	await page.getByRole("button", { name: "Continue" }).click();

	await page.locator("#inquiry-date").fill(futureDate());
	await page
		.locator("#inquiry-timeslot")
		.selectOption({ label: "09:00 - 11:00" });

	await page.getByRole("button", { name: "Continue" }).click();

	await page.locator("#inquiry-name").fill("E2E Tester");
	await page.locator("#inquiry-email").fill("e2e@example.ch");
	await page.locator("#inquiry-phone").fill("+41 79 000 00 00");

	await page.getByRole("button", { name: "Submit Order Inquiry" }).click();

	await expect(
		page.getByRole("heading", { name: /Inquiry Submitted Successfully/i })
	).toBeVisible();
});
