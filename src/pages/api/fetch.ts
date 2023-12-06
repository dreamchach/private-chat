import { NextApiRequest } from "next"

export default function ChatHandler (req : NextApiRequest, res : any) {
    if(req.method === 'POST') {
     const to = req.body.to
     const from = req.body.from
     
     res.socket.server.io.to(to).emit('fetch-messages', from)
     res.status(201).send(`${to} message send`)
    } 
 }