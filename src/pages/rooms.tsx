import Layout from '@/components/Layout'
import FriendsHeader from '@/components/friends/FriendsHeader'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/router';
import axios from 'axios';
import { io } from 'socket.io-client';

const Rooms = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state : any) => {
    return state.auth
  })

  let socket : any
  
  const socketInitializer = async () => {
    await axios.get('/api/socket')
    socket = io()
    socket.auth = auth

    socket.on('connect', () => {
      console.log('connected')
    })
/*
    socket.on('users-data', ({users} : any) => {
      const notMe = users.filter((user : any) => {
        const answer = user.userId !== auth.userId
        return answer
      })
      setFriends(notMe)
    })
*/

    socket.on('error', (error : any) => {
      console.log('error')
    })
  }
  
  useEffect(() => {
    if(auth.userId !== '' && auth.nickName !== '') {
      socketInitializer()
    }else router.push('/')
  
    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  }, [])

  return (
    <div className='flex flex-row'>
        <Layout />
        <div className='ml-14 w-full'>
          <FriendsHeader dispatch={dispatch} />
          <div>
            <button>
              <FaPlus /> 채팅방 생성
            </button>
          </div>
        </div>
    </div>
  )
}

export default Rooms