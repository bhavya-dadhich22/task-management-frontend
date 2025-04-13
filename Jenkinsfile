pipeline {
    agent any
    environment {
        // Set your environment variables here (e.g., for authentication or secrets)
        GITHUB_REPO = "https://github.com/vijay-dadhich09/task-management-webapp.git" // Your repository URL
        BRANCH = "main" // Branch to deploy from
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git url: "${GITHUB_REPO}", branch: "${BRANCH}"
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
                sh 'yarn install'
            }
        }
        stage('Build Application') {
            steps {
                // Build the React app
                sh 'yarn build'
            }
        }
        stage('Deploy to GitHub') {
            steps {
                // Push the build to a specific branch (e.g., 'gh-pages')
                // Make sure to set up your Git credentials (GitHub Token or SSH key)
                sh '''
                    git config --global user.email "vijay.dadhich09@gmail.com"
                    git config --global user.name "Vijay Dadhich"
                    git add .
                    git commit -m "Build the app"
                    git push origin ${BRANCH}
                '''
            }
        }
    }
    post {
        success {
            echo 'Successfully deployed to GitHub!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
