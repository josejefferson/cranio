const mongoose = require('mongoose')
const sendChallengeWonEmail = require('../modules/email/challenge-won')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	active: { type: Boolean, default: true },
	question: { type: String, required: true },
	topic: { type: String, required: true },
	course: { type: [Number] },
	image: { type: String },
	time: { type: Number, default: 60 },
	preparationTime: { type: Number, default: 3 },
	createdBy: {
		type: [{
			name: { type: String, required: true },
			email: { type: String, required: true }
		}],
		required: true
	},
	alternatives: {
		type: [{
			title: { type: String, required: true },
			subtitle: { type: String },
			correct: { type: Boolean, required: true }
		}],
		required: true
	},
	randomizeAlternatives: { type: Boolean, default: false },
	preparationMessage: { type: String, default: 'Prepare-se!' },
	correctMessage: { type: String, default: 'Parabéns, você acertou!' },
	incorrectMessage: { type: String, default: 'Que pena, você errou!' },
	timeOutMessage: { type: String, default: 'Tempo esgotado!' },
	answeredBy: { type: String }
}, options)

schema.statics.findRandom = async function (course, testUser = false) {
	const conditions = testUser ? {} : { active: true, $or: [{ course }, { course: null }] }
	const challenges = await this.find(conditions)
	const challenge = challenges[Math.floor(Math.random() * challenges.length)]
	if (challenge && challenge.randomizeAlternatives) {
		challenge.alternatives = challenge.alternatives.sort(() => Math.random() - 0.5)
	}
	return challenge
}

schema.methods.checkCorrect = function (id) {
	const correctAlternative = this.alternatives.find((alternative) => alternative.correct)
	return correctAlternative._id.toString() === id.toString()
}

schema.methods.won = function (student) {
	if (student.testUser) return Promise.resolve(null)
	student.canPlayToday = false
	student.challengesCompleted += 1
	student.save()
	sendChallengeWonEmail(this, student)
	this.answeredBy = student.registration
	this.active = false
	return this.save()
}

module.exports = mongoose.model('Challenge', schema)