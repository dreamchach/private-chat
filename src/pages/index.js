import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Other from '@/components/Other'
import axios from 'axios'

export default function Home() {
  const [connected, setConnected] = useState(true)
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState('')
  let socket
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
    const address = 'https://private-chat-git-deployerror-dreamchach.vercel.app'
    //socket = io('http://localhost:3000', {path : '/socket.io', autoConnect : false})
    socket = io(address, {path : 'api/socket'})
    socket = io('http://localhost:3000', {path : '/api/socket', autoConnect : false})
    //socket.connected = true
    //socket = io({autoConnect : false})
    
    
    socket.connect()
    console.log(socket)
    
    socket.on('error', (error) => {
      console.log('error')
    })
    socket.on('message', (message) => {
      console.log(message)
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
      {chat.map((chat, i) => (
          <div key={i}>
              <Other user={chat.user} message={chat.message} />
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
