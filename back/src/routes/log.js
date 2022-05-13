const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Logger = require('../helpers/logger')

router.use(Restrictions.admin)

/**
 * Retorna os logs
 */
router.get('/', asyncRoutes(async (req, res) => {
	const logs = Logger.getLogs()
	res.json(logs)
}))

module.exports = router