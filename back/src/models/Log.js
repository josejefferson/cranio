const mongoose = require('mongoose')

const options = { strict: false }

const schema = new mongoose.Schema({}, options)

module.exports = mongoose.model('Log', schema)