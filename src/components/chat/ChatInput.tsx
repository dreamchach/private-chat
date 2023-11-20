import React from 'react'
import { payload } from '@/utill/functions/function';
import { inputClick, inputEnter } from '@/utill/functions/socket';

const ChatInput = ({message, setMessage, socket, router, auth, setChat, chat} : any) => {
    return (
        <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => inputEnter(event, socket, message, router, payload(auth, router, message), setChat, chat, setMessage)}
                className='p-1.5 w-full rounded-lg'
            />
            <button 
                onClick={() => inputClick(socket, message, router, payload(auth, router, message), setChat, chat, setMessage)}
                disabled={message === '' ? true : false}
                className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white'}`}
            >
                전송
            </button>            
        </div>
    )
}

export default ChatInput