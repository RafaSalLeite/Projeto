pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }
stage('SonarQube Analysis') {
    steps {
        // 'SonarServer' deve ser o mesmo nome que deste no passo anterior
        withSonarQubeEnv('SonarServer') {
            sh 'sonar-scanner'
        }
    }
}
    stages {
        stage('Obter código') {
            steps {
                echo 'Obtendo o projeto do GitHub...'
                checkout scm
            }
        }

        stage('Verificar arquivos') {
            steps {
                echo 'Verificando os arquivos do projeto...'
                sh 'find . -maxdepth 2 -type f'
            }
        }

        stage('Analisar código') {
            steps {
                echo 'Procurando marcações pendentes...'
                sh '''
                    if grep -RniE "TODO|FIXME" . \
                        --exclude-dir=.git \
                        --exclude=Jenkinsfile
                    then
                        echo "Foram encontradas marcações pendentes."
                    else
                        echo "Nenhuma marcação pendente foi encontrada."
                    fi
                '''
            }
        }

        stage('Finalização') {
            steps {
                echo 'Pipeline executada com sucesso!'
            }
        }
    }

    post {
        success {
            echo 'O projeto passou por todas as etapas.'
        }
        failure {
            echo 'A Pipeline apresentou um erro. Consulte o console.'
        }
    }
}
