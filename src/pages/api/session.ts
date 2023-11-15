import { randomId } from '@/utill/functions/functions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req

  switch (method) {
    case 'POST' : 
      try {
        const data = {
            username : req.body.username as string,
            userID : randomId()
        }
        return res.status(200).send(data)
      } catch (error) {
        console.log('/session error')
      }
      break
    default : 
      res.status(400).send('method error')
      break
  }  
}
