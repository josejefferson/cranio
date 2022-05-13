const mongoose = require('mongoose')
const dbLogger = require('../helpers/db-logger')

const options = { strict: false }

const schema = new mongoose.Schema({}, options)

dbLogger(schema, 'Log')

module.exports = mongoose.model('Log', schema)