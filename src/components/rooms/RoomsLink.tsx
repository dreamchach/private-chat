import { setRoom } from '@/utill/redux/authSlice'
import { IroomLink } from '@/utill/type/room'
import Avatar from 'boring-avatars'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'

const RoomsLink = ({item, dispatch} : IroomLink) => {
  return (
    <Link href={{
        pathname : `/allchat/${item.roomId}`,
        query : {
          roomid : item.roomId,
          roomname : item.roomName
        }
        }}
        onClick={() => dispatch(setRoom({roomId : item.roomId, roomName : item.roomName}))}
        >
          <div  className='mx-14 flex items-center justify-between gap-5 mt-5 hover:bg-none-button p-2 rounded-xl transition'>
            <div className='flex items-center gap-5'>
              <div className='border-black border rounded-full bg-white'>
                <Avatar
                  size={60}
                  name={item.users[0].avatar}
                  variant='beam'
                  colors={item.users[0].color}
                />
              </div>
              <div className='font-bold text-lg'>{item.roomName}</div>                            
            </div>
            <div className='mx-5 flex items-center justify-center gap-5 shrink-0'>
              <FaUser size='30'/> {item.users.length}명
            </div>
          </div>
      </Link>
  )
}

export default RoomsLink