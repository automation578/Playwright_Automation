# Playwright Automation Project – Documentation

---

## 1. Overview

This project is a **test automation framework** built using **Playwright** and **JavaScript (Node.js)**. It automates browser interactions and validates web application behaviour across multiple browsers (Chromium, Firefox, WebKit).

The framework covers:
- Different ways to locate web elements (Locators)
- Assertions (validating page state)
- Page Object Model design pattern
- Handling multiple elements on a page

---

## 2. Project Structure

```
Playwright_Automation/
│
├── tests/                        # All test files
│   ├── Assertions.spec.js        # URL and page assertion tests
│   ├── Locators.spec.js          # Element locating using XPath, CSS, ID
│   ├── Locators_builtin.spec.js  # Playwright built-in locator methods
│   ├── LocatingMultipleElements.spec.js  # Looping through multiple elements
│   ├── HomePage.spec.js          # Page Object Model test
│   ├── mytest.spec.js            # Login/Logout flow test
│   └── example.spec.js           # Sample Playwright starter tests
│
├── pages/                        # Page Object Model classes
│   └── HomePage.js               # HomePage page object
│
├── playwright.config.js          # Playwright configuration
├── Jenkinsfile                   # Jenkins CI pipeline
├── .github/workflows/playwright.yml  # GitHub Actions CI pipeline
├── package.json                  # Project dependencies
└── PROJECT_DOCUMENTATION.md     # This file
```

---

## 3. Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation framework |
| JavaScript | Programming language |
| Node.js | Runtime environment |
| npm | Package manager |
| Jenkins | CI/CD pipeline |
| GitHub Actions | Cloud CI/CD pipeline |

---

## 4. Configuration – playwright.config.js

The configuration file controls how all tests run.

| Setting | Value | Meaning |
|---|---|---|
| `testDir` | `./tests` | All test files are inside the `tests/` folder |
| `fullyParallel` | `true` | All test files run at the same time |
| `forbidOnly` | `true` on CI | Prevents accidental `test.only` from blocking the pipeline |
| `retries` | `2` on CI, `0` locally | Failed tests are retried twice in Jenkins/GitHub Actions |
| `workers` | `1` on CI | One test at a time in CI to avoid conflicts |
| `reporter` | `html` | Generates a visual HTML report after every run |
| `trace` | `on-first-retry` | Records a trace file when a test is retried (for debugging) |

**Browsers configured:**
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

---

## 5. Test Files – Explained

---

### 5.1 Assertions.spec.js
**Purpose:** Verifies that the browser navigates to the correct URL.

**Application under test:** OrangeHRM Login Page

**What it does:**
1. Opens the OrangeHRM login page
2. Asserts the current URL matches the expected URL
3. Prints the URL to the console

**Key concept:** `expect(page).toHaveURL()` — checks the browser is on the right page.

---

### 5.2 Locators.spec.js
**Purpose:** Demonstrates different ways to find elements on a page.

**Application under test:** DemoQA Book Store

**What it does:**
1. Opens the DemoQA books page
2. Clicks the Login button using **XPath**
3. Fills the username field using **CSS Selector**
4. Fills the password field using **ID**
5. Clicks the Login button using **ID**
6. Clicks the Submit button

**Locator types used:**

| Locator Type | Example Used |
|---|---|
| XPath | `//span[normalize-space()='Login']` |
| CSS Selector | `#userName` |
| ID | `id=password` |

---

### 5.3 Locators_builtin.spec.js
**Purpose:** Demonstrates Playwright's recommended built-in locator methods.

**Application under test:** OrangeHRM Login Page

**What it does:**
1. Opens OrangeHRM login page
2. Finds the company logo using `getByAltText()`
3. Asserts the logo is visible
4. Fills username using `getByPlaceholder()`
5. Fills password using `getByPlaceholder()`
6. Clicks Login using `getByRole()`
7. Reads the logged-in username and asserts it is visible

**Built-in locators used:**

| Method | What it finds |
|---|---|
| `getByAltText()` | Image by its alt text |
| `getByPlaceholder()` | Input field by placeholder text |
| `getByRole()` | Element by its accessibility role (button, textbox, etc.) |
| `getByText()` | Element by its visible text |
| `locator()` | Element by XPath or CSS |

