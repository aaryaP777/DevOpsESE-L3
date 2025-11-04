pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USER = "${DOCKERHUB_CREDENTIALS_USR}"
        DOCKERHUB_PASS = "${DOCKERHUB_CREDENTIALS_PSW}"
        DOCKER_IMAGE_FRONT = "${DOCKERHUB_USER}/student-dashboard-frontend"
        DOCKER_IMAGE_BACK = "${DOCKERHUB_USER}/student-dashboard-backend"
    }

    stages {
        stage('Checkout') {
            steps { git branch: env.BRANCH_NAME, url: 'https://github.com/<your-username>/k8s-cicd-demo.git' }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $DOCKER_IMAGE_FRONT:$BRANCH_NAME ./frontend
                docker build -t $DOCKER_IMAGE_BACK:$BRANCH_NAME ./backend
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                docker push $DOCKER_IMAGE_FRONT:$BRANCH_NAME
                docker push $DOCKER_IMAGE_BACK:$BRANCH_NAME
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl --kubeconfig=$KUBECONFIG apply -f deployment/deployment.yaml
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful on ${env.BRANCH_NAME} branch"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
