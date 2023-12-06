import Layout from '@/components/Layout'
import FriendsHeader from '@/components/friends/FriendsHeader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/router';
import axios from 'axios';
import { io } from 'socket.io-client';
import { setRoom } from '@/utill/redux/authSlice';
import RoomsLink from '@/components/rooms/RoomsLink';
import RoomsModal from '@/components/rooms/RoomsModal';
import { Istate } from '@/utill/type/all';

const Rooms = () => {
  const [modal, setModal] = useState(false)
  const [rooms, setRooms] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state : Istate) => {
    return state.auth
  })

  let socket : any
  
  const socketInitializer = async () => {
    await axios.get('/api/socket')
    socket = io()
    socket.auth = auth

    socket.on('connect', async () => {
      console.log('connect')
    })

    socket.on('rooms-data', (data : any) => {
      setRooms(data.rooms)
    })

    socket.on('error', (error : any) => {
      console.log('error')
    })
  }

  useEffect(() => {
    dispatch(setRoom({roomId : '', roomName : ''}))

    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [])
  
  
  useEffect(() => {
    if(auth.userId !== '' && auth.nickName !== '') {
      if(auth.room.roomId === '' && auth.room.roomName === '') {
        socketInitializer()
      }
    }else router.push('/')
  
    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [auth])

  return (
    <div className='flex flex-row'>
        <Layout />
        <div className='ml-14 w-full'>
          <FriendsHeader dispatch={dispatch} />
          {rooms.length > 0 && rooms.map((item : any) => (
            <div key={item.roomId}>
              <RoomsLink item={item} dispatch={dispatch} />
            </div>
          ))}
          <div className={`${rooms.length > 0 ? 'mt-20' : 'mt-40'} flex justify-center`}>
            <button 
              onClick={() => setModal(true)}
              className='transition flex items-center gap-5 py-2.5 px-5 rounded-lg bg-none-button shadow hover:bg-none-text hover:shadow-xl transition'>
              <FaPlus /> 채팅방 생성
            </button>
            {modal && <RoomsModal modal={modal} setModal={setModal} dispatch={dispatch} router={router} />}
          </div>
        </div>
    </div>
  )
}

export default Rooms