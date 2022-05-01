const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')
const Restrictions = require('./_restrictions')

const Ad = require('../models/Ad')
const databaseRoutes = require('./_database')(Ad)

/**
 * Retorna as propagandas ativas
 */
router.get('/active', asyncRoutes(async (req, res) => {
	const currentDate = new Date().toISOString()
	const ads = await Ad.find({
		$or: [
			{ endDate: { $gte: currentDate } },
			{ endDate: null }
		]
	})
	res.json(ads)
}))

/**
 * Rotas do banco de dados
 */
router.use(Restrictions.admin, databaseRoutes.all)

module.exports = router