import connect from "@/lib/dbConnect"
import { Server } from "socket.io"
import messageModel from '@/model/Message'

let users : any = []

export default function handler(req: any, res: any) {
  connect()

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

      socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload)

        //saveMessage(payload)
      })

      socket.on('fetch-messages', ({to}) => {
        const saveMessage = async () => {
          const getToken = (sender : string, receiver : string) => {
            const key = [sender, receiver].sort().join('_')
            return key
          }

          const token = getToken(socket.id, to)
          const foundToken = await messageModel.findOne({userToken : token})
      
          if(foundToken) {
            console.log('token is found')
            io.to(socket.id).emit('stored-messages', {messages : foundToken.messages})
            io.to(to).emit('send-message', socket.id)
          } else {
            const data = {
              userToken : token,
              messages : []
            }
            const message = new messageModel(data)
            const saveMessage = message.save()
      
            if(saveMessage) console.log('create message')
            else console.log('creating message error')
          }
        }
        saveMessage()
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
