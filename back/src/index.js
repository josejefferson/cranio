require('dotenv/config')
require('module-alias/register')
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./modules/database')
app.use(require('./modules/routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Servidor rodando na porta', PORT)
})

process.on('uncaughtException', console.error)