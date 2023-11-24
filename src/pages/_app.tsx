import '@/styles/globals.css'
import { persistor, store } from '@/utill/redux/store'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { io } from 'socket.io-client'

export default function App({ Component, pageProps }: AppProps) {

  const [socket, setSocket] = useState<any>()
  useEffect(() => {
    const socketConnect = async () => {
      //await axios.get('/api/socket')
      setSocket(io({autoConnect : false}))
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
