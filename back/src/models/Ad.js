const mongoose = require('mongoose')
const dbLogger = require('../helpers/db-logger')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	image: { type: String, required: true },
	endDate: { type: Date }
}, options)

dbLogger(schema, 'Ad')

module.exports = mongoose.model('Ad', schema)