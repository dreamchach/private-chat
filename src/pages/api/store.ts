import connect from '@/lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import messageModel from '@/model/Message'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await connect()

  switch (method) {
    case 'POST':
      try {
        const payload = req.body.payload
        const getToken = (sender : string, receiver : string) => {
          const key = [sender, receiver].sort().join('_')
          return key
        }

        const token = getToken(payload.from, payload.to)
        const foundToken = await messageModel.findOne({userToken : token})

        if(foundToken) {
          await messageModel.findOneAndUpdate({userToken : token}, {$push: {messages : payload}})
        } else {
          const data = {
            userToken : token,
            messages : [payload]
          }
          const message = new messageModel(data)
          const saveMessage = message.save()

          if(saveMessage) console.log('create message')
          else console.log('creating message error')
        }

        res.status(200).json({data : req.body.payload.message})
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
