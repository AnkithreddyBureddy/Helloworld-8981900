pipeline {
    agent any
    environment {
        AZURE_CLIENT_ID     = credentials('azure-client-id')  // Updated based on your credential name
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')  // Updated based on your credential name
        AZURE_TENANT_ID     = credentials('azure-tenant-id')  // Updated based on your credential name
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')  // If you have this credential, you can add it similarly
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
                    powershell '''
                        Compress-Archive -Path . -DestinationPath function.zip -Force
                    '''
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
