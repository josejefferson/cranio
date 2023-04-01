import mongoose, { Model, Document } from 'mongoose'
import { IStudent } from './Student'

export interface IChallenge extends Document {
  active: boolean
  question: string
  topic: string
  course: number[]
  courseName: string[]
  image?: string
  time: number
  preparationTime: number
  createdBy: {
    name: string
    email: string
  }[]
  alternatives: {
    title: string
    subtitle: string
    correct: boolean
  }[]
  randomizeAlternatives: boolean
  preparationMessage: string
  correctMessage: string
  incorrectMessage: string
  timeOutMessage: string
  answeredBy: string
  checkCorrect(id: string): boolean
  won(student: IStudent): Promise<IChallenge>
}

export interface IChallengeModel extends Model<IChallenge> {
  findRandom(course: number, testUser: boolean): IChallenge
}

const options = { timestamps: true }

const schema = new mongoose.Schema<IChallenge, IChallengeModel>(
  {
    active: { type: Boolean, default: true },
    question: { type: String, required: true },
    topic: { type: String, required: true },
    course: { type: [Number] },
    courseName: { type: [String] },
    image: { type: String },
    time: { type: Number, default: 60 },
    preparationTime: { type: Number, default: 3 },
    createdBy: {
      type: [
        {
          name: { type: String, required: true },
          email: { type: String, required: true }
        }
      ],
      required: true
    },
    alternatives: {
      type: [
        {
          title: { type: String, required: true },
          subtitle: { type: String },
          correct: { type: Boolean, required: true }
        }
      ],
      required: true
    },
    randomizeAlternatives: { type: Boolean, default: false },
    preparationMessage: { type: String },
    correctMessage: { type: String },
    incorrectMessage: { type: String },
    timeOutMessage: { type: String },
    answeredBy: { type: String }
  },
  options
)

schema.statics.findRandom = async function (course: number, testUser = false) {
  const conditions = testUser ? {} : { active: true, $or: [{ course }, { course: null }] }
  const challenges = await this.find(conditions)
  const challenge = challenges[Math.floor(Math.random() * challenges.length)]
  if (challenge && challenge.randomizeAlternatives) {
    challenge.alternatives = challenge.alternatives.sort(() => Math.random() - 0.5)
  }
  return challenge
}

schema.methods.checkCorrect = function (id: string) {
  const correctAlternatives = this.alternatives.filter((alternative: any) => alternative.correct)
  const correct = correctAlternatives.some(
    (alternative: any) => alternative._id.toString() === id.toString()
  )
  return correct
}

schema.methods.won = function (student: IStudent) {
  if (student.testUser) return Promise.resolve(null)
  student.canPlayToday = false
  student.challengesCompleted += 1
  student.save()
  import('../modules/email/challenge-won').then(({ default: sendChallengeWonEmail }) => {
    sendChallengeWonEmail(this, student)
  })
  this.answeredBy = student.registration
  this.active = false
  return this.save()
}

export default mongoose.models.Challenge ||
  mongoose.model<IChallenge, IChallengeModel>('Challenge', schema)
