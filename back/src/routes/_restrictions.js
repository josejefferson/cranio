const { jsonParse } = require('../helpers/helpers')
const basicAuth = require('express-basic-auth')

const unauthorizedResponse = () => {
	return { error: true, code: 401, message: 'Unauthorized' }
}

module.exports = {
	/**
	 * Permite acesso apenas a Usuários logados
	 */
	user: (req, res, next) => {
		const users = jsonParse(process.env.USERS, null, null)
		const admins = jsonParse(process.env.ADMINS, null, null)
		if (!users || !admins) return next()

		basicAuth({
			users: { ...admins, ...users },
			challenge: true,
			unauthorizedResponse
		})(req, res, next)
	},

	/**
	 * Permite acesso apenas a Administradores logados
	 */
	admin: (req, res, next) => {
		const admins = jsonParse(process.env.ADMINS, null, null)
		if (!admins) return next()
		
		basicAuth({
			users: admins,
			challenge: true,
			unauthorizedResponse
		})(req, res, next)
	}
}