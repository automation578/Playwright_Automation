const { test, expect } = require('@playwright/test');

test('handle checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');

    //single checkbox
    const sportsCheckbox = page.locator("//input[@id='hobbies-checkbox-1']");
    await sportsCheckbox.check({ force: true });
   await page.waitForTimeout(3000);
    await expect(sportsCheckbox).toBeChecked();

//Multiple checkbox
const multipleCheckbox = ["//input[@id='hobbies-checkbox-2']", "//input[@id='hobbies-checkbox-3']"];
    for (const checkbox of multipleCheckbox) {

await page.locator(checkbox).check({ force: true });
    }

 for (const checkbox of multipleCheckbox) {

if(await page.locator(checkbox).isChecked()){
    await page.locator(checkbox).uncheck({ force: true });
 
}
await page.waitForTimeout(3000);
 }
})  

