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
<br></br>
## Manual
### Instalando dependências
```
yarn
```
### Setando MongoDB
Para funcionar a aplicação você devera criar um container docker do MongoDB ou conectar a um banco já existente.
<br>
<p>Antes de startar a api é necessário colocar a referencia do link do banco de dados em relação a nossa aplicação.</p>
<p>Para isso iremos alterar uma informação no arquivo dotenv. Abaixo esta um exemplo de uma configuração de banco local
</p>

Link para o arquivo dotenv: [aqui](.env)

```
MONGO_URL=mongodb://localhost:27017
```

### **Startando a API**
Para startar a api digite o comando abaixo:
```
yarn dev
```
<br>


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
docker image rm unid-backend-desafio_app
```