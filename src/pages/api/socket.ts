import { fetchMessages, saveMessages } from '@/utill/functions/functions'
import { IUserData, IUsers } from '@/utill/types/api'
import { Server } from 'socket.io'

export default function SocketHandler(req : any, res : any) {
    if(res.socket.server.io) {
        console.log('now binding...')
        res.end()
        return
    }
    
    const io = new Server(res.socket.server)
    let users : IUsers[] = []

    io.use((socket, next) => {
        const username = socket.handshake.auth.username
    
        if(!username) return next(new Error('허용되지 않는 이름입니다'))
    
        next()
    })

    io.on('connection', async (socket) => {
        const auth = socket.handshake.auth
        users.push(auth as IUserData)
        console.log('socket connected')

        io.emit('users-data', {users})
        
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId)
            console.log('roomId', roomId)
        })
    
        socket.on('message-to-server', (payload) => {
            io.to(payload.to).emit('message-to-client', payload)
            saveMessages(payload)   
        })        
        socket.on('fetch-messages', ({receiver}) => {
            fetchMessages(io, socket.id, receiver)  
        })
        socket.on('disconnect', () => {
            users = users.filter((user) => user.userID !== socket.id)
    
            io.emit('users-data', {users})
            io.emit('user-away', socket.id)
            console.log('socket disconnect')
        }) 
    })
    
    res.socket.server.io = io
    res.end()
}