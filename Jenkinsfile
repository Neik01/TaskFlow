pipeline {
    agent any
    // environment {
    //     NODE_VERSION = '16' // Specify NodeJS version for Angular
    //     DOCKER_REGISTRY = 'your-docker-registry-url' // e.g., Docker Hub
    // }
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
                    // Build Spring Boot application
                    sh 'whoami'
                    sh  'ls -l $(which mvn)'
                    
                    sh './mvnw clean package'
                }
            }
        }
        // stage('Run Tests') {
        //     parallel {
        //         stage('Frontend Tests') {
        //             steps {
        //                 dir('frontend') {
        //                     sh 'npm test'
        //                 }
        //             }
        //         }
        //         stage('Backend Tests') {
        //             steps {
        //                 dir('backend') {
        //                     sh './mvnw test'
        //                 }
        //             }
        //         }
        //     }
        // }
        // stage('Static Analysis') {
        //     steps {
        //         // Example: Run code quality tools (SonarQube, ESLint)
        //         echo 'Performing static code analysis'
        //     }
        // }
        // stage('Dockerize Application') {
        //     steps {
        //         // Build Docker images for frontend and backend
        //         sh 'docker build -t $DOCKER_REGISTRY/taskflow-frontend:latest frontend'
        //         sh 'docker build -t $DOCKER_REGISTRY/taskflow-backend:latest backend'
        //         // Push images to registry
        //         sh 'docker push $DOCKER_REGISTRY/taskflow-frontend:latest'
        //         sh 'docker push $DOCKER_REGISTRY/taskflow-backend:latest'
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         // Deploy to staging/production using Docker or other deployment tools
        //         echo 'Deploying to environment'
        //         // Example: Docker Compose for multi-container app
        //         sh 'docker-compose -f docker-compose-staging.yml up -d'
        //     }
        // }
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
