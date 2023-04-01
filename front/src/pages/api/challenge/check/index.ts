import * as database from '@/middleware/database'
import * as error from '@/middleware/error'
import Challenge from '@/models/Challenge'
import Student from '@/models/Student'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export default nc<NextApiRequest, NextApiResponse>({
  onError: error.error,
  onNoMatch: error.notAllowedMethod
})
  .use(database.connect)
  .post(postHandler)

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { studentRegistration, challengeID, choiceID } = req.body

  const challenge = await Challenge.findById(challengeID)
  if (!choiceID) return res.json({ status: 'TIMEOUT', message: challenge.timeOutMessage })
  if (!challenge)
    res
      .status(400)
      .json({ error: true, code: 'CHALLENGE_NOT_FOUND', message: 'Desafio não encontrado' })
  const student = await Student.findOne({ registration: studentRegistration })
  if (!student)
    res
      .status(400)
      .json({ error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encontrado' })

  if (challenge.checkCorrect(choiceID)) {
    res.json({ status: 'CORRECT', message: challenge.correctMessage })
    challenge.won(student)
  } else {
    res.json({ status: 'INCORRECT', message: challenge.incorrectMessage })
  }
}
