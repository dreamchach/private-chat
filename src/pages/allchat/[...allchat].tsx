import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const AllChat = () => {
    const router = useRouter()
    const auth = useSelector((state : any) => {
      return state.auth
    })
    console.log(router)
  
    let socket : any
    
    const socketInitializer = async () => {
      await axios.get('/api/socket')
      socket = io()
      socket.auth = auth
  
      socket.on('connect', () => {
        console.log('connected')
      })
      /*
      await axios.post('/api/makeroom', {
        roomName,
        roomid,
        auth
      })
      */

      
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
    <div>all chat</div>
  )
}

export default AllChat