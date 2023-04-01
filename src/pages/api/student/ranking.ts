import * as database from '@/middleware/database'
import * as error from '@/middleware/error'
import Student from '@/models/Student'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export default nc<NextApiRequest, NextApiResponse>({
  onError: error.error,
  onNoMatch: error.notAllowedMethod
})
  .use(database.connect)
  .get(getHandler)

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let students = await Student.find({ challengesCompleted: { $gt: 0 } }).sort({
    challengesCompleted: -1,
    name: 1
  })

  let i = 0
  let lastChallengesCompleted: any = null
  students = students.map((student) => {
    const studentObj: any = student.toObject()
    studentObj.place = lastChallengesCompleted === studentObj.challengesCompleted ? i : ++i
    lastChallengesCompleted = studentObj.challengesCompleted
    return studentObj
  })

  res.json(students)
}
