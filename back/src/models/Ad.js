const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	image: { type: String, required: true },
	endDate: { type: Date, required: true }
})

module.exports = mongoose.model('Ad', schema)