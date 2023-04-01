import * as database from '@/middleware/database'
import * as error from '@/middleware/error'
import Highlight from '@/models/Highlight'
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
  const result = await Highlight.find()
  res.json(result)
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await Highlight.create(req.body)
  res.json(result)
}
