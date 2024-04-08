pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'musaele1/nodeapp' // Define your DockerHub username and image name
        DOCKER_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}" // Tagging the image with Jenkins build number
        CONTAINER_NAME = 'todo-node-app'
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
        
        stage('Deploy to Kubernetes') {
            steps {
                // Deploy the application to Kubernetes
                kubernetesDeploy(
                    kubeconfigId: 'kubernetes', // ID of the Kubernetes credentials
                    configs: '~/deployment.yml', // Path to the Kubernetes deployment YAML
                    enableConfigSubstitution: false
                )
            }
        }
        
        stage('Stop and Remove Existing Container') {
            steps {
                // Stop and remove the existing container
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
            }
        }
        
        stage('Run New Container') {
            steps {
                // Run the new container
                sh "docker run -d --name ${CONTAINER_NAME} -p 8000:8000 ${DOCKER_TAG}"
            }
        }
    }
}
