import mongoose, { Document } from 'mongoose'
import dbLogger from '../helpers/db-logger'

export interface IHighlight extends Document {
	title?: string,
	description?: string,
	image: string,
	endDate: Date
}

const options = { timestamps: true }

const schema = new mongoose.Schema<IHighlight>({
	title: { type: String },
	description: { type: String },
	image: { type: String, required: true },
	endDate: { type: Date }
}, options)

dbLogger(schema, 'Highlight')

export default mongoose.model<IHighlight>('Highlight', schema)