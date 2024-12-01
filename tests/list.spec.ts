import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Display list of pets', () => {
  test('has title', async ({page}) => {
    const title = page.locator('h1');
    await expect(title).toContainText("Petstore list");
  });

  test('add new pet', async ({page}) => {
    page.getByRole('button', {name: 'Add new pet'}).click();
    const title = page.locator('h1');
    await expect(title).toContainText('Add new pet');
  });

  test('search sold pets', async ({page}) => {
    await page.getByLabel('Status').getByText('Available').click();
    await page.locator('mat-option').filter({ hasText: 'Sold' }).click();
    await page.locator('button').filter({ hasText: 'Search' }).click();
    await expect(page.locator('xpath=/html/body/main/div/div/div/app-root/app-list/table/tbody/tr[1]/td[4]').getByText('Sold')).toBeVisible({timeout:3000});
  });

  test('remove animal', async ({page}) => {
    await page.locator('xpath=/html/body/main/div/div/div/app-root/app-list/table/tbody/tr[1]/td[5]/button[2]').click();
    await expect(page.getByText('Yes')).toBeVisible();
  });


});
