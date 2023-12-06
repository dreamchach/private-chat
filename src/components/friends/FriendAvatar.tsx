import Avatar from 'boring-avatars'
import React from 'react'

const FriendAvatar = ({friend} : {friend : any}) => {
    return (
        <div className='flex items-center gap-5'>
            <div className='border-black border rounded-full bg-white'>
                <Avatar
                    size={60}
                    name={friend.avatar}
                    variant='beam'
                    colors={friend.color}
                />
            </div>
            <div className='font-bold text-lg'>{friend.nickName}</div>                            
        </div>
    )
}

export default FriendAvatar