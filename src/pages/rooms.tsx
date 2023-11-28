import Layout from '@/components/Layout'
import FriendsHeader from '@/components/friends/FriendsHeader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/router';
import axios from 'axios';
import { io } from 'socket.io-client';
import Modal from 'react-modal'
import Link from 'next/link';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#8fefd4',
    borderRadius: '16px',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  },
};

const Rooms = () => {
  const [modal, setModal] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [rooms, setRooms] = useState([])
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

    socket.on('rooms-data', (data : any) => {
      setRooms(data.rooms)
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

  const click = async () => {
    if(roomName !== '') {
      setModal(false)
      const roomId = crypto.randomUUID()
      router.push({
        pathname : `/allchat/${roomId}`,
        query : {
          roomid : roomId,
          roomname : roomName
        }
      })      
    }else {
      alert('채팅방 이름은 공백이 불가능합니다')
    }
  }

  const keyup = async (event : any) => {
    if (event.key === 'Enter' && roomName !== '') {
      setModal(false)
      const roomId = crypto.randomUUID()
      router.push({
        pathname : `/allchat/${roomId}`,
        query : {
          roomid : roomId,
          roomname : roomName
        }
      }) 
  }else if(event.key === 'Enter' && roomName === '') {
      alert('이름은 공백이 불가능합니다')
  }
  }

  return (
    <div className='flex flex-row'>
        <Layout />
        <div className='ml-14 w-full'>
          <FriendsHeader dispatch={dispatch} />
          <div className='mt-40 flex justify-center'>
            <button 
              onClick={() => setModal(true)}
              className='transition flex items-center gap-5 py-2.5 px-5 rounded-lg bg-none-button shadow hover:bg-none-text hover:shadow-xl transition'>
              <FaPlus /> 채팅방 생성
            </button>
            {modal && 
              <Modal 
                isOpen={modal}
                style={customStyles}
              >
                <div className='flex flex-col items-center gap-5'>
                  <div className='text-lg font-bold'>채팅방 이름</div>
                  <input 
                    placeholder='채팅방 이름을 정해주세요' 
                    value={roomName} 
                    onChange={(event) => setRoomName(event.target.value)} 
                    className='py-2.5 px-5 rounded-lg'
                    onKeyUp={(event) => keyup(event)}
                  />
                </div>
                <div className='mt-10 mb-5'>
                  <button 
                    onClick={() => click()}
                    className={`mb-5 w-full py-2.5 px-5 rounded-lg ${roomName === '' ? 'bg-none-button text-none-text' : 'bg-basic-green hover:bg-hover-green hover:shadow-lg'} shadow transition`}
                  >
                    채팅방 생성
                  </button>
                  <button 
                    onClick={() => setModal(false)}
                    className='mb-5 w-full py-2.5 px-5 rounded-lg bg-none-button shadow hover:bg-none-text hover:shadow-lg transition'
                  >
                    취소
                  </button>
                </div>
              </Modal>
            }
          </div>
          {rooms.length > 0 && rooms.map((item : any) => (
            <Link href={`/allchat/${item.roomid}`} key={item.roomid}>
              {item.roomname}
            </Link>
          ))}
        </div>
    </div>
  )
}

export default Rooms