import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
  await context.addCookies([
    {
      domain: "127.0.0.1",
      name: "NEXT_LOCALE",
      path: "/",
      value: "fr",
    },
  ]);
});

test("affiche les produits du catalogue", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { exact: true, name: "Produits" }),
  ).toBeVisible();
  await expect(page.getByText("Mug de voyage en céramique")).toBeVisible();
});

test("navigue vers une fiche produit", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Mug de voyage en céramique").click();

  await expect(page).toHaveURL(/\/products\/ceramic-travel-mug/);
  await expect(
    page.getByRole("heading", { name: "Mug de voyage en céramique" }),
  ).toBeVisible();
});

test("change la langue avec le switcher", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { exact: true, name: "EN" }).click();

  await expect(
    page.getByRole("heading", { name: "Useful products for efficient days." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
});
