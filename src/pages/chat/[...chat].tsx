import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';
import { setRoom } from '@/utill/redux/authSlice';
import { chatLast } from '@/utill/functions/function';
import { useSearchParams } from 'next/navigation';

const Chat = () => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState<any>([])
    const auth = useSelector((state : any) => {
        return state.auth
    })
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const friendUserId = searchParams.get('friendUserId')

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
      
      socket.on('error', (error : any) => {
        console.log('error')
      })
    }


    
    useEffect(() => {
      dispatch(setRoom({roomId : '', roomName : ''}))
      if(auth.userId !== '' && auth.nickName !== '') {
        socketInitializer()
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

    useEffect(() => {
      console.log(chat)
      chatLast(friendUserId, auth, setChat)
    }, [friendUserId])
    
   
  return (
    <div>
        <ChatHeader router={router} />
        <ChatBody chat={chat} auth={auth} router={router} />
        <ChatInput message={message} setMessage={setMessage} socket={socket} router={router} auth={auth} setChat={setChat} chat={chat} />
    </div>
  )
}

export default Chat