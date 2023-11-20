import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [chat, setChat] = useState<any>([])
  const [message, setMessage] = useState('')
  let socket : any
  const user = 'User_' + String(new Date().getTime()).substr(-3);

  const sendMessage = async () => {
    if(message) {
      const messageObj = {
        user,
        message
      }
      const res = await axios.post('/api/chat', messageObj)
      if(res.status === 201) setMessage('')
    }
  }
  const socketInitializer = async () => {
    await axios.get('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
      setConnected(true)
    })
    socket.on('error', (error : any) => {
      console.log('error')
    })
    socket.on('message', (message : any) => {
      chat.push(message)
      setChat([...chat])
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
    <>
      <main>
        {chat.map((chat : any, i : any) => (
          <div key={i}>
            <div>
              <div>{chat.user}</div>
              <div>{chat.message}</div>
            </div>
          </div>
        ))}
        <input 
          type='text' 
          value={message} 
          placeholder={connected ? '메세지를 입력하세요' : '연결 중입니다...'} 
          disabled={!connected}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if(event.key === 'Enter') sendMessage()
          }}
        />
      </main>
    </>
  )
}
