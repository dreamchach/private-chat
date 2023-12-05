import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'

const AllChatHeader = ({setModal, roomName, setOpenRoomUsers, openRoomUsers} : any) => {
  return (
    <div className='flex justify-between h-12 px-5 bg-basic-green fixed w-full top-0'>
    <div className='flex items-center gap-5'>
      <div onClick={() => setModal(true)}>
        <FaArrowLeft />
      </div>
      <div>{roomName}</div>  
    </div>
    <div className='flex items-center w-12 justify-center' onClick={() => setOpenRoomUsers(!openRoomUsers)}><IoMenu /></div>
  </div>
  )
}

export default AllChatHeader