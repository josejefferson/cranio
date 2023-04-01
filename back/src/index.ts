import 'dotenv/config'
import './config/database'
import './config/logger'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { log, logExpress } from '@josejefferson/jj-logger'
import Restrictions from './routes/_restrictions'
import responseTime from 'response-time'

import highlightRoutes from './routes/highlight'
import challengeRoutes from './routes/challenge'
import logRoutes from './routes/log'
import studentRoutes from './routes/student'
import authRoutes from './routes/auth'

const app = express()

interface IUserResponse extends Response {
	time?: number
}

app.set('trust proxy', true)
app.options('*', cors({ credentials: true, origin: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(
	responseTime(
		(req: Request, res: IUserResponse, time: number) =>
			(res.time = Math.round(time))
	)
)
app.use(logExpress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Restrictions.user)
app.use(['/highlight', '/highlights'], highlightRoutes)
app.use(['/challenge', '/challenges'], challengeRoutes)
app.use(['/log', '/logs'], logRoutes)
app.use(['/student', '/students'], studentRoutes)
app.use(['/auth'], authRoutes)

app.use((req, res) => {
	if (res.headersSent) return
	res.status(404).send({ error: true, code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
	if (res.headersSent) return
	log('Erro').error(err)
	res
		.status(500)
		.send({ error: true, code: 500, message: err.message, details: err })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	log('HTTP', true).success(`Servidor rodando na porta ${PORT}`)
})

process.on('uncaughtException', console.error)
