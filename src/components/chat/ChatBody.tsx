import React from 'react'
import ChatBodyInner from './ChatBodyInner'

const ChatBody = ({chat, auth, router} : any) => {
    return (
        <div className='my-14 mx-1'>
            {chat.length > 0 && chat.map((item : any, index : number) => (
                <ChatBodyInner key={index} item={item} auth={auth} router={router} />
            ))}            
        </div>
    )
}

export default ChatBody