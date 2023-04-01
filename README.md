<div align="center">
    <img src="https://github.com/josejefferson/cranio/blob/main/public/img/icon.png?raw=true" alt="Logo">
</div>

# 💀 O Crânio

O Crânio consiste em uma tela em que passam anúncios e um jogo de perguntas.

[Acesse aqui](https://cranio-ifpb.vercel.app/)

## 👨‍💻 Autores

- [@josejefferson](https://www.github.com/josejefferson)
- [@KayoRonald](https://www.github.com/KayoRonald)

## 🔑 Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env**

`MONGO_DB` - _Connection string_ do MongoDB

`GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_EMAIL`, `GMAIL_REFRESH_TOKEN` - Credenciais do Gmail

## 📖 Documentação da API

> **Note**
> Algumas chamadas de API podem requerer um cabeçalho de autenticação!

#### Retorna todos os anúncios ativos

```http
GET /highlights/active
```

#### Retorna um desafio para um determinado estudante

```http
GET /challenges/start/${registration}
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `registration` | `string` | **Obrigatório**. Matrícula do estudante |

#### Verifica se a resposta está correta

```http
POST /challenges/check
```

| Parâmetro             | Tipo     | Descrição                                    |
| :-------------------- | :------- | :------------------------------------------- |
| `studentRegistration` | `string` | **Obrigatório**. Matrícula do estudante      |
| `challengeID`         | `string` | **Obrigatório**. ID do desafio               |
| `choiceID`            | `string` | **Obrigatório**. ID da alternativa escolhida |

#### Retorna os dados de um estudante

```http
GET /students/find/${registration}
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `registration` | `string` | **Obrigatório**. Matrícula do estudante |

## 🚀 Rodando localmente

#### Clone o projeto

```bash
git clone https://github.com/josejefferson/cranio
```

#### Entre no diretório do projeto

```bash
cd cranio
```

#### Instale as dependências

```bash
yarn
```

#### Faça o build

```bash
yarn build
```

#### Inicie o servidor

```bash
yarn start
```

## 💿 Stack utilizada

**Front-end:** React, NextJS, Bootstrap, Chakra UI

**Back-end:** NodeJS, Express

## 🗨 Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do [formulário](https://forms.gle/3XdA6TizDNp8yosu9).
