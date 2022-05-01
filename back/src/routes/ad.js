const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')

const Ad = require('../models/Ad')
const databaseRoutes = require('./_database')(Ad)

/**
 * Retorna as propagandas ativas
 */
router.get('/active', asyncRoutes(async (req, res) => {
	const currentDate = new Date().toISOString()
	const ads = await Ad.find({
		endDate: { $gte: currentDate }
	})
	res.json(ads)
}))

/**
 * Rotas do banco de dados
 */
router.use(databaseRoutes.all)

module.exports = router