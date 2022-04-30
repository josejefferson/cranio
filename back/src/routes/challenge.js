const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')

const Challenge = require('../models/Challenge')
const Student = require('../models/Student')

/**
 * Retorna um desafio para aquele estudante
 */
router.get('/:studentRegistration', asyncRoutes(async (req, res) => {
	const { studentRegistration: registration } = req.params
	const student = await Student.findOne({ registration })
	const challenges = await Challenge.find({ active: true, course: student.course })
	const challenge = challenges[Math.floor(Math.random() * challenges.length)]
	res.json(challenge || null)
}))

/**
 * Retorna todos os desafios
 */
router.get('/all', asyncRoutes(async (req, res) => {
	const challenges = await Challenge.find()
	res.json(challenges)
}))

/**
 * Verifica se a resposta está correta e fecha o desafio
 */
router.post('/check', asyncRoutes(async (req, res) => {
	const { studentID, challengeID, choiceID } = req.body

	const challenge = await Challenge.findById(challengeID).select('+correctMessage +incorrectMessage +timeOutMessage')
	if (!challenge) res.status(400).json({ error: true, message: 'Challenge not found' })
	if (!choiceID) return res.json({ status: 'TIMEOUT', message: challenge.timeOutMessage })

	const correctAlternative = challenge.alternatives.find((alternative) => alternative.correct === true)
	if (correctAlternative._id.toString() === choiceID) {
		res.json({ status: 'CORRECT', message: challenge.correctMessage })
		challenge.answeredBy = studentID
		challenge.active = false
		challenge.save()
	} else {
		res.json({ status: 'INCORRECT', message: challenge.incorrectMessage })
	}
}))

/**
 * Adiciona um desafio
 */
router.post('/add', asyncRoutes(async (req, res) => {
	const { question, topic, alternatives, course, image, time, correctMessage, incorrectMessage, timeOutMessage, createdBy } = req.body
	const challenge = await Challenge.create({ question, topic, alternatives, course, image, time, correctMessage, incorrectMessage, timeOutMessage, createdBy })
	res.json(challenge)
}))

module.exports = router