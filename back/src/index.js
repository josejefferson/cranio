require('dotenv/config')
require('module-alias/register')
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({ message: 'Hello World' })
})

app.post('/ads/all', (req, res) => {
	return {
		_id: 'sjdlasjdjl',
		image: 'https://...png',
		expires: 1234567
	}
})

app.post('/ads/image/:id', (req, res) => {
	// retorna uma imagem
})

app.get('/student/:id', (req, res) => {
	// se não houver o estudante, retorna null
	return {
		name: 'Fulano de tal',
		matricula: 123456789,
		course: 313, // curso
		canPlayIn: 1233456, // data/hora
		canPlayToday: false, // pode jogar hoje
	}
})

app.get('/challenge/:studentID', (req, res) => {
	// se não houver desafios retorna null
	// retorna um desafio aleatório
	return {
		_id: 21244311,
		tempopararesponder,
		mensagemsucesso, // nao enviar aqui
		mensagemerro, // nao enviar aqui
		mensagemtempoesgotado, // nao enviar aqui
		pergunta,
		imagem,
		alternativas:[],
	}
})

app.post('/check', (req, res) => {
	req.body.id // alternativa
	req.body.choice // alternativa
	// se alternativa for null, tempo esgotado

	STATUSES = {
		0: 'Acertou',
		1: 'Errou',
		2: 'Tempo esgotado'
	}

	return {
		status: true,
		message: 'Mensagem'
	}
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Servidor rodando na porta', PORT)
})

process.on('uncaughtException', console.error)