import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';
import { setRoom } from '@/utill/redux/authSlice';
import { useSearchParams } from 'next/navigation';
import { Ipayload, Istate } from '@/utill/type/all';

const Chat = () => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState<any>([])
    const auth = useSelector((state : Istate) => {
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
  
      socket.on('connect', async () => {
        console.log('connected')
      })

      socket.on('messages', (payload : Ipayload) => {
        console.log(chat)
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
    }, [chat])

    useEffect(() => {
      const lastApi = async () => {
        await axios.post('/api/last', {
          to : friendUserId, 
          from : auth.userId
        }).then((res) => {
          setChat([...res.data.data.messages])
          console.log('chat', chat)          
        })        
      }
      lastApi()
    }, [friendUserId])
    

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [chat])
    
   
  return (
    <div>
        <ChatHeader />
        <ChatBody chat={chat} auth={auth} />
        <ChatInput message={message} setMessage={setMessage} auth={auth} />
    </div>
  )
}

export default Chat