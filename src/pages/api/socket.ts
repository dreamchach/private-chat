import dbConnect from "@/lib/dbConnect"
import MessageModel from "@/model/Message"
import { getToken } from "@/utill/functions/api"
import { Server } from "socket.io"

let users : any = []

export default function SocketHandler(req : any , res : any) {
  dbConnect()

  if(res.socket.server.io) {
    console.log('now binding...')

    res.socket.server.io.use((socket : any, next : any) => {
      console.log('binding socket middleware')

      next()
    })

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

      socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload)
        
        const saveMessage = async () => {
          const token = getToken(payload.from, payload.to)
          await MessageModel.findOneAndUpdate({userToken : token}, {$push: {messages : payload}})    
        }
        saveMessage()
      })

      socket.on('fetch-messages', ({to}) => {
        const fetchMessage = async () => {
          const token = getToken(socket.id, to)
          const foundToken = await MessageModel.findOne({userToken : token})
      
          if(foundToken) {
            console.log('token is found')
            io.to(socket.id).emit('stored-messages', {messages : foundToken.messages})
            io.to(to).emit('send-message', socket.id)
          } else {
            const data = {
              userToken : token,
              messages : []
            }
            const message = new MessageModel(data)
            const saveMessage = message.save()
      
            if(saveMessage) console.log('create message')
            else console.log('creating message error')
          }
      }
        fetchMessage()
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
