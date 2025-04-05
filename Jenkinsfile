pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID     = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID     = credentials('azure-tenant-id')
        RESOURCE_GROUP      = 'myResourceGroup'
        FUNCTION_APP_NAME   = 'my-hello-func-ar12345'
    }

    tools {
        // Ensure NodeJS is installed and used in the pipeline
        nodejs 'NodeJS'  // This assumes you have configured NodeJS under Global Tool Configuration
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Run the tests using Jest (or your preferred test runner)
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Azure...'
                sh '''
                    # Zip the function app code
                    zip -r function.zip .

                    # Log in to Azure using service principal credentials
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID

                    # Deploy the function app to Azure
                    az functionapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $FUNCTION_APP_NAME --src function.zip
                '''
            }
        }
    }
}
