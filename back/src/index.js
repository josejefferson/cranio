require('dotenv/config')
require('module-alias/register')
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./modules/database')
app.use('/ad', require('./routes/ad'))
app.use('/challenge', require('./routes/challenge'))
app.use('/student', require('./routes/student'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Servidor rodando na porta', PORT)
})

process.on('uncaughtException', console.error)