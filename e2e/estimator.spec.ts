import { expect, test } from "@playwright/test";

test("estimator CTA carries occasion and servings into the inquiry form", async ({
	page,
}) => {
	await page.goto("/");

	const estimator = page.locator("#prices");
	await estimator
		.getByRole("combobox", { name: "Occasion" })
		.selectOption({ label: "Wedding Cakes" });
	await estimator.getByRole("spinbutton", { name: "Servings" }).fill("35");

	await page
		.getByRole("link", { name: "Start inquiry with this selection" })
		.click();

	await expect(page.locator("#inquiry-occasion")).toHaveValue("wedding");
	await expect(page.locator("#inquiry-servings")).toHaveValue("35");
});
