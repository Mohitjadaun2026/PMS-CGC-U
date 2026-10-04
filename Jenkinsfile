pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node --version && npm --version'
                        sh 'npm ci'
                        dir('backend') { sh 'npm ci' }
                        dir('frontend') { sh 'npm ci' }
                    } else {
                        bat 'node --version && npm --version'
                        bat 'npm ci'
                        dir('backend') { bat 'npm ci' }
                        dir('frontend') { bat 'npm ci' }
                    }
                }
            }
        }

        stage('Lint frontend') {
            steps {
                script {
                    if (isUnix()) {
                        dir('frontend') { sh 'npm run lint' }
                    } else {
                        dir('frontend') { bat 'npm run lint' }
                    }
                }
            }
        }

        stage('Build frontend') {
            steps {
                script {
                    if (isUnix()) {
                        dir('frontend') { sh 'npm run build' }
                    } else {
                        dir('frontend') { bat 'npm run build' }
                    }
                }
            }
        }

        stage('Smoke test frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node scripts/smoke-frontend.cjs'
                    } else {
                        bat 'node scripts/smoke-frontend.cjs'
                    }
                }
            }
        }

        stage('Package release') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node scripts/package-release.cjs'
                    } else {
                        bat 'node scripts/package-release.cjs'
                    }
                }
                archiveArtifacts artifacts: 'release/**', fingerprint: true
            }
        }

        stage('Manual deploy handoff') {
            steps {
                input message: 'Download the archived release/ artifact and deploy it using your hosting provider.', ok: 'Ready for manual deployment'
                echo 'Release artifact is archived and ready for manual deployment.'
            }
        }
    }

    post {
        success {
            echo 'Lint, frontend build and smoke test passed; release artifact is archived for manual deployment.'
        }
    }
}
