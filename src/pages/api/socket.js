// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Server } from "socket.io"

export default function SocketHandler(req, res) {
  if(res.socket.server.io) {
    console.log('now binding...')
  }else {
    const io = new Server(res.socket.server, {path : '/socket.io'})

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
