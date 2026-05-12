const { test, expect } = require('@playwright/test');

test('handle checkbox', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
 await page.locator("#country").selectOption("India");

await page.waitForTimeout(7000);
 
})  

