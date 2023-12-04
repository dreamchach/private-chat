export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {     
     res.socket.server.io.to(req.body.roomid).emit('welcome-message', req.body.auth)
     //res.status(201).send(`${to} message send`)
    } 
 }