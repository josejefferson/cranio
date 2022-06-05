const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Student = require('../models/Student')
const databaseRoutes = require('./_database')(Student)

/**
 * Retorna os dados de um estudante
 */
router.get('/find/:registration', asyncRoutes(async (req, res) => {
	const { registration } = req.params

	const student = await Student.findOne({ registration })
	if (!student) return res.status(404).send({ error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encotrado' })

	res.json(student)
}))

/**
 * Retorna o ranking
 */
router.get('/ranking', asyncRoutes(async (req, res) => {
	let students = await Student
		.find({ challengesCompleted: { $gt: 0 } })
		.sort({ challengesCompleted: -1, name: 1 })

	let i = 0
	let lastChallengesCompleted = null
	students = students.map((student) => {
		student = student.toObject()
		student.place = lastChallengesCompleted === student.challengesCompleted ? i : ++i
		lastChallengesCompleted = student.challengesCompleted
		return student
	})

	res.json(students)
}))

/**
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

module.exports = router