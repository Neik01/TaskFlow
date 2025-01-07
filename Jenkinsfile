pipeline {
    agent any
    environment {
       
        FRONTEND_IMAGE = "taskflow-frontend"
        BACKEND_IMAGE = 'taskflow-backend'
        DOCKER_USERNAME = 'ntkitn'
        PATH = "${env.PATH}:/usr/local/bin"
        AWS_ACCESS_KEY_ID = credentials('AWS_SECRET_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }
    tools {
        maven "Maven3.9.9"
        jdk "JDK21"
        nodejs "Node18.20.5"
        terraform "Terraform"
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
        //         dir('Frontend/TaskFlow') {
        //             // Install dependencies and build Angular app
        //             sh 'pwd'
        //             sh 'npm install'
        //             sh 'npm run build --prod'
        //         }
        //     }
        // }
        // stage('Build Backend') {
        //     steps {
        //         dir('Backend') {
                  
        //             sh 'chmod +x mvnw'
                  
        //             sh './mvnw clean package -DskipTests'
        //         }
        //     }
        // }
      
        //  stage('Remove Old Docker Images') {
        //     steps {
        //         script {
        //             sh 'docker ps -q| xargs -r docker stop'
        //             sh 'docker ps -aq| xargs -r docker rm'   
        //             sh 'docker images -q -f dangling=true | xargs -r docker rmi'
                    
        //         }
        //     }
        // }
    
    //     stage('Dockerize Application') {
    //         steps {
    //            withDockerRegistry([credentialsId:'dockerhub',url:'']){
    // // Build Docker images for frontend and backend
    //             sh 'docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest Frontend/TaskFlow'
    //             sh 'docker build -t ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest Backend'
    //             // Push images to registry
    //             sh 'docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest'
    //             sh 'docker push ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest'
    //            }
            
    //         }
    //     }
        // stage('Deploy') {
        //     steps {
        //         // Deploy to staging/production using Docker or other deployment tools
        //         echo 'Deploying to environment'
        //         // Example: Docker Compose for multi-container app
        //         sh 'docker compose -f docker-compose.yml up -d'
        //     }
        // }

        stage('Terraform plan'){
            dir('Terraform'){
                steps{
                    
                }
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
