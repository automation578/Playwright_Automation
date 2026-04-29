const { test, expect } = require('@playwright/test');
const { InputboxPage } = require('../pages/InputboxPage');

test('Inputbox', async ({ page }) => {
    const inputboxPage = new InputboxPage(page);
    await inputboxPage.navigate();
    await expect(page).toHaveURL(inputboxPage.url);

    await expect(inputboxPage.firstNameInput).toBeVisible();
    await expect(inputboxPage.firstNameInput).toBeEmpty();
    await expect(inputboxPage.firstNameInput).toBeEditable();
    await expect(inputboxPage.firstNameInput).toBeEnabled();

    await inputboxPage.fillFirstName('John');
})