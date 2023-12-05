import React from 'react'

const AllChatMessageDiv = ({item, auth} : any) => {
    console.log('item', item)
    console.log('auth', auth)
    
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
        <div className='text-bold text-lg'>{item.auth.nickName}</div>
        <div className='flex gap-2.5 items-center'>
          <div className='py-2.5 px-4 rounded-lg bg-blow-green'>
            {item.message}
          </div>
          <div className='text-none-text text-sm'>{item.time}</div>
        </div>
      </div>
    )
  }

export default AllChatMessageDiv