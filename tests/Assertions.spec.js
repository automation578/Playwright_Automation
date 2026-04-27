import { test, expect } from '@playwright/test';
test('Assertions', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const url = page.url();
    console.log("URL: " + url);
})