import mongoose, { Document } from 'mongoose'

export interface ILog extends Document {
  date: Date
  [key: string]: any
}

const options = { strict: false }

const schema = new mongoose.Schema<ILog>(
  {
    date: { type: Date, expires: 604800 }
  },
  options
)

export default mongoose.models.Log || mongoose.model<ILog>('Log', schema)
