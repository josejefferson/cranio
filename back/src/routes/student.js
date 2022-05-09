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
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

module.exports = router