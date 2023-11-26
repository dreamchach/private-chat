import axios from 'axios'
import React from 'react'

const ChatInput = ({message, setMessage, socket, router, auth, setChat, chat} : any) => {
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
            await axios.post('/api/fetch', {
                to : router.query.friendUserId,
                from : auth.userId
            })
            
            const res = await axios.post('/api/store', {payload})
            console.log(res) 
            //await socket.emit('message-to-server', payload)
            await setChat([...chat, payload])
            setMessage('')
        }
    }
    
    const inputClick = async () => {
        if(message !== '') {
            const res = await axios.post('/api/fetch', {
                to : router.query.friendUserId,
                from : auth.userId
            })
            console.log('/api/fetch', res)
            //await socket.emit('message-to-server', payload)
            await setChat([...chat, payload])
            await setMessage('')
        }
    }

    return (
        <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => inputEnter(event)}
                className='p-1.5 w-full rounded-lg'
            />
            <button 
                onClick={() => inputClick()}
                disabled={message === '' ? true : false}
                className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white'}`}
            >
                전송
            </button>            
        </div>
    )
}

export default ChatInput