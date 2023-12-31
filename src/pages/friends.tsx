import { input, output } from '@/utill/redux/waitSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AboutFriends from '@/components/friends/AboutFriends'
import axios from 'axios'
import { io } from 'socket.io-client'
import FriendsHeader from '@/components/friends/FriendsHeader'
import AboutMe from '@/components/friends/AboutMe'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { setRoom } from '@/utill/redux/authSlice'
import { Iauth, Istate } from '@/utill/type/all'

export default function Home() {
  const [friends, setFriends] = useState<any>([])
  const auth = useSelector((state : Istate) => {
      return state.auth
  })
  const wait = useSelector((state : Istate) => {
      return state.wait
  })
  const dispatch = useDispatch()
  const router = useRouter()
  
  let socket : any
  
  const socketInitializer = async () => {
    await axios.get('/api/socket')
    socket = io()
    socket.auth = auth

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('users-data', ({users} : {users : Iauth[]}) => {
      const notMe = users.filter((user : Iauth) => {
        const answer = user.userId !== auth.userId
        return answer
      })
      setFriends(notMe)
    })

    socket.on('fetch-messages', (to : string) => {
      dispatch(input(to))
    })

    socket.on('error', (error : any) => {
      console.log('error')
    })
  }
  
  useEffect(() => {
    dispatch(setRoom({roomId : '', roomName : ''}))
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
        <AboutMe auth={auth} />
        <div className='mx-14 mt-14 flex items-center justify-center text-sm text-none-text font-bold'>접속한 유저</div>
        {friends.length > 0 ? 
            friends.map((friend : any) => (
                <Link 
                    href={{
                        pathname : `/chat/${auth.userId}-${friend.userId}`,
                        query : {
                            friendUserId : friend.userId,
                            friendNickname : friend.nickName,
                            friendAvatar : friend.avatar,
                            friendColor : friend.color,
                        }
                    }} 
                    key={friend.userId}
                    onClick={() => dispatch(output(friend.userId))}
                >
                    <AboutFriends friend={friend} wait={wait} />
                </Link>
            )) : 
            <div className='mt-14 flex items-center justify-center text-sm text-none-text font-bold'>접속 중인 유저 없음</div>
        }
      </div>
    </div>
  )
}
