const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	active: { type: Boolean, default: true },
	question: { type: String, required: true },
	topic: { type: String, required: true },
	alternatives: {
		type: [{
			title: { type: String, required: true },
			subtitle: { type: String },
			correct: { type: Boolean, required: true }
		}],
		required: true
	},
	course: { type: Number, required: true },
	image: { type: String },
	time: { type: Number, required: true, default: 60 },
	correctMessage: { type: String, default: 'Parabéns, você acertou!', select: false },
	incorrectMessage: { type: String, default: 'Que pena, você errou!', select: false },
	timeOutMessage: { type: String, default: 'Tempo esgotado!', select: false },
	answeredBy: { type: String },
	createdBy: {
		type: {
			name: { type: String, required: true },
			email: { type: String, required: true }
		},
		required: true
	}
})

module.exports = mongoose.model('Challenge', schema)