const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Highlight = require('../models/Highlight')
const databaseRoutes = require('./_database')(Highlight)

/**
 * Retorna as propagandas ativas
 */
router.get('/active', asyncRoutes(async (req, res) => {
	const currentDate = new Date().toISOString()
	const highlights = await Highlight.find({
		$or: [
			{ endDate: { $gte: currentDate } },
			{ endDate: null }
		]
	})
	res.json(highlights)
}))

/**
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

module.exports = router