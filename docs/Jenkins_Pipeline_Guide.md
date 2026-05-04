# Jenkins Pipeline Guide — Playwright Automation

## Overview

This project uses a **Declarative Jenkins Pipeline** defined in the [Jenkinsfile](../Jenkinsfile) at the root of the repository. It automates the full lifecycle of installing dependencies, running Playwright tests, generating Allure reports, and sending email notifications.

---

## Pipeline Triggers

The pipeline runs automatically in two ways:

| Trigger | Configuration | Description |
|---|---|---|
| Poll SCM | `* * * * *` | Checks Git for new commits **every minute**; triggers a build if changes are detected |
| Scheduled | `0 23 * * *` | Runs a full test suite **every night at 11:00 PM** regardless of code changes |

You can also trigger a build **manually** from the Jenkins UI at any time.

---

## Parameters

When triggering a build manually, you can choose the following options:

| Parameter | Options | Description |
|---|---|---|
| `BROWSER` | `chromium`, `firefox`, `webkit`, `all` | The browser(s) to run tests on |
| `ENVIRONMENT` | `qa`, `staging`, `prod` | The target test environment |

---

## Environment Variables

| Variable | Value | Purpose |
|---|---|---|
| `CI` | `true` | Signals to tools that the run is in a CI environment |
| `PLAYWRIGHT_BROWSERS_PATH` | `0` | Installs Playwright browsers **inside the project folder** (not the system default) |

---

## Pipeline Stages

```
Checkout  →  Install Dependencies  →  Install Browsers  →  Run Tests  →  Generate Report
```

### 1. Checkout
- Prints the current branch, selected browser, and environment.
- Pulls the latest code from source control (`checkout scm`).

### 2. Install Dependencies
```bat
npm ci
```
- Performs a clean install of all npm packages based on `package-lock.json`.
- Ensures a reproducible, consistent dependency set on every build.

### 3. Install Playwright Browsers
```bat
npx playwright install
```
- Downloads the browser binaries required by Playwright.
- Uses the project-local path (`PLAYWRIGHT_BROWSERS_PATH=0`).

### 4. Run Playwright Tests
```bat
# If BROWSER = all:
npx playwright test

# If a specific browser is chosen:
npx playwright test --project=<browser>
```
- Runs the full test suite or targets a specific browser project from `playwright.config.ts`.

### 5. Generate Allure Report
```bat
npx allure generate -o allure-report allure-results
```
- Generates an HTML Allure report from raw test results.
- Publishes it in the Jenkins UI under **"Allure Report"** (always links to the latest build).

---

## Post-Build Actions

### Always (every build)
Archives the following folders as Jenkins build artifacts:
- `playwright-report/`
- `test-results/`
- `allure-results/`
- `allure-report/`

### On Failure
Sends an **HTML email** to `kr.tharani@gmail.com` with:
- Job name and build number
- Browser and environment used
- Links to: Playwright Report, Allure Report, Console Log

### On Success
Sends an **HTML email** to `kr.tharani@gmail.com` with:
- Job name and build number
- Browser and environment used
- Links to: Playwright Report, Allure Report

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Jenkins Pipeline                      │
│                                                          │
│  Trigger: Poll SCM (every 1 min) / Cron (11 PM daily)   │
│                         │                                │
│              ┌──────────▼──────────┐                    │
│              │      Checkout       │                    │
│              └──────────┬──────────┘                    │
│              ┌──────────▼──────────┐                    │
│              │  Install npm Deps   │                    │
│              └──────────┬──────────┘                    │
│              ┌──────────▼──────────┐                    │
│              │ Install PW Browsers │                    │
│              └──────────┬──────────┘                    │
│              ┌──────────▼──────────┐                    │
│              │    Run PW Tests     │  ◄── BROWSER param  │
│              └──────────┬──────────┘                    │
│              ┌──────────▼──────────┐                    │
│              │ Generate Allure Rpt │                    │
│              └──────────┬──────────┘                    │
│                         │                                │
│         ┌───────────────┼───────────────┐               │
│         ▼               ▼               ▼               │
│    Archive Artifacts  Email (PASS)  Email (FAIL)        │
└─────────────────────────────────────────────────────────┘
```

---

## How to Run Tests Manually in Jenkins

1. Open Jenkins and navigate to your pipeline job.
2. Click **"Build with Parameters"**.
3. Select the desired **BROWSER** and **ENVIRONMENT**.
4. Click **Build**.
5. Once complete, view results via:
   - **Allure Report** link in the build sidebar
   - **Artifacts** section for raw results
   - **Email notification** sent to `kr.tharani@gmail.com`

---

## Notes

- The pipeline runs on **Windows agents** — all shell commands use `bat` (not `sh`).
- `npm ci` is used instead of `npm install` to guarantee reproducible installs in CI.
- The `allure-results/` folder is generated by the Playwright Allure reporter during the test run; the `Generate Allure Report` stage converts it into a browsable HTML report.
