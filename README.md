# Desafio Desenvolvedor : Backend 
Para acessar as informações referentes ao desafio clique no link a seguir: [Link do desafio](https://github.com/fmilioni/desafio/blob/main/BACKEND.md)
<br></br>
>## Informações para consumir a API

### Clone o repositório digitando o comando abaixo no seu terminal
```
git clone https://github.com/vitonv/desafio-backend.git
```
Abaixo tem o guia de como consumir a API.
<br></br>
# Opções para rodar a API

## Docker-Compose
Apos clonar o repositório do projeto, abra o terminal na pasta do projeto e execute o comando:
```
 docker-compose up -d
```
Para conferir se a API esta rodando corretamente digite o comando abaixo
```
 docker logs -f backend
```
Caso a api exiba no console uma mensagem "Server started at port 3000" então a API já esta pronta para ser consumida.
<br>
**Observação:** Caso você opte por essa estratégia, ao final dos testes leia a aba de [removendo dependências]()
## Manual
### Instalando dependências
```
yarn
```
## Setando MongoDB
Para funcionar a aplicação você devera criar um container docker do MongoDB ou conectar a um banco já existente.
<br>
**OBS: Caso você queira usar o próprio banco de dados pule a seção abaixo**
### Criando container do MongoDB

Antes de criar um container MongoDB é interessante saber se existe algum serviço rodando na porta 27027.

Caso não tenha nenhum serviço rodando na porta 27017 execute o comando abaixo:
```
docker run --name mongo-test -p 27017:27017 -d mongo:latest
```
Senão aonde estiver {porta} digite o valor referente a uma porta diferente:
```
docker run --name mongo-test -p {porta}:27017 -d mongo:latest
```
Lembrando que a porta padrão do MongoDB é sempre **27017**, então o segundo argumento do -p tem que ser esse valor. Depois da criação da instancia docker ou da configuração do seu banco local siga os próximos passos.

>## Endpoints
Para acessar informações em relação aos endpoints da API acesse página de documentação do Swagger através do link abaixo.
http://localhost:3000/api/docs
<br></br>
> ## Bibliotecas e Ferramentas

* Yarn
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Swagger
* JsonWebToken
* Faker
* Express
* Eslint(Airbnb Style)
* Ts-node-dev
* Tsconfig-paths


## Removendo dependências (Docker)
Caso você tenha optado pela estratégia de utilizar docker-compose é interessante derrubar o container e depois excluir a imagem apos o uso
### Derrubando instancia
Para derrubar a instancia, abra o terminal na pasta do projeto e digite o comando abaixo:
```
docker compose-down
```
### Excluindo imagem do compose
Para excluir a imagem do projeto primeiramente liste todas as imagens instaladas em seu docker.
```
docker image ls
```
Após a lista ser exibida, verifique se existe uma imagem com o nome **backend-desafio**. Caso exista digite o comando abaixo para remover
```
docker image rm backend-desafio
```