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
  const { registration } = req.query

  const student = await Student.findOne({ registration })
  if (!student)
    return res
      .status(404)
      .send({ error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encotrado' })

  res.json(student)
}
