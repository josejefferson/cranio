import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import Mail from 'nodemailer/lib/mailer'

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
    console.error('Falha ao usar OAuth2 como autenticação', `(${err.message})`)
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
    } as any)
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
  .then(() => console.log('E-mail testado e funcionando'))
  .catch((err) => console.error('Falha no e-mail', `(${err.message})`))

export default async function send(options: Mail.Options) {
  const emailTransporter = await transporter
  options = Object.assign(options, {
    from: { name: 'O Crânio', address: process.env.GMAIL_EMAIL }
  })
  return emailTransporter.sendMail(options)
}
