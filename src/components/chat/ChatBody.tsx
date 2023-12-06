import React from 'react'
import ChatBodyInner from './ChatBodyInner'
import { IchatBody } from '@/utill/type/chat'

const ChatBody = ({chat, auth} : IchatBody) => {
    return (
        <div className='my-14 mx-1'>
            {chat.length > 0 && chat.map((item : any, index : number) => (
                <ChatBodyInner key={index} item={item} auth={auth} />
            ))}            
        </div>
    )
}

export default ChatBody