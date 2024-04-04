pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'musaele_1/nodeapp' // Define your DockerHub username and image name
        DOCKER_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}" // Tagging the image with Jenkins build number
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_TAG}", "--build-arg BUILD_DATE=${env.BUILD_ID} .")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Authenticate with DockerHub
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub_credentials') {
                        // Push the Docker image to DockerHub
                        docker.image("${DOCKER_TAG}").push()
                    }
                }
            }
        }
    }
}
