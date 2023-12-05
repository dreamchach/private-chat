import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setRoom } from '@/utill/redux/authSlice'
import { useSearchParams } from 'next/navigation'
import { Nowtime } from '@/utill/functions/function'
import AllChatHeader from '@/components/allchat/AllChatHeader'
import AllChatUserList from '@/components/allchat/AllChatUserList'
import AllChatBody from '@/components/allchat/AllChatBody'
import AllChatInput from '@/components/allchat/AllChatInput'
import AllChatModal from '@/components/allchat/AllChatModal'



const AllChat = () => {
  const router = useRouter()
  const auth = useSelector((state : any) => {
    return state.auth
  })
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<any>([])
  const [modal, setModal] = useState(false)
  const [roomUsers, setRoomUsers] = useState<any>([])
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomid')
  const roomName = searchParams.get('roomname')
  const [openRoomUsers, setOpenRoomUsers] = useState(false)
  const payload = {
    from : auth.userId,
    auth,
    time : Nowtime(),
    message,
  }

  let socket : any
    
  const socketInitializer = async () => {
    dispatch(setRoom({roomId, roomName}))

    await axios.get('/api/socket')
    socket = io()
    socket.auth = auth
  
    socket.on('connect', async () => {
      console.log('connected')

      await axios.post('/api/welcome', {
        roomid : roomId, 
        auth : auth
      })
    })

    socket.on('room-data', (data : any) => {
      if(data?.users !== undefined) {
        setRoomUsers(data.users)
      }
    })

    socket.on('welcome-message', (data : any) => {
      const adminPayload = {
        from : 'admin',
        message : `${data.nickName}님이 입장했습니다`
      }
      chat.push(adminPayload)
      setChat([...chat])
    })

    socket.on('goodbye-message', (data : any) => {
      const adminPayload = {
        from : 'admin',
        message : `${data.nickName}님이 퇴장했습니다`
      }
      chat.push(adminPayload)
      setChat([...chat])
    })

    socket.on('room-messages', (payload : any) => {
      chat.push(payload)
      setChat([...chat])
    })

    socket.on('error', (error : any) => {
      console.log('error')
    })
  }
    
  useEffect(() => {
    if(auth.userId !== '' && auth.nickName !== '') {
      if(roomId !== null && roomName !== null && roomId !== '' && roomName !== '') {
        socketInitializer()
      }
    }else router.push('/')
    
    return () => {
      dispatch(setRoom({roomId : '', roomName : ''}))
      if(socket) {
        socket.disconnect()
      }
    }
  }, [roomId, roomName])

useEffect(() => {
  setMessage('')
  window.scrollTo(0, document.body.scrollHeight)
}, [chat])

  return (
    <div>

    <AllChatHeader setModal={setModal} roomName={roomName} setOpenRoomUsers={setOpenRoomUsers} openRoomUsers={openRoomUsers} />

    {openRoomUsers && <AllChatUserList roomUsers={roomUsers} dispatch={dispatch} auth={auth} router={router}/>}

    <AllChatBody chat={chat} auth={auth} />

    <AllChatInput message={message} setMessage={setMessage} payload={payload} roomId={roomId} />
        
        {modal && <AllChatModal modal={modal} router={router} setModal={setModal} />}
    </div>
  )
}

export default AllChat