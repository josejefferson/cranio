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
	let filter = jsonParse(req.query.q, null, null)
	if (!filter || Array.isArray(filter)) filter = {}

	Log.find(filter).then((logs) => {
		res.json(logs)
	}).catch((err) => {
		res.status(500).json({
			error: true,
			details: err
		})
	})
}))

module.exports = router