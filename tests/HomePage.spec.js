const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
test('Home Page', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate();

  const pageTitle = await home.getTitle();
  console.log(pageTitle);

  await expect(page).toHaveTitle(/demosite/);
  await expect(page).toHaveURL('https://demoqa.com/books');
});