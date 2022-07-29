import { Router } from 'express'
import asyncRoutes from '../helpers/async-routes'
import { jsonParse } from '../helpers/helpers'
import Restrictions from './_restrictions'
import Log from '../models/Log'

const router = Router()
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

export default router