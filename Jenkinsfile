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

        stage("Deploy") {
            steps {
                sh '''
                    if [ "$(docker ps -q -f name=register)" ]; then
                        echo "Stopping and removing existing container..."
                        docker stop register || true
                        docker rm register || true
                    fi

                    echo "Running new container..."
                    docker run -d --name register -p 3000:3000 lynakiddy/register:latest
                '''
            }
        }


    }

}