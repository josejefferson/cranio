const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	image: { type: String, required: true },
	endDate: { type: Date, required: true }
}, options)

module.exports = mongoose.model('Ad', schema)