import { useSearchParams } from 'next/navigation'
import React from 'react'

const ChatBodyInnerTime = ({item, auth, router} : any) => {
    const searchParams = useSearchParams()
    const friendNickname = searchParams.get('friendNickname')

    return (
        <div>
            {item.from !== auth.userId && <div className='text-bold text-lg'>{friendNickname}</div>}
            <div className={`flex gap-2.5 items-center ${item.from === auth.userId && 'mr-1 flex-row-reverse'}`}>
                <div className={`py-2.5 px-4 rounded-lg ${item.from === auth.userId ? 'bg-buble-yellow' : 'bg-blow-green' }`}>
                    {item.message}
                </div>
                <div className='text-none-text text-sm'>{item.time}</div>
            </div>
        </div>
    )
}

export default ChatBodyInnerTime