export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const roomname = req.body.roomName
     const roomid = req.body.roomid
     const auth = req.body.auth
     
     res.socket.server.io.emit('rooms-data', {roomname, roomid, auth})
     res.status(201).send(`create room`)
    } 
 }