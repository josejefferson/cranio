const express = require('express')
const router = express.Router()
const { jsonParse } = require('../helpers/helpers')

/**
 * Verifica login e senha
 */
router.post('/verify', (req, res) => {
	const admins = jsonParse(process.env.ADMINS, null, null)
	if (!admins) return res.json({ success: true })

	const { user, password } = req.body
	if (!user || !password) return res.status(400).json({
		success: false,
		error: true,
		code: 'MISSING_CREDENTIALS',
		message: 'Faltam credenciais'
	})

	if (!admins[user]) return res.status(401).json({
		success: false,
		error: true,
		code: 'USER_NOT_FOUND',
		message: 'Usuário não existe'
	})

	if (password !== admins[user]) return res.status(401).json({
		success: false,
		error: true,
		code: 'INCORRECT_PASSWORD',
		message: 'Senha incorreta'
	})

	return res.json({ success: true })
})

module.exports = router