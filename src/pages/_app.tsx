import '@/styles/globals.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<any>()

  const socketInitializer = async () => {
    await axios.get('/api/socket')
    setSocket(io({autoConnect : false}))
  }
  
  useEffect(() => {
    socketInitializer()
  
    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [])

  return <Component {...pageProps} socket={socket}/>
}
