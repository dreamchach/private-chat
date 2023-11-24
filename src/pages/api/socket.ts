import connect from "@/lib/dbConnect"
import { Server } from "socket.io"

export default function handler(req: any, res: any) {
  connect()

    if(res.socket.server.io) {
    console.log('now binding...')
  }else {
    const io = new Server(res.socket.server)

    io.use((socket, next) => {
      console.log('socket middleware')

      next()
    })

    io.on('connection', async (socket) => {
      console.log('socket connect')

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
    res.socket.server.io = io
  }
  res.end()
}
