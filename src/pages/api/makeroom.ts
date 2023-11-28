let rooms = <any>[]

export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const roomname = req.body.roomName
     const roomid = req.body.roomid
     const auth = req.body.auth

     const double = rooms.some((item : any) => item.roomid === roomid)

     if(double) {
        rooms = rooms.map((item : any) => {
            if(item.roomid === roomid) {
                return {...item, users : [...item.users, auth]}
            }else return item
        })
     }else {
        rooms.push({
            roomname,
            roomid,
            users : [{auth}]
        })
     }
     

     res.socket.server.io.emit('rooms-data', {rooms})
     res.status(201).send(`create room`)
    } 
 }