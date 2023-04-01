import * as database from '@/middleware/database'
import * as error from '@/middleware/error'
import Student from '@/models/Student'
import { notFound } from '@hapi/boom'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export default nc<NextApiRequest, NextApiResponse>({
  onError: error.error,
  onNoMatch: error.notAllowedMethod
})
  .use(database.connect)
  .get(getHandler)
  .put(putHandler)
  .delete(deleteHandler)

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Student.findById(req.query.id)
  if (!result) throw notFound('Estudante não encontrado')
  res.json(result)
}

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Student.findByIdAndUpdate(req.query.id, { $set: req.body })
  if (!result) throw notFound('Estudante não encontrado')
  res.json(result)
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Student.findByIdAndDelete(req.query.id)
  if (!result) throw notFound('Estudante não encontrado')
  res.json(result)
}
