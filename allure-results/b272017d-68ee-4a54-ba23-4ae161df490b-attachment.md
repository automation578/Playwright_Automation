# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: RadioButtons.spec.js >> handle radio button
- Location: tests\RadioButtons.spec.js:4:1

# Error details

```
Error: page.goto: Could not resolve hostname
Call log:
  - navigating to "https://itera-qa.azurewebsites.net/home/automation", waiting until "load"

```

# Test source

```ts
  1  | class RadioButtonsPage {
  2  |     constructor(page) {
  3  |         this.page = page;
  4  |         this.url = 'https://itera-qa.azurewebsites.net/home/automation';
  5  |         this.maleRadioButton = page.locator("//input[@value='option2']");
  6  |         this.femaleRadioButton = page.locator("//input[@value='option1']");
  7  |     }
  8  |     maleRadioButtonCheck() {
  9  |         return this.maleRadioButton.check();
  10 |     }
  11 |     isMaleRadioButtonChecked() {
  12 |         return this.maleRadioButton.isChecked();
  13 |     }
  14 |     isFemaleRadioButtonChecked() {
  15 |         return this.femaleRadioButton.isChecked();
  16 |     }
  17 |     async navigate() {
> 18 |         await this.page.goto(this.url);
     |                         ^ Error: page.goto: Could not resolve hostname
  19 |     }
  20 | }
  21 | module.exports = { RadioButtonsPage };
```