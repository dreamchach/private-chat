import { customStyles } from '@/utill/array-object/modalStyle'
import { roomInputClick, roomInputKeyup } from '@/utill/functions/function'
import React, { useState } from 'react'
import Modal from 'react-modal'

const RoomsModal = ({modal, setModal, dispatch, router} : any) => {
    const [roomName, setRoomName] = useState('')

  return (
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
        onKeyUp={(event) => roomInputKeyup(event, roomName, setModal, dispatch, router)}
      />
    </div>
    <div className='mt-10 mb-5'>
      <button 
        onClick={() => roomInputClick(roomName, setModal, dispatch, router)}
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
  )
}

export default RoomsModal