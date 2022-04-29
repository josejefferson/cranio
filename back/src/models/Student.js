const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	registration: { type: String, required: true },
	course: { type: Number, required: true },
	canPlayIn: { type: Date, required: true, default: new Date() }
})

module.exports = mongoose.model('Student', schema)