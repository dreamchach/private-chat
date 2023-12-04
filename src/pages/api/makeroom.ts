const rooms = <any>[]

export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const roomname = req.body.roomName
     const roomid = req.body.roomid
     const auth = req.body.auth

     const double = rooms.some((item : any) => item.roomid === roomid)

     if(double) {
        const addAuth = () => {
            for(const item of rooms) {
                if(item.roomid === roomid) {
                    let db = false
                    for(const user of item.users) {
                        if(user.userId === auth.userId) {
                            db = true
                        }
                    }
                    if(db === false) item.users.push(auth)
                }
            }
        }
        addAuth()
    } else if (roomid === undefined) {
        console.log('roomid is undefined')
    } else {
        rooms.push({
            roomname,
            roomid,
            users : [auth]
        })
     }
     
     res.socket.server.io.emit('rooms-data', {rooms})

     const roomdata = rooms.filter((item : any) => item.roomid === roomid)[0]
     console.log('console.log(roomid)', roomid)
     res.socket.server.io.to(roomid).emit('room-data', roomdata)

     res.status(201).send(`create room`)
    } else if(req.method === 'GET') {
        res.socket.server.io.emit('rooms-data', {rooms})
        res.status(201).send(`create room`)
    } else if(req.method === 'PUT') {
        console.log('req.body', req.body)
        console.log(rooms)

        rooms.forEach((item : any, index : number) => {
            if(item.roomid === req.body.roomid) {
                rooms[index].users.forEach((a : any, b : number) => {
                    if(a.userId === req.body.auth) {
                        rooms[index].users.splice(b, 1)
                    }
                })
            }
        })

        rooms.forEach((item : any, index : number) => {
            if(item.users.length === 0) {
                rooms.splice(index, 1)
            }
        })
        res.socket.server.io.emit('rooms-data', {rooms})
        res.status(201).send(`create room`)
    }   
}