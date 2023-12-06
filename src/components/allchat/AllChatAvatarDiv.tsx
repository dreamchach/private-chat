import { IallChatBodyInner } from '@/utill/type/allchat'
import Avatar from 'boring-avatars'
import React from 'react'

const AllChatAvatarDiv = ({item, auth} : IallChatBodyInner) => {

    if(item.from === 'admin' || item.from === auth.userId) {
      return (<div></div>)
    } else return (
      <div className='border-black border rounded-full bg-white w-42 h-42'>
      <Avatar
        size={40}
        name={item.auth.avatar as string}
        variant='beam'
        colors={item.auth.color as string[]}
      />
    </div>
    )
  }

export default AllChatAvatarDiv