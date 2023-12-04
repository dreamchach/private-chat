import { Server } from "socket.io"

let users : any = []
let rooms : any = []

export default function handler(req: any, res: any) {

  if(res.socket.server.io) {
    console.log('now binding...')
  }else {
    const io = new Server(res.socket.server)

    io.use((socket : any, next) => {
      console.log('socket middleware')
      socket.id = socket.handshake.auth.userId
      console.log('middleware users', users)

      next()
    })

    io.on('connection', async (socket) => {
      console.log('socket connect')


      const roomId = socket.handshake.auth.room.roomId
      const roomName = socket.handshake.auth.room.roomName
      const auth = socket.handshake.auth

      const userDouble = users.some((item : any) => item.userId === auth.userId)
      if(!userDouble) {
        users.push(auth)
      }

      console.log('users', users)

      if(roomId !== '') {
        const double = rooms.some((item : any) => item.roomId === roomId)
        if(double) {
           const addAuth = () => {
               for(const item of rooms) {
                   if(item.roomId === roomId) {
                       let db = false
                       for(const user of item.users) {
                        console.log(user.userId, auth.userId)
                           if(user.userId === auth.userId) {
                               db = true
                           }
                       }
                       if(db === false) item.users.push(auth)
                   }
               }
           }
           addAuth()
       } else if (roomId === undefined) {
           console.log('roomid is undefined')
       } else {
           rooms.push({
               roomName,
               roomId,
               users : [auth]
           })
        }
      }

      if(roomId !== '') {
        socket.join(roomId)
        console.log(rooms)
      }

      io.emit('users-data', {users})

      io.emit('rooms-data', {rooms})

      const roomdata = rooms.filter((item : any) => item.roomId === roomId)[0]
      io.to(roomId).emit('room-data', roomdata)

      socket.on('disconnect', () => {
        io.to(roomId).emit('goodbye-message', auth)
        
        users = users.filter((user : any) => user.userId !== socket.handshake.auth.userId)
        io.emit('users-data', {users})

        rooms.forEach((item : any, index : number) => {
          if(item.roomId === roomId) {
              rooms[index].users.forEach((a : any, b : number) => {
                  if(a.userId === socket.handshake.auth.userId) {
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

      console.log('disconnect rooms', rooms)

      io.emit('rooms-data', {rooms})

      const roomdata = rooms.filter((item : any) => item.roomId === roomId)[0]
      io.to(roomId).emit('room-data', roomdata)
        
        console.log('disconnect')
      })
    })
    res.socket.server.io = io
  }
  res.end()
}
