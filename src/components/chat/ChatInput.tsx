import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const ChatInput = ({message, setMessage, socket, router, auth, setChat, chat} : any) => {
    const [double, setDouble] = useState(false)
    const input = useRef<any>(null)
    useEffect(() => {
        if(double === false) {
            input.current.focus()
        }
    }, [double])
    

    const Nowtime = () => {
        const answer = new Date().toLocaleString('ko-KR', {
            hour : 'numeric',
            minute : 'numeric',
            hour12 : true
        })
        return answer
    }

    const payload = {
        from : auth.userId,
        to : router.query.friendUserId,
        time : Nowtime(),
        message,
    }

    const inputEnter = async (event : any) => {
        if(event.key === 'Enter' && message !== '') {
            await setDouble(true)
            
            await axios.post('/api/fetch', {
                to : router.query.friendUserId,
                from : auth.userId
            })
            await axios.post('/api/store', {payload})

            const res = await axios.post('/api/message', {payload})
            console.log(res)
            await chat.push(payload)
            setChat([...chat])
            await setMessage('')
            await setDouble(false)
        }
    }
    
    const inputClick = async () => {
        if(message !== '') {
            await setDouble(true)
            
            await axios.post('/api/fetch', {
                to : router.query.friendUserId,
                from : auth.userId
            })
            await axios.post('/api/store', {payload})
            
            await axios.post('/api/message', {payload})
            
            //await setChat([...chat, payload])
            await setMessage('')
            await setDouble(false)
        }
    }

    return (
        <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => inputEnter(event)}
                className='p-1.5 w-full rounded-lg'
                disabled={double}
                ref={input}
            />
            <button 
                onClick={() => inputClick()}
                disabled={(message === '' ? true : false) && double}
                className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white'}`}
            >
                전송
            </button>            
        </div>
    )
}

export default ChatInput