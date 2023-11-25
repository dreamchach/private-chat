import React from 'react'
import Avatar from 'boring-avatars'
import ChatBodyInnerTime from './ChatBodyInnerTime'

const ChatBodyInner = ({index, item, auth, router} : any) => {
    return (
        <div key={index} className={`flex gap-x-2.5 mt-1 ${item.from === auth.userId && 'justify-end'}`}>
            {item.from === auth.userId ? 
                <div></div> : 
                <div>
                    <Avatar
                        size={40}
                        name={router.query.friendAvatar as string}
                        variant='beam'
                        colors={router.query.friendColor as string[]}
                    />
                </div>
            }
            <ChatBodyInnerTime item={item} auth={auth} router={router} />
        </div>
    )
}

export default ChatBodyInner