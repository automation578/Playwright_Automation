const {test, expect}=require('@playwright/test')

test('handle inputbox',async ({page})=>{

    await page.goto('https://demoqa.com/automation-practice-form');

    //Inputbox - firstname
   await expect(await page.locator("//input[@id='firstName']")).toBeVisible();
   await expect(await page.locator("//input[@id='firstName']")).toBeEmpty();
   await expect(await page.locator("//input[@id='firstName']")).toBeEditable();
   await expect(await page.locator("//input[@id='firstName']")).toBeEnabled();
     
    
   //await page.locator("//input[@id='name']").fill("John")
    await page.fill("//input[@id='firstName']",'John');

    await page.waitForTimeout(5000); //pausing code

})