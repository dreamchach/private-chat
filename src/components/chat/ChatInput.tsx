import { Nowtime, privateChatInputClick, privateChatInputEnter } from '@/utill/functions/function'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const ChatInput = ({message, setMessage, router, auth} : any) => {
    const [double, setDouble] = useState(false)
    const searchParams = useSearchParams()
    const friendUserId = searchParams.get('friendUserId')
    console.log(friendUserId)
    const input = useRef<any>(null)
    const payload = {
        from : auth.userId,
        to : friendUserId,
        time : Nowtime(),
        message,
    }
    
    useEffect(() => {
        if(double === false) {
            input.current.focus()
        }
    }, [double])

    return (
        <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => privateChatInputEnter(event, message, setDouble, friendUserId, auth, payload, setMessage)}
                className='p-1.5 w-full rounded-lg'
                disabled={double}
                ref={input}
            />
            <button 
                onClick={() => privateChatInputClick(message, setDouble, friendUserId, auth, payload, setMessage)}
                disabled={(message === '' ? true : false) && double}
                className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white transition'}`}
            >
                전송
            </button>            
        </div>
    )
}

export default ChatInput