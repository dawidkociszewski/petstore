import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/add-pet');
});

test.describe('Add new pet', () => {
  test('go back to list', async ({page}) => {
    await page.getByRole('link', { name: '< Go back' }).click();
    const title = page.locator('h1');
    await expect(title).toContainText("Petstore list");
  });

  test('saving empty form - validation', async ({page}) => {
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Some fields are not valid.')).toBeVisible();
  });

  test('saving filled form', async ({page}) => {
    await page.getByLabel('Category').fill('string');
    await page.getByLabel('Name').fill('doggie');
    await page.getByLabel('Tags').fill('tag1');
    await page.keyboard.press('Enter');
    await page.getByLabel('Tags').fill('tag2');
    await page.keyboard.press('Enter');
    await page.getByLabel('Status').click();
    await page.locator('mat-option').filter({ hasText: 'Available' }).click();
    await page.locator('#photo_0').fill('string');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Pet has been added successfully.')).toBeVisible();
  });
});
