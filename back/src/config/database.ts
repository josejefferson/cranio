import mongoose, { ConnectOptions } from 'mongoose'
import { log } from '@josejefferson/jj-logger'

const options: ConnectOptions = {
	// useNewUrlParser: true,
	// useUnifiedTopology: true
}

mongoose.connection.on('connecting', () => log('MongoDB', 'CONNECTING').info('Conectando...'))
mongoose.connection.on('connected', () => log('MongoDB', 'CONNECTED', true).success('Conectado'))
mongoose.connection.on('disconnected', () => log('MongoDB', 'DISCONNECTED', true).error('Desconectado'))
mongoose.connection.on('error', (err) => {
	log('MongoDB', true).error('Falha ao conectar', err)
	setTimeout(mongoConnect, 5000)
})

function mongoConnect() {
	mongoose.connect(process.env.MONGO_DB, options).catch(() => { })
}

if (process.env.MONGO_DB) mongoConnect()