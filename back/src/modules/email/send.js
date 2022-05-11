const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const log = require('../../helpers/logger')
const OAuth2 = google.auth.OAuth2

async function createTransporter() {
	const oauth2Client = new OAuth2(
		process.env.GMAIL_CLIENT_ID,
		process.env.GMAIL_CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	)

	oauth2Client.setCredentials({
		refresh_token: process.env.GMAIL_REFRESH_TOKEN // eslint-disable-line camelcase
	})

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) reject(err)
			resolve(token)
		})
	}).catch((err) => {
		log('redBright', 'E-mail')('Falha ao usar OAuth2 como autenticação', `(${err.message})`)
		return null
	})

	if (accessToken) {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.GMAIL_EMAIL,
				accessToken,
				clientId: process.env.GMAIL_CLIENT_ID,
				clientSecret: process.env.GMAIL_CLIENT_SECRET,
				refreshToken: process.env.GMAIL_REFRESH_TOKEN
			}
		})
	} else {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_EMAIL,
				pass: process.env.GMAIL_PASSWORD
			}
		})
	}

	return transporter
}

const transporter = createTransporter()

// Testa o e-mail
transporter
	.then((transporter) => transporter.verify())
	.then(() => log('greenBright', 'E-mail')('E-mail testado e funcionando'))
	.catch((err) => log('redBright', 'E-mail')('Falha no e-mail', `(${err.message})`))

async function send(options) {
	const emailTransporter = await transporter
	options = Object.assign(options, {
		from: { name: 'O Crânio', address: process.env.GMAIL_EMAIL }
	})
	return emailTransporter.sendMail(options)
}

module.exports = send