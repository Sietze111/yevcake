import { expect, test } from "@playwright/test";

test.describe("home page", () => {
	test("renders the hero and core sections", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveTitle(/Cake Atelier/i);
		await expect(page.locator("#home")).toBeVisible();
		await expect(page.locator("#gallery")).toBeAttached();
		await expect(page.locator("#prices")).toBeAttached();
		await expect(page.locator("#inquiry")).toBeAttached();
	});

	test("language switcher translates the navigation", async ({ page }) => {
		await page.goto("/");

		const languageTrigger = page
			.getByRole("button", { name: /^[A-Z]{2}$/ })
			.first();
		await languageTrigger.click();
		await page.getByRole("menuitem", { name: "Deutsch" }).click();

		await expect(page.getByText("Über Yevheniia")).toBeVisible();
	});

	test("price guide CTA preselects the occasion in the inquiry form", async ({
		page,
	}) => {
		await page.goto("/");

		await page
			.locator("#prices")
			.getByRole("link", { name: "Inquire Now" })
			.first()
			.click();

		const occasionSelect = page.locator("#inquiry-occasion");
		await expect(occasionSelect).toHaveValue("wedding");
	});

	test("servings input blocks scientific notation characters", async ({
		page,
	}) => {
		await page.goto("/");

		const servings = page.locator("#inquiry-servings");
		await servings.fill("");
		await servings.pressSequentially("12e5");

		await expect(servings).toHaveValue("125");
	});
});
