require('dotenv/config')
require('module-alias/register')
require('./modules/database')
const express = require('express')
const cors = require('cors')
const log = require('./helpers/logger')
const Restrictions = require('./routes/_restrictions')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(Restrictions.user)
app.use(cors())
app.use(['/ad', '/ads'], require('./routes/ad'))
app.use(['/challenge', '/challenges'], require('./routes/challenge'))
app.use(['/student', '/students'], require('./routes/student'))

app.use((req, res) => {
	if (res.headersSent) return
	res.status(404).send({ error: true, code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
	if (res.headersSent) return
	log('redBright', 'Erro')(err)
	res.status(500).send({ error: true, code: 500, message: err.message, details: err })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	log('greenBright', 'HTTP')(`Servidor rodando na porta ${PORT}`)
})

process.on('uncaughtException', console.error)