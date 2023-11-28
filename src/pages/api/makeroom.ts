const rooms = <any>[]

export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const roomname = req.body.roomName
     const roomid = req.body.roomid
     const auth = req.body.auth
     
     rooms.push({
        roomname,
        roomid,
        users : [{auth}]
     })
     res.socket.server.io.emit('rooms-data', {rooms})
     res.status(201).send(`create room`)
    } 
 }