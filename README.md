<div align="center">
    <img src="https://github.com/josejefferson/cranio/blob/main/front/public/img/icon.png?raw=true" alt="Logo">
</div>

# 💀 O Crânio

O Crânio consiste em uma tela em que passam anúncios e um jogo de perguntas.

[Acesse aqui](https://cranio-ifpb.vercel.app/)

## 👨‍💻 Autores

- [@josejefferson](https://www.github.com/josejefferson)
- [@KayoRonald](https://www.github.com/KayoRonald)

## 🔑 Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env**

`API_ENDPOINT` - URL do servidor _backend_

## 📖 Documentação da API

> **Note**
> Algumas chamadas de API podem requerer um cabeçalho de autenticação!

#### Retorna todos os anúncios ativos

```http
GET /ad/active
GET /ads/active
```

#### Retorna um desafio para um determinado estudante

```http
GET /challenge/start/${registration}
GET /challenges/start/${registration}
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `registration` | `string` | **Obrigatório**. Matrícula do estudante |

#### Verifica se a resposta está correta

```http
POST /challenge/check
POST /challenges/check
```

| Parâmetro             | Tipo     | Descrição                                    |
| :-------------------- | :------- | :------------------------------------------- |
| `studentRegistration` | `string` | **Obrigatório**. Matrícula do estudante      |
| `challengeID`         | `string` | **Obrigatório**. ID do desafio               |
| `choiceID`            | `string` | **Obrigatório**. ID da alternativa escolhida |

#### Retorna os dados de um estudante

```http
GET /student/find/${registration}
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
