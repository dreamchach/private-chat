import { input } from "../redux/waitSlice"

export const socketConnect = async (socket : any, auth : any, setFriends : any, dispatch : any) => {
    if(socket) {
        console.log(1)
        socket.disconnect()
        console.log(2)
        await socket.connect()
        console.log(3)
        socket.auth = auth
        console.log(4)
        
        socket.on('users-data', ({users} : any) => {
            const notMe = users.filter((user : any) => {
                const answer = user.userId !== auth.userId
                return answer
            })
            setFriends(notMe)
        })
        console.log(5)

        socket?.on('send-message', (to : any) => {
            dispatch(input(to))
            console.log('to', to)
        })
        console.log(6)
    }
}

export const inputEnter = async (
    event : any, 
    socket : any, 
    message : string, 
    router : any, 
    payload : any, 
    setChat : any, 
    chat : any, 
    setMessage : any
) => {
    if(event.key === 'Enter' && !!socket && message !== '') {
        console.log(payload)
        await socket.emit('fetch-messages', {to : router.query.friendUserId})
        await socket.emit('message-to-server', payload)
        await setChat([...chat, payload])
        setMessage('')
    }
}

export const inputClick = async (
    socket : any, 
    message : string, 
    router : any, 
    payload : any, 
    setChat : any, 
    chat : any, 
    setMessage : any
) => {
    if(!!socket && message !== '') {
        await socket.emit('fetch-messages', {to : router.query.friendUserId})
        await socket.emit('message-to-server', payload)
        await setChat([...chat, payload])
        await setMessage('')
    }
}

export const messageToClient = async (socket : any, auth : any, setChat : any, chat : any, router : any) => {
    await socket.disconnect()
    await socket.connect()
    socket.auth = auth
    
    socket?.on('stored-messages', ({messages} : any) => {
       setChat(messages)
    })
    
    socket?.on('message-to-client', (payload : any) => {
        const copyChat = [...chat, payload]
        setChat(copyChat)
    })
    socket.emit('fetch-messages', {to : router.query.friendUserId})
}

export const messageClient = async (socket : any, chat : any, setChat : any) => {
    socket?.on('message-to-client', (payload : any) => {
        const copyChat = [...chat, payload]
        setChat(copyChat)
    })
}