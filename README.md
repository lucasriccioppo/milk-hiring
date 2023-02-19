## Milk Hiring

API para controle de leite recebido de fazendeiros para a fábrica de processamento

#### Rodando o projeto

Primeiramente é necessário instalar as dependências do projeto:

`npm install`

ou

`yarn install`

Para fins de desenvolvimento foi criado o arquivo .env.sample, para que não fosse necessário subir o arquivo .env (questões de segurança). O .env.sample tem armazenado as variáveis de ambiente de localhost. Criar um arquivo .env através do comando:

`cp .env.sample .env`

Depois inicializar o banco de dados através do comando:

`docker-compose up`

e então subir a aplicação:

`npm run dev`

ou

`yarn dev`

#### Testes

O projeto conta com uma cobertura de testes end to end para todos os endpoints disponíveis, utlizando um banco de dados somente para isso (o banco milk-hiring-db-test sobe juntamente com o banco da aplicação no docker-compose). Para rodar a bateria de testes, utilizar o comando:

`npm test`

ou

`yarn test`

Para rodar somente um teste, basta passar o nome do arquivo junto com o comando. Os testes disponíveis são farm.test.ts, production.test.ts e user.test.ts. Exemplo:

`yarn test farm.test.ts`

#### Documentação

Foi implementada um documentação do _Swagger_ na aplicação. Através de lá é possível consultar e chamar os endpoits da api. Para acessar, basta ter a aplicação rodando e acessar no navegador o seguinte link:

`http://localhost:3333/api-docs`

(caso a variável de ambiente PORT tenha sido alterada, é necessário alterar a porta 3333 na url acima para o valor setado no .env)

#### Observação

Foi feito também um deploy da aplicação no heroku, portanto é possível acessar a api através da url:
` https://challenge-bravo-hurb.herokuapp.com/`

Apesar de normalmente não ter documentação swagger para api's em produção, foi disponibilizado a mesma nesse endpoint, para facilitar:
`https://challenge-bravo-hurb.herokuapp.com/api-docs/`
