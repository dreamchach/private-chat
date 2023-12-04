import connect from '@/lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import messageModel from '@/model/Message'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await connect()

  switch (method) {
    case 'POST':
      try {
        const to = req.body.to
        const from = req.body.from

        const getToken = (sender : string, receiver : string) => {
          const key = [sender, receiver].sort().join('_')
          return key
        }

        const token = getToken(from, to)
        const foundToken = await messageModel.findOne({userToken : token})

        res.status(200).json({data : foundToken})
      } catch (error) {
        console.log('error')
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
