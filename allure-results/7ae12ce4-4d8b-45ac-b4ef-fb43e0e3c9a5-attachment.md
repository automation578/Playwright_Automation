# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: RadioButtons.spec.js >> handle radio button
- Location: tests\RadioButtons.spec.js:4:1

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://itera-qa.azurewebsites.net/home/automation
Call log:
  - navigating to "https://itera-qa.azurewebsites.net/home/automation", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: itera-qa.azurewebsites.net
      - text: ’s server IP address could not be found.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy, firewall, and DNS configuration" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e16]:
          - link "Running Windows Network Diagnostics" [ref=e17] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e18]: ERR_NAME_NOT_RESOLVED
  - generic [ref=e19]:
    - button "Reload" [ref=e21] [cursor=pointer]
    - button "Details" [ref=e22] [cursor=pointer]
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
     |                         ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://itera-qa.azurewebsites.net/home/automation
  19 |     }
  20 | }
  21 | module.exports = { RadioButtonsPage };
```