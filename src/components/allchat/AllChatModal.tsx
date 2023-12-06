import { customStyles } from '@/utill/array-object/modalStyle'
import { IallChatModal } from '@/utill/type/allchat'
import React from 'react'
import Modal from 'react-modal'

const AllChatModal = ({modal, router, setModal} : IallChatModal) => {
  return (
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
  )
}

export default AllChatModal