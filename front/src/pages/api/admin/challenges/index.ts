import * as database from '@/middleware/database'
import * as error from '@/middleware/error'
import Challenge from '@/models/Challenge'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export default nc<NextApiRequest, NextApiResponse>({
  onError: error.error,
  onNoMatch: error.notAllowedMethod
})
  .use(database.connect)
  .get(getHandler)
  .post(postHandler)

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Challenge.find()
  res.json(result)
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Challenge.create(req.body)
  res.json(result)
}
