import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import dbConnect from '@/utils/db-connect'

export async function connect(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
  await dbConnect()
  next()
}
