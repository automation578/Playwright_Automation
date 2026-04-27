import { test, expect } from '@playwright/test'

test('Locators', async ({ page }) => {
  await page.goto('https://demoqa.com/books')

  // click on login button - xpath
  await page.click("//span[normalize-space()='Login']")
  await page.waitForTimeout(2000)

  // provide username - css selector
  await page.fill('#userName', 'thara')
  await page.waitForTimeout(2000)

  // provide password - ID
  await page.fill('id=password', 'Thara@123')
  await page.waitForTimeout(5000)

  //provide login button - text
  await page.click("#login")
 await page.waitForTimeout(2000)
  //Provide logout - ID
  
  await page.click('id=submit')
  await page.close()
})
