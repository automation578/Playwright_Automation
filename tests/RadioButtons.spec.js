const { test, expect } = require('@playwright/test');
const { RadioButtonsPage } = require('../pages/RadioButtonsPage');

test('handle radio button', async ({ page }) => {
  const radioButtonsPage = new RadioButtonsPage(page);

  await radioButtonsPage.navigate();
  await radioButtonsPage.maleRadioButtonCheck();

  await expect(await radioButtonsPage.isMaleRadioButtonChecked()).toBeTruthy();
  await expect(await radioButtonsPage.isFemaleRadioButtonChecked()).toBeFalsy();
});
