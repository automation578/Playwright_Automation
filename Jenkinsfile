pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

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
        CI                  = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME ?: 'main'}"
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
                echo 'Installing Playwright browser binaries...'
                // --with-deps is Linux only; on Windows just install browsers
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Running tests on browser: ${params.BROWSER}"
                    if (params.BROWSER == 'all') {
                        bat 'npx playwright test --reporter=html,line'
                    } else {
                        bat "npx playwright test --project=${params.BROWSER} --reporter=html,line"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Publishing Playwright HTML report...'
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Report'
            ])

            // Archive test results and traces
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }
        success {
            echo "All Playwright tests PASSED on ${params.BROWSER}"
        }
        failure {
            echo "Tests FAILED on ${params.BROWSER} — check the Playwright Report above"
        }
        unstable {
            echo 'Some tests were flaky (retried). Check report for details.'
        }
    }
}
