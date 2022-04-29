const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	question: { type: String, required: true },
	topic: { type: String, required: true },
	alternatives: { type: Array, required: true },
	course: { type: Number, required: true },
	image: { type: String },
	time: { type: Number, required: true, default: 60 },
	correctMessage: { type: String, default: 'Parabéns, você acertou!' },
	incorrectMessage: { type: String, default: 'Que pena, você errou!' },
	timeOutMessage: { type: String, default: 'Tempo esgotado!' },
})

module.exports = mongoose.model('Challenge', schema)