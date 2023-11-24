import axios from 'axios'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Home() {
  let socket : any
  
  const socketInitializer = async () => {
    await axios.get('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('error', (error : any) => {
      console.log('error')
    })
  }
  
  useEffect(() => {
    socketInitializer()
  
    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [])

  return (
    <main>main</main>
  )
}
