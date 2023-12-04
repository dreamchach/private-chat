import axios from 'axios'
import Avatar from 'boring-avatars'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import Modal from 'react-modal'
import { IoMenu } from "react-icons/io5";
import { setRoom } from '@/utill/redux/authSlice'
import { useSearchParams } from 'next/navigation'

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
    const [friend, setFriend] = useState<any>([])
    const searchParams = useSearchParams()
    const roomId = searchParams.get('roomid')
    const roomName = searchParams.get('roomname')
    const [openRoomUsers, setOpenRoomUsers] = useState(false)
    console.log(chat)
  
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
      auth,
//      to : router.query.friendUserId,
      time : Nowtime(),
      message,
  }

    let socket : any

    console.log('room', roomId, roomName)
    
    const socketInitializer = async () => {
      dispatch(setRoom({roomId, roomName}))

      await axios.get('/api/socket')
      socket = io()
      socket.auth = auth
  
      socket.on('connect', async () => {
        console.log('connected')
        /*
        const res = await axios.post('/api/makeroom', {
          roomName,
          roomid : roomId,
          auth
      })
      */

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
        console.log(payload)
        chat.push(payload)
        setChat([...chat])
      })

      socket.on('users-data', ({users} : any) => {
        const notMe = users.filter((user : any) => {
          const answer = user.userId !== auth.userId
          return answer
        })
        setFriend(notMe)
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
          /*
          const deleteAuth = async () => {
            await axios.put('/api/makeroom', {
              roomid : roomId, 
              auth : auth.userId
            })
          }
          deleteAuth()
*/
          socket.disconnect()
        }
      }
    }, [roomId, roomName])

/*
    useEffect(() => {
      const api = async () => {
        const res = await axios.post('/api/makeroom', {
          roomName : router.query.roomname,
          roomid : router.query.roomid,
          auth
      })
      console.log('router useeffect', res)

      await axios.post('/api/welcome', {
        roomid : router.query.roomid, 
        auth : auth
      })
      }
      api()
    }, [router])
   */ 

    /*
    const [double, setDouble] = useState(false)
    const input = useRef<any>(null)
    useEffect(() => {
        if(double === false) {
            input.current.focus()
        }
    }, [double])
    */

    const inputEnter = async (event : any) => {
      if(event.key === 'Enter' && message !== '') {
          //await setDouble(true)

          await axios.post('/api/roommessage', {payload, roomId : roomId})

          setMessage('')
          console.log(message)
          //await setDouble(false)
      }
  }

  const inputClick = async () => {
    if(message !== '') {
        await axios.post('/api/roommessage', {payload, roomId : roomId})
    }
}

useEffect(() => {
  setMessage('')
  window.scrollTo(0, document.body.scrollHeight)
}, [chat])

/*
useEffect(() => {
  const deleteAuth = async () => {
    await axios.put('/api/makeroom', {
      roomid : roomId, 
      auth : auth.userId
    })
    dispatch(setRoomId(''))
  }
  deleteAuth()
}, [friend])
console.log(friend)
*/

console.log(roomUsers)
//   
const friendChat = (item : any) => {
  console.log(item)
  dispatch(setRoom({roomId : '', roomName : ''}))
  if(item.userId !== auth.userId) {
    router.push({
      pathname : `/chat/${auth.userId}-${item.userId}`,
      query : {
          friendUserId : item.userId,
          friendNickname : item.nickName,
          friendAvatar : item.avatar,
          friendColor : item.color,
      }
    })
  }
}

const containerDiv = (item : string) => {
  if(item === 'admin') {
    return 'justify-center'
  } else if(item === auth.userId) {
    return 'justify-end'
  } else return 'justify-start'
  //${item.from === auth.userId && 'justify-end'}
}

const avatarDiv = (item : any) => {
  if(item.from === 'admin' || item.from === auth.userId) {
    return (<div></div>)
  } else return (
    <div className='border-black border rounded-full bg-white'>
    <Avatar
      size={40}
      name={item.auth.avatar as string}
      variant='beam'
      colors={item.auth.color as string[]}
    />
  </div>
  )
  /*
            {item.from === auth.userId ? 
              <div></div> : 
              <div className='border-black border rounded-full bg-white'>
                <Avatar
                  size={40}
                  name={item.auth.avatar as string}
                  variant='beam'
                  colors={item.auth.color as string[]}
                />
              </div>
            }
  */
}