---

### 5.4 LocatingMultipleElements.spec.js
**Purpose:** Shows how to find and loop through multiple elements on a page.

**Application under test:** DemoQA Book Store

**What it does:**
1. Opens the DemoQA books page
2. Waits for the books table to load
3. Finds all book table elements using `$$()` (returns a list)
4. Loops through each element and prints its text content

**Key concept:** `page.$$()` returns an array of all matching elements, allowing iteration.

---

### 5.5 HomePage.spec.js
**Purpose:** Demonstrates the **Page Object Model (POM)** design pattern.

**Application under test:** DemoQA Book Store

**What it does:**
1. Creates an instance of the `HomePage` page object
2. Calls `home.navigate()` to open the page
3. Calls `home.getTitle()` to get the page title
4. Asserts the title contains "demosite"
5. Asserts the URL is correct

**Why POM?** Separates test logic from page interaction code — if the page changes, only the page object needs updating, not every test.

---

### 5.6 mytest.spec.js
**Purpose:** End-to-end Login and Logout flow using built-in locators.

**Application under test:** OrangeHRM

**What it does:**
1. Opens OrangeHRM login page
2. Clicks and fills the Username field using `getByRole()`
3. Clicks and fills the Password field using `getByRole()`
4. Clicks the Login button
5. Clicks the logged-in user's name in the banner
6. Clicks Logout from the menu

---

### 5.7 example.spec.js
**Purpose:** Default starter tests generated by Playwright.

**Application under test:** Playwright official website

**What it does:**
- Test 1: Opens `playwright.dev` and asserts the page title contains "Playwright"
- Test 2: Clicks the "Get Started" link and asserts the "Installation" heading is visible

---

## 6. Page Object Model – pages/HomePage.js

The `HomePage` class wraps all interactions with the DemoQA books page.

```
Class: HomePage
│
├── constructor(page)   → stores the Playwright page object and URL
├── navigate()          → goes to https://demoqa.com/books
└── getTitle()          → returns the page title
```

Used in `HomePage.spec.js` to keep tests clean and reusable.

---

## 7. How to Run Tests

### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/Assertions.spec.js
```

### Run on a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with visible browser (headed mode)
```bash
npx playwright test --headed
```

### View the HTML report after run
```bash
npx playwright show-report
```

---

## 8. CI/CD Pipelines

### GitHub Actions (.github/workflows/playwright.yml)
Triggers automatically on every push or pull request to `main` branch:
1. Checks out the code
2. Installs Node.js
3. Runs `npm ci`
4. Installs Playwright browsers
5. Runs all tests
6. Uploads the HTML report as an artifact (kept for 30 days)

### Jenkins (Jenkinsfile)
Triggered manually or on SCM change:
1. Checks out the code
2. Installs Node.js (via NodeJS plugin)
3. Runs `npm ci`
4. Installs Playwright browsers with OS dependencies
5. Runs all tests with `CI=true`
6. Publishes the HTML report inside Jenkins UI

---

## 9. Test Websites Used

| Website | URL | Used In |
|---|---|---|
| OrangeHRM Demo | `https://opensource-demo.orangehrmlive.com` | Assertions, Locators_builtin, mytest |
| DemoQA Book Store | `https://demoqa.com/books` | Locators, LocatingMultipleElements, HomePage |
| Playwright Official Site | `https://playwright.dev` | example.spec.js |

---

## 10. Key Playwright Concepts Covered

| Concept | Where Used |
|---|---|
| `page.goto()` | All tests — navigation |
| `page.fill()` | Locators, Locators_builtin, mytest |
| `page.click()` | Locators, mytest, example |
| `expect().toHaveURL()` | Assertions, HomePage |
| `expect().toHaveTitle()` | example, HomePage |
| `expect().toBeVisible()` | Locators_builtin |
| `getByRole()` | Locators_builtin, mytest, example |
| `getByPlaceholder()` | Locators_builtin |
| `getByAltText()` | Locators_builtin |
| `getByText()` | Locators_builtin |
| `page.$$()` | LocatingMultipleElements |
| Page Object Model | HomePage, HomePage.spec.js |
