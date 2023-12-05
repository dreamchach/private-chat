import { containerDiv } from '@/utill/functions/style'
import React from 'react'
import AllChatAvatarDiv from './AllChatAvatarDiv'
import AllChatMessageDiv from './AllChatMessageDiv'

const AllChatBody = ({chat, auth} : any) => {
  return (
    <div className='my-14 mx-1'>
    {chat.length > 0 && chat.map((item : any, index : number) => (
      <div key={index} className={`flex gap-x-2.5 mt-1 ${containerDiv(item.from, auth.userId)}`}>
        <AllChatAvatarDiv item={item} auth={auth}/>
        <AllChatMessageDiv item={item} auth={auth} />
      </div>
    ))}            
  </div>
  )
}

export default AllChatBody