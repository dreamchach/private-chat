import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';

const Chat = () => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState<any>([])
    const auth = useSelector((state : any) => {
        return state.auth
    })
    let socket : any
  
    const socketInitializer = async () => {
      await axios.get('/api/socket')
      socket = io()
      socket.auth = auth
  
      socket.on('connect', () => {
        console.log('connected')
      })

      socket.on('messages', (payload : any) => {
        chat.push(payload)
        setChat([...chat])
      })
/*  
      socket.on('stored-messages', ({messages} : any) => {
        setChat(messages)
     })

     socket.on('message-to-client', (payload : any) => {
         const copyChat = [...chat, payload]
         setChat(copyChat)
     })

     socket.on('message-to-client', (payload : any) => {
        const copyChat = [...chat, payload]
        setChat(copyChat)
    })
*/
  /*
      socket.on('send-message', (to : any) => {
        dispatch(input(to))
        console.log('to', to)
      })
  */
      socket.on('error', (error : any) => {
        console.log('error')
      })
    }

    const last = async () => {
      const res = await axios.post('/api/last', {
        to : router.query.friendUserId, 
        from : auth.userId
      })
      chat.push(res.data.data.messages)
      setChat([...chat])
    }
    
    useEffect(() => {
      if(auth.userId !== '' && auth.nickName !== '') {
        socketInitializer()
        last()
      }else router.push('/')
    
      return () => {
        if(socket) {
          socket.disconnect()
        }
      }
    }, [])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [chat])
   
  return (
    <div>
        <ChatHeader router={router} />
        <ChatBody chat={chat} auth={auth} router={router} />
        <ChatInput message={message} setMessage={setMessage} socket={socket} router={router} auth={auth} setChat={setChat} chat={chat} />
    </div>
  )
}

export default Chat