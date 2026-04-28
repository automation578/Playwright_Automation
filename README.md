# Playwright Automation Project

A Playwright-based test automation framework implementing the Page Object Model (POM) design pattern.

## Project Overview

This project demonstrates end-to-end testing using Playwright with JavaScript. It follows the **Page Object Model** pattern for maintainable and scalable test automation.

## Project Structure

```
Playwright_Automation/
├── pages/                  # Page Object Models
│   └── HomePage.js         # HomePage POM implementation
├── tests/                  # Test specifications
│   ├── HomePage.spec.js    # Tests using HomePage POM
│   ├── Assertions.spec.js
│   ├── example.spec.js
│   ├── LocatingMultipleElements.spec.js
│   ├── Locators.spec.js
│   ├── Locators_builtin.spec.js
│   └── mytest.spec.js
├── test-data/              # Test data files
├── test-results/           # Test execution results
├── playwright-report/      # HTML test reports
├── playwright.config.js    # Playwright configuration
└── package.json            # Project dependencies
```

## Technology Stack

| Technology | Version |
|------------|---------|
| Playwright | ^1.59.1 |
| Node.js | ^25.6.0 |

## Getting Started

### Installation

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/HomePage.spec.js

# Run with UI mode
npx playwright test --ui
```

### View Reports

```bash
# Open HTML report
npx playwright show-report
```

## Page Object Model (POM)

### How POM Works

The project implements the **Page Object Model** design pattern:

1. **Page Object Class** - Encapsulates page elements and actions
2. **Test File** - Uses the Page Object for test execution

### Example: HomePage

**Page Object** (`pages/HomePage.js`):
```javascript
class HomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/books';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async getTitle() {
    return await this.page.title();
  }
}
```

**Test File** (`tests/HomePage.spec.js`):
```javascript
const { HomePage } = require('../pages/HomePage');

test('Home Page', async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  await expect(page).toHaveURL('https://demoqa.com/books');
});
```

### Benefits of POM

- **Encapsulation** - Page logic separated from tests
- **Maintainability** - Locators change in one place only
- **Reusability** - Same Page Object across multiple tests
- **Readability** - Tests read like natural language

## Configuration

The `playwright.config.js` file configures:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled (`fullyParallel: true`)
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML
- **Trace**: On first retry for debugging
- **Browser Projects**: Chromium, Firefox, WebKit

## Test Reports

- HTML reports are generated in `playwright-report/`
- Trace files saved in `test-results/`

## CI/CD Integration

The project includes GitHub Actions workflow (`.github/`) for continuous integration.