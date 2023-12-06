import { NextApiRequest } from "next"

export default function ChatHandler (req : NextApiRequest, res : any) {
    if(req.method === 'POST') {
     const payload = req.body.payload
     
     res.socket.server.io.emit('messages', payload)
     res.status(201).json({success : true, payload : payload})
    } 
 }