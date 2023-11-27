export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const room = req.body.roomName
     const auth = req.body.auth
     
     res.socket.server.io.emit('fetch-join', {room, auth})
     res.status(201).send(`create room`)
    } 
 }