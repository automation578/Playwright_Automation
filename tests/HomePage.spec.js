import { test, expect } from '@playwright/test';
test('Home Page', async ({ page }) => {
  await page.goto('https://demoqa.com/books');
  const pageTitle = await page.title();
  console.log(pageTitle);
await expect(pageTitle).toBe('demosite');
await expect(page).toHaveURL('https://demoqa.com/books');
await page.close();

});