pipeline {
    agent any
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("musaele_1/imagename:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Authenticate with DockerHub using provided credentials
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub_credentials') {
                        // Push the Docker image to DockerHub
                        docker.image("musaele_1/imagename:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
    }
}
