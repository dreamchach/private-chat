import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { messageClient, messageToClient } from '@/utill/functions/socket';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';

const Chat = ({socket} : any) => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState<any>([])
    const auth = useSelector((state : any) => {
        return state.auth
    })

    useEffect(() => {
        if(socket) {
            messageToClient(socket, auth, setChat, chat, router)
        }
    }, [socket])

    useEffect(() => {
        if(socket) {
            messageClient(socket, chat, setChat)
        }
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