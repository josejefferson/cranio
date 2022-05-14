const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const { jsonParse } = require('../helpers/helpers')

const Restrictions = require('./_restrictions')

const Logger = require('../helpers/logger')
const Log = require('../models/Log')

router.use(Restrictions.admin)

/**
 * Retorna todos os logs
 */
router.get('/', asyncRoutes(async (req, res) => {
	const logs = Logger.getLogs()
	res.json(logs)
}))

/**
 * Pesquisa os logs
 */
router.get('/search', asyncRoutes(async (req, res) => {
	const filter = jsonParse(req.query.q, null, null)
	if (!filter || Array.isArray(filter)) {
		return res.status(400).send({ error: true, code: 400, message: 'Bad request' })
	}
	const logs = await Log.find(filter)
	res.json(logs)
}))

module.exports = router