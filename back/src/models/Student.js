const mongoose = require('mongoose')
const dbLogger = require('../helpers/db-logger')

const options = {
	timestamps: true,
	toJSON: {
		virtuals: true
	}
}

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	registration: { type: String, required: true },
	course: { type: Number, required: true },
	courseName: { type: String },
	canPlayIn: { type: Date, default: new Date() },
	challengesCompleted: { type: Number, default: 0 },
	testUser: { type: Boolean }
}, options)

schema.virtual('canPlayToday').get(function () {
	return new Date(this.canPlayIn) <= new Date()
})

schema.virtual('shortName').get(function () {
	const nameChunks = this.name.split(' ')
	const name = [nameChunks[0], nameChunks[1]]
	if (nameChunks[1] && nameChunks[1].length <= 3) {
		name.push(nameChunks[2])
	}
	const shortName = name.filter(_ => _).join(' ')
	return shortName
})

schema.methods.playedToday = function () {
	const canPlayIn = new Date()
	canPlayIn.setDate(canPlayIn.getDate() + 1)
	canPlayIn.setHours(0)
	canPlayIn.setMinutes(0)
	canPlayIn.setSeconds(0)
	canPlayIn.setMilliseconds(0)
	this.canPlayIn = canPlayIn
	return this.save()
}

dbLogger(schema, 'Student')

module.exports = mongoose.model('Student', schema)