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
                        bat 'npx playwright test --reporter=line'
                    } else {
                        bat "npx playwright test --project=${params.BROWSER} --reporter=line"
                    }
                }
            }
        }

        // 4. ALLURE REPORT — generate after tests
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate -o allure-report allure-results'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**,allure-report/**',
                allowEmptyArchive: true
            )
        }

        // 1. EMAIL NOTIFICATION — on failure
        failure {
            echo "Tests FAILED on ${params.BROWSER}"
            emailext(
                to:          'tharani.ramaswamy@cox.com',
                subject:     "FAILED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                body:        """
                    <h2>Playwright Test Run Failed</h2>
                    <table>
                      <tr><td><b>Job</b></td><td>${env.JOB_NAME}</td></tr>
                      <tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                      <tr><td><b>Browser</b></td><td>${params.BROWSER}</td></tr>
                      <tr><td><b>Environment</b></td><td>${params.ENVIRONMENT}</td></tr>
                      <tr><td><b>Report</b></td><td><a href="${env.BUILD_URL}Playwright_Report">View Playwright Report</a></td></tr>
                      <tr><td><b>Allure</b></td><td><a href="${env.BUILD_URL}allure">View Allure Report</a></td></tr>
                      <tr><td><b>Console</b></td><td><a href="${env.BUILD_URL}console">View Console Log</a></td></tr>
                    </table>
                """,
                mimeType: 'text/html'
            )
        }

        success {
            echo "All tests PASSED on ${params.BROWSER}"
            emailext(
                to:      'tharani.ramaswamy@cox.com',
                subject: "PASSED: Playwright Tests — ${params.BROWSER} — Build #${env.BUILD_NUMBER}",
                body:    """
                    <h2>Playwright Test Run Passed</h2>
                    <table>
                      <tr><td><b>Job</b></td><td>${env.JOB_NAME}</td></tr>
                      <tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                      <tr><td><b>Browser</b></td><td>${params.BROWSER}</td></tr>
                      <tr><td><b>Environment</b></td><td>${params.ENVIRONMENT}</td></tr>
                      <tr><td><b>Report</b></td><td><a href="${env.BUILD_URL}Playwright_Report">View Playwright Report</a></td></tr>
                      <tr><td><b>Allure</b></td><td><a href="${env.BUILD_URL}allure">View Allure Report</a></td></tr>
                    </table>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
