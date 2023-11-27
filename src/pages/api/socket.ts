import { Server } from "socket.io"
import messageModel from '@/model/Message'

let users : any = []

export default function handler(req: any, res: any) {

  if(res.socket.server.io) {
    console.log('now binding...')
  }else {
    const io = new Server(res.socket.server)

    io.use((socket : any, next) => {
      console.log('socket middleware')
      socket.id = socket.handshake.auth.userId
      users.push(socket.handshake.auth)

      next()
    })

    io.on('connection', async (socket) => {
      console.log('socket connect')

      io.emit('users-data', {users})

      socket.on('disconnect', () => {
        users = users.filter((user : any) => user.userId !== socket.handshake.auth.userId)
        io.emit('users-data', {users})
        
        console.log('disconnect')
      })
    })
    res.socket.server.io = io
  }
  res.end()
}
