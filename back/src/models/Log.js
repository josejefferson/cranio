const mongoose = require('mongoose')
const dbLogger = require('../helpers/db-logger')

const options = { strict: false }

const schema = new mongoose.Schema({
	date: { type: Date, expires: 604800 }
}, options)

dbLogger(schema, 'Log')

module.exports = mongoose.model('Log', schema)