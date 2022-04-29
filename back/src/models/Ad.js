const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	image: { type: String, required: true },
	endDate: { type: Date, required: true }
})

module.exports = mongoose.model('Ad', schema)