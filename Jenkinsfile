pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID     = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID     = credentials('azure-tenant-id')
        RESOURCE_GROUP      = 'myResourceGroup'
        FUNCTION_APP_NAME   = 'Helloworld-89881900'
        PATH                = "$PATH:C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\"
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

        stage('Deploy') {
    steps {
        echo 'Deploying to Azure...'
        sh '''
            az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID

            echo "Zipping project..."
            powershell -Command "Compress-Archive -Path * -DestinationPath deploy.zip"

            echo "Deploying zipped project..."
            az functionapp deployment source config-zip --resource-group myResourceGroup --name Helloworld-89881900 --src deploy.zip
        '''
    }
}

