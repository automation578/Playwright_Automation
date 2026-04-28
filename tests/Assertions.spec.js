const { test, expect } = require('@playwright/test');
const { AssertionsPage } = require('../pages/AssertionsPage');

test('Assertions', async ({ page }) => {
    const assertionsPage = new AssertionsPage(page);
    await assertionsPage.navigate();
    await expect(page).toHaveURL(assertionsPage.url);
    const url = page.url();
    console.log("URL: " + url);
})