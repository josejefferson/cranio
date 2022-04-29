const mongoose = require('mongoose')

let mongoDBURL = process.env.MONGO_DB
if (!mongoDBURL) {
	mongoDBURL = 'mongodb://localhost'
}

mongoose.connection.on('connecting', () => console.log('[MongoDB] Conectando...'))
mongoose.connection.on('connected', () => console.log('[MongoDB] Conectado'))
mongoose.connection.on('disconnected', () => console.log('[MongoDB] Desconectado'))
mongoose.connection.on('error', (err) => {
	console.log('[MongoDB] Erro ao conectar! ' + err.message, 'red')
	setTimeout(mongoConnect, 5000)
})
function mongoConnect() {
	mongoose.connect(mongoDBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch(() => { })
}

mongoConnect()

require('@models/Ad')
require('@models/Challenge')
require('@models/Student')