=======

# Vibefy documentation API

## Tabela de Conteúdos

1. [Sobre](#sobre)
2. [Links Relevantes](#links)
3. [Techs](#techs)
4. [Instalação](#install)
5. [Desenvolvedores](#devs)
6. [Termos de uso](#terms)

---

<a name="sobre"></a>

## 1. Sobre

- Ja se pegou perdendo tempo procurando musicas e montando playlists que se encaixem no seu perfil?
- O vibefy foi projetado por pessoas que assim como vc cansaram de perder tempo pesquisando musicas ou montando playlists so para no fim acabar usando umas 5 ou 6 musicas em uma corrida matinal, ou em outras tarefas onde apenas procuramos musicas para não deixar aquele silêncio absoluto (codar é um desses exemplos), No vibefy voce vai poder abrir o site ou o aplicativo e estar ouvindo a "Vibe" que desejar em menos de 2 minutos.
- O projeto funciona da seguinte forma, o usuário se cadastra, e após estar cadastrado ele terá acesso a todas as playlists montadas pela nossa curadoria, o usuário poderá digitar a vibe que deseja no campo de buscas e retornaremos as playlists mais indicadas para ele, ai é só clicar e curtir, caso goste muito ele ainda poderá adicionar às suas playlists favoritas e toca-las com apenas um clique.
- Possuímos uma area exclusiva para artistas poderem divulgar suas musicas, mas claro terá que passar pela nossa curadoria para que encaixemos nas playlists que combinam com a "vibe" da musica, claro a opinião do artista também tem peso na decisão.
- O projeto conta com playlists excluivas para musicas sem direitos autorais, para aqueles usuários que necessitam de musicas de fundo para seus pitch, videos, livestream e etc...
- Em resumo somos um projeto de soluções musicais para otimizar seu tempo e agregar felicidade em suas necessidades do dia a dia.

<a name="links"></a>

## 2. Links relevantes

- <a name="deploy-da-aplicação" href ="https://vibefyproject.herokuapp.com/" target="_blank">Link da aplicação</a>

- <a name="documentação-api" href="https://exemplo@exemplo.com.br" target="_blank">Documentação API</a>

- Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

<img height="700" align="center" src="https://i.imgur.com/UO8G8XD.png"></img>

---

<a align="left" name="techs"></a>

## 3. Techs

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

---

<a name="install"></a>

## 4. Instalação e uso

### 4.1 Requisitos:

- NodeJs a partir da versão 16.14.1
- Gerenciador de pacotes yarn ou npm
- Banco de dados PostgreSQL

### 4.2 Instalação

4.2.1 - Crie um banco de dados chamado vibe_database no PostgreSQL
4.2.2 - Após o clone no repositório para adicionar todas as dependências do package json execute o comando:
`yarn install`

4.2.3 - Crie um arquivo na raiz do projeto chamado .env e faça as configurações das variáveis de ambiente com base no .env.example do projeto

```
SECRET_KEY= chave secreta definida pelo seu time de desenvolvimento
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/vibe_database
ADM_HASH= hash de administrador definida pela equipe de desenvolvimento
AWS_ACCESS_KEY_ID= id de acesso da aws para salvar seus arquivos
AWS_SECRET_ACCESS_KEY= chave de acesso da aws para salvar seus arquivos
```

4.2.4 - Para rodar projeto utilize o comando `yarn dev` no terminal, caso de tudo certo receberá uma mensagem parecida com essa:

```
[INFO] 17:23:18 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.8.4)
query: SELECT * FROM current_schema()
query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
query: SELECT version();
Servidor executando.
```

<a name="devs"></a>

## 5. Desenvolvedores

[ Voltar para o topo ](#tabela-de-conteúdos)

- <a name="Gabriel-Fernandes" href="https://www.linkedin.com/in/gabriel-lima-fernandes/" target="_blank">Gabriel Fernandes</a>
- <a name="Gabriel-fray" href="https://www.linkedin.com/in/gabrielfray/" target="_blank">Gabriel Fray</a>
- <a name="Guilherme-teles" href="https://www.linkedin.com/in/guilherme-teles-103853235/" target="_blank">Guilherme Teles</a>
- <a name="Henrique-pires-Bezerra" href="https://www.linkedin.com/in/henrique-pires-bezerra/" target="_blank">Henrique Pires Bezerra</a>
- <a name="Victor-Ávila" href="https://www.linkedin.com/in/victor-avila-br/" target="_blank">Victor Ávila</a>
- <a name="Vinicius-Moreira-Henrique" href="https://www.linkedin.com/in/vinicius-moreira-henrique/" target="_blank">Vinicius Moreira Henrique</a>

<a name="terms"></a>

## 6. Termos de uso

Este é um projeto Open Source para fins educacionais e não comerciais, **Tipo de licença** - <a name="mit" href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
