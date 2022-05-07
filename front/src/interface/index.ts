export interface Data {
  question: string
  createdBy: any
  time: number
  preparationTime: number
  topic: string
  image?: string
  alternatives: Array<{
    title: string
    description?: string
    correct: boolean
    _id: string
  }>
  _id: string
}

export interface Props {
  api: Data
  _id: string
}

export type Iuser = {
  id?: number
  name: string
  courseName: string
  registration: string
  canPlayToday?: any
}