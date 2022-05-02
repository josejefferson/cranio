const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Challenge = require('../models/Challenge')
const Student = require('../models/Student')
const databaseRoutes = require('./_database')(Challenge)

/**
 * Retorna um desafio para aquele estudante
 */
router.get('/start/:studentRegistration', asyncRoutes(async (req, res) => {
	const { studentRegistration: registration } = req.params
	const student = await Student.findOne({ registration })
	// if (!student.canPlayToday) return res.json(null)
	const challenge = await Challenge.findRandom(student.course)
	// const challenges = await Challenge.find({ active: true, $or: [{ course: student.course }, { course: null }] })
	// const challenge = challenges[Math.floor(Math.random() * challenges.length)]
	if (!student.testUser && challenge) student.playedToday()
	res.json(challenge || null)
}))

/**
 * Verifica se a resposta está correta e fecha o desafio
 */
router.post('/check', asyncRoutes(async (req, res) => {
	const { studentRegistration, challengeID, choiceID } = req.body

	const student = await Student.findOne({ registration: studentRegistration })
	const challenge = await Challenge.findById(challengeID)
	if (!challenge) res.status(400).json({ error: true, message: 'Challenge not found' })
	if (!choiceID) return res.json({ status: 'TIMEOUT', message: challenge.timeOutMessage })

	if (challenge.checkCorrect(choiceID)) {
		res.json({ status: 'CORRECT', message: challenge.correctMessage })
		challenge.won(student)
	} else {
		res.json({ status: 'INCORRECT', message: challenge.incorrectMessage })
	}
}))

/**
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

module.exports = router