const messageDiv = (item : any) => {
  if(item.from === 'admin') {
    return (
      <div className='text-sm text-none-text font-bold py-2.5'>{item.message}</div>
    )
  } else if (item.from === auth.userId) {
    return (
      <div>
        <div className='flex gap-2.5 items-center mr-1 flex-row-reverse'>
          <div className='py-2.5 px-4 rounded-lg bg-buble-yellow'>
            {item.message}
          </div>
          <div className='text-none-text text-sm'>{item.time}</div>
        </div>
      </div>
    )
  } else return (
    <div>
      <div className='text-bold text-lg'>{item.auth.userName}</div>
      <div className='flex gap-2.5 items-center'>
        <div className='py-2.5 px-4 rounded-lg bg-blow-green'>
          {item.message}
        </div>
        <div className='text-none-text text-sm'>{item.time}</div>
      </div>
    </div>
  )
  /*
            <div>
              {item.from !== auth.userId && <div className='text-bold text-lg'>{item.auth.userName}</div>}
              <div className={`flex gap-2.5 items-center ${item.from === auth.userId && 'mr-1 flex-row-reverse'}`}>
                <div className={`py-2.5 px-4 rounded-lg ${item.from === auth.userId ? 'bg-buble-yellow' : 'bg-blow-green' }`}>
                  {item.message}
                </div>
                <div className='text-none-text text-sm'>{item.time}</div>
              </div>
            </div>
  */
}

  return (
    <div>

      <div className='flex justify-between h-12 px-5 bg-basic-green'>
        <div className='flex items-center gap-5'>
          <div onClick={() => setModal(true)}>
            <FaArrowLeft />
          </div>
          <div>{roomName}</div>  
        </div>
        <div className='flex items-center w-12 justify-center' onClick={() => setOpenRoomUsers(!openRoomUsers)}><IoMenu /></div>
      </div>

      {openRoomUsers && 
        <div className='w-200 py-10 px-5 fixed right-0 h-90vh bg-none-text'>
          {roomUsers.length > 0 && roomUsers.map((item : any) => (
            <div 
              key={item.userId} 
              className='flex gap-5 items-center py-5 px-1 hover:bg-none-button rounded-xl'
              onClick={() => friendChat(item)}
            >
              <div className='border border-white rounded-full bg-white'>
                <Avatar 
                  size={40}
                  name={item.avatar}
                  variant='beam'
                  colors={item.color}
                />
              </div>
              <div className='font-bold text-xl'>{item.nickName}</div>
            </div>
          ))}
        </div>
      }

      <div className='my-14 mx-1'>
        {chat.length > 0 && chat.map((item : any, index : number) => (
          <div key={index} className={`flex gap-x-2.5 mt-1 ${containerDiv(item.from)}`}>
            {avatarDiv(item)}
            {messageDiv(item)}
          </div>
        ))}            
      </div>

      <div className='fixed bottom-0 bg-basic-green p-1.5 w-full flex justify-between gap-1.5'>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => inputEnter(event)}
                className='p-1.5 w-full rounded-lg'
                //disabled={double}
                //ref={input}
            />
            <button 
                onClick={() => inputClick()}
                //disabled={(message === '' ? true : false) && double}
                className={`shrink-0 py-1.5 px-4 my-0 rounded-lg ${message === '' ? 'bg-none-button text-none-text' : 'hover:bg-hover-green hover:text-white transition'}`}
            >
                전송
            </button>            
        </div>
        
        {modal && 
              <Modal 
                isOpen={modal}
                style={customStyles}
              >
                <div className='flex flex-col items-center gap-5'>
                  <div className='text-lg font-bold flex flex-col items-center'>
                    <div>단체 체팅은 저장되지 않습니다</div>
                    <div>나가시겠습니까?</div>
                  </div>
                </div>
                <div className='mt-10 mb-5'>
                  <button 
                    onClick={() => router.push('/rooms')}
                    className='mb-5 w-full py-2.5 px-5 rounded-lg bg-basic-green hover:bg-hover-green hover:shadow-lg shadow transition'
                  >
                    나가기
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
  )
}

export default AllChat