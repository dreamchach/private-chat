import { goFriendChat } from '@/utill/functions/link'
import Avatar from 'boring-avatars'
import React from 'react'

const AllChatUserList = ({roomUsers, dispatch, auth, router} : any) => {
  return (
    <div className='w-200 py-10 px-5 fixed right-0 h-90vh bg-none-text top-12'>
    {roomUsers.length > 0 && roomUsers.map((item : any) => (
      <div 
        key={item.userId} 
        className='flex gap-5 items-center py-5 px-1 hover:bg-none-button rounded-xl'
        onClick={() => goFriendChat(item, dispatch, auth, router)}
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
  )
}

export default AllChatUserList