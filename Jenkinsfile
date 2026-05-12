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
    }

    post {
        // Build artifacts and email payload in always{} so partial failures
        // still produce an email with whatever reports exist.
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    bat 'powershell -NoProfile -Command "Compress-Archive -Path playwright-report/* -DestinationPath playwright-report.zip -Force"'
                }
                if (fileExists('test-results/results.json') && fileExists('scripts/build-email-summary.js')) {
                    bat 'node scripts/build-email-summary.js'
                }
            }

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,playwright-report.zip,email-summary.html',
                allowEmptyArchive: true
            )
        }

        // 1. EMAIL NOTIFICATION — on failure, with Playwright report attached
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
                    """,
                    mimeType:           'text/html',
                    attachmentsPattern: 'playwright-report.zip',
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
                    """,
                    mimeType:           'text/html',
                    attachmentsPattern: 'playwright-report.zip'
                )
            }
        }
    }
}
