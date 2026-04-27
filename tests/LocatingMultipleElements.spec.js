import { test, expect } from '@playwright/test'

test('LocatingMultipleElements', async ({ page }) => {
  await page.goto('https://demoqa.com/books')

//   const links = await page.$$('a')
//   for (const link of links) {
//     const linkText = await link.textContent()
//     console.log(linkText)
//   }
await page.waitForSelector("//div[@class='books-wrapper']//div//table");
const products =await page.$$("//div[@class='books-wrapper']//div//table");
for (const product of products)
{
    const productName = await product.textContent();
    console.log(productName);
}

})