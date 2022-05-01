const mongoose = require('mongoose')

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
	canPlayIn: { type: Date, required: true, default: new Date() }
}, options)

schema.virtual('canPlayToday').get(function () {
	return new Date(this.canPlayIn) <= new Date()
})

schema.methods.playedToday = function () {
	const canPlayIn = new Date()
	canPlayIn.setDate(canPlayIn.getDate() + 1)
	canPlayIn.setHours(0)
	canPlayIn.setMinutes(0)
	canPlayIn.setSeconds(0)
	this.canPlayIn = canPlayIn
	return this.save()
}

module.exports = mongoose.model('Student', schema)