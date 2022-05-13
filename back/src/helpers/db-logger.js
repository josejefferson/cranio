
function dbLogger(schema, modelName) {
	const log = require('./logger')
	schema.post('remove', (doc) => log().db({ event: 'remove', collection: modelName, id: doc._id }))
	schema.post('updateOne', (doc) => log().db({ event: 'updateOne', collection: modelName, id: doc._id }))
	schema.post('deleteOne', (doc) => log().db({ event: 'deleteOne', collection: modelName, id: doc._id }))
	schema.post('deleteMany', (doc) => log().db({ event: 'deleteMany', collection: modelName, id: doc._id }))
	schema.post('deleteOne', (doc) => log().db({ event: 'deleteOne', collection: modelName, id: doc._id }))
	schema.post('findOneAndDelete', (doc) => log().db({ event: 'findOneAndDelete', collection: modelName, id: doc._id }))
	schema.post('findOneAndRemove', (doc) => log().db({ event: 'findOneAndRemove', collection: modelName, id: doc._id }))
	schema.post('findOneAndReplace', (doc) => log().db({ event: 'findOneAndReplace', collection: modelName, id: doc._id }))
	schema.post('findOneAndUpdate', (doc) => log().db({ event: 'findOneAndUpdate', collection: modelName, id: doc._id }))
	schema.post('remove', (doc) => log().db({ event: 'remove', collection: modelName, id: doc._id }))
	schema.post('replaceOne', (doc) => log().db({ event: 'replaceOne', collection: modelName, id: doc._id }))
	schema.post('update', (doc) => log().db({ event: 'update', collection: modelName, id: doc._id }))
	schema.post('updateOne', (doc) => log().db({ event: 'updateOne', collection: modelName, id: doc._id }))
	schema.post('updateMany', (doc) => log().db({ event: 'updateMany', collection: modelName, id: doc._id }))
}

module.exports = dbLogger