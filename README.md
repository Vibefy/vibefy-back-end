# Vibefy documentation API

## Tabela de Conteúdos

1. [Sobre](#sobre)
2. [Links Relevantes](#links)
3. [Techs](#techs)
4. [Instalando Dependências](#install)
5. [Variáveis de Ambiente](#32-variáveis-de-ambiente)
6. [Migrations](#33-migrations)
7. [Autenticação](#4-autenticação)
8. [Termos de uso ](#termos)

---
<a name="sobre"></a>

## 1. Sobre

 - Ja se pegou perdendo tempo procurando musicas e montando playlists que se encaixem no seu perfil?
 - O vibefy foi projetado por pessoas que assim como vc cansaram de perder tempo pesquisando musicas ou montando playlists so para no fim acabar usando umas 5 ou 6 musicas em uma corrida matinal, ou em outras tarefas onde apenas procuramos musicas para não deixar aquele silêncio absoluto (codar é um desses exemplos),  No vibefy voce vai poder abrir o site ou o aplicativo e estar ouvindo a "Vibe" que desejar em menos de 2 minutos.
- O projeto funciona da seguinte forma, o usuário se cadastra, e após estar cadastrado ele terá acesso a todas as playlists montadas pela nossa curadoria, o usuário poderá digitar a vibe que deseja no campo de buscas e retornaremos as playlists mais indicadas para ele, ai é só clicar e curtir, caso goste muito ele ainda poderá adicionar às suas playlists favoritas  e toca-las com apenas um clique.
- Possuímos  uma area exclusiva para artistas poderem divulgar suas musicas, mas claro terá que passar pela nossa curadoria para que encaixemos nas playlists que combinam com a "vibe" da musica, claro a opinião do artista também tem peso na decisão.
- O projeto conta com playlists excluivas para musicas sem direitos autorais, para aqueles usuários que necessitam de musicas de fundo para seus pitch, videos, livestream  e etc...
- Em resumo somos um projeto de soluções musicais para otimizar seu tempo e agregar felicidade em suas necessidades do dia a dia.

## 2. Links relevantes 

[ Voltar para o topo ](#tabela-de-conteúdos)

- <a name="documentação-api" href="https://exemplo@exemplo.com.br" target="_blank">Documentação API</a>

- Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.
<img>https://imgur.com/a/5FMDUZJ</img>

---
<a name="techs"></a>

## 3.techs

[ Voltar para o topo ](#tabela-de-conteúdos)
 Visão Geral das tecnologias usadas no projeto.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Docker](https://docs.docker.com)
- [Aws-sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Nodemailer](https://nodemailer.com/about/)
- [Multer-s3](https://www.npmjs.com/package/multer-s3)
- A URL base da aplicação:


---
<a name="install"></a>

## 4. instalando dependências

- Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 4.1. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 4.2. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuários)
	- [GET - /users/:user_id](#13-listar-usuário-por-id)
- [Products](#2-products)
- [Cart](#3-cart)
- [Users](#4-buys)

---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| isAdm      | boolean | Define se um usuário é Administrador ou não.   |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /users     | Lista todos os usuários                 |
| GET      | /users/:user_id     | Lista um usuário usando seu ID como parâmetro 

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "eDuArDo",
	"email": "edu@mail.com",
	"password": "1234",
	"isAdm": true
}
```

### Schema de Validação com Yup:
```javascript
name: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return titlelify(originalValue) 
	}),
email: yup
        .string()
	.email()
	.required()
	.transform((value, originalValue) => { 
		return originalValue.toLowerCase() 
	}),
password: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return bcrypt.hashSync(originalValue, 10) 
	}),
isAdm: yup
        .boolean()
	.required(),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
		"name": "Eduardo",
		"email": "edu@mail.com",
		"isAdm": true
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |

