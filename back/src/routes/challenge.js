const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Challenge = require('../models/Challenge')
const Student = require('../models/Student')
const databaseRoutes = require('./_database')(Challenge)

/**
 * Retorna o número de desafios ativos
 */
router.get('/active', asyncRoutes(async (req, res) => {
	const currentDate = new Date().toISOString()
	const challenges = await Challenge.find({ active: true })
	let challengesPerCourse = {}

	for (const challenge of challenges) {
		if (!challenge.courseName) continue
		for (let courseName of challenge.courseName) {
			courseName = courseName.trim()
			challengesPerCourse[courseName] = challengesPerCourse[courseName] || 0
			challengesPerCourse[courseName]++
		}
	}

	res.json({
		totalChallenges: challenges.length,
		challengesPerCourse
	})
}))

/**
 * Retorna um desafio para aquele estudante
 */
router.get('/start/:studentRegistration', asyncRoutes(async (req, res) => {
	const { studentRegistration: registration } = req.params

	const student = await Student.findOne({ registration })
	if (!student) return res.status(404).json({ error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encontrado' })
	if (!student.canPlayToday) return res.status(403).json({ error: true, code: 'CANT_PLAY_TODAY', message: 'Você só pode jogar amanhã' })

	const challenge = await Challenge.findRandom(student.course, student.testUser)
	if (!challenge) return res.status(404).json({ error: true, code: 'NO_CHALLENGES', message: 'Não há desafios disponíveis para o seu curso' })

	if (!student.testUser) student.playedToday()
	res.json(challenge || null)
}))

/**
 * Verifica se a resposta está correta e fecha o desafio
 */
router.post('/check', asyncRoutes(async (req, res) => {
	const { studentRegistration, challengeID, choiceID } = req.body

	if (!choiceID) return res.json({ status: 'TIMEOUT', message: challenge.timeOutMessage })
	const challenge = await Challenge.findById(challengeID)
	if (!challenge) res.status(400).json({ error: true, code: 'CHALLENGE_NOT_FOUND', message: 'Desafio não encontrado' })
	const student = await Student.findOne({ registration: studentRegistration })
	if (!student) res.status(400).json({ error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encontrado' })

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