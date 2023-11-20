import '@/styles/globals.css'
import { persistor, store } from '@/utill/redux/store'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { io, Socket } from 'socket.io-client';

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketConnect = async () => {
      await axios.get('/api/socket')
      setSocket(io('https://private-chat-git-newnext-dreamchach.vercel.app/api/socket', {autoConnect : false}))
    }
    socketConnect()

    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} socket={socket}/>
      </PersistGate>
    </Provider>
  )
}
