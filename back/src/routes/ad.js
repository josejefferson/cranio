const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')

const Ad = require('../models/Ad')

/**
 * Retorna as propagandas ativas
 */
router.get('/active', asyncRoutes(async (req, res) => {
	const currentDate = new Date().toISOString()
	const ads = await Ad.find({
		'endDate': { $gte: currentDate }
	})
	res.json(ads)
}))

/**
 * Retorna todas as propagandas
 */
router.get('/all', asyncRoutes(async (req, res) => {
	const ads = await Ad.find()
	res.json(ads)
}))

/**
 * Adiciona uma propaganda
 */
router.post('/add', asyncRoutes(async (req, res) => {
	const { title, description, image, endDate } = req.body
	const ad = await Ad.create({ title, description, image, endDate })
	res.json(ad)
}))

module.exports = router