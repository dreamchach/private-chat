import connect from '@/lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await connect()

  switch (method) {
    case 'POST':
      try {
        res.status(200).json({success : true, data : req.body.payload.message})
        //const pets = await Pet.find({})
        //res.status(200).json({ success: true, data: pets })
      } catch (error) {
        console.log('error')
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
