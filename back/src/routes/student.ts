import { Router } from 'express'
import asyncRoutes from '../helpers/async-routes'
import Restrictions from './_restrictions'
import Student from '../models/Student'
import dbRoutes from './_database'

const router = Router()
const databaseRoutes = dbRoutes(Student)
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
		const studentObj: any = student.toObject()
		studentObj.place = lastChallengesCompleted === studentObj.challengesCompleted ? i : ++i
		lastChallengesCompleted = studentObj.challengesCompleted
		return studentObj
	})

	res.json(students)
}))

/**
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

export default router