import nodemailer from 'nodemailer'
import log from '@josejefferson/jj-logger'
import { OAuth2Client } from 'google-auth-library'

export async function createTransporter() {
	const oauth2Client = new OAuth2Client(
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
		log('E-mail', true).error('Falha ao usar OAuth2 como autenticação', `(${err.message})`)
		return null
	})

	let transporter
	if (accessToken) {
		transporter = nodemailer.createTransport({
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
		transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_EMAIL,
				pass: process.env.GMAIL_PASSWORD
			}
		})
	}

	return transporter
}

export const transporter = createTransporter()

// Testa o e-mail
transporter
	.then((transporter) => transporter.verify())
	.then(() => log('E-mail', true).success('E-mail testado e funcionando'))
	.catch((err) => log('E-mail', true).error('Falha no e-mail', `(${err.message})`))

export default async function send(options) {
	const emailTransporter = await transporter
	options = Object.assign(options, {
		from: { name: 'O Crânio', address: process.env.GMAIL_EMAIL }
	})
	return emailTransporter.sendMail(options)
}