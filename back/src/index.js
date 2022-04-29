require('dotenv/config')
require('module-alias/register')
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({ message: 'Hello World' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Servidor rodando na porta', PORT)
})

process.on('uncaughtException', console.error)