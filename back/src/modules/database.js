const mongoose = require('mongoose')
const log = require('../helpers/logger')

let mongoDBURL = process.env.MONGO_DB || 'mongodb://localhost'

mongoose.connection.on('connecting', () => log('MongoDB', 'CONNECTING').info('Conectando...'))
mongoose.connection.on('connected', () => log('MongoDB', 'CONNECTED', true).success('Conectado'))
mongoose.connection.on('disconnected', () => log('MongoDB', 'DISCONNECTED', true).error('Desconectado'))
mongoose.connection.on('error', (err) => {
	log('MongoDB', true).error('Falha ao conectar', err)
	setTimeout(mongoConnect, 5000)
})

function mongoConnect() {
	mongoose.connect(mongoDBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch(() => { })
}

mongoConnect()

require('../models/Highlight')
require('../models/Challenge')
require('../models/Log')
require('../models/Student')