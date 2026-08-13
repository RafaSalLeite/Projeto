Instruções para Construção e Execução (Docker)
Para preparar e executar o projeto em qualquer ambiente que possua o Docker instalado,

utilize os comandos detalhados abaixo no terminal (Git Bash ou PowerShell), 

dentro da pasta raiz onde o Dockerfile está localizado:
Construir a imagem personalizada Execute o comando abaixo
para compilar o código e gerar a imagem Docker do sistema: docker build -t projeto-frontend . 

Explicação do comando: O parâmetro build inicia a criação da imagem. O termo -t (tag) atribui o nome projeto-frontend para facilitar a identificação.
O ponto final (.) é obrigatório e indica que o arquivo Dockerfile está no diretório atual.

Executar o contêiner Após concluir a construção da imagem, 
utilize o comando abaixo para colocar o servidor no ar: docker run -d -p 8080:80 --name meu-site-react projeto-frontend 
Explicação do comando: O parâmetro -d (detached) faz com que o contêiner rode em segundo plano. 
O parâmetro -p 8080:80 conecta a porta 8080 do seu computador à porta 80 interna do contêiner. 
O parâmetro --name define um nome específico para o processo em execução.

Acessar a aplicação no navegador Com o contêiner rodando,
abra o seu navegador de preferência e digite o seguinte endereço: http://localhost:8080

Nota: Este projeto utiliza um arquivo .dockerignore para listar arquivos e pastas que não devem ser incluídos na imagem (como a pasta node_modules),
garantindo que o contêiner seja construído de forma rápida e permaneça leve
