pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        CI = 'true'
        IMAGE_TAG = "build-${BUILD_NUMBER}"
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

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'pms-mongo-uri', variable: 'MONGO_URI'),
                    string(credentialsId: 'pms-jwt-secret', variable: 'JWT_SECRET'),
                    string(credentialsId: 'pms-newsletter-secret', variable: 'NEWSLETTER_SUBSCRIBE_SECRET'),
                    usernamePassword(
                        credentialsId: 'pms-smtp',
                        usernameVariable: 'EMAIL_USERNAME',
                        passwordVariable: 'EMAIL_PASSWORD'
                    )
                ]) {
                    bat 'docker compose up -d --remove-orphans'
                }
            }
        }

        stage('Deployment Smoke Test') {
            steps {
                bat '''
                    timeout /t 10 /nobreak >nul
                    curl --fail http://localhost:5000/
                    curl --fail http://localhost:8080/health
                '''
            }
        }
    }

    post {
        success {
            echo 'PMS-CGC-U CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Showing Docker logs...'
            bat 'docker compose logs --tail=100'
        }
    }
}
