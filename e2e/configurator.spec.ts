import { expect, test } from "@playwright/test";

test("configurator stack builder sends the designed cake into the inquiry form", async ({
	page,
}) => {
	await page.goto("/#configurator");

	const configurator = page.locator("#configurator");
	await expect(
		configurator.getByText("Cake Designer", { exact: true })
	).toBeVisible();

	await configurator.getByRole("button", { name: /three tiers/i }).click();

	await configurator
		.getByRole("button", { name: /dark chocolate & hazelnut/i })
		.click();

	await expect(configurator.getByText("CHF 660")).toBeVisible();

	await page
		.getByRole("link", { name: "Send this cake to my inquiry" })
		.click();

	await expect(page.locator("#inquiry-occasion")).toHaveValue("wedding");
	await expect(page.locator("#inquiry-servings")).toHaveValue("55");
	await expect(page.locator("#inquiry-flavor")).toHaveValue("chocolate");
	await expect(page.locator("#inquiry-topper")).toHaveValue("flowers");
	await expect(page.locator("#inquiry-design-theme")).toHaveValue(
		/three tiers.*dark chocolate & hazelnut.*sugar flowers/isu
	);
});
