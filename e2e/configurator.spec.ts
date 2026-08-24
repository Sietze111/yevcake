import { expect, test } from "@playwright/test";

test("configurator sends the designed cake into the inquiry form", async ({
	page,
}) => {
	await page.goto("/#configurator");

	const configurator = page.locator("#configurator");
	await expect(
		configurator.getByText("Cake Designer", { exact: true })
	).toBeVisible();

	await configurator
		.getByRole("button", { name: /wedding centerpiece/i })
		.click();
	await configurator
		.getByRole("button", { name: /pistachio & raspberry/i })
		.click();
	await configurator.getByRole("button", { name: "Sky Blue" }).click();
	await configurator
		.getByLabel("Inscription on the cake")
		.fill("For Anna & Ben");

	await expect(configurator.getByText("CHF 660")).toBeVisible();

	await page
		.getByRole("link", { name: "Send this cake to my inquiry" })
		.click();

	await expect(page.locator("#inquiry-occasion")).toHaveValue("wedding");
	await expect(page.locator("#inquiry-servings")).toHaveValue("55");
	await expect(page.locator("#inquiry-frosting-color")).toHaveValue("sky");
	await expect(page.locator("#inquiry-topper")).toHaveValue("flowers");
	await expect(page.locator("#inquiry-design-theme")).toHaveValue(
		/wedding centerpiece.*pistachio & raspberry.*sky blue/isu
	);
	await expect(page.locator("#inquiry-inscription")).toHaveValue(
		"For Anna & Ben"
	);
});
