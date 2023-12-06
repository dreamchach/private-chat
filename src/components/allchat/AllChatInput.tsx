import { allChatInputClick, allChatInputEnter } from '@/utill/functions/function'
import { IallChatInput } from '@/utill/type/allchat'
import React from 'react'

const AllChatInput = ({message, setMessage, payload, roomId} : IallChatInput) => {
  return (
    <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
    <input 
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyUp={(event) => allChatInputEnter(event, message, payload, roomId, setMessage)}
        className='p-1.5 w-full rounded-lg'
    />
    <button 
        onClick={() => allChatInputClick(message, payload, roomId, setMessage)}
        className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white transition'}`}
    >
        전송
    </button>            
</div>
  )
}

export default AllChatInput