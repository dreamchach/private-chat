export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const to = req.body.to
     res.socket.server.io.emit('fetch-messages', to)
     res.status(201).send(`${to} message send`)
    } 
 }