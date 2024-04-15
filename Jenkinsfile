pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'musaele1/nodeapp' // Define your DockerHub username and image name
        DOCKER_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}" // Tagging the image with Jenkins build number
        LATEST_TAG = "${DOCKER_IMAGE}:latest" // Define the latest tag
        CONTAINER_NAME = 'todo-node-app'
        KUBE_DEPLOYMENT_YAML = 'deployment.yml' // Path to your Kubernetes Deployment YAML file
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
                        // Push the Docker image to DockerHub with the latest tag
                        docker.image("${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}").push("${LATEST_TAG}") // Push with the latest tag
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes Deployment YAML
                    withCredentials([file(credentialsId: 'Kubernetes', variable: 'KUBE_CONFIG')]) {
                        sh "kubectl apply -f ${KUBE_DEPLOYMENT_YAML} --kubeconfig=${KUBE_CONFIG}"
                    }
                }
            }
        }
    }
}
