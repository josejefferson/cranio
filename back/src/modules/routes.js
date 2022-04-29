const express = require('express')
const router = express.Router()

const Ad = require('@models/Ad')
const Challenge = require('@models/Challenge')
const Student = require('@models/Student')

router.get('/ads/all', async (req, res) => {
	const currentDate = new Date().toISOString()

	const ads = await Ad.find({
		// 'endDate': { $lte: currentDate }
	})

	res.json(ads)
})

router.post('/ads/image/:id', (req, res) => {
	// retorna uma imagem
})

router.get('/student/:id', (req, res) => {
	// se não houver o estudante, retorna null
	return {
		name: 'Fulano de tal',
		matricula: 123456789,
		course: 313, // curso
		canPlayIn: '2022-04-30-00:00:00', // data/hora
		canPlayToday: false, // pode jogar hoje
	}
})

router.get('/challenge/:studentID', (req, res) => {
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
		alternativas: [],
	}
})

router.post('/check', (req, res) => {
	req.body.id // alternativa
	req.body.choice // alternativa
	// se alternativa for null, tempo esgotado

	STATUSES = {
		0: 'Acertou',
		1: 'Errou',
		2: 'Tempo esgotado'
	}

	return {
		status: 1,
		message: 'Mensagem'
	}
})

module.exports = router