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

        stage('Install Dependencies') {
            steps {
                bat 'npm ci --prefix backend'
                bat 'npm ci --prefix frontend'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint --prefix backend'
                bat 'npm run lint --prefix frontend'
            }
        }

        stage('Test Backend') {
            steps {
                bat 'npm test --prefix backend'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build --prefix frontend'
            }
        }

        stage('Smoke Test') {
            steps {
                bat 'node scripts/smoke-frontend.cjs'
            }
        }
    }

    post {
        success {
            echo 'PMS-CGC-U CI pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the Console Output for details.'
        }
    }
}
