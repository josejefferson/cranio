const mongoose = require('mongoose')
const sendChallengeWonEmail = require('../modules/email/challenge-won')
const dbLogger = require('../helpers/db-logger')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	active: { type: Boolean, default: true },
	question: { type: String, required: true },
	topic: { type: String, required: true },
	course: { type: [Number] },
	courseName: { type: [String] },
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
	preparationMessage: { type: String },
	correctMessage: { type: String },
	incorrectMessage: { type: String },
	timeOutMessage: { type: String },
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
	const correctAlternatives = this.alternatives.filter((alternative) => alternative.correct)
	const correct = correctAlternatives.some((alternative) => alternative._id.toString() === id.toString())
	return correct
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

dbLogger(schema, 'Challenge')

module.exports = mongoose.model('Challenge', schema)