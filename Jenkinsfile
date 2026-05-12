pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
        cron('0 23 * * *')
    }

    // 2. BROWSER PARAMETER — choose browser from Jenkins UI
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select browser to run tests on'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'prod'],
            description: 'Target environment'
        )
    }

    environment {
        CI                       = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Branch  : ${env.BRANCH_NAME ?: 'main'}"
                echo "Browser : ${params.BROWSER}"
                echo "Env     : ${params.ENVIRONMENT}"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.BROWSER == 'all') {
                        bat 'npx playwright test'
                    } else {
                        bat "npx playwright test --project=${params.BROWSER}"
                    }
                }
            }
        }

        // 4. ALLURE REPORT — generate static HTML so it can be zipped/emailed.
        // Wrapped in warnError so an Allure issue does not skip the email step.
        stage('Generate Allure Report') {
            steps {
                warnError('Allure report generation failed') {
                    bat 'if exist allure-report rmdir /s /q allure-report'
                    bat 'npx allure generate -o allure-report allure-results'
                    publishHTML([
                        allowMissing:          true,
                        alwaysLinkToLastBuild: true,
                        keepAll:               true,
                        reportDir:             'allure-report',
                        reportFiles:           'index.html',
                        reportName:            'Allure Report'
                    ])
                }
            }
        }
    }

    post {
        // Build artifacts and email payload in always{} so partial failures
        // still produce an email with whatever reports exist.
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    bat 'powershell -NoProfile -Command "Compress-Archive -Path playwright-report/* -DestinationPath playwright-report.zip -Force"'
                }
                if (fileExists('allure-report/index.html')) {
                    bat 'powershell -NoProfile -Command "Compress-Archive -Path allure-report/* -DestinationPath allure-report.zip -Force"'
                }
                if (fileExists('test-results/results.json') && fileExists('scripts/build-email-summary.js')) {
                    bat 'node scripts/build-email-summary.js'
                }
            }

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**,allure-report/**,playwright-report.zip,allure-report.zip,email-summary.html',
                allowEmptyArchive: true
            )
        }

        // 1. EMAIL NOTIFICATION — on failure, with full reports attached
        failure {
            echo "Tests FAILED on ${params.BROWSER}"
            script {
                def summary = fileExists('email-summary.html') ? readFile('email-summary.html') : '<p><i>No summary available.</i></p>'
                emailext(
                    to:                 'kr.tharani@gmail.com',
                    subject:            "FAILED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                    body:               """
                        <h2>Playwright Test Run Failed</h2>
                        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                          <tr><th align="left">Job</th><td>${env.JOB_NAME}</td></tr>
                          <tr><th align="left">Build</th><td>#${env.BUILD_NUMBER}</td></tr>
                          <tr><th align="left">Browser</th><td>${params.BROWSER}</td></tr>
                          <tr><th align="left">Environment</th><td>${params.ENVIRONMENT}</td></tr>
                        </table>
                        ${summary}
                        <p>Full reports are attached:</p>
                        <ul>
                          <li><b>playwright-report.zip</b> — unzip and open index.html in a browser</li>
                          <li><b>allure-report.zip</b> — unzip and open index.html in a browser</li>
                        </ul>
                    """,
                    mimeType:           'text/html',
                    attachmentsPattern: 'playwright-report.zip,allure-report.zip',
                    attachLog:          true
                )
            }
        }

        success {
            echo "All tests PASSED on ${params.BROWSER}"
            script {
                def summary = fileExists('email-summary.html') ? readFile('email-summary.html') : '<p><i>No summary available.</i></p>'
                emailext(
                    to:                 'kr.tharani@gmail.com',
                    subject:            "PASSED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                    body:               """
                        <h2>Playwright Test Run Passed</h2>
                        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                          <tr><th align="left">Job</th><td>${env.JOB_NAME}</td></tr>
                          <tr><th align="left">Build</th><td>#${env.BUILD_NUMBER}</td></tr>
                          <tr><th align="left">Browser</th><td>${params.BROWSER}</td></tr>
                          <tr><th align="left">Environment</th><td>${params.ENVIRONMENT}</td></tr>
                        </table>
                        ${summary}
                        <p>Full reports are attached:</p>
                        <ul>
                          <li><b>playwright-report.zip</b> — unzip and open index.html in a browser</li>
                          <li><b>allure-report.zip</b> — unzip and open index.html in a browser</li>
                        </ul>
                    """,
                    mimeType:           'text/html',
                    attachmentsPattern: 'playwright-report.zip,allure-report.zip'
                )
            }
        }
    }
}
