pipeline {
    agent any
    environment {
       
        FRONTEND_IMAGE = "taskflow-frontend"
        BACKEND_IMAGE = 'taskflow-backend'
        DOCKER_USERNAME = 'ntkitn'
    }
    tools {
        maven "Maven3.9.9"
        jdk "JDK21"
     
    }
    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                echo "first step"
            }
        }
        // stage('Build Frontend') {
        //     steps {
        //         dir('frontend') {
        //             // Install dependencies and build Angular app
        //             sh 'npm install'
        //             sh 'npm run build --prod'
        //         }
        //     }
        // }
        stage('Build Backend') {
            steps {
                dir('Backend') {
                  
                    sh 'chmod +x mvnw'
                  
                    sh './mvnw clean package -Dmaven.test.failure.ignore=true'
                }
            }
        }
        stage('Run Tests') {
            parallel {
                // stage('Frontend Tests') {
                //     steps {
                //         dir('frontend') {
                //             sh 'npm test'
                //         }
                //     }
                // }
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh './mvnw test'
                        }
                    }
                }
            }
        }
         stage('Remove Old Docker Images') {
            steps {
                script {
                    sh '''
                    docker images -q ${DOCKER_USERNAME}/${FRONTEND_IMAGE} | xargs -r docker rmi -f
                    docker images -q ${DOCKER_USERNAME}/${BACKEND_IMAGE} | xargs -r docker rmi -f
                    '''
                }
            }
        }
        // stage('Static Analysis') {
        //     steps {
        //         // Example: Run code quality tools (SonarQube, ESLint)
        //         echo 'Performing static code analysis'
        //     }
        // }
        stage('Dockerize Application') {
            steps {
                withDockerRegistry (){

                }
                // Build Docker images for frontend and backend
                sh 'docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest frontend'
                sh 'docker build -t ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest backend'
                // Push images to registry
                sh 'docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest'
                sh 'docker push $${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy to staging/production using Docker or other deployment tools
                echo 'Deploying to environment'
                // Example: Docker Compose for multi-container app
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }
    post {
        always {
            // Cleanup or notify
            echo 'Pipeline finished'
        }
    //     success {
    //         echo 'Deployment successful!'
    //     }
    //     failure {
    //         echo 'Deployment failed!'
    //     }
    }
}
