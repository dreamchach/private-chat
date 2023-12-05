import React from 'react'
import Avatar from 'boring-avatars'
import ChatBodyInnerTime from './ChatBodyInnerTime'
import { useSearchParams } from 'next/navigation'

const ChatBodyInner = ({index, item, auth, router} : any) => {
    const searchParams = useSearchParams()
    const friendAvatar = searchParams.get('friendAvatar')
    const friendColor = searchParams.getAll('friendColor')

    return (
        <div key={index} className={`flex gap-x-2.5 mt-1 ${item.from === auth.userId && 'justify-end'}`}>
            {item.from === auth.userId ? 
                <div></div> : 
                <div className='border-black border rounded-full bg-white w-42 h-42'>
                    <Avatar
                        size={40}
                        name={friendAvatar as any}
                        variant='beam'
                        colors={friendColor as any}
                    />
                </div>
            }
            <ChatBodyInnerTime item={item} auth={auth} router={router} />
        </div>
    )
}

export default ChatBodyInner