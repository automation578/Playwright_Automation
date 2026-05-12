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

        // 4. ALLURE REPORT — generate static HTML so it can be zipped/emailed
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate -o allure-report allure-results --clean'
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

        // 5. PACKAGE REPORTS — zip both reports so they can be emailed as attachments
        stage('Package Reports') {
            steps {
                script {
                    if (fileExists('playwright-report/index.html')) {
                        zip zipFile: 'playwright-report.zip', dir: 'playwright-report', overwrite: true
                    }
                    if (fileExists('allure-report/index.html')) {
                        zip zipFile: 'allure-report.zip', dir: 'allure-report', overwrite: true
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**,allure-report/**,playwright-report.zip,allure-report.zip',
                allowEmptyArchive: true
            )
        }

        // 1. EMAIL NOTIFICATION — on failure, with full reports attached
        failure {
            echo "Tests FAILED on ${params.BROWSER}"
            script {
                def summary = buildSummaryHtml()
                emailext(
                    to:                 'kr.tharani@gmail.com',
                    subject:            "FAILED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                    body:               """
                        <h2>Playwright Test Run Failed</h2>
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
                def summary = buildSummaryHtml()
                emailext(
                    to:                 'kr.tharani@gmail.com',
                    subject:            "PASSED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                    body:               """
                        <h2>Playwright Test Run Passed</h2>
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

def buildSummaryHtml() {
    if (!fileExists('test-results/results.json')) {
        return '<p><i>Results JSON not found — no summary available.</i></p>'
    }
    def results = readJSON file: 'test-results/results.json'
    def s = results.stats ?: [:]
    def durationSec = ((s.duration ?: 0) / 1000).intValue()
    return """
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
          <tr><th align="left">Job</th><td>${env.JOB_NAME}</td></tr>
          <tr><th align="left">Build</th><td>#${env.BUILD_NUMBER}</td></tr>
          <tr><th align="left">Browser</th><td>${params.BROWSER}</td></tr>
          <tr><th align="left">Environment</th><td>${params.ENVIRONMENT}</td></tr>
          <tr><th align="left">Passed</th><td>${s.expected ?: 0}</td></tr>
          <tr><th align="left">Failed</th><td style="color:#c00;"><b>${s.unexpected ?: 0}</b></td></tr>
          <tr><th align="left">Skipped</th><td>${s.skipped ?: 0}</td></tr>
          <tr><th align="left">Flaky</th><td>${s.flaky ?: 0}</td></tr>
          <tr><th align="left">Duration</th><td>${durationSec} s</td></tr>
        </table>
    """
}
