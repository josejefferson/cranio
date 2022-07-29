import { Router } from 'express'
import asyncRoutes from '../helpers/async-routes'
import Restrictions from './_restrictions'
import Highlight from '../models/Highlight'
import dbRoutes from './_database'

const router = Router()
const databaseRoutes = dbRoutes(Highlight)

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

export default router