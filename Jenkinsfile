pipeline {
    agent any
    environment {
        AZURE_CLIENT_ID     = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID     = credentials('azure-tenant-id')
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
    }
    tools {
        nodejs "NodeJS"  // This is the name of the NodeJS tool configured in Jenkins
    }
    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Package') {
            steps {
                echo 'Zipping the Azure Function code...'
                script {
                    // Use zip command for packaging the code
                    sh 'zip -r function.zip .'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Azure...'
                sh """
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    az functionapp deployment source config-zip --resource-group HelloRG --name hellorg-8986104 --src function.zip
                """
            }
        }
    }
}
