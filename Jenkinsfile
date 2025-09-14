pipeline {
    agent any

    stages {

        stage("Build") {
            steps {
                sh '''
                    docker build -t lynakiddy/register:latest .
                '''
            }
        }

        stage("push") {
            steps {
                sh '''
                    docker push lynakiddy/register:latest
                '''
            }
        }

    }

}