import connect from "@/lib/dbConnect"
// import messageModel from "@/model/message"
import { fetchMessage, getToken, saveMessage } from "@/utill/functions/api"
import { Server } from "socket.io"

let users : any = []

export default function SocketHandler(req : any , res : any) {
  connect()

  if(res.socket.server.io) {
    console.log('now binding...')

    res.socket.server.io.use((socket : any, next : any) => {
      console.log('binding socket middleware')

      next()
    })

  }else {
    const io = new Server(res.socket.server, {
      path : '/api/socket_io',
      addTrailingSlash : false
    })

    io.use((socket : any, next) => {
      console.log('socket middleware')
      socket.id = socket.handshake.auth.userId
      users.push(socket.handshake.auth)

      next()
    })

    io.on('connection', async (socket) => {
      console.log('socket connect')

      io.emit('users-data', {users})

      socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload)

        saveMessage(payload)
      })

      socket.on('fetch-messages', ({to}) => {
        fetchMessage(socket, to, io)
      })

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
